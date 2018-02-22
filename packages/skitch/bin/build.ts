const fs = require('fs');
const path = require('path');
const glob = require('glob').sync;

const srcDir = path.resolve(`${__dirname}/../src/cmds`);

const paths = glob(`${srcDir}/**.ts`).map(file => {
  const [, name] = file.match(/\/([a-zA-Z]+)\.ts/);
  return {
    name,
    path: file.replace(srcDir, './cmds').replace(/\.ts$/, ''),
  };
});

const imports = paths
  .map(f => {
    return [`import ${f.name} from '${f.path}';`];
  })
  .join('\n');

const out = `
    ${imports}
    export default {
      ${paths.map(a => a.name).join(',')}
    }
  `;

fs.writeFileSync(`${__dirname}/../src/index.ts`, out);
