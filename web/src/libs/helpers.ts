function logIfDevelopment(logFunction: (...args: unknown[]) => void) {
  return (message?: unknown, ...optionalParams: unknown[]) => {
    if (import.meta.env.MODE === 'development') {
      logFunction(message, ...optionalParams)
    }
  }
}

/**
 * A collection of console methods that only log in development mode.
 * @example
 * devConsole.log('This is a log message');
 */
export const devConsole = {
  log: logIfDevelopment(console.log),
  error: logIfDevelopment(console.error),
  warn: logIfDevelopment(console.warn),
  info: logIfDevelopment(console.info),
  debug: logIfDevelopment(console.debug),
}
