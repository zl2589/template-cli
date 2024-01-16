#!/usr/local/bin node

const chalk = require("chalk");
const semver = require("semver");
const requiredVersion = require("../package.json").engines.node;

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

const program = require("commander");
program
  .version(require("../package").version)
  .option("-T, --template", "choose a template[react, ice]")
  .usage("<command> [options]");

program
  .command("create")
  .description("create one new template project")
  .action((name, cmd) => {
    require("../lib/create");
  });

program.parse(process.argv);
