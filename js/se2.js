// 작성자: 윤혜진, 작성일: 2020.11.09
$(function(){

    // SmartEditor2 (textarea 에디터)
    var oEditors = [];
    nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "noticeContent",
        sSkinURI: "/dadam_edu/se2/SmartEditor2Skin.html",
        fCreator: "createSEditor2"
    });

    // 저장 버튼 클릭시 이벤트 발생
    $("#noticeWriteSubmit").click(function(){
        oEditors.getById["noticeContent"].exec("UPDATE_CONTENTS_FIELD", []);
        $("#noticeWriteForm").submit();
    });

});