import { prompt, filter, _filter } from '../index';
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
  it('init example', async () => {
    const questions = [
      {
        _: true,
        name: 'foo',
        message: '',
      },
    ];
    const argv = {
      _: [],
      bar: 2,
    };
    const _1 = _filter(questions, argv);
    const _2 = filter(questions, argv);

    expect(_2).toEqual([
      {
        _: true,
        name: 'foo',
        message: '',
      },
    ]);
    expect(argv).toEqual({
      _: [],
      bar: 2,
    });
  });
  it('basic example', async () => {
    const questions = [
      {
        name: 'name',
        message: 'project name (e.g., flipr)',
        required: true,
      },
    ];
    const argv = { _: [], cmd: 'init' };
    _filter(questions, argv);
    const _2 = filter(questions, argv);
    expect(_2).toEqual([
      {
        name: 'name',
        message: 'project name (e.g., flipr)',
        required: true,
      },
    ]);
    expect(argv).toEqual({ _: [], cmd: 'init' };);
  });
});
describe('prompt', () => {
  it('empty when all args supplied', async () => {
    const questions = [
      {
        name: 'hello',
        message: '',
      },
      {
        name: 'world',
        message: '',
      },
    ];
    const argv = {
      hello: 1,
      world: 2,
    };

    const value = await prompt(questions, argv);
    expect(value).toEqual({
      hello: 1,
      world: 2,
    });
  });
  it('empty when all args supplied', async () => {
    const questions = [
      {
        _: true,
        name: 'foo',
        message: '',
      },
      {
        name: 'bar',
        message: '',
      },
      {
        _: true,
        name: 'baz',
        message: '',
      },
    ];
    const argv = {
      _: [1, 3],
      bar: 2,
    };
    const value = await prompt(questions, argv);
    expect(argv).toEqual({
      _: [],
      foo: 1,
      bar: 2,
      baz: 3,
    });
    expect(value).toEqual({
      _: [],
      foo: 1,
      bar: 2,
      baz: 3,
    });
  });

  it('basic example', async () => {
    const questions = [
      {
        name: 'name',
        message: 'project name (e.g., flipr)',
        required: true,
      },
    ];
    const argv = { _: [], cmd: 'init' };
    const value = await prompt(questions, argv);
    console.log(value);
  });

  xit('init example', async () => {
    const questions = [
      {
        _: true,
        name: 'foo',
        message: '',
      },
    ];
    const argv = {
      _: [],
      bar: 2,
    };
    const value = await prompt(questions, argv);
    console.log(value);
  });
});
