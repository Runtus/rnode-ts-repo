// 版本检测
import axios from 'axios';
import { describe, expect, it, test } from 'vitest';
import fs from 'fs-extra';
import * as cheerio from 'cheerio';
import path from 'path'

const targerUrl = "https://www.npmjs.com/package/rnode-ts"

describe("version check", async () => {
    const targetWeb = (await axios.get<string>(targerUrl)).data;
    const localVersion = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8")).version;
    const DOM = cheerio.load(targetWeb);
    const versionText = DOM("h1").next().text();

    const version = versionText?.split("•")[0].replace(/\s/g, '');

    // 保证远程版本和当前版本不同，否则CI会运行失败
    it("version check", () => {expect(version).not.toBe(localVersion)})
})

