import * as path from 'path';

export default () => ({
  deploy_env: 'local',

  log_dir: path.join(__dirname, '../logs'),

  mysql: {
    type: 'sqlite',
    connections: {
      default: {},
    },
  },
});
