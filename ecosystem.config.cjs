module.exports = {
  apps: [
    {
      name: "pacerise-web",
      script: "node_modules/.bin/next",
      args: "start -p 3000 -H 0.0.0.0",
      env: {
        NODE_ENV: "production",
        NEXT_TELEMETRY_DISABLED: "1",
      },
      watch: false,
      instances: 1,
      exec_mode: "fork",
    },
  ],
};
