import walkup from 'node-walkup';
export const path = (cwd: string = process.cwd()) => {
  let obj;
  return new Promise<string[]>((resolve, reject) => {
    if (obj) {
      return resolve(obj);
    }
    walkup(
      'sqitch.conf',
      {
        cwd: process.cwd(),
      },
      (err, matches) => {
        if (err) {
          return reject(err);
        }
        if (!matches || !matches.length) {
          return reject('cannot find sqitch.conf');
        }
        obj = matches[0].dir;
        resolve(matches[0].dir);
      }
    );
  });
};

export default path;
