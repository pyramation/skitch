import { sqitchPath as path, packageModule } from 'skitch-utils';
import { prompt } from 'inquirerer';
import { writeFileSync, readFileSync } from 'fs';

const sluggify = text => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

export default async argv => {
  const sqitchPath = await path();
  const pkgPath = `${sqitchPath}/package.json`;
  const pkg = require(pkgPath);

  const questions = [
    {
      name: 'version',
      message: 'version',
      default: pkg.version,
      required: true
    }
  ];

  const { version } = await prompt(questions, argv);

  const extname = sluggify(pkg.name);
  const makePath = `${sqitchPath}/Makefile`;
  const controlPath = `${sqitchPath}/${extname}.control`;
  const sqlFileName = `${extname}--${version}.sql`;

  const Makefile = readFileSync(makePath).toString();
  const control = readFileSync(controlPath).toString();

  // control file
  writeFileSync(
    controlPath,
    control.replace(
      /default_version = '[0-9\.]+'/,
      `default_version = '${version}'`
    )
  );

  // package json
  writeFileSync(
    pkgPath,
    JSON.stringify(Object.assign({}, pkg, { version }), null, 2)
  );

  // makefile
  var regex = new RegExp(extname + '--[0-9.]+.sql');
  writeFileSync(makePath, Makefile.replace(regex, sqlFileName));

  const { sql, diff, tree1, tree2 } = await packageModule();

  if (diff) {
    console.error('DIFF exists! Careful. Check sql/ folder...');
    writeFileSync(`${sqitchPath}/sql/${sqlFileName}.tree.orig.json`, tree1);
    writeFileSync(`${sqitchPath}/sql/${sqlFileName}.tree.parsed.json`, tree2);
  }

  writeFileSync(`${sqitchPath}/sql/${sqlFileName}`, sql);
  console.log(`${sqlFileName} written`);
};
