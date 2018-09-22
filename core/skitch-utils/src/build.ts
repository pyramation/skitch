import { listModules, getExtensionsAndModulesChanges } from './modules';
import { dirname, basename, resolve } from 'path';
import { skitchPath as sPath } from './paths';
import { readFileSync } from 'fs';

export const build = async argv => {
  const skitchPath = await sPath();
  const modules = await listModules();
  const modulesWithChanges = await getExtensionsAndModulesChanges('utils');

  const extensions = Object.keys(modules).map(key=>{
    const mod = modules[key];
    return {
      ...mod,
      sql: readFileSync(
        resolve(`${skitchPath}/${mod.path}/sql/${key}--${mod.version}.sql`)
      )
        .toString()
        .split('\n')
        .filter((l, i) => i !== 0)
        .join('\n')
    }
  });

  return extensions;
};
