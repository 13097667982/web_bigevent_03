// 入口函数
$(function () {
    // 获取用户信息
    getUserInfo()
    // 点击实现退出功能
    $("#btnLogout").on("click", function () {
        // 框架提供的方法
        layer.confirm('确定要退出吗？', { icon: 3, title: '提示' }, function (index) {
            // 清空本地的token  返回登录页面
            localStorage.removeItem("token")
            location.href="/login.html"
            // 关闭询问框
            layer.close(index);
        });
    })
})

// 封装获取用户信息函数
function getUserInfo() {
    // 发送ajax
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            // console.log(res);
            // 判断状态码
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 请求成功 渲染用户信息
            renderAvatar(res.data)
        }
    })
    function renderAvatar(user) {
        // 1.渲染用户名
        var name = user.nickname || user.suername
        $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
        // 2.渲染头像
        if (user.user_pic !== null) {
            // 有头像
            $(".layui-nav-img").show().attr("src", user.user_pic)
            $(".text-avatar").hide()
        } else {
            $(".layui-nav-img").hide()
            var text = name[0].toUpperCase()
            $(".text-avatar").show().html(text)
        }
    }
}