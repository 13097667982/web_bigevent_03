$(function () {
    // 点击切换登录注册页
    $("#link_reg").on('click', function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on('click', function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
    // 自定义校验规则
    var form = layui.form
    form.verify({
        // 密码规则
        pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'],
        // 确认密码规则
        repwd: function (value) {
            // 先拿到用户输入的密码
            var pwd = $(".reg-box input[name=password]").val()
            // 判等
            if (pwd !== value) {
                return "两次输入的密码不一致！"
            }
        }
    })

    // 注册功能
    $("#form_reg").on("submit", function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val()
            },
            success: function (res) {
                // console.log(res);
                // 判断状态码
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg("恭喜您注册成功，可以去登录啦！", { icon: 6 });
                // 手动跳转至登录表单
                $("#link_login").click()
                // 清空注册表单的内容
                $("#form_reg")[0].reset()
            }
        })
    })

    // 登录功能
    $("#form_login").submit(function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 发起请求
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                // 判断状态码
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                // 登录成功
                layer.msg("恭喜您登录成功！", { icon: 6 });
                // 保存token值 
                localStorage.setItem("token", res.token)
                // 页面跳转
                location.href = "/index.html"
            }
        })
    })
})


