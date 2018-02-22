import { Skitch } from '../src/skitch';
import { filter } from '../src/utils/inquirer';

/**
 * Skitch test
 */
describe('Skitch test', () => {
  it('Skitch is instantiable', () => {
    expect(new Skitch()).toBeInstanceOf(Skitch);
  });
  it('init in folder where sqitch.plan does not exist', () => {
    let fail = false;
    try {
      var skitch = new Skitch(`${__dirname}/fixtures/test1`);
      skitch.init();
    } catch (e) {
      fail = true;
    }
    expect(fail).toBe(false);
  });
  it('init in folder where sqitch.plan exists', () => {
    var skitch = new Skitch(`${__dirname}/fixtures/test2`);
    skitch.init();
  });
  it.only('ask', () => {
    const questions = filter([{ name: 'address' }, { name: 'amount' }], {
      address: 1,
      other: 1,
      prop: 1,
    });
    console.log(questions);
  });
  xit('registerTemplate', () => {
    var skitch = new Skitch({
      hi: 1,
    });
    skitch.registerTemplate();
  });
});
