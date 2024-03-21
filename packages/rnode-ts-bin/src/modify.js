import fs from 'fs-extra'
import path from 'path'
import handlebars from 'handlebars'

export const modifyPackageJson = (filePath, options) => {
    const packageJsonPath = path.join(filePath, "package.json");
    // 确保存在文件夹存在
    if (fs.existsSync(packageJsonPath)) {
        const content = fs.readFileSync(packageJsonPath).toString();
        const template = handlebars.compile(content);
        const target = template(options);
        fs.writeFileSync(path.join(filePath, "test.json"), target);
        return true;
    } else {
        console.log("Node Package Error: No template folder, maybe because of the web connection error.")
        return false;
    }
}
