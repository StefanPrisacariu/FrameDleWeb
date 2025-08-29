module.exports = {
    root: true,
    ignorePatterns: ['clients', 'styles', 'src/tealPlayer'],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            processor: '@graphql-eslint/graphql',
        },
        {
            files: ['*.graphql'],
            plugins: ['@graphql-eslint'],
            parser: '@graphql-eslint/eslint-plugin',
            extends: 'plugin:@graphql-eslint/operations-recommended',
            rules: {
                '@graphql-eslint/require-selections': [
                    'error',
                    {
                        fieldName: ['id', 'contributorId'],
                    },
                ],
            },
        },
        {
            files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.mjs', '*.cjs'],
            env: {
                node: true,
                browser: true,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 'latest',
            },
            reportUnusedDisableDirectives: false,
            parser: '@typescript-eslint/parser',
            extends: [
                'standard',
                'prettier',
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/stylistic',
                'next/core-web-vitals',
                'plugin:react/recommended',
                'plugin:import/recommended',
                'plugin:import/typescript',
                'plugin:react/jsx-runtime',
                'plugin:jsx-a11y/recommended',
                'plugin:react-hooks/recommended',
                'plugin:@tanstack/eslint-plugin-query/recommended',
                'plugin:@eslint-community/eslint-comments/recommended',
            ],
            plugins: ['unicorn', 'eslint-plugin-react-compiler'],
            settings: {
                react: {
                    version: 'detect',
                },
                linkComponents: ['Link'],
                'import/resolver': {
                    typescript: {
                        alwaysTryTypes: true,
                        project: './tsconfig.json',
                    },
                },
                'import/parsers': {
                    '@typescript-eslint/parser': ['.ts', '.tsx'],
                },
            },
            rules: {
                'no-lonely-if': 'error',
                'no-warning-comments': 'off',
                'no-implicit-coercion': [
                    'error',
                    {
                        allow: ['!!'],
                    },
                ],
                'array-callback-return': [
                    'error',
                    {
                        allowVoid: true,
                        checkForEach: true,
                        allowImplicit: true,
                    },
                ],

                'unicorn/prefer-prototype-methods': 'error',
                'unicorn/prefer-default-parameters': 'error',
                'unicorn/prefer-optional-catch-binding': 'error',
                'unicorn/prefer-native-coercion-functions': 'error',
                'unicorn/prefer-logical-operator-over-ternary': 'error',

                'unicorn/escape-case': 'error',
                'unicorn/no-lonely-if': 'error',
                'unicorn/error-message': 'error',
                'unicorn/no-useless-spread': 'error',
                'unicorn/no-zero-fractions': 'error',
                'unicorn/number-literal-case': 'error',
                'unicorn/no-useless-undefined': 'error',
                'unicorn/no-unnecessary-await': 'error',
                'unicorn/expiring-todo-comments': [
                    'error',
                    {
                        allowWarningComments: false,
                    },
                ],
                'unicorn/no-length-as-slice-end': 'error',
                'unicorn/consistent-function-scoping': 'error',
                'unicorn/no-await-in-promise-methods': 'error',
                'unicorn/no-useless-fallback-in-spread': 'error',
                'unicorn/consistent-empty-array-spread': 'error',
                'unicorn/no-invalid-remove-event-listener': 'error',
                'unicorn/no-useless-promise-resolve-reject': 'error',
                'unicorn/no-single-promise-in-promise-methods': 'error',

                // "react-hooks/rules-of-hooks" & "react/no-unstable-nested-components" are disabled because we use the React Compiler -> https://github.com/reactwg/react-compiler/discussions/18

                'react-hooks/rules-of-hooks': 'error',
                'react-hooks/exhaustive-deps': 'error',

                'react-compiler/react-compiler': 'error',

                'react/button-has-type': 'error',
                'react/jsx-boolean-value': 'error',
                'react/self-closing-comp': 'error',
                'react/jsx-wrap-multilines': 'error',
                'react/no-did-mount-set-state': 'error',
                'react/jsx-no-useless-fragment': 'error',
                'react/no-did-update-set-state': 'error',
                'react/no-unstable-nested-components': 'off',
                'react/no-unknown-property': [
                    'error',
                    {
                        ignore: ['jsx', 'global'],
                    },
                ],
                'react/jsx-curly-brace-presence': [
                    'error',
                    {
                        props: 'never',
                        children: 'never',
                        propElementValues: 'always',
                    },
                ],

                'no-shadow': 'off',
                '@typescript-eslint/no-shadow': 'error',

                camelcase: 'off',
                '@typescript-eslint/naming-convention': [
                    'error',
                    { format: null, selector: 'typeMethod' },
                    { format: null, selector: 'typeProperty' },
                    { format: null, selector: 'objectLiteralMethod' },
                    { format: null, selector: 'objectLiteralProperty' },
                    {
                        selector: 'default',
                        leadingUnderscore: 'allowSingleOrDouble',
                        trailingUnderscore: 'allowSingleOrDouble',
                        format: ['snake_case', 'camelCase', 'PascalCase', 'UPPER_CASE'],
                    },
                ],

                '@eslint-community/eslint-comments/disable-enable-pair': 'off',
                '@eslint-community/eslint-comments/no-unused-disable': 'error',

                'no-restricted-imports': [
                    'error',
                    {
                        paths: [
                            {
                                name: 'react',
                                importNames: ['default'],
                                message:
                                    "Do not import React directly, use the import deconstruction syntax instead. import { ... } from 'react' or import type { ... } from 'react'",
                            },
                        ],
                    },
                ],

                yoda: ['error', 'always', { onlyEquality: true }],

                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        args: 'all',
                        caughtErrors: 'all',
                        argsIgnorePattern: '^_',
                        varsIgnorePattern: '^_',
                        ignoreRestSiblings: true,
                        caughtErrorsIgnorePattern: '^_',
                        destructuredArrayIgnorePattern: '^_',
                    },
                ],

                'import/order': [
                    'error',
                    {
                        distinctGroup: true,
                        'newlines-between': 'always',
                        warnOnUnassignedImports: true,
                        pathGroupsExcludedImportTypes: ['type'],
                        pathGroups: [
                            { group: 'unknown', position: 'after', pattern: '@/app/**' },
                            { group: 'unknown', position: 'after', pattern: '@/fonts/**' },
                            { group: 'unknown', position: 'after', pattern: '@/images/**' },
                            { group: 'unknown', position: 'after', pattern: '@/styles/**' },
                            { group: 'unknown', position: 'after', pattern: '@/clients/**' },
                        ],
                        alphabetize: {
                            order: 'asc',
                            orderImportKind: 'asc',
                            caseInsensitive: true,
                        },
                        groups: [
                            'type',
                            'builtin',
                            'external',
                            'internal',
                            'unknown',
                            'parent',
                            'sibling',
                            'index',
                            'object',
                        ],
                    },
                ],
            },
        },
        {
            plugins: ['sort-exports'],
            files: ['**/index.js', '**/index.ts'],
            rules: {
                'sort-exports/sort-exports': [
                    'error',
                    { sortDir: 'asc', ignoreCase: true, disableAutofixer: false, sortExportKindFirst: 'value' },
                ],
            },
        },
        {
            files: ['**/*.ts', '**/*.tsx'],
            rules: {
                'no-return-await': 'off',
                '@typescript-eslint/return-await': ['error', 'always'],
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': [
                    'error',
                    {
                        classes: false,
                        functions: false,
                        variables: false,

                        enums: false,
                        typedefs: false,
                        ignoreTypeReferences: true,
                    },
                ],
                'no-void': [
                    'error',
                    {
                        allowAsStatement: true,
                    },
                ],
                '@typescript-eslint/no-this-alias': [
                    'error',
                    {
                        allowedNames: ['self'],
                        allowDestructuring: true,
                    },
                ],
                '@typescript-eslint/no-non-null-assertion': 'off',
                '@typescript-eslint/non-nullable-type-assertion-style': 'off',
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
            extends: [
                'plugin:@typescript-eslint/strict-type-checked',
                'plugin:@typescript-eslint/stylistic-type-checked',
            ],
        },
    ],
};
