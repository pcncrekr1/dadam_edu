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
        if(this.id === "bookOrderCheckAll") { // 상품군 리스트 맨 위 체크박스라면
            if( this.checked === true ) {
                $("input[name=book_order_check]:checkbox").prop("checked", true); // 전체 체크
            } else if( this.checked === false ) {
                $("input[name=book_order_check]:checkbox").prop("checked", false); // 전체 체크해제
            }
        } else { // 개별 체크박스라면
            if( this.checked === true ) { 
                // 맨 위 체크박스를 제외한 모든 체크박스가 체크되었다면
                if($("input:checkbox[name=book_order_check]:checked").length === $("input:checkbox[name=book_order_check]").length - 1) {
                    $("#bookOrderCheckAll").prop("checked", true); // 맨 위 체크박스 체크
                }
            } else if( this.checked === false ) { // 하나라도 체크 해제된 체크박스가 있다면
                $("#bookOrderCheckAll").prop("checked", false); // 맨 위 체크박스 해제
            }
        }
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




    // ------------ shopping_basket.html --------------
    $("#choiceOrderBtn").click(function () { 
        var yes = confirm("선택한 상품을 주문하시겠습니까?");
        if(yes === true) {
            window.location.href = "/dadam_edu/html/branch/order/shopping_basket_choice.html";
        }

        event.preventDefault();
    });
    $("#allOrderBtn").click(function () { 
        var yes = confirm("전체 상품을 주문하시겠습니까?");
        if(yes === true) {
            window.location.href = "/dadam_edu/html/branch/order/shopping_basket_all.html";
        }

        event.preventDefault();
    });

});