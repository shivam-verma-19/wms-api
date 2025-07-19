// A simple centralized logger utility
// You can enhance this later with Winston or pino

const info = (message, ...optional) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, ...optional);
};

const error = (message, ...optional) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...optional);
};

const warn = (message, ...optional) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, ...optional);
};

module.exports = {
    info,
    error,
    warn
};
