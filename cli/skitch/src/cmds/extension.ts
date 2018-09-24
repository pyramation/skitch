import { writeExtensionsToEnv } from 'skitch-utils';

export default async argv => {
  await writeExtensionsToEnv(argv);
};
