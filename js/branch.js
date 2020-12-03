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


    // ------------ 엑셀파일 다운로드용 함수 ------------
    function s2ab(s) { 
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf);  //create uint8array as viewer
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
        return buf;    
    }

    function exportExcel(excelHandler){ 
        // step 1. workbook 생성
        var wb = XLSX.utils.book_new();
    
        // step 2. 시트 만들기 
        var newWorksheet = excelHandler.getWorksheet();
        
        // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
        XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());
    
        // step 4. 엑셀 파일 만들기 
        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    
        // step 5. 엑셀 파일 내보내기 
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());
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

    // 거래원명을 선택해야 리스트가 보이게
    $("#customerSelect").change(function() {
        if($("#customerSelect").val() !== "") {
            $(".blue_table").children("tbody").css("display", "table-row-group");
        } else if($("#customerSelect").val() === "") {
            $(".blue_table").children("tbody").css("display", "none");
        }
    });
        

    // 접수하기 버튼 클릭시
    $("#asRequestBtn").click(function () { 
        if($("input:checkbox[name='as_request_check']:checked").length === 0){
            alert("상품을 선택해 주세요.");
            return false;
        } else if ($(".blue_table").children("tbody").css("display") == "none" &&
                    $("#asRequestCheckAll").is(":checked") == true) {  // 리스트가 보이지 않고 맨 위 체크박스만 선택되어 있으면
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

    // 거래원명을 선택해야 리스트가 보이게
    $("#returnCustomerSelect").change(function() {
        if($("#returnCustomerSelect").val() !== "") {
            $(".blue_table").children("tbody").css("display", "table-row-group");
        } else if($("#returnCustomerSelect").val() === "") {
            $(".blue_table").children("tbody").css("display", "none");
        }
    });

    // 신청하기 버튼 클릭시
    $("#returnRequestBtn").click(function () { 
        if($("input:checkbox[name='return_request_check']:checked").length === 0){
            alert("상품을 선택해 주세요.");
            return false;
        } else if ($(".blue_table").children("tbody").css("display") == "none" &&
                    $("#returnRequestCheckAll").is(":checked") == true) {  // 리스트가 보이지 않고 맨 위 체크박스만 선택되어 있으면
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




    // ------------ customer_list.html --------------
    var area0 = ["::시도::",
                "서울특별시","인천광역시","대전광역시","광주광역시","대구광역시","울산광역시","부산광역시","세종특별자치시",
                "경기도","강원도","충청북도","충청남도","전라북도","전라남도","경상북도","경상남도","제주특별자치도"];
    var area1 = ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구",
                    "동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구",
                    "용산구","은평구","종로구","중구","중랑구"];
    var area2 = ["강화군","계양구","남동구","동구","미추홀구","부평구","서구","연수구","옹진군","중구"];
    var area3 = ["대덕구","동구","서구","유성구","중구"];
    var area4 = ["광산구","남구","동구","북구","서구"];
    var area5 = ["남구","달서구","달성군","동구","북구","서구","수성구","중구"];
    var area6 = ["남구","동구","북구","울주군","중구"];
    var area7 = ["강서구","금정구","기장군","남구","동구","동래구","부산진구","북구","사상구","사하구",
                    "서구","수영구","연제구","영도구","중구","해운대구"];
    var area8 = []; // 세종특별자치시는 하위 행정구역으로 시·군·구의 기초자치단체를 두지 않는 단층제 광역자치단체이다.
    var area9 = ["가평군","고양시 덕양구","고양시 일산동구","고양시 일산서구","과천시","광명시","광주시","구리시","군포시","김포시",
                "남양주시","동두천시","부천시","성남시 분당구","성남시 수정구","성남시 중원구","수원시 권선구","수원시 영통구","수원시 장안구","수원시 팔달구",
                "시흥시","안산시 단원구","안산시 상록구","안성시","안양시 동안구","안양시 만안구","양주시","양평군","여주시","연천군",
                "오산시","용인시 기흥구","용인시 수지구","용인시 처인구","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시"];
    var area10 = ["강릉시","고성군","동해시","삼척시","속초시","양구군","양양군","영월군","원주시","인제군","정선군","철원군","춘천시","태백시",
                    "평창군","홍천군","화천군","횡성군"];
    var area11 = ["괴산군","단양군","보은군","영동군","옥천군","음성군","제천시","증평군","진천군",
                    "청주시 상당구","청주시 서원구","청주시 청원구","청주시 흥덕구","충주시"];
    var area12 = ["계룡시","공주시","금산군","논산시","당진시","보령시","부여군","서산시","서천군","아산시","예산군",
                    "천안시 동남구","천안시 서북구","청양군","태안군","홍성군"];
    var area13 = ["고창군","군산시","김제시","남원시","무주군","부안군","순창군","완주군","익산시","임실군","장수군",
                    "전주시 덕진구","전주시 완산구","정읍시","진안군"];
    var area14 = ["강진군","고흥군","곡성군","광양시","구례군","나주시","담양군","목포시","무안군","보성군",
                    "순천시","신안군","여수시","영광군","영암군","완도군","장성군","장흥군","진도군","함평군",
                    "해남군","화순군"];
    var area15 = ["경산시","경주시","고령군","구미시","군위군","김천시","문경시","봉화군","상주시","성주군",
                    "안동시","영덕군","영양군","영주시","영천시","예천군","울릉군","울진군","의성군","청도군",
                    "청송군","칠곡군","포항시 남구","포항시 북구"];
    var area16 = ["거제시","거창군","고성군","김해시","남해군","밀양시","사천시","산청군","양산시","의령군",
                    "진주시","창녕군","창원시 마산합포구","창원시 마산회원구","창원시 성산구","창원시 의창구","창원시 진해구","통영시","하동군","함안군",
                    "함양군","합천군",];
    var area17 = ["서귀포시","제주시"];

    // 시/도 선택 박스 초기화
    $("#cityBigSelect1").each(function() {
        var $selsido = $(this);
        $.each(eval(area0), function() {
            if(this == "::시도::"){
                $selsido.append("<option value=''>" + this + "</option>");
            } else {
                $selsido.append("<option value='" + this + "'>" + this + "</option>");
            }
        });
        $selsido.next().append("<option value=''>::시군구::</option>");
    });

    // 시/도 선택시 구/군 설정
    $("#cityBigSelect1").change(function() {
        var area = "area" + $("option", $(this)).index( $("option:selected", $(this)) ); // 선택지역의 구군 Array
        var $gugun = $(this).next(); // select 시군구
        $("option", $gugun).remove(); // 시군구 초기화
        $("#citySmallSelect1").attr("disabled", false);

        if(area == "area0") {
            $gugun.append("<option value=''>::시군구::</option>");
        } else if (area == "area8") { // 세종특별자치시
            $("#citySmallSelect1").attr("disabled", true);
            $gugun.append("<option value=''></option>");
        } else {
            $gugun.append("<option value=''>::시군구::</option>");
            $.each(eval(area), function() {
                $gugun.append("<option value='" + this + "'>" + this + "</option>");
            });
        }
    });


    // 거래원 명 선택시 체크박스 보이고 지사명 선택시 체크박스 숨기기
    $("#customerCategorySelect1").change(function() {
        if($("#customerCategorySelect1").val() === "거래원 명") {
            $(".checkbox_box").css("display", "inline-block");
            $("#customerSearchText1").css("width", "calc(100% - 250px)");
        } else {
            $(".checkbox_box").css("display", "none");
            $("#customerSearchText1").css("width", "100%");
        }
    });


    // 삭제 텍스트 링크 클릭 시
    $(".customer_del_link").click(function() { 
        var yes = confirm("한번 삭제한 자료는 복구되지 않습니다.\n해당 거래원을 삭제하시겠습니까?");
        if(yes === true) {
            alert("삭제되었습니다.");
            window.location.href = "/dadam_edu/html/admin/customer/customer_list.html";
        }
        event.preventDefault();
    });


    // 엑셀 다운로드
    var customerListExcel1Handler = {
        getExcelFileName : function(){
            return 'customer_list.xlsx';
        },
        getSheetName : function(){
            return '거래원 리스트';
        },
        getExcelData : function(){
            return document.getElementById('customerListTable1'); 
        },
        getWorksheet : function(){
            return XLSX.utils.table_to_sheet(this.getExcelData());
        }
    }
    $("#customerListExcel1").click(function(){
        exportExcel(customerListExcel1Handler);
    });



    // ------------ customer_register.html --------------
    // 우편번호 찾기 버튼 클릭시
    $("#customerPostcodeBtn1").click(function() {
        postCode("customerPostcodeNum1", "customerAddressText1_1");
    });




    // ------------ customer_sales_list.html --------------
    // 우선 오늘 날짜로 셋팅하기
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var full_today = now.getFullYear() + "-" + (month) + "-" + (day) ;
    $("#customerSalesDate1_1").val(full_today);
    $("#customerSalesDate2_1").val(full_today);

    function addzero(num){                        // 한자리가 되는 숫자에 "0"을 넣어주는 함수
        return num < 10 ? "0" + num : num;
    }
    
    function dateInput(n, m, date1, date2){
        $(date1).val("");        // 우선 이미 들어가있는 값 초기화
        $(date2).val("");

        var date = new Date();
        var start = new Date(Date.parse(date) - n * 1000 * 60 * 60 * 24);
        var today = new Date(Date.parse(date) - m * 1000 * 60 * 60 * 24);
        
        // if(n < 10){
        //     start.setMonth(start.getMonth() - n);
        // }
        var yyyy = start.getFullYear();
        var mm = start.getMonth() + 1;            // getMonth()의 반환 값이 0~11까지라서 +1을 해주어야 함
        var dd = start.getDate() + 1;             // 30일 맞추기
        
        var t_yyyy = today.getFullYear();
        var t_mm = today.getMonth() + 1;
        var t_dd = today.getDate();
        
        $(date1).val(yyyy + '-' + addzero(mm) + '-' + addzero(dd));
        $(date2).val(t_yyyy + '-' + addzero(t_mm) + '-' + addzero(t_dd));
    }
    
    $("#month1Btn1").click(function(){  // 1개월 전 (두 번째 인수로 0을 전달하면 오늘 날짜)
        dateInput(30, 0, "#customerSalesDate1_1", "#customerSalesDate2_1");      
    });
    $("#month3Btn1").click(function(){  // 3개월 전
        dateInput(90, 0, "#customerSalesDate1_1", "#customerSalesDate2_1");      
    });
    $("#month6Btn1").click(function(){  // 6개월 전
        dateInput(180, 0, "#customerSalesDate1_1", "#customerSalesDate2_1");      
    });


    // 엑셀 다운로드
    var customerSalesExcel1Handler = {
        getExcelFileName : function(){
            return 'customer_sales_list.xlsx';
        },
        getSheetName : function(){
            return '매출 상세내역';
        },
        getExcelData : function(){
            return document.getElementById('customerSalesListTable1'); 
        },
        getWorksheet : function(){
            return XLSX.utils.table_to_sheet(this.getExcelData());
        }
    }
    $("#customerSalesExcel1").click(function(){
        exportExcel(customerSalesExcel1Handler);
    });
});