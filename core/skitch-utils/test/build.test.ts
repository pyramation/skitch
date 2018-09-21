import { build } from '../src/build';
process.env.SKITCH_PATH = __dirname + '/fixtures/skitch';

describe('build', () => {
  it('works', async () => {
    const cmd = await build();
    console.log(cmd);
  });
});
