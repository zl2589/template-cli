const fs = require("fs");
const path = require("path");
const copyFiles = require("copyfiles");

const destination = process.argv[3];
const source = path.resolve(__dirname, "../template/**/*");

let config = { all: true, up: source.split(path.sep).length - 2 };
fs.mkdirSync(destination);

copyFiles([source, destination], config, (e) => {
  if (e) {
    process.exit(1);
  }
  let packagePath = path.resolve(destination, "package.json");
  let content = fs.readFileSync(packagePath);

  let info = JSON.parse(content);
  info.name = destination;
  fs.writeFileSync(packagePath, JSON.stringify(info, null, 4));
  let indexPath = path.resolve(destination, "src/index.js");
  content = fs.readFileSync(indexPath, "utf8");
  content = content.replace("${name}", destination);
  fs.writeFileSync(indexPath, content);
});
