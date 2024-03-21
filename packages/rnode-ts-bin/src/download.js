import fs from "fs-extra";
import path from "node:path";
import { simpleGit } from "simple-git";
import ora from "ora";

// 将tempalte从模版中移出
const moveTemplate = (localPath, templateName, tempPath) => {
  if (fs.existsSync(tempPath)) {
    // 获取template
    const source = path.join(tempPath, "packages", templateName);
    const target = localPath;
    // 将模版抽离出来并做覆盖
    fs.moveSync(source, target);
    console.log("Move Success");
  } else {
    console.error("Git Error, Move Template Failed!");
  }
};

// templateName是给未来多模版选择预留的接口
export const downloadTemplate = async (
  templateGitUrl,
  root, // 本地拷贝的地址
  templateName,
  custonName
) => {
  const loading = ora("Download Node-Ts-Package Template...");
  try {
    loading.start("Start download template...");
    const localPath = path.join(root, custonName);
    // tempPath是存放github仓库的临时路径
    const tempPath = path.join(root, "aa114514");
    await simpleGit().clone(templateGitUrl, tempPath);
    moveTemplate(localPath, templateName, tempPath);
    // 删除本地临时仓库
    fs.removeSync(tempPath);
    loading.stop();
    loading.succeed("Download Success~");
    return true;
  } catch (err) {
    loading.stop();
    console.error("Clone Error", err);
    loading.fail("Download Failed!");
    return false;
  }
};
