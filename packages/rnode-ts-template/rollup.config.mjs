import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { dts } from "rollup-plugin-dts";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

/** @type import("rollup").RollupOptions */
export default [
  {
    input: "./src/index.ts",
    // 多个output，即准备两套语言标准的库 => .cjs 和 .mjs
    output: [
      {
        file: "./dist/index.mjs",
        format: "esm",
      },
      {
        file: "./dist/index.cjs",
        format: "cjs",
      },
    ],

    plugins: [
      // 能够打包node_modules的内容
      nodeResolve(),
      // 该插件会默认以仓库跟目录下的tsconfig.json为模版进行ts转义
      // 并且会自动把声明文件deceleration放到对应的bundles-output下
      typescript(),
      // cjs 转化为 esm，rollup只识别EsModule，但这部分没有摇树优化
      commonjs(),
      json(),
    ],
  },
  {
    input: "./dist/index.d.ts",
    output: {
      file: "./dist/monda.d.ts",
      format: "es",
    },
    plugins: [
      // 把通过tsconfig.json生成的声明文件转义为对应的format形式，其实就是把第三方包的声明代码全部显示表示出来
      dts(),
    ],
  },
];
