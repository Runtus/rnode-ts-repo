import type { Config } from 'jest';

const config: Config = {
    // preset不能省略，告诉jest要用ts-jest来测试
    preset: "ts-jest",
    testEnvironment: 'node',
    verbose: true,
    transformIgnorePatterns: [
        "node_modules/(?!handlebars|fs-extra)"
    ],
};

export default config;