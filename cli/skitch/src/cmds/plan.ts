import { prompt } from 'inquirerer';
import { sqitchPath, makePlan } from 'skitch-utils';
import { basename } from 'path';
const fs = require('fs');

const questions = [
  {
    name: 'name',
    message: 'project name (e.g., flipr)',
    default: basename(process.cwd()),
    required: true
  }
];

export default async argv => {
  const PKGDIR = await sqitchPath();

  let name = argv.name;
  if (!name) {
    try {
      name = JSON.parse(fs.readFileSync(`${PKGDIR}/package.json`).toString())
        .name;
    } catch (e) {}
    if (!name) {
      ({ name } = await prompt(questions, argv));
    }
  }

  const settings = {
    name
  };

  if (argv.projects) {
    settings.projects = true;
  }

  const plan = await makePlan(PKGDIR, settings);

  fs.writeFileSync(`${PKGDIR}/sqitch.plan`, plan);
};
