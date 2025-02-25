import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
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

const eslintRules = {
    // 1. 强制 4 缩进
    indent: ['error', 4],
    // 2. 强制使用单引号
    quotes: ['error', 'single'],
    // 3. 强制分号
    semi: ['error', 'always'],
    // 4. 强制使用大括号（如 if 语句）
    curly: ['error', 'all'],
    // 5. 大括号不换行
    'brace-style': ['error', '1tbs', {'allowSingleLine': true}],

    // 逗号前后空格规则
    'comma-spacing': ['error', {'before': false, 'after': true}],

    // 数组和对象的空格规则
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],

    // 运算符两侧空格
    'space-infix-ops': 'error',

    // 关键字周围空格（if, for 等）
    'keyword-spacing': ['error', {
        'before': true,
        'after': true
    }],

    // 注释空格规则
    'spaced-comment': ['error', 'always', {
        'line': {
            'markers': ['/'],
            'exceptions': ['-', '+']
        },
        'block': {
            'markers': ['!'],
            'exceptions': ['*'],
            'balanced': true
        }
    }],

    // 控制语句后的空格
    'space-before-blocks': ['error', 'always'],

    // 函数括号前的空格
    'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
    }],

    // 其他一些规则
    'vue/multi-word-component-names': 'off', // 关闭组件名必须多单词的限制（错误太多，不想改了）
    'vue/no-v-html': 'off', // 太多了

    // src/components/common/Setting/About.vue 有一个 vue/no-parsing-error// TypeScript 相关规则

    // rules by ai
    // '@typescript-eslint/explicit-function-return-type': 'warn',
    // '@typescript-eslint/no-explicit-any': 'warn',
    // '@typescript-eslint/no-unused-vars': 'error',
    // '@typescript-eslint/type-annotation-spacing': 'error',
    // '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    // '@typescript-eslint/prefer-nullish-coalescing': 'error',
    // '@typescript-eslint/no-floating-promises': 'error',
    // '@typescript-eslint/await-thenable': 'error'
};

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
        files: ['src/**/*.{ts,tsx,js,jsx,vue}', 'eslint.config.js'],
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
            ...eslintRules
        }
    },
    {
        files: ['service/**/*.{ts,js}'],
        plugins: {
            '@typescript-eslint': tseslint
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './service/tsconfig.json'
            },
            globals: {
                ...globals.node,
                ...globals.es2021
            }
        },
        rules: {
            ...eslintRules
        }
    }
];