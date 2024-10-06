import { createLogger, format, transports } from 'winston';
import "winston-daily-rotate-file";

/**
 * Logger class to log messages to the console and to a file
 * @class Logger
 * @method info - Log an info message
 * @method error - Log an error message
 * @method warn - Log a warning message
 * @method http - Log an http message
 * @method verbose - Log a verbose message
 * @method debug - Log a debug message
 * @example
 *  import Logger from './utils/Logger';
 *  Logger.info('This is an info message');
 */

export default class Logger {
    // Create a new logger
    private static createLogger = (levelName: string, color: string) => {
        return createLogger({
            levels: {
                // Add custom levels
                [levelName]: 0,
            },
            level: levelName,
            format: format.combine(
                format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
                format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
            ),
            transports: [
                // Add console transport
                new transports.Console({
                    format: format.combine(
                        // Add colors to the console
                        format.colorize({ colors: { [levelName]: color } }),
                        // Add timestamp and message
                        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
                    ),
                }),
                new transports.DailyRotateFile({
                    filename: 'logs/%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: false,
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
            ],
        })
    }

    // Loggers
    static info = (message: string) => Logger.createLogger('info', 'bold green').info(message);
    static error = (message: string) => Logger.createLogger('error', 'bold red').error(message);
    static warn = (message: string) => Logger.createLogger('warn', 'bold yellow').warn(message);
    static http = (message: string) => Logger.createLogger('http', 'bold magenta').http(message);
    static verbose = (message: string) => Logger.createLogger('verbose', 'bold blue').verbose(message);
    static debug = (message: string) => Logger.createLogger('debug', 'bold cyan').debug(message);
}
