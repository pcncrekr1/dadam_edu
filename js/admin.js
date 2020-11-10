// 작성자: 윤혜진, 작성일: 2020.11.03
$(function(){

    // ------------ notice_list.html --------------
    // 공지사항 리스트 체크여부 확인 후 삭제
    // 체크된 체크박스가 없으면 알럿창 띄움
    $("#noticeListDel").click(function () { 
        if($("input:checkbox[name=notice_list_check]:checked").length === 0) {
            alert("삭제할 공지사항을 선택해 주세요.");
        } else {
            var yes = confirm("한번 삭제한 자료는 복구되지 않습니다.\n정말 삭제하시겠습니까?");
            if(yes === true) {
                alert("삭제되었습니다.");
            }
        } 
    });

    
    // 공지사항 체크박스 컨트롤
    $(':checkbox[name=notice_list_check]').change(function() {
        
        if(this.id === "noticeListCheckAll") { // 공지사항 맨 위 체크박스라면
            if( this.checked === true ) {
                $("input[name=notice_list_check]:checkbox").prop("checked", true); // 전체 체크
            } else if( this.checked === false ) {
                $("input[name=notice_list_check]:checkbox").prop("checked", false); // 전체 체크해제
            }
        } else { // 개별 체크박스라면
            if( this.checked === true ) { 
                // 맨 위 체크박스를 제외한 모든 체크박스가 체크되었다면
                if($("input:checkbox[name=notice_list_check]:checked").length === $("input:checkbox[name=notice_list_check]").length - 1) {
                    $("#noticeListCheckAll").prop("checked", true); // 맨 위 체크박스 체크
                }
            } else if( this.checked === false ) { // 하나라도 체크 해제된 체크박스가 있다면
                $("#noticeListCheckAll").prop("checked", false); // 맨 위 체크박스 해제
            }
        }
    });



    // ------------ notice_write.html --------------
    // 파일첨부
    var fileTarget = $('.notice_file_box .upload_hidden'); 
    fileTarget.on('change', function(){ // 값이 변경되면 
        if(window.FileReader){ // modern browser 
            var filename = $(this)[0].files[0].name; 
        } else { // old IE 
            var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
        } 
        
        // 추출한 파일명 삽입 
        $(this).siblings('.upload_name').val(filename); 
    });




    // ------------ notice_detail.html --------------
    $("#noticeDetailDel").click(function() {
        var yes = confirm("한번 삭제한 자료는 복구되지 않습니다.\n정말 삭제하시겠습니까?");
        if(yes === true) {
            alert("삭제되었습니다.");
            window.location.href = "/dadam_edu/html/admin/notice/notice_list.html";
        }
    });





    

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