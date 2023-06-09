import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const createMySqlMasterSlaveFactory =
  (connectionName: string) =>
  (configService: ConfigService): TypeOrmModuleOptions => {
    const config = configService.get('mysql');
    const { connections } = config;
    const { write_dsn: writeDSN, read_dsn: readDSN } =
      connections[connectionName] || connections.default;

    const readDSNs = Array.isArray(readDSN) ? readDSN : [readDSN];
    // const readDSNConfig = readDSNs.map((dsn) => {
    //   return { url: dsn };
    // });

    return {
      autoLoadEntities: true,
      type: 'mysql',
      charset: 'utf8mb4',
      timezone: '+08:00',
      logging: true,
      replication: {
        // master: { url: writeDSN },
        master: writeDSN,
        slaves: readDSNs,
      },
    };
  };

const createSqliteFactory =
  (connectionName: string) =>
  (config: ConfigService): TypeOrmModuleOptions => {
    const customizedConfig = config.get(`mysql.connections.${connectionName}`);

    return {
      autoLoadEntities: true,
      synchronize: true,
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,

      ...customizedConfig,
    };
  };

const createRootAsync = (name) => {
  const env = process.env.NODE_ENV || 'development';
  const isTest = env === 'test';

  const factory = isTest
    ? createSqliteFactory(name)
    : createMySqlMasterSlaveFactory(name);

  return TypeOrmModule.forRootAsync({
    name,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: factory,
  });
};

export const CreateDatabaseImports = () => [
  createRootAsync('default'),
  // createRootAsync('another'),
];
