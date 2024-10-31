#!/usr/bin/env node
const { Command } = require("commander");
const { createDir } = require("./appName");
const packageJson = require("./package.json");
const download = require("download-git-repo");

const program = new Command();

const auth = {
  username: "tanyuexy", // 你的 GitHub 用户名
  password:
    "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" // 使用生成的 Personal Access Token
};

async function main() {
  let appName;
  program
    .version(packageJson.version)
    .command("create <name>")
    .description("请输入项目名称")
    .action((name) => {
      appName = name;
    });
  program.parse(process.argv);
  appName = await createDir(appName);
  console.log("创建中...");
  download(
    "tanyuexy/tyPugFrame#main",
    appName,
    { clone: true, auth },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("创建完成");
      }
    }
  );
}
main();
