$(function(){

    // gnb 호버시 펼쳐지고 접히기
    $("#header .gnb").hover(
        function(){
            $("#header .gnb").stop().animate({"height" : "270px"}, 800);
        },
        function(){
            $("#header .gnb").stop().animate({"height" : "50px"}, 800);
        }
    );


    var pw_change_btn = $('.pw_change_btn');    // 비밀번호 변경 버튼
    var pwChangePopup = $('#pwChangePopup');    // 비밀번호 변경창 배경
    var newPwSubmit = $('#newPwSubmit');        // 비밀번호 변경창 저장 버튼
    var pwCancelBtn = $('#pwCancelBtn');        // 비밀번호 변경창 취소 버튼
    
    // 비밀번호 변경 버튼 클릭시 변경창 띄움
    pw_change_btn.click(function(){
        pwChangePopup.css('display', 'block');
        
        // 초기화
        $("#pwChangeNew").val("");
        $("#pwChangeNew2").val("");
    });

    // 저장 버튼 클릭시 비밀번호 일치 여부 검사
    newPwSubmit.click(function(){
        if($("#pwChangeNew").val() === "") {
            alert("새로운 비밀번호를 입력해 주세요.");
            event.preventDefault();
        } else if($("#pwChangeNew2").val() === "") {
            alert("새로운 비밀번호 확인을 입력해 주세요.");
            event.preventDefault();
        } else if($("#pwChangeNew").val() === $("#pwChangeNew2").val() ) {
            alert("비밀번호가 성공적으로 변경되었습니다.");
            pwChangePopup.css('display', 'none');
        } else {
            alert("비밀번호가 일치하지 않습니다.");
            event.preventDefault();
        }
    });
    // 취소 버튼 클릭시 창 닫기
    pwCancelBtn.click(function(){
        pwChangePopup.css('display', 'none');
    });
    
});