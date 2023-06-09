import path from 'path';

export default () => ({
  deploy_env: 'local',

//   log_dir: path.join(__dirname, '../logs'),

  mysql: {
    type: 'mysql',
    connections: {
      default: {
        write_dsn: {
          host: '127.0.0.1',
          port: 3306,
          username: 'root',
          password: '1234',
          database: 'testnest',
        },
        //   'mysql://root:1234@127.0.0.1:3306/testnest',
        read_dsn: [
          {
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: '1234',
            database: 'testnest',
          },
        ],
        //   'mysql://root:1234@127.0.0.1:3306/testnest', // or array
      },
      // another: {
      //   write_dsn: 'mysql://this-is-username:this-is-password@127.0.0.1:3306/this-is-database-name',
      //   read_dsn: 'mysql://this-is-username:this-is-password@127.0.0.2:3306/this-is-database-name',
      // },
    },
  },
});
