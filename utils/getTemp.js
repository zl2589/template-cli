const https = require("https");
const { repoName, repoOwner } = require("../lib/create");

/**
 * 获取 Gitee 仓库中 templates 目录下的所有模板名称
 * @param {string} path 模板路径
 * @returns {Promise<string[]>} 模板名称数组
 */
function getTemplateList(path = "templates") {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "gitee.com",
      port: 443,
      path: `/api/v5/repos/${repoOwner}/${repoName}/contents/${path}`,
      method: "GET",
      headers: {
        "User-Agent": "template-cli",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const contents = JSON.parse(data);
          if (Array.isArray(contents)) {
            // 过滤出目录类型的项目
            const templates = contents
              .filter((item) => item.type === "dir")
              .map((item) => item.name);
            resolve(templates);
          } else {
            reject(new Error("无法解析模板列表"));
          }
        } catch (error) {
          reject(new Error(`解析模板列表失败: ${error.message}`));
        }
      });
    });

    req.on("error", (error) => {
      reject(new Error(`获取模板列表失败: ${error.message}`));
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error("获取模板列表超时"));
    });

    req.end();
  });
}

// 导出获取模板列表的函数
module.exports = getTemplateList;