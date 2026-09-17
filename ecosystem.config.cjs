module.exports = {
  apps: [
    {
      name: "pacerise-web",
      script: "node_modules/.bin/next",
      // 실서버(52.79.132.6)는 Node와 함께 운영: 3000 = Node, 3001 = Node API, 3002 = 홈페이지.
      // nginx의 pace-rise.com → 127.0.0.1:3002. 3000으로 되돌리면 Node와 포트 충돌.
      args: "start -p 3002",
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
