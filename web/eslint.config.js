import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  skipFormatting,

  {
    files: ['**/*.{ts,mts,tsx,vue}'],
    extends: [
      'plugin:import/recommended',
      'plugin:import/typescript',
      'prettier',
      'plugin:import/recommended',
    ],
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      'vue/html-closing-bracket-spacing': 'warn',
      'vue/html-self-closing': 'warn',
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 'first',
          offsetTernaryExpressions: true,
        },
      ],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'double'],
      semi: ['error', 'always'],
      'no-unused-vars': 'error',
      'import/no-useless-path-segments': 'error',
      'import/exports-last': 'error',
      'import/order': [
        'error',
        {
          // How groups are defined, and the order to respect.
          // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#groups-array
          groups: [
            'builtin',
            'external',
            'internal',
            'unknown',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#pathgroups-array-of-objects
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal', // 在規定的 group 中選其一，builtin、external、internal、unknown、parent、sibling、index、object、type
              position: 'after', // after、before
            },
          ],
          // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#pathgroupsexcludedimporttypes-array
          pathGroupsExcludedImportTypes: ['type'], // 將 type 類型的 import 排除在 pathGroups 之外
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]
