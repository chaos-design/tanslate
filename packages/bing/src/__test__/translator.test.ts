import { expect, test } from 'vitest';
import { translate } from '..';

test('translate 中国 to China', async () => {
  const { text } = await translate('中国', { to: 'en' });

  expect(text).toBe('China');
});
