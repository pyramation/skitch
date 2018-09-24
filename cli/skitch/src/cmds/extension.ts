import { getAvailableExtensions, getInstalledExtensions, writeExtensionsToEnv } from 'skitch-utils';
import { prompt } from 'inquirerer';

export default async argv => {
  if (argv.add) {
    const choices = await getAvailableExtensions(argv);
    const installed = await getInstalledExtensions(argv);

    const questions = [
      {
        name: 'extensions',
        message: 'which extensions?',
        choices,
        type: 'checkbox',
        default: installed,
        required: true
      }
    ];

    const { extensions } = await prompt(questions, argv);

    console.log(extensions);
    return;

  }
  await writeExtensionsToEnv(argv);
};
