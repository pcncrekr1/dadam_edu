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




    // ------------ goods_manage.html --------------
    // 상품조회ㆍ수정 체크박스 컨트롤
    $(':checkbox[name=goods_manage_check]').change(function() {
        
        if(this.id === "goodsManageCheckAll") { // 상품조회ㆍ수정 맨 위 체크박스라면
            if( this.checked === true ) {
                $("input[name=goods_manage_check]:checkbox").prop("checked", true); // 전체 체크
            } else if( this.checked === false ) {
                $("input[name=goods_manage_check]:checkbox").prop("checked", false); // 전체 체크해제
            }
        } else { // 개별 체크박스라면
            if( this.checked === true ) { 
                // 맨 위 체크박스를 제외한 모든 체크박스가 체크되었다면
                if($("input:checkbox[name=goods_manage_check]:checked").length === $("input:checkbox[name=goods_manage_check]").length - 1) {
                    $("#goodsManageCheckAll").prop("checked", true); // 맨 위 체크박스 체크
                }
            } else if( this.checked === false ) { // 하나라도 체크 해제된 체크박스가 있다면
                $("#goodsManageCheckAll").prop("checked", false); // 맨 위 체크박스 해제
            }
        }
    });

    // 상품조회ㆍ수정 리스트 체크여부 확인 후 삭제
    // 체크된 체크박스가 없으면 알럿창 띄움
    $("#goodsManageDel").click(function() { 
        if($("input:checkbox[name=goods_manage_check]:checked").length === 0) {
            alert("삭제할 상품을 선택해 주세요.");
        } else {
            var yes = confirm("한번 삭제한 자료는 복구되지 않습니다.\n정말 삭제하시겠습니까?");
            if(yes === true) {
                alert("삭제되었습니다.");
            }
        } 
    });




    // ------------ goods_info.html --------------
    // 라디오버튼이 선택되어 있는 상태라면 텍스트박스 대신 셀렉트박스를 보여줌
    // 라디오버튼이 선택 해제되어 있는 상태라면 텍스트박스를 보여줌
    // 라디오버튼이 선택되어 있는 상태에서 클릭하면 선택 해제
    // 라디오버튼이 선택 해제되어 있는 상태에서 클릭시 선택 상태로 변경 

    // 초기값 세팅
    $("#infoStepText").css("display", "inline-block");
    $("#infoStepSelect").css("display", "none");

    $("#infoStepRadio").click(function() {
        // Get the storedValue
        var previousValue = $(this).data('storedValue');
        // if previousValue = true then
        //     Step 1: toggle radio button check mark.
        //     Step 2: save data-StoredValue as false to indicate radio button is unchecked.
        if (previousValue) {
            $(this).prop('checked', !previousValue);
            $(this).data('storedValue', !previousValue);

            if(this.checked === true) {
                $("#infoStepText").css("display", "none");
                $("#infoStepSelect").css("display", "inline-block");
            } else {
                $("#infoStepText").css("display", "inline-block");
                $("#infoStepSelect").css("display", "none");
            }
        }
        // If previousValue is other than true
        //    save data-StoredValue as true to for currently checked radio button.
        else{
            $(this).data('storedValue', true);

            if(this.checked === true) {
                $("#infoStepText").css("display", "none");
                $("#infoStepSelect").css("display", "inline-block");
            } else {
                $("#infoStepText").css("display", "inline-block");
                $("#infoStepSelect").css("display", "none");
            }
            
        }
    });
    

    // 초기값 세팅
    $("#infoNumText").css("display", "inline-block");
    $("#infoNumSelect").css("display", "none");

    $("#infoNumRadio").click(function() {
        // Get the storedValue
        var previousValue = $(this).data('storedValue');
        // if previousValue = true then
        //     Step 1: toggle radio button check mark.
        //     Step 2: save data-StoredValue as false to indicate radio button is unchecked.
        if (previousValue) {
            $(this).prop('checked', !previousValue);
            $(this).data('storedValue', !previousValue);

            if(this.checked === true) {
                $("#infoNumText").css("display", "none");
                $("#infoNumSelect").css("display", "inline-block");
            } else {
                $("#infoNumText").css("display", "inline-block");
                $("#infoNumSelect").css("display", "none");
            }
        }
        // If previousValue is other than true
        //    save data-StoredValue as true to for currently checked radio button.
        else{
            $(this).data('storedValue', true);

            if(this.checked === true) {
                $("#infoNumText").css("display", "none");
                $("#infoNumSelect").css("display", "inline-block");
            } else {
                $("#infoNumText").css("display", "inline-block");
                $("#infoNumSelect").css("display", "none");
            }
            
        }
    });




    // ------------ goods_group_manage.html --------------
    // 상품군 명 추가
    $("#group_add_btn").click(function(){
        if($("#goodsGroupName").val() === ""){
            alert("상품군 명을 입력하세요.");
            return false;
        } else {
            $("#goodsGroupCheckAll").prop("checked", false); // 맨 위 체크박스 해제
            
            var rowNum = $("#goodsGroupListBody").children().length + 1;
            var codeNum = '';
            if(rowNum < 10) {
                codeNum += '0';
            }
            var row = '';
            row += '<tr>';
            row += '<td><input type="checkbox" name="goods_group_check"></td>';
            row += '<td class="row_num">' + rowNum + '</td>';
            row += '<td><a href="#" class="goods_edit_link" id="goodsGroupEdit' + rowNum + '">수정</a></td>';
            row += '<td>' + codeNum + rowNum + '</td>';
            row += '<td><input type="text" name="goods_group_text" id="goodsGroupText' + rowNum + '" value="' + $("#goodsGroupName").val() + '" readonly></td>';
            row += '</tr>';
            $("#goodsGroupListBody").prepend(row);
        }
    });

    // 상품군 리스트 체크박스 컨트롤
    $(document).on("change", "input:checkbox[name=goods_group_check]", function(){
        if(this.id === "goodsGroupCheckAll") { // 상품군 리스트 맨 위 체크박스라면
            if( this.checked === true ) {
                $("input[name=goods_group_check]:checkbox").prop("checked", true); // 전체 체크
            } else if( this.checked === false ) {
                $("input[name=goods_group_check]:checkbox").prop("checked", false); // 전체 체크해제
            }
        } else { // 개별 체크박스라면
            if( this.checked === true ) { 
                // 맨 위 체크박스를 제외한 모든 체크박스가 체크되었다면
                if($("input:checkbox[name=goods_group_check]:checked").length === $("input:checkbox[name=goods_group_check]").length - 1) {
                    $("#goodsGroupCheckAll").prop("checked", true); // 맨 위 체크박스 체크
                }
            } else if( this.checked === false ) { // 하나라도 체크 해제된 체크박스가 있다면
                $("#goodsGroupCheckAll").prop("checked", false); // 맨 위 체크박스 해제
            }
        }
    });

    // 상품군 리스트 체크여부 확인 후 삭제
    // 체크된 체크박스가 없으면 알럿창 띄움
    $("#goodsGroupDel").click(function() { 
        var checked = $("#goodsGroupListBody input:checkbox[name=goods_group_check]:checked");
        if(checked.length === 0) {
            alert("삭제할 상품군을 선택해 주세요.");
        } else {
            var yes = confirm("해당 상품군을 삭제하시겠습니까?");
            if(yes === true) {
                for(var i = checked.length - 1; i> -1; i--) {
                    checked.eq(i).closest("tr").remove();
                }

                // 테이블 행의 번호를 재정렬한다.
                var num = $(".row_num").length;
                for(var i = 0; i < $(".row_num").length; i++){
                    $(".row_num")[i].innerText = num;
                    num--;
                }

                if($(".row_num").length === 0) {
                    $("#goodsGroupCheckAll").prop("checked", false); // 맨 위 체크박스 해제
                }

                alert("삭제되었습니다.");
            }
        } 
    });

    // 상품군 리스트 저장시 체크박스는 전달하지 않음
    $("#goodsGroupSave").click(function() { 
        $("input:checkbox[name=goods_group_check]:checked").prop("checked", false); // 체크 해제를 해서 값이 전송되지 않게 함        
        $("#goodsGroupForm").submit();
    });

    // 상품군 리스트 안의 "수정" 클릭시 텍스트박스 활성화
    $(document).on("click", ".goods_edit_link", function(){
        var idNum = $(this).attr('id').replace(/goodsGroupEdit/, '');
        $("#goodsGroupText" + idNum).removeAttr("readonly");

        event.preventDefault();
    });




    // ------------ goods_regist.html --------------
    // 라디오버튼이 선택되어 있는 상태라면 텍스트박스 대신 셀렉트박스를 보여줌
    // 라디오버튼이 선택 해제되어 있는 상태라면 텍스트박스를 보여줌
    // 라디오버튼이 선택되어 있는 상태에서 클릭하면 선택 해제
    // 라디오버튼이 선택 해제되어 있는 상태에서 클릭시 선택 상태로 변경 

    // 초기값 세팅
    $("#registStepText").css("display", "inline-block");
    $("#registStepSelect").css("display", "none");

    $("#registStepRadio").click(function() {
        // Get the storedValue
        var previousValue = $(this).data('storedValue');
        // if previousValue = true then
        //     Step 1: toggle radio button check mark.
        //     Step 2: save data-StoredValue as false to indicate radio button is unchecked.
        if (previousValue) {
            $(this).prop('checked', !previousValue);
            $(this).data('storedValue', !previousValue);

            if(this.checked === true) {
                $("#registStepText").css("display", "none");
                $("#registStepSelect").css("display", "inline-block");
            } else {
                $("#registStepText").css("display", "inline-block");
                $("#registStepSelect").css("display", "none");
            }
        }
        // If previousValue is other than true
        //    save data-StoredValue as true to for currently checked radio button.
        else{
            $(this).data('storedValue', true);

            if(this.checked === true) {
                $("#registStepText").css("display", "none");
                $("#registStepSelect").css("display", "inline-block");
            } else {
                $("#registStepText").css("display", "inline-block");
                $("#registStepSelect").css("display", "none");
            }
            
        }
    });
    

    // 초기값 세팅
    $("#registNumText").css("display", "inline-block");
    $("#registNumSelect").css("display", "none");

    $("#registNumRadio").click(function() {
        // Get the storedValue
        var previousValue = $(this).data('storedValue');
        // if previousValue = true then
        //     Step 1: toggle radio button check mark.
        //     Step 2: save data-StoredValue as false to indicate radio button is unchecked.
        if (previousValue) {
            $(this).prop('checked', !previousValue);
            $(this).data('storedValue', !previousValue);

            if(this.checked === true) {
                $("#registNumText").css("display", "none");
                $("#registNumSelect").css("display", "inline-block");
            } else {
                $("#registNumText").css("display", "inline-block");
                $("#registNumSelect").css("display", "none");
            }
        }
        // If previousValue is other than true
        //    save data-StoredValue as true to for currently checked radio button.
        else{
            $(this).data('storedValue', true);

            if(this.checked === true) {
                $("#registNumText").css("display", "none");
                $("#registNumSelect").css("display", "inline-block");
            } else {
                $("#registNumText").css("display", "inline-block");
                $("#registNumSelect").css("display", "none");
            }
            
        }
    });

    // 탭메뉴 활성화 / 비활성화
    var each_btn = $('.goods_regist_tab_menu div:first-child a');
    var bundle_btn = $('.goods_regist_tab_menu div:last-child a');
    var tab_regist_each = $('.tab_regist_each');
    var tab_regist_bundle = $('.tab_regist_bundle');

    // 초기값 설정
    each_btn.addClass("goods_regist_tab_active");
    tab_regist_each.css("display", "block");

    each_btn.click(function(){
        each_btn.addClass('goods_regist_tab_active');
        bundle_btn.removeClass('goods_regist_tab_active');
        tab_regist_each.css('display', 'block');
        tab_regist_bundle.css('display', 'none');
        
        event.preventDefault();
    });
    bundle_btn.click(function(){
        each_btn.removeClass('goods_regist_tab_active');
        bundle_btn.addClass('goods_regist_tab_active');
        tab_regist_each.css('display', 'none');
        tab_regist_bundle.css('display', 'block');

        event.preventDefault();
    });


    // 일괄등록 등록 버튼 클릭 시
    $("#goodsRegistBtn").click(function() {
        var url = "goods_excel_popup.html";
        var name = "popup test";
        var option = "width = 500, height = 500, top = 100, left = 800, location = no";
        window.open(url, name, option);
    });


    // 일괄등록 초기화 버튼 클릭시
    $("#bundleReset").click(function(){
        $("#registTable").find("tbody").find("tr").remove();    // tbody안의 모든 tr을 찾아 지운다.
        $("#registTable").find("tbody").append("<tr><td colspan='8'>등록한 상품이 없습니다.</td></tr>");
        $("#registTable").css("height", "200px");
    });





    // ------------ stock_manage.html --------------
    // 테이블의 상품코드, 상품명 텍스트(링크) 클릭 시 상세내역창 띄움
    $(".stock_code_link").click(function() {
        var url = "goods_detail_popup.html";
        var name = "상품 상세내역";
        var option = "width = 700, height = 800, top = 100, left = 800, location = no";
        window.open(url, name, option);
    });
    $(".stock_name_link").click(function() {
        var url = "goods_detail_popup.html";
        var name = "상품 상세내역";
        var option = "width = 700, height = 800, top = 100, left = 800, location = no";
        window.open(url, name, option);
    });


    // 상품 리스트 체크여부 확인 후 삭제
    // 체크된 체크박스가 없으면 알럿창 띄움
    $("#stockManageDel").click(function () { 
        if($("input:checkbox[name=stock_manage_check]:checked").length === 0) {
            alert("삭제할 상품을 선택해 주세요.");
        } else {
            var yes = confirm("한번 삭제한 자료는 복구되지 않습니다.\n정말 삭제하시겠습니까?");
            if(yes === true) {
                alert("삭제되었습니다.");
            }
        } 
    });

    
    // 상품 리스트 체크박스 컨트롤
    $(':checkbox[name=stock_manage_check]').change(function() {
        
        if(this.id === "stockManageCheckAll") { // 상품 리스트 맨 위 체크박스라면
            if( this.checked === true ) {
                $("input[name=stock_manage_check]:checkbox").prop("checked", true); // 전체 체크
            } else if( this.checked === false ) {
                $("input[name=stock_manage_check]:checkbox").prop("checked", false); // 전체 체크해제
            }
        } else { // 개별 체크박스라면
            if( this.checked === true ) { 
                // 맨 위 체크박스를 제외한 모든 체크박스가 체크되었다면
                if($("input:checkbox[name=stock_manage_check]:checked").length === $("input:checkbox[name=stock_manage_check]").length - 1) {
                    $("#stockManageCheckAll").prop("checked", true); // 맨 위 체크박스 체크
                }
            } else if( this.checked === false ) { // 하나라도 체크 해제된 체크박스가 있다면
                $("#stockManageCheckAll").prop("checked", false); // 맨 위 체크박스 해제
            }
        }
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
    $("#cityBigSelect").each(function() {
        var $selsido = $(this);
        $.each(eval(area0), function() {
            $selsido.append("<option value='" + this + "'>" + this + "</option>");
        });
        $selsido.next().append("<option value=''>::시군구::</option>");
    });

    // 시/도 선택시 구/군 설정
    $("#cityBigSelect").change(function() {
        var area = "area" + $("option", $(this)).index( $("option:selected", $(this)) ); // 선택지역의 구군 Array
        var $gugun = $(this).next(); // select 시군구
        $("option", $gugun).remove(); // 시군구 초기화
        $("#citySmallSelect").attr("disabled", false);

        if(area == "area0") {
            $gugun.append("<option value=''>::시군구::</option>");
        } else if (area == "area8") { // 세종특별자치시
            $("#citySmallSelect").attr("disabled", true);
            $gugun.append("<option value=''></option>");
        } else {
            $gugun.append("<option value=''>::시군구::</option>");
            $.each(eval(area), function() {
                $gugun.append("<option value='" + this + "'>" + this + "</option>");
            });
        }
    });


    // 거래원 명 선택시 체크박스 보이고 지사명 선택시 체크박스 숨기기
    $("#customerCategorySelect").change(function() {
        if($("#customerCategorySelect").val() === "거래원 명") {
            $(".checkbox_box").css("display", "inline-block");
            $("#customerSearchText").css("width", "calc(100% - 250px)");
        } else {
            $(".checkbox_box").css("display", "none");
            $("#customerSearchText").css("width", "100%");
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




    // ------------ customer_register.html --------------
    // 우편번호 찾기 버튼 클릭시
    $("#customerPostcodeBtn").click(function() {
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
				document.getElementById('customerPostcodeNum').value = data.zonecode; //5자리 새우편번호 사용
				document.getElementById('customerAddressText1').value = fullAddr;

				// 커서를 상세주소 필드로 이동한다.
				// document.getElementById('addr2').focus();
			}
		}).open({left: 800, top: 100});
    });




    // ------------ customer_sales_list.html --------------
    // 우선 오늘 날짜로 셋팅하기
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var full_today = now.getFullYear() + "-" + (month) + "-" + (day) ;
    $("#customerSalesDate1").val(full_today);
    $("#customerSalesDate2").val(full_today);

    function addzero(num){                        // 한자리가 되는 숫자에 "0"을 넣어주는 함수
        return num < 10 ? "0" + num : num;
    }
    
    function dateInput(n, m){
        $("#customerSalesDate1").val("");        // 우선 이미 들어가있는 값 초기화
        $("#customerSalesDate2").val("");

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
        
        $("#customerSalesDate1").val(yyyy + '-' + addzero(mm) + '-' + addzero(dd));
        $("#customerSalesDate2").val(t_yyyy + '-' + addzero(t_mm) + '-' + addzero(t_dd));
    }
    
    $("#month1Btn").click(function(){  // 1개월 전 (두 번째 인수로 0을 전달하면 오늘 날짜)
        dateInput(30, 0);      
    });
    $("#month3Btn").click(function(){  // 3개월 전
        dateInput(90, 0);      
    });
    $("#month6Btn").click(function(){  // 6개월 전
        dateInput(180, 0);      
    });




    // ------------ bill.html --------------
    $(".bill_list > table > tbody > tr").click(function(){                     
        if($(this).next().children().hasClass("inside_table_td_on") == true){   // td가 펼쳐져 있으면
            $(this).next().children().removeClass("inside_table_td_on");        // td를 접음
            $(this).next().css("border-bottom", "0");                           // 테두리를 없앰
        } else {                                                                // td가 접혀져 있으면
            $(this).next().children().addClass("inside_table_td_on");           // td를 펼침
            $(this).next().css("border-bottom", "1px solid #c6c6c6");           // 테두리를 생성
        }
    });


    // 우선 오늘 날짜로 셋팅하기
    $("#billDate1").val(full_today);
    $("#billDate2").val(full_today);
    
    function dateInputBill(n, m){
        $("#billDate1").val("");        // 우선 이미 들어가있는 값 초기화
        $("#billDate2").val("");

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
        
        $("#billDate1").val(yyyy + '-' + addzero(mm) + '-' + addzero(dd));
        $("#billDate2").val(t_yyyy + '-' + addzero(t_mm) + '-' + addzero(t_dd));
    }
    
    $("#billMonth1Btn").click(function(){  // 1개월 전 (두 번째 인수로 0을 전달하면 오늘 날짜)
        dateInputBill(30, 0);      
    });
    $("#billMonth3Btn").click(function(){  // 3개월 전
        dateInputBill(90, 0);      
    });
    $("#billMonth6Btn").click(function(){  // 6개월 전
        dateInputBill(180, 0);      
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