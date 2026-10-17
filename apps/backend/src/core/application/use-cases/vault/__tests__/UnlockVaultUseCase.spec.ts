import { describe, it, expect } from 'vitest';
import crypto from 'node:crypto';
import type { EncryptedArtifact, ICryptographyPort } from '../../../../domain/ports/ICryptographyPort.js';
import type { IVaultCredentialsPort } from '../../../../domain/ports/IVaultCredentialsPort.js';
import { UnlockVaultUseCase } from '../UnlockVaultUseCase.js';

/** A reversible stand-in: the ciphertext is the plaintext, so the stored verifier text is observable. */
const passthroughCrypto: ICryptographyPort = {
  initialize: async () => undefined,
  isUnlocked: () => true,
  lock: () => undefined,
  encrypt: async (plain: Buffer): Promise<EncryptedArtifact> => ({
    ciphertext: Buffer.from(plain),
    iv: Buffer.alloc(12),
    authTag: Buffer.alloc(16),
  }),
  decrypt: async (artifact: EncryptedArtifact) => Buffer.from(artifact.ciphertext),
};

function memoryCredentials(): IVaultCredentialsPort & { store: Map<string, Buffer> } {
  const store = new Map<string, Buffer>();
  return {
    store,
    getConfiguredServices: async () => [],
    getEnabledServices: async () => [],
    setServiceEnabled: async () => undefined,
    saveCredential: async () => undefined,
    getCredential: async () => null,
    getMetadata: async (key) => store.get(key) ?? null,
    setMetadata: async (key, value) => {
      store.set(key, value);
    },
  };
}


describe('UnlockVaultUseCase verifier', () => {
  it('stores the product verifier on first unlock, and the vault then unlocks with it', async () => {
    const credentials = memoryCredentials();
    const useCase = new UnlockVaultUseCase(passthroughCrypto, credentials);

    await useCase.execute(crypto.randomUUID());
    const stored = credentials.store.get('verification_payload');
    expect(stored?.subarray(28).toString()).toBe('criptofolio_vault_ok');

    await expect(useCase.execute(crypto.randomUUID())).resolves.toBeUndefined();
  });
});
