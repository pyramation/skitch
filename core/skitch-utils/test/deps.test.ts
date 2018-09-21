import { getDeps } from '../src/deps';

describe('deps', () => {
  it('works', async () => {
    const res = await getDeps(
      __dirname + '/fixtures/skitch/packages/utils',
      'utils'
    );
    expect(res).toEqual({
      deps: {
        '/deploy/procedures/myfunction.sql': [],
        '/deploy/projects/totp/procedures/generate_secret.sql': [
          'totp:procedures/generate_secret'
        ],
        'totp:procedures/generate_secret': []
      },
      external: ['totp:procedures/generate_secret'],
      resolved: [
        'procedures/myfunction',
        'totp:procedures/generate_secret',
        'projects/totp/procedures/generate_secret'
      ]
    });
  });
});
