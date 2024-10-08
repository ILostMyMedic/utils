/** 
 * @description: This is a simple example of a Node.js catching uncaught exceptions and unhandled rejections.
 * This will allow us to sync cache, close connections, and do other cleanup tasks before the process exits.
 * @example:
 *  import './process-events';
 */
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

process.on('SIGINT', () => {
    console.log('Received SIGINT. Exiting...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Exiting...');
    process.exit(0);
});

process.on('exit', (code) => {
    console.log('Process exited with code:', code);
});
