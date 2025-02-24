// eslint.config.js
import eslint from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
// import typescriptEslint from '@typescript-eslint/eslint-plugin';
// import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import vueEslintParser from 'vue-eslint-parser';
import {FlatCompat} from '@eslint/eslintrc';
import path from 'path';
import {fileURLToPath} from 'url';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  // recommendedConfig: 'eslint:recommended',
});

export default [
  ...compat.extends(
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ),
  {
    ignores: ['*.d.ts', '**/coverage', '**/dist', 'node_modules',
      'src/static/mitf/assets/mj.js', 'docker-compose', 'kubernetes', 'service/public'
    ]
  },
  {
    files: ['src/**/*.{ts,tsx,js,jsx,vue}'],
    plugins: {
      '@typescript-eslint': tseslint,
      'vue': eslintPluginVue
    },
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
        // ecmaFeatures: {
        //   jsx: true
        // }
      },
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    rules: {
      // 1. 强制 2 缩进
      indent: ['error', 4],
      // 2. 强制使用单引号
      quotes: ['error', 'single'],
      // 3. 强制分号
      semi: ['error', 'always'],
      // 4. 强制使用大括号（如 if 语句）
      curly: ['error', 'all'],
      // 5. 大括号不换行
      'brace-style': ['error', '1tbs'],
    }
  }
];