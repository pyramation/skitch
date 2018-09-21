import generate from '../src/generate';

const table = ({ schema, table }) => [
  'schemas',
  schema,
  'tables',
  table,
  'table'
];

const schema = ({ schema, table }) => [
  'schemas',
  schema
];

const requires = (res) => [
  schema(res),
  table(res),
];

const change = ({
  schema,
  table,
  column,
}) => [
  'schemas',
  schema,
  'tables',
  table,
  'alterations',
  `alter_table_add_${column}`
];

describe('generate', () => {
  it('works', async () => {
    const templates = {
      mytemplate: {
        requires,
        change
      }
    };
    const template = 'mytemplate';
    const templatePath = '/some/path/to/my/template';
    const payload = {
      schema: 'myschema',
      table: 'mytable',
      column: 'mycolumn'
    }
    const cmd = await generate({templates, template, templatePath, payload});
    expect(cmd).toEqual(`sqitch add schemas/myschema/tables/mytable/alterations/alter_table_add_mycolumn --template mytemplate --template-directory /some/path/to/my/template -n 'add schemas/myschema/tables/mytable/alterations/alter_table_add_mycolumn' --set schema="myschema" --set table="mytable" --set column="mycolumn" -r schemas/myschema -r schemas/myschema/tables/mytable/table`);
  });
});
