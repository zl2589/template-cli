#!/usr/bin/env node

const chalk = require("chalk");
const semver = require("semver");
const { Command } = require("commander");
const requiredVersion = require("../package.json").engines.node;
const { version: packageVersion } = require("../package.json");
const getTemplateList = require("../utils/getTemp");
const { create } = require("../lib/create");

function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        "You are using Node " +
          process.version +
          ", but this version of " +
          id +
          " requires Node " +
          wanted +
          ".\nPlease upgrade your Node version."
      )
    );
    process.exit(1);
  }
}

checkNodeVersion(requiredVersion, "template-cli");

const program = new Command();

program
  .version(packageVersion, "-v, --version", "显示当前版本号")
  .name("template-cli") // 命令名称（与 bin 字段一致）
  .description("一个拉取项目模板的 CLI 工具");

program
  .command("create") // 定义一个子命令（如 template-cli create）
  .description("创建新项目")
  .action(async () => {
    let dir = "vite-react";
    let target = "demo";
    try {
      // 动态获取模板列表
      console.log(chalk.blue("正在获取可用模板..."));
      const templates = await getTemplateList();
      
      if (templates.length === 0) {
        console.log(chalk.red("未找到任何可用的模板"));
        process.exit(1);
      }

      const questions = [
        {
          type: "input",
          message: "Project name:",
          name: "name",
          default: "demo",
        },
        {
          type: "list",
          name: "template",
          message: "Select a template",
          choices: templates,
          default: templates[0],
        },
      ];

      const inquirer = require("inquirer");
      const answers = await inquirer.prompt(questions);
      const { template, name } = answers;
      dir = template;
      target = name;
      
      // 调用下载模板逻辑
      await create(dir, target);
      console.log(chalk.green("Created successfully!"));
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

// 解析命令行参数（必须放在最后）
program.parse(process.argv);