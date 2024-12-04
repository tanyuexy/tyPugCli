#!/usr/bin/env node
const { Command } = require("commander");
const { createDir } = require("./appName");
const packageJson = require("./package.json");
const download = require("download-git-repo");

const program = new Command();

async function createFromDefaultRepo(appName) {
  try {
    appName = await createDir(appName);
    console.log(`创建目录: ${appName}`);
    console.log("创建中...");

    // 从默认仓库拉取
    download("tanyuexy/tyPugFrame#main", appName, { clone: true }, (err) => {
      if (err) {
        console.error("项目创建失败:", err);
      } else {
        console.log("项目创建完成");
      }
    });
  } catch (err) {
    console.error("创建目录时发生错误:", err);
  }
}

async function createFromXYRepo(appName) {
  try {
    appName = await createDir(appName);
    console.log(`创建目录: ${appName}`);
    console.log("创建中...");

    // 从另一个仓库拉取
    download(
      "xy-tuoren/easy-pug#main", // 用你想拉取的仓库地址替换
      appName,
      { clone: true },
      (err) => {
        if (err) {
          console.error("项目创建失败:", err);
        } else {
          console.log("项目创建完成");
        }
      }
    );
  } catch (err) {
    console.error("创建目录时发生错误:", err);
  }
}

async function main() {
  let appName;

  // 主程序入口：设置版本和创建命令
  program
    .version(packageJson.version)
    .command("create <name>")
    .description("请输入项目名称")
    .action((name) => {
      appName = name;
      createFromDefaultRepo(appName);
    });

  program
    .command("create-xy <name>")
    .description("请输入项目名称")
    .action((name) => {
      appName = name;
      createFromXYRepo(appName);
    });

  program.parse(process.argv);
}

main();
