import { describe, it, expect, vi } from 'vitest';
import fs from 'node:fs';
import { bffLogger } from '../logger.js';

describe('bffLogger', () => {
  it('censors a redacted secret with the product marker', async () => {
    const written: string[] = [];
    const spy = vi.spyOn(fs, 'write').mockImplementation(((...args: unknown[]) => {
      const data = args[1];
      written.push(typeof data === 'string' ? data : Buffer.from(data as Uint8Array).toString());
      const callback = args[args.length - 1];
      if (typeof callback === 'function') callback(null, written[written.length - 1].length);
    }) as unknown as typeof fs.write);

    bffLogger.info({ provider: { apiKey: 'sk-visible' } }, 'probe');
    await new Promise((resolve) => setTimeout(resolve, 100));
    spy.mockRestore();

    const line = written.join('');
    expect(line).toContain('[CONFIDENTIAL_CRIPTOFOLIO]');
    expect(line).not.toContain('sk-visible');
  });
});
