const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const copyFiles = require("copyfiles");
const os = require("os");

const repoOwner = "nanchen95";
const repoName = "templates-repo";

function gitClone(repoUrl, projectTempDir) {
  return new Promise((resolve, reject) => {
    // exec 异步执行
    exec(`git clone --depth 1 ${repoUrl} ${projectTempDir}`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * 更新 package.json 中的 name 字段
 * @param {string} templatePath 模板路径
 * @param {string} target 新项目名称
 */
function updatePackageName(templatePath, target) {
  const packagePath = path.resolve(templatePath, "package.json");
  const content = fs.readFileSync(packagePath);
  const info = JSON.parse(content);
  info.name = target;
  fs.writeFileSync(packagePath, JSON.stringify(info, null, 4));
}

/**
 * 复制模板文件到目标目录
 * @param {string} source 源路径
 * @param {string} finalDir 目标路径
 */
function copyTemplate(source, finalDir) {
  return new Promise((resolve, reject) => {
    copyFiles(
      [source, finalDir],
      { all: true, up: source.split(path.sep).length - 2 },
      (e) => {
        if (e) {
          reject(new Error(`复制模板失败: ${e.message}`));
        } else {
          resolve();
        }
      }
    );
  });
}

/**
 * 清理临时目录
 * @param {string} projectTempDir 临时目录路径
 */
function cleanUp(projectTempDir) {
  return new Promise((resolve, reject) => {
    fs.rm(projectTempDir, { recursive: true, force: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("temp dir cleaned");
        resolve();
      }
    });
  });
}

/**
 *
 * @param {string} dir 模板名称
 * @param {string} target 项目路径
 */
module.exports = {
  // 模板仓库地址
  repoOwner,
  repoName,
  create: async function (dir, target) {
    // fs.mkdirSync(target);

    const repoUrl = `https://gitee.com/${repoOwner}/${repoName}.git`;

    const tempDir = os.tmpdir();
    const projectTempDir = path.join(tempDir, ".cli-temp");
    const finalDir = path.join(process.cwd(), target);

    await gitClone(repoUrl, projectTempDir);

    const templatePath = path.join(projectTempDir, "templates", dir);
    if (!fs.existsSync(templatePath)) {
      throw new Error(`模板 ${dir} 不存在于仓库中`);
    }

    try {
      updatePackageName(templatePath, target);
      // 复制
      const source = path.resolve(projectTempDir, `templates/${dir}/**/*`);
      await copyTemplate(source, finalDir);
      console.log(`download success，path：${finalDir}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    } finally {
      await cleanUp(projectTempDir);
    }
  },
};
