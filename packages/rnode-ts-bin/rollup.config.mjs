import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from 'rollup-plugin-typescript2';
import json from "@rollup/plugin-json";

/** @type import("rollup").RollupOptions */
export default [
  {
    input: "./src/index.ts",
    output: {
      file: "./bin/index.js",
      format: "esm",
    },
    plugins: [json(), nodeResolve({preferBuiltins: true, exportConditions: ['node']}),commonjs() , typescript()],
  },
];
