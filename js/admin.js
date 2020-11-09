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




    // ------------ shopping_basket.html --------------
    $("#basket_edit").click(function () { 
        alert("_건의 내역을 수정 하시겠습니까?");
    });
    $("#basket_delete").click(function () { 
        alert("_건의 내역을 삭제 하시겠습니까?");
    });
    $("#basket_order").click(function () { 
        alert("_건의 내역을 주문 하시겠습니까?");
    });


    var checkBasketBranch1 = $("#checkBasketBranch1");
    var checkBasketDestination1 = $("#checkBasketDestination1");
    var checkBasketBook1 = $("#checkBasketBook1");

    // 지사명 체크시 배송지, 제품 체크박스도 전부 체크되게 하기
    checkBasketBranch1.click(function(){
        if(checkBasketBranch1.is(":checked") === true) {
            checkBasketDestination1.prop("checked", true);
            checkBasketBook1.prop("checked", true);
        } else {
            checkBasketDestination1.prop("checked", false);
            checkBasketBook1.prop("checked", false);
        }
    });
    
    // 배송지, 제품 체크박스 중 하나라도 선택 해제시 지사명도 체크 해제하기
    // 배송지, 제품 체크박스 둘다 선택할 시 지사명도 체크하기
    checkBasketDestination1.click(function(){
        if(checkBasketDestination1.is(":checked") === false || checkBasketBook1.is(":checked") === false) {
            checkBasketBranch1.prop("checked", false);
        } else if(checkBasketDestination1.is(":checked") === true && checkBasketBook1.is(":checked") === true) {
            checkBasketBranch1.prop("checked", true);
        }
    });
    checkBasketBook1.click(function(){
        if(checkBasketDestination1.is(":checked") === false || checkBasketBook1.is(":checked") === false) {
            checkBasketBranch1.prop("checked", false);
        } else if(checkBasketDestination1.is(":checked") === true && checkBasketBook1.is(":checked") === true) {
            checkBasketBranch1.prop("checked", true);
        }
    });

    
    



});