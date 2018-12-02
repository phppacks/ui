/*
 * @Author: qinuoyun
 * @Date:   2018-02-24 15:10:04
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-11-29 17:34:50
 * 配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://www.ubapply.com/app/index.php?i=5&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=';
var suffix = "&m=jw_ys";
// var host = "localhost";


var config = {
    // 以下是页面中的请求地址 都放在service中 方便以后的改动
    service: {
        host,

        /*****************  商品  ******************/
        //获取商品分类
        // getClass: `${host}goods_getClass`+suffix,
        // //获取商品分组
        // getGroupList: `${host}goods_getGroupList`+suffix,
        // // 获取单个商品详情
        // getOneGoods: `${host}goods_getOneGoods`+suffix,
        // // 添加商品
        // addGoods: `${host}goods_addGoods`+suffix,
        // // 修改商品
        // editGoods: `${host}goods_editGoods`+suffix,
    },
    // proxy: true
};