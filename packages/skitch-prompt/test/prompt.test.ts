import { filter, _filter } from '../index';
describe('arguments', () => {
  it('empty when all args supplied', () => {
    const questions = [
      {
        name: 'hello',
      },
      {
        name: 'world',
      },
    ];
    const argv = {
      hello: 1,
      world: 2,
    };
    expect(filter(questions, argv)).toEqual([]);
    expect(argv).toEqual({
      hello: 1,
      world: 2,
    });
  });
  it('empty when all args supplied', () => {
    const questions = [
      {
        _: true,
        name: 'foo',
      },
      {
        name: 'bar',
      },
      {
        _: true,
        name: 'baz',
      },
    ];
    const argv = {
      _: [1, 3],
      bar: 2,
    };

    const _1 = filter(questions, argv);
    const _2 = _filter(questions, argv);

    expect(_2).toEqual([]);
    expect(argv).toEqual({
      _: [],
      foo: 1,
      bar: 2,
      baz: 3,
    });
  });
});
