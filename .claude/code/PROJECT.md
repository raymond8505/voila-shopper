# Tooling
**package manager:**: always use `yarn` for all package management and script running

# Test Writing
**framework**: vitest with mock service worker
- if a test is failing because the component is throwing an error, never supress the error as a solution. Always prompt me to investigate
- **only** ever edit the given test file when writing tests. If a test is failing because of an issue in the component or project, prompt me to investigate