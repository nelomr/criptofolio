/**
 * Sample rows with synthetic identifiers. Each source's column layout and conventions (fee placement,
 * gross vs. net totals, multi-leg rows, mixed conventions) are intentional and asserted by the suites;
 * do not normalize them.
 */

/** `kraken_spot.csv` — one trade, both legs, each carrying its own fee in its own asset. */
export const KRAKEN_SPOT_HEADERS = [
  'txid', 'refid', 'time', 'type', 'subtype', 'aclass', 'subclass', 'asset', 'wallet', 'amount', 'fee', 'balance',
] as const;

export const KRAKEN_SPOT_TRADE_EUR_LEG = {
  txid: 'L7SJ7G-0WQAA-OD3EE2',
  refid: 'TKZM9S-TQB0C-1QYNGI',
  time: '2022-10-10 13:53:47',
  type: 'trade',
  subtype: 'tradespot',
  aclass: 'currency',
  subclass: 'fiat',
  asset: 'EUR',
  wallet: 'spot / main',
  amount: '-326.3115',
  fee: '0',
  balance: '0.0078',
} as const;

export const KRAKEN_SPOT_TRADE_PLUME_LEG = {
  txid: 'LTJBQR-TTAEQ-89PYUJ',
  refid: 'TKZM9S-TQB0C-1QYNGI',
  time: '2022-10-10 13:53:47',
  type: 'trade',
  subtype: 'tradespot',
  aclass: 'currency',
  subclass: 'crypto',
  asset: 'PLUME',
  wallet: 'spot / main',
  amount: '5393.57839',
  fee: '13.48397',
  balance: '7425.85156',
} as const;

/**
 * `kraken_spot.csv`'s `TD0X4Y-X1E0X-AMHYJJ` group: a trade whose EUR leg *and* whose ENA leg each
 * state their own non-zero fee, in two different currencies. `LedgerSpotTransaction` has one
 * `fee_amount`/`fee_asset_id` pair, so this pair's EUR-side fee (`1.0210`) is not persisted anywhere —
 * only the ENA-side fee survives. Balance confirms the source really did charge both: `500.0000`
 * (prior balance) − `495.5398` (amount) − `1.0210` (EUR fee) = `3.4392`, the row's own stated balance.
 * Kept here as a named, measured gap rather than folded into the passing net, per this net's own
 * purpose: certify what the pipeline gets right, and name what it does not, rather than picking a
 * fixture that never exercises the question.
 */
export const KRAKEN_SPOT_DOUBLE_FEE_EUR_LEG = {
  txid: 'LYMB6N-TVUTS-NKWLCE',
  refid: 'TD0X4Y-X1E0X-AMHYJJ',
  time: '2022-10-02 01:53:00',
  type: 'trade',
  subtype: 'tradespot',
  aclass: 'currency',
  subclass: 'fiat',
  asset: 'EUR',
  wallet: 'spot / main',
  amount: '-495.5398',
  fee: '1.0210',
  balance: '3.4392',
} as const;

export const KRAKEN_SPOT_DOUBLE_FEE_ENA_LEG = {
  txid: 'LYNFFQ-Z9IFO-STV5GQ',
  refid: 'TD0X4Y-X1E0X-AMHYJJ',
  time: '2022-10-02 01:53:00',
  type: 'trade',
  subtype: 'tradespot',
  aclass: 'currency',
  subclass: 'crypto',
  asset: 'ENA',
  wallet: 'spot / main',
  amount: '959.50873',
  fee: '1.86123',
  balance: '957.64750',
} as const;

/** `kraken_futures.csv` — a `futures trade` row settling its fee in the `usd` collateral. */
export const KRAKEN_FUTURES_HEADERS = [
  'uid', 'dateTime', 'account', 'type', 'symbol', 'contract', 'change', 'new balance',
  'new average entry price', 'trade price', 'mark price', 'funding rate', 'realized pnl', 'fee',
  'realized funding', 'collateral', 'conversion spread percentage', 'liquidation fee', 'position uid',
] as const;

export const KRAKEN_FUTURES_TRADE_ROW = {
  uid: '22bcbb28-8b35-4c70-9dd6-9d7363392927',
  dateTime: '2023-02-08 08:44:52',
  account: 'flex',
  type: 'futures trade',
  symbol: 'usd',
  contract: 'pf_xrpusd',
  change: '-3.81000000000',
  'new balance': '0.00000000000',
  'new average entry price': '',
  'trade price': '1.42319000000000000000',
  'mark price': '1.42372579167000000000',
  'funding rate': '-0.000028384605269555',
  'realized pnl': '-3.65210000000',
  fee: '0.16440000000',
  'realized funding': '0.00650000000',
  collateral: '',
  'conversion spread percentage': '',
  'liquidation fee': '',
  'position uid': '',
} as const;

/** `bitvavo_spot.csv` — a `buy` row: quantity, quote total and fee all in different combinations. */
export const BITVAVO_HEADERS = [
  'Timezone', 'Date', 'Time', 'Type', 'Currency', 'Amount', 'Quote Currency', 'Quote Price',
  'Received / Paid Currency', 'Received / Paid Amount', 'Fee currency', 'Fee amount', 'Status',
  'Transaction ID', 'Address',
] as const;

export const BITVAVO_BUY_ROW = {
  Timezone: 'Europe/Madrid',
  Date: '2023-02-05',
  Time: '08:31:01.408',
  Type: 'buy',
  Currency: 'ETH',
  Amount: '0.30338',
  'Quote Currency': 'EUR',
  'Quote Price': '1645',
  'Received / Paid Currency': 'EUR',
  'Received / Paid Amount': '-499.81',
  'Fee currency': 'EUR',
  'Fee amount': '0.7499',
  Status: 'Completed',
  'Transaction ID': 'ea298d27-eb40-4c25-99df-86d9c21d2df0',
  Address: '',
} as const;

/** `bitunix_spot.csv` — the on-chain withdrawal, the file's only row with a stated fee. */
export const BITUNIX_HEADERS = [
  'Date (UTC)', 'Label', 'Outgoing Asset', 'Outgoing Amount', 'Incoming Asset', 'Incoming Amount',
  'Fee Asset', 'Fee Amount', 'Trx. ID', 'Comment',
] as const;

export const BITUNIX_WITHDRAW_ROW = {
  'Date (UTC)': '2022-12-13 14:05:31',
  Label: 'Withdraw',
  'Outgoing Asset': 'ADA',
  'Outgoing Amount': '546.844684',
  'Incoming Asset': '',
  'Incoming Amount': '0',
  'Fee Asset': 'ADA',
  'Fee Amount': '1',
  'Trx. ID': 'T8416',
  Comment: 'On-chain Withdraw',
} as const;

/** `tangem_activacion_xrp.csv` — its only row. */
export const TANGEM_HEADERS = ['Date', 'Type', 'Asset', 'Amount', 'Fee', 'Notes'] as const;

export const TANGEM_ACTIVATION_ROW = {
  Date: '2022-06-03 02:03:00 UTC',
  Type: 'WALLET_ACTIVATION',
  Asset: 'XRP',
  Amount: '1.0',
  Fee: '0.0',
  Notes: 'Tangem Base Reserve',
} as const;

/** `bit2me_spot_2025.xlsx` — a `Trade` row (fee stated in the destination asset). */
export const BIT2ME_HEADERS = [
  'Tipo de operación', 'Cantidad de destino', 'Moneda de destino', 'Cantidad de origen',
  'Moneda de origen', 'Comisión de la operación', 'Moneda de la comisión', 'Exchange', 'Grupo',
  'Descripción', 'Fecha',
] as const;

export const BIT2ME_TRADE_ROW = {
  'Tipo de operación': 'Trade',
  'Cantidad de destino': '1923.81685263',
  'Moneda de destino': 'JASMY',
  'Cantidad de origen': '50',
  'Moneda de origen': 'EUR',
  'Comisión de la operación': '9.57098884',
  'Moneda de la comisión': 'JASMY',
  Exchange: 'Bit2Me',
  Grupo: 'trading',
  Descripción: 'trading 34deaac0-0e56-4f63-a1d8-2845d6d33d07',
  Fecha: '2022-01-19 14:51',
} as const;

/** `bit2me_spot_2025.xlsx` — a `Withdrawal` row (D21: fee is the origen/destino gap, not the stated column). */
export const BIT2ME_WITHDRAWAL_ROW = {
  'Tipo de operación': 'Withdrawal',
  'Cantidad de destino': '1.536429',
  'Moneda de destino': 'HBAR',
  'Cantidad de origen': '2.236429',
  'Moneda de origen': 'HBAR',
  'Comisión de la operación': '0.210620368',
  'Moneda de la comisión': 'EUR',
  Exchange: 'Bit2Me',
  Grupo: 'blockchain',
  Descripción: 'wallet c9708154-5a1c-4130-8e7e-f86914881c3d tx_hash:0.0.995764-1643525659-475580867',
  Fecha: '2022-01-30 06:54',
} as const;
