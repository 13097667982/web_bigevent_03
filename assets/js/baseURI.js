// 封装开发环境服务器地址函数
var baseURL = "http://ajax.frontend.itheima.net"

// jq在发起请求之前会先执行$.ajaxPrefilter函数
$.ajaxPrefilter(function (value) {
    // 拼接服务地址
    value.url = baseURL + value.url
})