node.js建议是用版本
mac node v7.0.0
windows node v6.10.3

本地开发测试
1.  安装nodej环境 //下载地址：https://nodejs.org/en/download/
2.  安装好nodejs可以用 node -v 检查是否安装成功
/** 网速差时安装 运行 npm config set registry https://registry.npm.taobao.org  //执行步骤3时 npm 改为 cnpm **/
3.  cd 到lmshop react项目的根目录 运行npm install  //正常安装
4.  webpack.dev.config.js  第27行 ：修改自己的api调用地址
5.  修改 common.js 放开第10行 ，注释12行代码
6.  运行 npm start
7.  打开浏览器访问 http://localhost:3000/home.html
    微信访问 http://ip:3000/home.html
    
打包上线部署
1. 修改lmShop/src/common/common.js   第4，6，10，12行配置
   IMAGE_DOMAIN 和 SERVER_DOMAIN 为自己服务器部署的url
   export const IMAGE_DOMAIN = 'http://your_img_domain';
   export const SERVER_DOMAIN = 'http://your_api_domain';
2. 修改 common.js 放开第12行 ，注释10行代码
3. npm run build
4. 拷贝dist目录下面的所有的文件放到服务器，需要和api服务器同域名 例如：放到服务器tomcat---> webapps ---> mobile， 可放tomcat或用nginx代理
   访问 http://ip:port/mobile/home.html


注意：
dist需要和api服务器同域名不支持跨域
如果不能访问api，可以断点调试 APIInterceptor.java 并自行学习非对称加密 RSA 公钥 私钥 相关加密方法
密钥生成方法 https://doc.open.alipay.com/doc2/detail.htm?spm=a219a.7629140.0.0.nBDxfy&treeId=58&articleId=103242&docType=1

懒得学习的    也可以进行以下操作
1.登录 http://domain
    example: http://192.169.1.190:8080/leimingtech-admin
2.同一个浏览器访问 http://domain/shopViewWhite/list
    example: http://192.169.1.190:8080/leimingtech-admin/shopViewWhite/list
    IP白名单管理
    新增
	ip 输入  0.0.0.0-255.255.255.255
