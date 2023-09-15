import { createLogger, format, transports, Logger } from 'winston';
import winston from 'winston/lib/winston/config';

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} [${level}]: ${message}`;
});

const logger: Logger = createLogger({
	format: combine(
		colorize(),
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		customFormat
	),
	transports: [
		new transports.Console({
			level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
		}),
		new transports.File({
			filename: 'combined.log'
		})
	]
});

export default logger;
