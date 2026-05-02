function loggerUtil(str) {
    const date = new Date().toLocaleString();
    return `[${date}] ${str}\n`;
}

module.exports = loggerUtil;