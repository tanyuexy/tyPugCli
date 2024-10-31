const inquirer = require("inquirer");
const fs = require("fs");
const namePrompt = [
  {
    type: "input",
    name: "name",
    message: "请输入项目名称"
  }
];

// 检测名称并创建文件夹
async function createDir(appName) {
  while (1) {
    if (!appName) {
      const res = await inquirer.default.prompt(namePrompt);
      appName = res.name;
    }
    try {
      // 创建文件夹
      fs.mkdirSync(appName);
      break;
    } catch (e) {
      console.log("项目名称与现有文件夹重名，请重新输入！");
      appName = null;
    }
  }
  return appName;
}
module.exports = {
  createDir
};
