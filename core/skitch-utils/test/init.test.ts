import { init } from '../src/init';
import { sync as mkdirp } from 'mkdirp';
import { sync as glob } from 'glob';
import { sync as rimraf } from 'rimraf';
import { writeFileSync } from 'fs';

const TMPDIR = process.env.TMPDIR;
const rnd = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

describe('deps', () => {
  let dir, projDir;
  beforeEach(async () => {
    dir = TMPDIR + '/' + rnd();
    projDir = dir + '/myproject';
    mkdirp(projDir);
    process.chdir(dir);
    await initSkitch();
    process.chdir(projDir);
  });
  afterEach(() => {
    rimraf(dir);
  });
  describe('skitch path', () => {
    it('skitch init', async () => {
      process.chdir(dir);

      const files = glob('**');
      expect(files).toEqual(["myproject", "skitch.json"]);
      const hidden = glob('.*');
      expect(hidden).toEqual(['.travis.yml']);
    });
    it('sqitch init', async () => {
      await init({
        name: 'myproject',
        description: 'my amazing project',
        author: 'dan@example.com',
        extensions: ['plpgsql', 'citext']
      });

      const files = glob('**');
      expect(files).toEqual([
        'deploy',
        'docker-compose.yml',
        'Makefile',
        'myproject.control',
        'package.json',
        'revert',
        'sqitch.conf',
        'sqitch.plan',
        'sql',
        'test',
        'test/utils',
        'test/utils/index.js',
        'verify'
      ]);
      const hidden = glob('.*');
      expect(hidden).toEqual(['.babelrc', '.env', '.travis.yml']);
    });
  });
});
