// 작성자: 윤혜진, 작성일: 2020.11.26
$(function(){

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