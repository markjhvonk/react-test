// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './pages',
});

const customJestConfig = {
    moduleDirectories: ['node_modules', './pages', './components'],
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ["./jest.setup.js"],
}

module.exports = createJestConfig(customJestConfig);