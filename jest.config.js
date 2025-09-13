module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}", // Укажите, какие файлы должны учитываться
        "!src/index.js", // Исключите файлы, которые не должны учитываться
    ],
    coverageReporters: ["json", "lcov", "text", "clover"], // Форматы отчетов о покрытии
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};