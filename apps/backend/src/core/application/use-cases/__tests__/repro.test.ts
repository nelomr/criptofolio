import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SQLiteLedgerAdapter } from '../../../infrastructure/adapters/SQLiteLedgerAdapter';
import { CsvIngestionUseCase, type IngestibleTransaction } from '../CsvIngestionUseCase';
import type { IPriceProviderPort } from '../../../domain/ports/IPriceProviderPort.js';
import type { IUserSettingsPort } from '../../../domain/ports/IUserSettingsPort.js';
import { toPreciseAmount } from '../../../domain/value-objects/PreciseAmount.js';

import { DatabaseSync } from 'node:sqlite';
import { NO_BACKFILL_SCHEDULER } from './support/noBackfillScheduler.js';

/**
 * The three payloads below follow production rows: they are what the ledger's non-negative
 * fiat CHECK rejected, and the ones carrying a negative `total_fiat` are the case that produced
 * negative-cost lots and phantom capital gains.
 */
describe('Constraint Repro', () => {
  const ACCOUNT = '10000000-0000-0000-0000-000000000007';

  let db: DatabaseSync;
  let adapter: SQLiteLedgerAdapter;
  let uc: CsvIngestionUseCase;

  const priceProvider: IPriceProviderPort = {
    getHistoricalPrice: async () => toPreciseAmount('1'),
  };

  const userSettings: IUserSettingsPort = {
    getSetting: async () => null,
    setSetting: async () => {},
  };

  beforeEach(async () => {
    db = new DatabaseSync(':memory:');
    adapter = new SQLiteLedgerAdapter(db);
    await adapter.initialize();
    uc = new CsvIngestionUseCase(adapter, priceProvider, userSettings, NO_BACKFILL_SCHEDULER);
    await adapter.ensureAccountExists({ accountId: ACCOUNT, name: 'TestAccount' });
  });

  afterEach(() => {
    db.close();
  });

  async function persistedFiat(): Promise<{ total: string | null; price: string | null }[]> {
    const saved = await adapter.getSpotTransactions(ACCOUNT);
    return saved.map((tx) => ({
      total: tx.total_fiat === null ? null : tx.total_fiat.toString(),
      price: tx.price_fiat === null ? null : tx.price_fiat.toString(),
    }));
  }

  it('Payload 1 - WITHDRAWAL', async () => {
    const payload: IngestibleTransaction = {
      tx_id: 'ce10b3e9-ecfc-42f5-a44f-d2400f20c998', timezone: 'Europe/Madrid', tx_type: 'WITHDRAWAL',
      account_id: ACCOUNT,
      amount_out: '-439.55', asset_out: 'XRP', destination_address: 'rp...',
      fee_amount: '0', fee_currency: 'XRP', fiat_currency: '',
      id_hash: 'fa4ef1c7f287f1c0ed3dc475a73146b5de12a2442365d1e4a3333db3576a1e1e',
      metadata: { time: '02:21:39' }, price_fiat: '', quote_currency: '', status: 'Completed',
      timestamp: '2023-02-07T00:00:00Z', total_fiat: '',
    };

    const result = await uc.execute([payload], 'spot', 'generic', 'UTC');

    expect(result.persisted).toBe(1);
    expect(await persistedFiat()).toEqual([{ total: '439.55', price: '1' }]);
  });

  it('Payload 2 - DEPOSIT', async () => {
    const payload: IngestibleTransaction = {
      tx_id: 'fd66e5c5-4f6f-4173-9844-2fc0c40de39c', tx_type: 'DEPOSIT',
      account_id: ACCOUNT,
      amount_in: '500', asset_in: 'EUR', destination_address: 'ES...',
      fee_amount: '0', fee_currency: 'EUR', fiat_currency: '',
      id_hash: 'fa4ef1c7ec205b52f44ae22bfed8ade112486829c81309372573c44e7166d474',
      metadata: { time: '14:44:54' }, price_fiat: '', quote_currency: '', status: 'Completed',
      timestamp: '2023-02-05T00:00:00Z', total_fiat: '', timezone: 'Europe/Madrid',
    };

    const result = await uc.execute([payload], 'spot', 'generic', 'UTC');

    expect(result.persisted).toBe(1);
    expect(await persistedFiat()).toEqual([{ total: '500', price: '1' }]);
  });

  it('Payload 3 - BUY', async () => {
    const payload: IngestibleTransaction = {
      tx_id: 'ea298d27-eb40-4c25-99df-86d9c21d2df0', tx_type: 'BUY',
      account_id: ACCOUNT,
      amount_in: '0.30338', asset_in: 'ETH', destination_address: '',
      fee_amount: '0.7499', fee_currency: 'EUR', fiat_currency: 'EUR',
      id_hash: 'fa4ef1c7209ffcdce8deef632aff6d9ce0044c48abb072343f5efa3cddece8a2',
      metadata: { time: '08:31:01.408' }, price_fiat: '1645', quote_currency: 'EUR', status: 'Completed',
      timestamp: '2023-02-05T00:00:00Z', total_fiat: '-499.81', timezone: 'Europe/Madrid',
    };

    const result = await uc.execute([payload], 'spot', 'generic', 'UTC');

    expect(result.persisted).toBe(1);
    expect(await persistedFiat()).toEqual([{ total: '499.81', price: '1645' }]);
  });
});
