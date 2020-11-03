// 작성자: 윤혜진, 작성일: 2020.11.03
$(function(){
    

    // ------------ a_s_request.html --------------
    // A/S 신청사유가 기타일 떄만 textarea(추가 기재사항) 보여주기
    var asRequestState = $("#asRequestState");
    var asOtherText = $("#asOtherText");
    
    // 처음에는 textarea 숨겨놓기
    asOtherText.css("display", "none");

    asRequestState.change(function() {
        if(asRequestState.val() === "기타") {
            asOtherText.css("display", "block");
        } else {
            asOtherText.css("display", "none");
        }
    });
    
    
    // A/S 신청사유가 불량, 기타 일 때만 사진등록 버튼 보여주기
    var picture_attach = $(".picture_attach");

    asRequestState.change(function() {
        if( asRequestState.val() === "불량" || 
            asRequestState.val() === "기타" ) {
            picture_attach.css("display", "inline");
        } else {
            picture_attach.css("display", "none");
        }
    });

});