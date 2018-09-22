import { packageModule } from '../src/package';
process.env.SKITCH_PATH = __dirname + '/fixtures/skitch';
process.env.SQITCH_PATH = __dirname + '/fixtures/skitch/packages/totp';

describe('package', () => {
  it('works', async () => {
    const cmd = await packageModule();
    throw new Error('NOT FINISHED IMPLEMENTING PACKAGE')
  });
});
