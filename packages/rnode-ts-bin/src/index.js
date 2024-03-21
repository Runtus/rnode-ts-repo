#!/usr/bin/env node
// 上面那个命令一定要加，否则bin不知道具体用哪个命令执行
import { Command } from "commander";
import inquirer from "inquirer";
import path from 'node:path'
import ora from 'ora'
import { downloadTemplate } from "./download.js";
import pjson from "../package.json";
import { modifyPackageJson } from "./modify.js";


const program = new Command();

const { name, description, version } = pjson;

const InitPrompts = [
  {
    name: "name",
    message: "Please input project name(default: node-ts-packages-cli)",
    default: "node-ts-packages-cli",
  },
  {
    name: "description",
    message: "Please input description",
    default: "",
  },
  {
    name: "author",
    message: "Please input author",
    default: "Runtus",
  },
];



program.name(name).description(description).version(version);

const cli = ora();

program
  .command("init")
  .description("init a node program")
  .action(async () => {
    const options = await inquirer.prompt(InitPrompts);
    const root = process.cwd(), customName = options.name;
    // TODO 未来的模版有多个，可以供给用户选择
    const template = "rnode-ts-template";
    const res = await downloadTemplate(
      "https://github.com/Runtus/rnode-ts-repo.git",
      root,
      template,
      customName
    );
    const isModifySuccess = modifyPackageJson(path.join(root, customName), options);
    if (res && isModifySuccess) {
      cli.succeed("Init Template Success!")
    } else {
      cli.fail("Init Template Failed!");
    }
  });

program.parse();
