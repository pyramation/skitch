export interface SkitchOptions {
  baseDir: string;
}
import walkup from 'node-walkup';
export class Skitch {
  public projectDir: string;
  constructor(public baseDir: string = process.cwd()) {}
  getconf() {
    walkup(
      'sqitch.conf',
      {
        cwd: this.baseDir,
      },
      (err, matches) => {
        if (err) {
          throw new Error(err);
        }
        if (!matches || !matches.length) {
          // return this.setup();
        }
        this.projectDir = matches[0].dir;
      }
    );
  }
  init() {
    console.log('adding files...');
  }
  registerTemplate(template) {
    console.log(this);
  }
}
