import { ChangePathArray } from 'skitch-types';

export const generate = async ({templates, template, templatePath, payload}) => {

  var params: Array<{ key: string; value: any }> = Object.keys(payload).reduce(
    (m: Array<{ key: string; value: any }>, v: string) => {
      if (payload[v] instanceof Array) {
        payload[v].forEach((value: string) => {
          m.push({
            key: v,
            value: value,
          });
        });
      } else {
        if (typeof payload[v] === 'boolean' && !payload[v]) {
          return m;
        }
        m.push({
          key: v,
          value: payload[v],
        });
      }
      return m;
    },
    []
  );
  var vars = params.map(obj => `--set ${obj.key}="${obj.value}"`).join(' ');

  let change = templates[template].change(payload);

  var reqd: ChangePathArray = [];

  let reqs: Array<ChangePathArray> = templates[template]
    .requires(payload)
    .filter((req: ChangePathArray) => {
      if (reqd.includes(req.join('/'))) {
        return false;
      }
      reqd.push(req.join('/'));
      return true;
    })
    .map((req: ChangePathArray) => {
      return `-r ${req.join('/')}`;
    })
    .join(' ');

  change = change.join('/');
  if (!change || change === '' || change === '/') {
    throw new Error('no change found!');
  }

  const cmd = [
    'sqitch',
    'add',
    change,
    '--template',
    template,
    '--template-directory',
    templatePath,
    '-n',
    `'add ${change}'`,
    vars,
    reqs,
  ].join(' ');

  return cmd;
};
