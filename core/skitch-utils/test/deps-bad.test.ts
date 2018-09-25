process.env.SKITCH_PATH = __dirname + '/fixtures/broken';
import { getDeps, extDeps } from '../src/deps';

describe('deps', () => {
  it('sqitch package dependencies', async () => {
    let failed = false;
    try {

    const res = await getDeps(
      __dirname + '/fixtures/broken/packages/secrets',
      'secrets'
    );
  } catch (e) {
    failed = true;
    expect(e.message).toMatchSnapshot();
  }
  expect(failed).toBe(true);
    console.log(res);
  });
});
