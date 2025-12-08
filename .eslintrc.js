export default {
    // ... existing config ...
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended', // Add this
        'plugin:import/typescript', // Add this for TypeScript-specific import rules
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks',
        'import', // Add this
    ],
    rules: {
        // ... existing rules ...

        // Enforce consistent use of type imports
        // This rule requires using `import type` for type-only imports.
        'import/consistent-type-specifier': ['error', 'prefer-top-level'],

        // Disallow combining type and non-type imports in a single import statement
        // This rule is often used in conjunction with 'import/consistent-type-specifier'
        // It helps to ensure that types are always imported separately.
        'import/no-duplicates': ['error', { 'prefer-inline': false, 'considerSourceFile': true }],
    },
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/jest`
                project: '**/tsconfig.json', // Path to your tsconfig.json relative to the .eslintrc.cjs file
            },
        },
        react: {
            version: 'detect', // Automatically detect the React version
        },
    },
    // ... rest of your config ...
};