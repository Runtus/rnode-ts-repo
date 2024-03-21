import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

/** @type import("rollup").RollupOptions */
export default [
  {
    input: "./src/index.js",
    output: {
      file: "./bin/index.js",
      format: "esm",
    },
    plugins: [json(), commonjs() ,nodeResolve({preferBuiltins: true, exportConditions: ['node']})],
  },
];
