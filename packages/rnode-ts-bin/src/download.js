import fs from "fs-extra";
import path from "node:path";
import { simpleGit } from "simple-git";
import ora from "ora";

// 将tempalte从模版中移出
const moveTemplate = (gitpath, localPath, templateName, customName) => {
  if (fs.existsSync(gitpath)) {
    const source = path.join(gitpath, "packages", templateName);
    const target = path.join(localPath, customName);
    fs.moveSync(source, target);
  } else {
    console.error("Git Error, Move Template Failed!");
  }
};

// templateName是给未来多模版选择预留的接口
export const downloadTemplate = async (
  templateGitUrl,
  localPath,
  templateName,
  customName
) => {
  const loading = ora("Download Node-Ts-Package Template...");
  try {
    loading.start("Start download template...");
    await simpleGit().clone(templateGitUrl, localPath);
    moveTemplate(templateGitUrl, localPath, templateName, customName);
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
