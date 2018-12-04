
//use: npm run build -env=test
//use: npm run build:test --domain=domain || --domain=domain2

var profilesEnv = {};
profilesEnv.default = 'domain';
profilesEnv.domain2 = {
  'default': 'test',
  'test': {
    'basePath': 'https://dd.domain2.com/api',
  },
  'live': {
    'basePath': 'https://enlive.domain2.com/api',
  },
  'demo': {
    'basePath': 'https://www.domain2.com/api',
  },
  'dev': {
    'basePath': 'https://endev.domain2.com/api',
  }
};
profilesEnv.domain = {
  'default': 'test',
  'test': {
    'basePath': 'https://test.domain.com/api',
    'ssoPath': 'https://test.domain.com/sso'
  },
  'live': {
    'basePath': 'https://live.domain.com/api',
    'ssoPath': 'https://live.domain.com/sso'
  },
  'demo': {
    'basePath': 'https://www.domain.com/api',
    'ssoPath': 'https://www.domain.com/sso'
  },
  'dev': {
    'basePath': 'https://dev.domain.com/api',
    'ssoPath': 'https://dev.domain.com/sso'
  }
};
module.exports = profilesEnv;
