import defaultConfig from './default';
import testConfig from './test';

const TEST = 'test';

export default () => {
  const env = process.env.NODE_ENV || 'development';

  if (env === TEST) {
    return testConfig();
  }

  return defaultConfig();
};
