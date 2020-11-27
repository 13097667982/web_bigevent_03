$(function () {
    // 自定义校验规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            // 判断昵称是否符合要求
            if (value.length > 6) {
                return "昵称长度为1~6位之间"
            }
        }
    })
    // 渲染页面
    initUserInfo()
    // 获取到layer
    var layer = layui.layer
    function initUserInfo() {
        // 发起请求
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                // console.log(res);
                // 判断状态码
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功 渲染  调用layui的内置方法  一个参数获取，两个参数赋值
                form.val("formUserInfo", res.data)
            }
        })
    }

    // 完成重置功能
    $("#btnReset").on("click", function (e) {
        // 阻止按钮默认行为
        e.preventDefault()
        // 重置按功能不是删除 是重新获取到原始值 重新渲染
        initUserInfo()
    })

    // 完成提交修改用户基本信息功能
    $(".layui-form").on("submit", function (e) {
        // 阻止默认
        e.preventDefault()
        // 发送请求
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("用户信息修改失败")
                }
                // 成功
                layer.msg("恭喜您！用户信息修改成功！")
                // 新数据渲染头像处 调用父页面的方法
                window.parent.getUserInfo()
            }
        })
    })
})