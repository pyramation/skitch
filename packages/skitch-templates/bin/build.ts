const fs = require('fs');
const path = require('path');
const glob = require('glob').sync;

const schemaDir = path.resolve(`${__dirname}/../schemas`);

const paths = glob(`${schemaDir}/**.ts`).map(file => {
  const [, name] = file.match(/\/([a-zA-Z]+)\.ts/);
  return {
    name,
    path: file.replace(schemaDir, './schemas').replace(/\.ts$/, ''),
  };
});

const imports = paths
  .map(f => {
    return [`import * as ${f.name} from '${f.path}';`];
  })
  .join('\n');

const out = `
    ${imports}
    export default {
      ${paths.map(a => a.name).join(',')}
    }
  `;

fs.writeFileSync(`${__dirname}/../index.ts`, out);
