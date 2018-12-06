var grunt = require("grunt");
grunt.config.init({
  pkg: grunt.file.readJSON('package.json'),
  'create-windows-installer': {
    x64: {
      appDirectory: './weiixu-win32-x64', //应用输入目录 
      exe: 'weiixu.exe', //应用输入目录中exe文件名
      authors: 'weiixu.',
      description: "weiixu is first app",
      version: "1.1.0", //生成的 nupkg包版本 
      outputDirectory: './installer',
      // setupIcon: "logo.ico",
      noMsi: true

      // 配置字段 是否必填 描述
      // appDirectory // 是 Electron App 的目录
      // outputDirectory // 否 最后输出exe的目录
      // loadingGif // 否 安装过程中的加载图片
      // authors // 是 作者
      // owners // 否 所有者
      // exe // 否 App入口的exe ，如果改了名字的需要填写
      // description // 否 App描述
      // version // 否 版本号
      // title // 否 标题，默认是App 名称
      // certificateFile // 否 证书文件
      // certificatePassword // 否 加密密钥
      // signWithParams // 否 传递给signtool签名工具的参数，如果软件不签名，可以忽略这个。
      // iconUrl // 否 Icon链接，需要自定义icon的时候需要
      // setupIcon // 否  Setup.exe 的icon
      // noMsi // 否 不需要创建.msi安装文件
      // remoteReleases // 否  更新链接，如果填写，当链接中有新版本，会自动下载安装。

    }
  }
})

grunt.loadNpmTasks('grunt-electron-installer');
grunt.registerTask('default', ['create-windows-installer']);