#!/usr/local/bin node

const chalk = require("chalk");
const semver = require("semver");
const requiredVersion = require("../package.json").engines.node;

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
    choices: ["nest-demo", "vite-react", "vue2", "vue3", "webpack-react"],
    default: "react",
  },
];

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

let dir = "vite-react";
let target = "demo";

const inquirer = require("inquirer");
inquirer
  .prompt(questions)
  .then((answers) => {
    const { template, name } = answers;
    dir = template;
    target = name;

    require("../lib/create")(dir, target);
    chalk.green("Created successfully!");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
