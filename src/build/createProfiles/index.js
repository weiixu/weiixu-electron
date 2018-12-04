//use: 
//1. npm run build:demo
//2. npm run build --env=test --lang=en
require('colors');

function createProfiles(process, profilesEnv) {
  var argv;
  try {
    argv = JSON.parse(process.env.npm_config_argv).original;
  } catch (ex) {
    argv = process.argv;
  }
  // console.log(argv.toString().red + '\n')
  var build_name = argv[1]
  var aBuild = build_name.split(':')
  var arr = argv.slice(2);
  var deft = 'default';
  // console.log(build_name.toString().red + '\n')
  // 清除-
  var clearSub = (val) => {
    val = val.replace(/^\-/, '');
    if (val.indexOf('-') == 0) {
      return clearSub(val);
    } else {
      return val;
    }
  };
  var getParams = (arr) => {
    // console.log(arr.toString().red + '\n');
    let _obj = {}
    arr.forEach((item) => {
      item = clearSub(item);
      var key = item.split('=')[0];
      var val = item.split('=')[1];
      if (typeof val != 'undefined' || typeof key != 'undefined') {
        _obj[key] = val;
      }
    });
    return _obj
  }

  // 选择域名
  let oParams = getParams(arr);
  let domain = profilesEnv.default;
  if (oParams.domain) {
    domain = oParams.domain;
  }
  // console.log(aBuild.toString().red + '\n');
  // console.log(JSON.stringify(oParams).green + '\n');
  if (!profilesEnv[domain]) {
    let str = '域名配置为空:' + arr.toString();
    throw new Error(str.red + '\n');
  }
  if (aBuild.length > 1) {
    // 是否存在带有":"的参数
    oParams['env'] = aBuild[1];
  } else if (!oParams['env']) {    
    // 是否存在带有"env"的参数
    oParams['env'] = profilesEnv[domain][deft]
  }
  // console.log(JSON.stringify(oParams).green + '\n');
  var oProfiles = {};
  oProfiles = Object.assign(oProfiles, profilesEnv[domain][oParams['env']]);
  if (Object.keys(oProfiles).length == 0) {
    let str = '配置对象为空:' + arr.toString();
    throw new Error(str.red + '\n');
  } else {
    /* eslint-disable */
    console.log('\n' + '编译环境配置：'.cyan);
    console.log(JSON.stringify(oProfiles, null, 4).cyan + '\n\n');
  }
  return oProfiles;
}
module.exports = createProfiles;