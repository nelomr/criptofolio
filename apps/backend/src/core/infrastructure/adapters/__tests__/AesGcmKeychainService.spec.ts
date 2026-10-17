import { describe, it, expect, vi, afterEach } from 'vitest';

let keyringAvailable = true;
const opened: Array<[string, string]> = [];

vi.mock('@napi-rs/keyring', () => ({
  AsyncEntry: class {
    constructor(service: string, account: string) {
      if (!keyringAvailable) throw new Error('keyring unavailable');
      opened.push([service, account]);
    }
    async getPassword(): Promise<string> {
      return '00'.repeat(32);
    }
    async setPassword(): Promise<void> {}
  },
}));

import { AesGcmCryptographyAdapter } from '../AesGcmCryptographyAdapter.js';

describe('AesGcmCryptographyAdapter keychain entry', () => {
  it('opens the master key under the product service name', async () => {
    await new AesGcmCryptographyAdapter().initialize();
    expect(opened).toEqual([['criptofolio', 'master_key']]);
  });
});

describe('AesGcmCryptographyAdapter env key fallback', () => {
  const NEW_VAR = 'CRIPTOFOLIO_MASTER_KEY';
  const key = Buffer.alloc(32, 7).toString('base64');

  afterEach(() => {
    keyringAvailable = true;
    delete process.env[NEW_VAR];
  });

  it('unlocks from the product variable when the keychain is unavailable', async () => {
    keyringAvailable = false;
    process.env[NEW_VAR] = key;
    const adapter = new AesGcmCryptographyAdapter();
    await adapter.initialize();
    expect(adapter.isUnlocked()).toBe(true);
  });
});
