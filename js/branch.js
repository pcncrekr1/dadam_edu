// 작성자: 윤혜진, 작성일: 2020.11.26
$(function(){

    //천단위 콤마, 원 문자 추가 함수
   function addComma(value){
        value = String(value);  // 문자열로 변환
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");    // 콤마 찍기
        value += "원"
        return value; 
    }

    //천단위 콤마, 원 문자 제거 함수
    function removeComma(value){
        value = value.replace(/,/g, '');
        value = value.slice(0,-1);
        value = Number(value);
        return value;
    }

    // 리스트(테이블) 체크박스 컨트롤 함수
    function checkboxControl(thisObject, checkAll, checkName) {
        if(thisObject.id === checkAll) { // 리스트 맨 위 체크박스라면
            if( thisObject.checked === true ) {
                $("input[name=" + checkName + "]:checkbox").prop("checked", true); // 전체 체크
            } else if( thisObject.checked === false ) {
                $("input[name=" + checkName + "]:checkbox").prop("checked", false); // 전체 체크해제
            }
        } else { // 개별 체크박스라면
            if( thisObject.checked === true ) { 
                // 맨 위 체크박스를 제외한 모든 체크박스가 체크되었다면
                if($("input:checkbox[name=" + checkName + "]:checked").length === $("input:checkbox[name=" + checkName + "]").length - 1) {
                    $("#" + checkAll).prop("checked", true); // 맨 위 체크박스 체크
                }
            } else if( thisObject.checked === false ) { // 하나라도 체크 해제된 체크박스가 있다면
                $("#" + checkAll).prop("checked", false); // 맨 위 체크박스 해제
            }
        }
    }

    // 우편번호 찾기 함수
    function postCode(postcodeNum, addressText) {
        new daum.Postcode({
			oncomplete: function(data) {
				// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

				// 각 주소의 노출 규칙에 따라 주소를 조합한다.
				// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
				var fullAddr = ''; // 최종 주소 변수
				var extraAddr = ''; // 조합형 주소 변수

				// 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
				if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
					fullAddr = data.roadAddress;

				} else { // 사용자가 지번 주소를 선택했을 경우(J)
					fullAddr = data.jibunAddress;
				}

				// 사용자가 선택한 주소가 도로명 타입일때 조합한다.
				if(data.userSelectedType === 'R'){
					//법정동명이 있을 경우 추가한다.
					if(data.bname !== ''){
						extraAddr += data.bname;
					}
					// 건물명이 있을 경우 추가한다.
					if(data.buildingName !== ''){
						extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
					}
					// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
					fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
				}

				// 우편번호와 주소 정보를 해당 필드에 넣는다.
				document.getElementById(postcodeNum).value = data.zonecode; //5자리 새우편번호 사용
				document.getElementById(addressText).value = fullAddr;

				// 커서를 상세주소 필드로 이동한다.
				// document.getElementById('addr2').focus();
			}
		}).open({left: 800, top: 100});
    }





    // ------------ book_order.html --------------
    $("#customerSelect").change(function () { // 거래원 명 선택
        // 상품군, 상품명, 단계, 호수 초기화
        $("#goodsGroupSelect").val("").prop("selected", true);
        $("#goodsNameSelect").val("").prop("selected", true);
        $("#goodsStepSelect").val("").prop("selected", true);
        $("#goodsNumSelect").val("").prop("selected", true);
    });
    $("#goodsGroupSelect").change(function () { // 상품군 선택
        // 상품명, 단계, 호수 초기화
        $("#goodsNameSelect").val("").prop("selected", true);
        $("#goodsStepSelect").val("").prop("selected", true);
        $("#goodsNumSelect").val("").prop("selected", true);
    });
    $("#goodsNameSelect").change(function () { // 상품명 선택
        // 단계, 호수 초기화
        $("#goodsStepSelect").val("").prop("selected", true);
        $("#goodsNumSelect").val("").prop("selected", true);
    });
    $("#goodsStepSelect").change(function () { // 단계 선택
        // 호수 초기화
        $("#goodsNumSelect").val("").prop("selected", true);
    });
    $("#goodsNumSelect").change(function () { // 호수
        if($("#customerSelect").val() === "") {
            alert("거래원 명을 선택해 주세요.")
            return false;
        } else if($("#goodsGroupSelect").val() === "") {
            alert("상품군을 선택해 주세요.")
            return false;
        } else if($("#goodsNameSelect").val() === "") {
            alert("상품명을 선택해 주세요.")
            return false;
        } else if($("#goodsStepSelect").val() === "") {
            alert("단계를 선택해 주세요.")
            return false;
        }
        
        if($(this).val() !== "") { // 호수 값이 ""가 아니라면
            $("#bookOrderEmptyTr").remove(); // 상품 없을떄의 tr을 지움
            $("#bookOrderCheckAll").prop("checked", false); // 맨 위 체크박스 해제

            var bookOrderRowNum = $("#bookOrderEmptyTbody").children("tr").length + 1;
            // 신규주문 리스트에 추가
            var price = 10000 + (bookOrderRowNum * 1000);
            var tr = '';
            tr += '<tr>';
            tr +=   '<td>';
            tr +=       '<input type="checkbox" name="book_order_check" class="book_order_check" value="book_order_check' + bookOrderRowNum + '">';
            tr +=   '</td>';
            tr +=   '<td>' + $("#customerSelect").val() + '</td>';
            tr +=   '<td>' + $("#goodsGroupSelect").val() + '</td>';
            tr +=   '<td>' + $("#goodsNameSelect").val() + '</td>';
            tr +=   '<td>' + $("#goodsStepSelect").val() + '</td>';
            tr +=   '<td>' + $("#goodsNumSelect").val() + '</td>';
            tr +=   '<td class="book_price" id="bookPrice' + bookOrderRowNum + '">' + addComma(price) + '</td>';
            tr +=   '<td><input type="number" min="1" value="1" class="book_num" id="bookNum' + bookOrderRowNum + '"></td>';
            tr +=   '<td class="book_price_total" id="bookPriceTotal' + bookOrderRowNum + '">' + addComma(price) + '</td>';
            tr +=   '<td class="book_order_cancel" id="bookOrderCancel' + bookOrderRowNum + '">';
            tr +=       '<a href="#">';
            tr +=           '<img src="/dadam_edu/images/del.png" alt="취소">';
            tr +=       '</a>';
            tr +=   '</td>';
            tr += '</tr>';
            $("#bookOrderEmptyTbody").prepend(tr);

            // 테이블 맨 밑 합계 표시하기
            var bookPriceTotal = 0;
            for(var i = 1; i <= bookOrderRowNum; i++) {
                bookPriceTotal += removeComma($("#bookPriceTotal" + i).text());
                $("#bookPriceAll").text(addComma(bookPriceTotal));
            }
        }
    });

    // 신규주문 리스트 체크박스 컨트롤
    $(document).on("change", "input:checkbox[name=book_order_check]", function(){
        checkboxControl(this, "bookOrderCheckAll", "book_order_check");
    });

    // 신규주문 리스트 넘버박스 컨트롤
    $(document).on("keyup mouseup", "#bookOrderEmptyTbody input[type=number]", function(e){
        
        //기호 입력 차단
        // if(e.type !== "mouseup") {
        //     if(!((e.keyCode > 95 && e.keyCode < 106)
        //         || (e.keyCode > 47 && e.keyCode < 58) 
        //         || e.keyCode == 8)) {
        //         // 왜 안되는지 분석 필요
        //         e.preventDefault();
        //         e.stopPropagation();
        //         return false;
        //     }
        // }
        var eachPrice = removeComma($(this).parent().prev().text());
        var totalPrice = eachPrice * $(this).val();
        // 합계에서 기존 소계를 뺀 뒤 새로운 소계를 더한다.
        var bookPriceAll = removeComma($("#bookPriceAll").text()) - removeComma($(this).parent().next().text());
        $("#bookPriceAll").text(addComma(bookPriceAll));
        $(this).parent().next().text(addComma(totalPrice)); // 소계 텍스트 넣기
        bookPriceAll = removeComma($("#bookPriceAll").text()) + removeComma($(this).parent().next().text());
        $("#bookPriceAll").text(addComma(bookPriceAll));
        
    });

    // 신규주문 리스트 취소 버튼 클릭시 행 삭제
    $(document).on("click", ".book_order_cancel a", function(){

        // 합계에서 소계를 뺀 뒤 행을 삭제한다.
        var bookPriceAll = removeComma($("#bookPriceAll").text()) - removeComma($(this).parent().prev().text());
        $("#bookPriceAll").text(addComma(bookPriceAll));
        $(this).parent().parent("tr").remove();

        // tbody에 행이 하나도 없으면 빈 행을 넣어준다.
        if($("#bookOrderEmptyTbody").children("tr").length === 0){
            var tr = '';
            tr += '<tr id="bookOrderEmptyTr">';
            tr +=   '<td colspan="10" class="empty_td">주문한 상품이 없습니다.</td>';
            tr += '</tr>';
            $("#bookOrderEmptyTbody").prepend(tr);
        }
    });

    // 장바구니 담기 버튼 클릭 시 선택된 상품이 없다면 알럿창 띄우기
    $("#basketBtn").click(function () { 
        if($("input:checkbox[name='book_order_check']:checked").length === 0){
            alert("상품을 선택해 주세요.");
            return false;
        } else if( $("input:checkbox[name='book_order_check']:checked").length === 1 && 
                   $("input:checkbox[name='book_order_check']:checked")[0].id === "bookOrderCheckAll") { //맨 위 체크박스만 선택된 경우
                    alert("상품을 선택해 주세요.");
                    return false;
        }
    });

    // 바로 주문하기 클릭 시 상품이 없다면 알럿창 띄우기
    $("#straightBtn").click(function () { 
        if( $("#bookOrderEmptyTbody").children().length === 1 && 
            $("#bookOrderEmptyTbody").children()[0].id === "bookOrderEmptyTr"){
                alert("주문할 상품이 없습니다.");
                return false;
            }
    });




    // ------------ a_s_request.html --------------
    // A/S접수 리스트 체크박스 컨트롤
    $(':checkbox[name=as_request_check]').change(function() {
        checkboxControl(this, "asRequestCheckAll", "as_request_check");
    });

    // 파일등록
    $("#asPictureBtn1").click(function() {
        $("#asPictureFile1").click();
    });
    $("#asPictureBtn2").click(function() {
        $("#asPictureFile2").click();
    });
    $("#asPictureBtn3").click(function() {
        $("#asPictureFile3").click();
    });

    // 접수하기 버튼 클릭시
    $("#asRequestBtn").click(function () { 
        if($("input:checkbox[name='as_request_check']:checked").length === 0){
            alert("상품을 선택해 주세요.");
            return false;
        } 
        // 체크박스 전체선택 시 사유가 하나라도 입력이 안 되어 있다면 알럿창 띄움
        else if($("#asRequestCheckAll").is(":checked") == true){ // 체크박스 전체선택이면
            if($("#asReasonSelect1").val() === "" ||
                    $("#asReasonSelect2").val() === "" ||
                    $("#asReasonSelect3").val() === "" ){
                alert("A/S 사유를 모두 선택해 주세요.");
                return false;
            }
            // AS사유를 입력했지만 사진등록이 안 되어 있는 경우
            if( ($("#asReasonSelect1").val() !== "" && $("#asPictureFile1").val() === "") ||
                ($("#asReasonSelect2").val() !== "" && $("#asPictureFile2").val() === "") ||
                ($("#asReasonSelect3").val() !== "" && $("#asPictureFile3").val() === "") ) {
                    alert("사진등록을 모두 완료해 주세요.");
                    return false;
            }
        } else { // 체크박스 개별선택이면
            if($("#asRequestCheck1").is(":checked") == true){
                if($("#asReasonSelect1").val() === "") {
                    alert("다담이A의 A/S 사유를 선택해 주세요.");
                    return false;
                } else {
                    if($("#asPictureFile1").val() === "") {
                        alert("다담이A의 사진을 등록해주세요.");
                        return false;
                    }
                }
            } 
            if($("#asRequestCheck2").is(":checked") == true) {
                if($("#asReasonSelect2").val() === "") {
                    alert("다담이B의 A/S 사유를 선택해 주세요.");
                    return false;
                } else {
                    if($("#asPictureFile2").val() === "") {
                        alert("다담이B의 사진을 등록해주세요.");
                        return false;
                    }
                }
            }
            if($("#asRequestCheck3").is(":checked") == true) {
                if($("#asReasonSelect3").val() === "") {
                    alert("다담이C의 A/S 사유를 선택해 주세요.");
                    return false;
                } else {
                    if($("#asPictureFile3").val() === "") {
                        alert("다담이C의 사진을 등록해주세요.");
                        return false;
                    }
                }
            }
        }
        alert("A/S 접수가 완료되었습니다.");
        event.preventDefault();
    });




    // ------------ return_request.html --------------
    // 반품신청 리스트 체크박스 컨트롤
    $(':checkbox[name=return_request_check]').change(function() {
        checkboxControl(this, "returnRequestCheckAll", "return_request_check");
    });

    // 신청하기 버튼 클릭시
    $("#returnRequestBtn").click(function () { 
        if($("input:checkbox[name='return_request_check']:checked").length === 0){
            alert("상품을 선택해 주세요.");
            return false;
        } 
        // 체크박스 전체선택 시 사유가 하나라도 입력이 안 되어 있다면 알럿창 띄움
        else if($("#returnRequestCheckAll").is(":checked") == true){ // 체크박스 전체선택이면
            if($("#returnReasonText1").val() === "" ||
                    $("#returnReasonText2").val() === "" ||
                    $("#returnReasonText3").val() === "" ){
                alert("반품사유를 모두 입력해 주세요.");
                return false;
            }
        } else { // 체크박스 개별선택이면
            if($("#returnRequestCheck1").is(":checked") == true){
                if($("#returnReasonText1").val() === "") {
                    alert("다담이A의 반품 사유를 입력해 주세요.");
                    return false;
                }
            } 
            if($("#returnRequestCheck2").is(":checked") == true) {
                if($("#returnReasonText2").val() === "") {
                    alert("다담이B의 반품 사유를 입력해 주세요.");
                    return false;
                }
            }
            if($("#returnRequestCheck3").is(":checked") == true) {
                if($("#returnReasonText3").val() === "") {
                    alert("누리야수학의 반품 사유를 입력해 주세요.");
                    return false;
                }
            }
        }
        alert("반품신청이 완료되었습니다.");
        event.preventDefault();
    });






    // ------------ shopping_basket.html --------------
    // 장바구니 리스트 체크박스 컨트롤
    $(':checkbox[name=shop_basket_check]').change(function() {
        checkboxControl(this, "shopBasketCheckAll", "shop_basket_check");
    });

    $("#choiceOrderBtn").click(function () { 
        if($("input:checkbox[name='shop_basket_check']:checked").length === 0){
            alert("상품을 선택해 주세요.");
            return false;
        } else if( $("input:checkbox[name='shop_basket_check']:checked").length === 1 && 
                   $("input:checkbox[name='shop_basket_check']:checked")[0].id === "shopBasketCheckAll") { //맨 위 체크박스만 선택된 경우(상품이 없을때)
                    alert("상품이 없습니다.");
                    return false;
        } else {
            var yes = confirm("선택한 상품을 주문하시겠습니까?");
            if(yes === false) {
                return false;
            }
        }
    });
    $("#allOrderBtn").click(function () { 
        if($("input:checkbox[name='shop_basket_check']:checked").length === 0){
            alert("전체 상품을 선택해 주세요.");
            return false;
        } else if( $("input:checkbox[name='shop_basket_check']:checked").length === 1 && 
                   $("input:checkbox[name='shop_basket_check']:checked")[0].id === "shopBasketCheckAll") { //맨 위 체크박스만 선택된 경우(상품이 없을떄)
                    alert("상품이 없습니다.");
                    return false;
        } else if($("input:checkbox[name='shop_basket_check']").length === $("input:checkbox[name='shop_basket_check']:checked").length) { // 전체 체크박스가 체크되었을 때
            var yes = confirm("전체 상품을 주문하시겠습니까?");
            if(yes === false) {
                return false;
            }
        } else {
            alert("전체 상품을 선택해 주세요.");
            return false;
        }
    });

    // 장바구니 리스트 삭제 버튼 클릭시 행 삭제
    $(document).on("click", ".shop_basket_del1 a", function(){

        // 합계에서 소계를 뺀 뒤 행을 삭제한다.
        var priceAll = removeComma($("#totalTd1").text()) - removeComma($(this).parent().prev().text());
        $("#totalTd1").text(addComma(priceAll));
        $(this).parent().parent("tr").remove();

        // 일반행을 다 삭제했으면 합계 행도 삭제한다.
        if($(".shop_basket_del1 a").length === 0) {
            $("#shopBasketTr3").remove();
        }

        // tbody에 행이 하나도 없으면 빈 행을 넣어준다.
        if($("#shopBasketTbody").children("tr").length === 0){
            var tr = '';
            tr += '<tr id="shopBasketEmptyTr">';
            tr +=   '<td colspan="10" class="empty_td">장바구니가 비어 있습니다.</td>';
            tr += '</tr>';
            $("#shopBasketTbody").prepend(tr);
        }
    });
    // 장바구니 리스트 삭제 버튼 클릭시 행 삭제
    $(document).on("click", ".shop_basket_del2 a", function(){

        // 합계에서 소계를 뺀 뒤 행을 삭제한다.
        // var priceAll = removeComma($("#totalTd2").text()) - removeComma($(this).parent().prev().text());
        // $("#totalTd2").text(addComma(priceAll));
        
        // 일반 행과 합계 행을 동시에 삭제
        $(this).parent().parent("tr").remove();
        $("#shopBasketTr5").remove();

        // tbody에 행이 하나도 없으면 빈 행을 넣어준다.
        if($("#shopBasketTbody").children("tr").length === 0){
            var tr = '';
            tr += '<tr id="shopBasketEmptyTr">';
            tr +=   '<td colspan="10" class="empty_td">장바구니가 비어 있습니다.</td>';
            tr += '</tr>';
            $("#shopBasketTbody").prepend(tr);
        }
    });

    // 장바구니 리스트 넘버박스 컨트롤
    $(document).on("keyup mouseup", "#shopBasketTbody input[type=number]", function(e){
        
        //기호 입력 차단
        // if(e.type !== "mouseup") {
        //     if(!((e.keyCode > 95 && e.keyCode < 106)
        //         || (e.keyCode > 47 && e.keyCode < 58) 
        //         || e.keyCode == 8)) {
        //         // 왜 안되는지 분석 필요
        //         e.preventDefault();
        //         e.stopPropagation();
        //         return false;
        //     }
        // }

        
        var eachPrice = removeComma($(this).parent().prev().text());
        var totalPrice = eachPrice * $(this).val();

        // 합계에서 기존 소계를 뺀 뒤 새로운 소계를 더한다.
        if($(this).parent().parent("tr")[0].id === "shopBasketTr4") {
            var totalTd2 = removeComma($("#totalTd2").text()) - removeComma($(this).parent().next().text());
            $("#totalTd2").text(addComma(totalTd2));
            $(this).parent().next().text(addComma(totalPrice)); // 소계 텍스트 넣기
            totalTd2 = removeComma($("#totalTd2").text()) + removeComma($(this).parent().next().text());
            $("#totalTd2").text(addComma(totalTd2));
        } else {
            var totalTd1 = removeComma($("#totalTd1").text()) - removeComma($(this).parent().next().text());
            $("#totalTd1").text(addComma(totalTd1));
            $(this).parent().next().text(addComma(totalPrice)); // 소계 텍스트 넣기
            totalTd1 = removeComma($("#totalTd1").text()) + removeComma($(this).parent().next().text());
            $("#totalTd1").text(addComma(totalTd1));
        }
    });




    
    // ------------ shopping_basket_choice.html --------------
    // 라디오버튼 클릭시 주소 변경
    $("#destinationBranchRadio").click(function(){
        if ($(this).is(':checked')){
            $("#shopPostcodeNum").val("13607");
            $("#shopAddressText1").val("경기도 성남시 분당구 내정로54");
            $("#shopAddressText2").val("234 6층");
        }
    });
    $("#destinationCustomerRadio").click(function(){
        if ($(this).is(':checked')){
            $("#shopPostcodeNum").val("06654");
            $("#shopAddressText1").val("서울시 서초구 효령로55길 22");
            $("#shopAddressText2").val("1604호");
        }
    });

    // 우편번호 찾기 버튼 클릭시
    $("#shopPostcodeBtn").click(function() {
        postCode("shopPostcodeNum", "shopAddressText1");
    });

    // 주문요청 버튼 클릭시
    $("#orderRequestBtn").click(function () { 
        alert("주문 요청이 완료되었습니다.");
        event.preventDefault();
    });



    
    // ------------ shopping_basket_choice.html --------------
    $("#destinationBranchRadio1").click(function(){
        if ($(this).is(':checked')){
            $("#shopPostcodeNum1").val("13607");
            $("#shopAddressText3").val("경기도 성남시 분당구 내정로54");
            $("#shopAddressText4").val("234 6층");
        }
    });
    $("#destinationCustomerRadio1").click(function(){
        if ($(this).is(':checked')){
            $("#shopPostcodeNum1").val("06654");
            $("#shopAddressText3").val("서울시 서초구 효령로55길 22");
            $("#shopAddressText4").val("1604호");
        }
    });

    $("#destinationBranchRadio2").click(function(){
        if ($(this).is(':checked')){
            $("#shopPostcodeNum2").val("13607");
            $("#shopAddressText5").val("경기도 성남시 분당구 내정로54");
            $("#shopAddressText6").val("234 6층");
        }
    });
    $("#destinationCustomerRadio2").click(function(){
        if ($(this).is(':checked')){
            $("#shopPostcodeNum2").val("06654");
            $("#shopAddressText5").val("서울시 서초구 효령로55길 22");
            $("#shopAddressText6").val("1604호");
        }
    });

    // 우편번호 찾기 버튼 클릭시
    $("#shopPostcodeBtn2").click(function() {
        postCode("shopPostcodeNum1", "shopAddressText3");
    });
    $("#shopPostcodeBtn3").click(function() {
        postCode("shopPostcodeNum2", "shopAddressText5");
    });

    // 주문요청 버튼 클릭시
    $("#orderRequestBtn1").click(function () { 
        alert("주문 요청이 완료되었습니다.");
        event.preventDefault();
    });

});