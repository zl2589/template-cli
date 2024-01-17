const fs = require("fs");
const path = require("path");
const copyFiles = require("copyfiles");

module.exports = function (dir, target) {
  fs.mkdirSync(target);

  const source = path.resolve(__dirname, `../templates/${dir}/**/*`);

  copyFiles(
    [source, target],
    { all: true, up: source.split(path.sep).length - 2 },
    (e) => {
      if (e) {
        process.exit(1);
      }
      let packagePath = path.resolve(target, "package.json");
      let content = fs.readFileSync(packagePath);

      let info = JSON.parse(content);
      info.name = target;
      fs.writeFileSync(packagePath, JSON.stringify(info, null, 4));
    }
  );
};
