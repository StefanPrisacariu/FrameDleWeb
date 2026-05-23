import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),

    {
        plugins: {
            import: importPlugin,
        },

        settings: {
            "import/resolver": {
                typescript: true,
            },
        },

        rules: {
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        ["parent", "sibling", "index"],
                        "object",
                        "type",
                    ],

                    pathGroups: [
                        {
                            pattern: "react",
                            group: "external",
                            position: "before",
                        },

                        {
                            pattern: "next/**",
                            group: "external",
                            position: "after",
                        },

                        {
                            pattern: "@/app/components/**",
                            group: "internal",
                            position: "before",
                        },

                        {
                            pattern: "@/app/context/**",
                            group: "internal",
                            position: "before",
                        },

                        {
                            pattern: "@/app/hooks/**",
                            group: "internal",
                            position: "before",
                        },

                        {
                            pattern: "@/app/helpers/**",
                            group: "internal",
                            position: "before",
                        },

                        {
                            pattern: "@/app/lib/**",
                            group: "internal",
                            position: "before",
                        },

                        {
                            pattern: "@/styles/**",
                            group: "internal",
                            position: "after",
                        },

                        {
                            pattern: "@/assets/**",
                            group: "internal",
                            position: "after",
                        },
                    ],

                    pathGroupsExcludedImportTypes: ["react"],

                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },

                    "newlines-between": "always",
                },
            ],
        },
    },
];

export default eslintConfig;
