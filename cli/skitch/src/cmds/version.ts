export const aliases = ['v'];
const version = require('../../package.json').version;
export default async argv => {
  console.log(version);
};
