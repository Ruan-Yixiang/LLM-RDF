const { original } = JSON.parse(process.env.npm_config_argv);

const envConfig = {
  excludes:  [],  
  envParams: {}, 
  devMode:   process.env.NODE_ENV !== 'production',
};

original.slice(2).forEach(item => {
  const param = item.replace(/^--/, '');
  const [key, value] = param.split('=');

  envConfig.envParams[key] = value || '';
});

module.exports = envConfig;
