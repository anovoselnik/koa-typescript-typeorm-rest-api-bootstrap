module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'api',
      script: 'dist/server.js',
      env_staging: {
        NODE_ENV: 'staging',
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
    },
    staging: {
      user: 'thecalmcoder',
      host: '138.197.117.228',
      ref: 'origin/master',
      repo: 'git@github.com:Teachur/api.git',
      path: '/home/thecalmcoder/api',
      'post-deploy':
        'npm i && tsc && knex seed:run && pm2 reload ecosystem.config.js --env staging',
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
        JWT_SECRET: 'jwtrealsecretsecret2431414',
        FRONTEND_URL: 'https://stage.teachur.co',
        DATABASE_URL:
          'postgres://mxipxlwt:R3In337Yn_QJ100-oaLb0xcGb76nPjF8@salt.db.elephantsql.com:5432/mxipxlwt',
      },
    },
    dev: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/development',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'dev',
      },
    },
  },
};
