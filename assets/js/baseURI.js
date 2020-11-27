// 封装开发环境服务器地址函数
var baseURL = "http://ajax.frontend.itheima.net"

// jq在发起请求之前会先执行$.ajaxPrefilter函数
$.ajaxPrefilter(function (value) {
    // 拼接服务地址
    value.url = baseURL + value.url
    // 对需要权限的借口进行配置信息
    // 判断借口是否有/my/
    if (value.url.indexOf("/my/") !== -1) {
        value.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }

    // 拦截所有响应 防止用户在登录页面非法登录到主页
    // jq在发起ajax请求时 无论成功否都会调用complete函数
    value.complete = function (res) {
        // console.log(res);
        var obj = res.responseJSON
        // 判断obj状态码
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            // 清空本地的token值 强制退回到login页面
            localStorage.removeItem("token")
            location.href = "/login.html"
        }
    }
})