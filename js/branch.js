// 작성자: 윤혜진, 작성일: 2020.11.26
$(function(){

    // ------------ book_order.html --------------

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
    $(document).on("click", ".shop_basket_del a", function(){

        // 합계에서 소계를 뺀 뒤 행을 삭제한다.
        // var bookPriceAll = removeComma($("#bookPriceAll").text()) - removeComma($(this).parent().prev().text());
        // $("#bookPriceAll").text(addComma(bookPriceAll));
        // $(this).parent().parent("tr").remove();

        // tbody에 행이 하나도 없으면 빈 행을 넣어준다.
        // if($("#shopBasketTbody").children("tr").length === 0){
        //     var tr = '';
        //     tr += '<tr id="bookOrderEmptyTr">';
        //     tr +=   '<td colspan="10" class="empty_td">주문한 상품이 없습니다.</td>';
        //     tr += '</tr>';
        //     $("#shopBasketTbody").prepend(tr);
        // }
    });

});