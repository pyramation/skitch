process.env.SKITCH_PATH = __dirname + "/fixtures/";

import {
  listModules,
  latestChange,
  getPlan,
  getExtensionsAndModules,
  getExtensionsAndModulesChanges
} from "../index";

const cleanText = t =>
  t
    .split("\n")
    .map(a => a.trim())
    .filter(a => a)
    .join("\n");

describe("sqitch modules", () => {
  it("should get modules", async () => {
    const modules = await listModules();
    expect(modules).toEqual({
      totp: {
        path: "packages/totp",
        requires: ["plpgsql", "uuid-ossp"],
        version: "0.0.1"
      },
      utils: {
        path: "packages/utils",
        requires: ["plpgsql", "uuid-ossp", "totp"],
        version: "0.0.1"
      }
    });
  });
  it("should get a modules last path", async () => {
    const change = await latestChange("totp");
    expect(change).toEqual("procedures/generate_secret");
  });
  it("should be able to create a plan", async () => {
    const plan = await getPlan("totp");
    expect(cleanText(plan)).toEqual(
      cleanText(`
%syntax-version=1.0.0
%project=totp
%uri=totp
procedures/generate_secret 2017-08-11T08:11:51Z skitch <skitch@5b0c196eeb62> # add procedures/generate_secret`)
    );
  });
  it("should be able to create a plan with cross project requires already in", async () => {
    const plan = await getPlan("utils");
    expect(cleanText(plan)).toEqual(
      cleanText(`
%syntax-version=1.0.0
%project=utils
%uri=utils
procedures/myfunction 2017-08-11T08:11:51Z skitch <skitch@5b0c196eeb62> # add procedures/myfunction
projects/totp/procedures/generate_secret [totp:procedures/generate_secret] 2017-08-11T08:11:51Z skitch <skitch@5b0c196eeb62> # add projects/totp/procedures/generate_secret`)
    );
  });
  it("should be able to create a deps for cross-project requires", async () => {
    const deps = await getExtensionsAndModules("utils");
    expect(deps).toEqual({
      native: ["plpgsql", "uuid-ossp"],
      sqitch: ["totp"]
    });
  });
  it("should be able to create a deps for cross-project requires with changes", async () => {
    const deps = await getExtensionsAndModulesChanges("utils");
    expect(deps).toEqual({
      native: ["plpgsql", "uuid-ossp"],
      sqitch: [{ totp: "procedures/generate_secret" }]
    });
  });
});
