$(function(){
    $("#header .gnb").hover(
        function(){
            $("#header .gnb").stop().animate({"height" : "270px"}, 800);
        },
        function(){
            $("#header .gnb").stop().animate({"height" : "50px"}, 800);
        }
    );
    
});