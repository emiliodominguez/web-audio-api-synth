class LogService {
    baseStyles = "padding: 3px 5px; margin: 4px; border-radius: 4px";

    /**
     * Logs a success message
     * @param {any} message The log message
     */
    success(message) {
        this.log(message, "background-color: #248a04; color: #fff");
    }

    /**
     * Logs a info message
     * @param {any} message The log message
     */
    info(message) {
        this.log(message, "background-color: #116bb5; color: #fff");
    }

    /**
     * Logs an error message
     * @param {any} message The log message
     */
    error(message) {
        this.log(message, "background-color: #f00; color: #fff");
    }

    /**
     * Logs a warning message
     * @param {any} message The log message
     */
    warning(message) {
        this.log(message, "background-color: #ffdc00; color: #111");
    }

    /**
     * Logs a message in the console
     * @param {any} message The log message
     * @param {string} styles The log message styles
     */
    log(message, styles) {
        console.log(`%c${message}`, [this.baseStyles, styles].join(";"));
    }
}

export default new LogService();
