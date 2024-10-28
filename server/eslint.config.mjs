import pluginJs from "@eslint/js";
import * as importPlugin from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    settings: {
      "import/resolver": {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: true,
        node: true,
      },
    },
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      indent: ["error", 2, { SwitchCase: 1, VariableDeclarator: "first", offsetTernaryExpressions: true }],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-unused-vars": "error",
      "import/no-useless-path-segments": "error",
      "import/exports-last": "error",
      "import/order": [
        "error",
        {
          // How groups are defined, and the order to respect.
          // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#groups-array
          groups: ["builtin", "external", "internal", "unknown", "parent", "sibling", "index", "object", "type"],
          // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#pathgroups-array-of-objects
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal", // 在規定的 group 中選其一，builtin、external、internal、unknown、parent、sibling、index、object、type
              position: "after", // after、before
            },
          ],
          // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#pathgroupsexcludedimporttypes-array
          pathGroupsExcludedImportTypes: ["type"], // 將 type 類型的 import 排除在 pathGroups 之外
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended,
];
