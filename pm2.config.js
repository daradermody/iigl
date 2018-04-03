module.exports = {
  apps: [
    {
      name: 'iigl',
      script: 'dist/server',
      instances: 1,
      exec_mode: 'cluster',
      cwd: __dirname,
      env: {
        NODE_ENV: 'production',
      },
      log_date_format: 'YYYY-MM-DD HH:mm',
      out_file: 'dist/logs/server.log',
      error_file: 'dist/logs/error.log',
      combine_logs: true,
    },
  ],
};
