module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'iigl',
      script: __dirname + '/dist/server',
      instances: 0,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
      log_date_format: 'YYYY-MM-DD HH:mm',
      out_file: __dirname + '/dist/logs/server.log',
      error_file: __dirname + '/dist/logs/error.log',
      combine_logs: true,
    },
  ],
};
