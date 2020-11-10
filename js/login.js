$(function(){

    $("#loginForm").submit(function() { 
        if( $("#loginId").val() === "test" && 
            $("#loginPw").val() === "1234") {
            alert("로그인 되었습니다.");
        } else {
            alert("아이디나 암호가 틀리거나 회원이 아닙니다.\n확인하시기 바랍니다.");
            return false;
        }
    });

});