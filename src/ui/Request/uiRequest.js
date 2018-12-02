import axios from './axios';

const request = (objects) => {
    var options = {
        /**
         * ajax 请求地址
         * @type {String}
         */
        url: '',
        /**
         * 请求的方法,默认为GET
         * @type {String}
         */
        method: 'GET',
        /**
         * 请求的数据
         * @type {Object/String/ArrayBuffer}
         */
        data: null,
        /**
         * 请求头部
         * @type {Object}
         */
        header: '',
        /**
         * 请求的类型,默认为json
         * @type {String}
         */
        dataType: 'json',
        /**
         * 设置响应的数据类型
         * 合法值：text、arraybuffer
         * @type {String}
         */
        responseType: 'text',
        /**
         * 超时时间，默认5秒钟
         * @type {Number}
         */
        timeout: 5000,
        /**
         * PHP代理
         * @type {Boolean}
         */
        proxy:false,
        /**
         * 接口调用结束的回调函数
         * （调用成功、失败都会执行）
         * @return {[type]} [description]
         */
        complete: function(e) {

        },
        /**
         * 接口调用失败的回调函数
         * @return {[type]} [description]
         */
        fail: function(e) {

        },
        /**
         * 收到开发者服务成功返回的回调函数 
         * @return {[type]} [description]
         */
        success: function(e) {

        },
        /**
         * API返回错误接口
         * @return {[type]} [description]
         */
        error: function(e) {

        }
    }

    /**
     * 合并数据对象
     * @param  {[type]} i in            options [description]
     * @return {[type]}   [description]
     */
    Object.keys(options).forEach(function(i) {
        if (objects[i] === undefined) {
            objects[i] = options[i];
        }
    });

    /**
     * 是否开启代理模式
     */
    if (objects.proxy === true) {
        objects.method = "POST";
        objects.data = {
            url: objects.url,
            data: objects.data
        }
        objects.url = document.location.protocol + "//" + document.domain + "/system/view/agency";
    }

    /**
     * 执行AXISO数据提交处理
     * @param  {[type]} response) {                   var backObject [description]
     * @return {[type]}           [description]
     */
    axios.request(objects).then(function(response) {
        var backObject = response.data;
        /**
         * 判断是否为JSON对象
         */
        if (typeof(backObject) == "object" && Object.prototype.toString.call(backObject).toLowerCase() == "[object object]" && !backObject.length) {
            if (backObject.code == 0) {
                objects.success(backObject);
            } else {
                objects.error(backObject);
            }
        } else {
            objects.success(response);
        }
    }).catch(function(error) {
        objects.fail(error);
    });

}

export default request