var Consult = function () {

    let targetingType = "";

    if (isPartnerConsult()) {
        $(".header.main, .businessBanner, footer").remove();
        if (Often.isAct("consult-complete")) {
            renderPartnerCompleteView();
        } else {
            renderPartnerConsultView();
        }
    }

    return {
        controlView: controlView,
        addEvent: addEvent,
        submitForm: submitForm,
        setTargetingVal: setTargetingVal,
    }

    // íƒ€ì¼“íŒ… íŽ˜ì´ì§€ - popupformê³¼ ì¼ë°˜ form êµ¬ë¶„
    function get$ConsultForm(){
        var $popConsultForm =  $("#popConsultForm > form");
        return $popConsultForm.length > 0 ?  $popConsultForm : $("#consultForm");
    }

    function isContactFile() {
        return Often.null2Void(location.search).indexOf('?contact=resource') > -1;
    }

    function isContactPro() {
        return Often.null2Void(location.search).indexOf('?contact=pro') > -1;
    }

    function isPartnerConsult() {
        return Often.null2Void(location.search).indexOf('?partner=') > -1;
    }

    function isPtRecruitComplete() {
        return Often.null2Void(location.search).indexOf('?pt-recruit') > -1;
    }

    function isPtRecruit() {
        return Often.isAct("pt-recruit");
    }

    function isTargeting() {
        return Often.isAct("finance") || Often.isAct("marketing") || Often.isAct("design");
    }

    function isIndexPage() {
        return Often.isAct("index") || Often.isAct("product") || Often.isAct("mkt") || Often.isAct("press");
    }

    function setTargetingVal() {
        let dataTagEvent = "";

        if(Often.isAct("finance")) {
            dataTagEvent = "consult_finance";
            targetingType = "(ê¸ˆìœµ)";
        }
        else if (Often.isAct("marketing")){
            dataTagEvent = "consult_mkt";
            targetingType = "(ë§ˆì¼€íŒ…)";
        }
        else {
            dataTagEvent = "consult_design";
            targetingType = "(ë””ìžì¸)";
        }
        $("section").attr("data-tag-event", dataTagEvent);
    }

    function getPartnerId() {
        return Often.null2Void(location.search).replace('?partner=', '');
    }

    function controlView() {
        if (isPartnerConsult()) return;
        if (isContactFile()) {
            $("#consult").attr("data-tag-event", "consult");
            $(".js-title").text("ì†Œê°œ ë° ë¹„êµìžë£Œ ì‹ ì²­");
            $(".js-desc").text("í˜‘ì—…íˆ´ì„ ë„ìž…í•˜ê¸° ì „ í•œëˆˆì— ë¹„êµí•´ë³´ì„¸ìš”.");
            $(".js-submit").text("ì†Œê°œ ë° ë¹„êµìžë£Œ ì‹ ì²­");
            $("#CONTACT_TYPE").parents("li").remove();
            $("#CONTACT_CNTN").parents("li").remove();
            $(".js-complete-contact").remove();
            $(".js-complete-recruit").remove();
        } else if(isPtRecruitComplete()){
            $('.js-title').text("íŒŒíŠ¸ë„ˆ ì‹ ì²­ ë° ë¬¸ì˜");
            $("#CONTACT_CNTN").parents("li").remove();
            $(".js-complete-contact").remove();
            $(".js-complete-resource").remove();
        } else {
            $("#consult").attr("data-tag-event", "consult_resource")
            $(".js-title").text("Contact us");
            $(".js-desc").text("We're here to help you with anything you need.")
            $(".js-submit").text("Submit");
            $(".js-complete-resource").remove();
            $(".js-complete-recruit").remove();
        }

        if (isContactPro()) {
            $("#CONTACT_TYPE").val("ë¹„ì¦ˆë‹ˆìŠ¤ í”„ë¡œ");
        }
    }

    function addEvent() {

        $(".btnAgree").on("click", function () {
            $('body').css("overflow", "hidden");
            $("#popLayer").show();
        });

        $(".btnPopClose").on("click", function () {
            $('body').css("overflow", "auto");
            $("#popLayer").hide();
        });

        $(".js-submit").on("click", function (e) {
            e.preventDefault();
            submitForm();
        });

    }

    function submitForm(){
        var isError = false;
        var isindex = !!isIndexPage();

        //Form Input ìœ íš¨ì„± ê²€ì‚¬
        isError = formInputError(isError, isindex);

        if (isError) return;

        if (!$("#privacyAgree").prop("checked")){
            if(isindex) $(".agreeList").find('.d-none').attr('class', 'agree-important');
            return Often.toast("error", "Please indicate that you have read and agree to the Privacy Policy.");
        } else{
            if(isindex) $(".agreeList").find('.agree-important').attr('class', 'd-none');
        }

        var locationSearch = Often.null2Void(location.search);
        var inputJson = isPartnerConsult() ? getInputJsonByPartner() : getInputJsonByConsult();
        inputJson["packetOption"] = Ajax.OPTION.PREVENT_EXECUTE;

        Ajax.executeApi("FLOW_CNTT_C001", inputJson, function () {
            if (isPartnerConsult()) {
                location.href = "/consult-complete.act" + locationSearch;
                return;
            } else if(isPtRecruit()){
                location.href = "/consult-complete.act" + "?pt-recruit";
                return;
            } else if(isTargeting()){
                locationSearch = "?contact=resource";
            }

            var queryStringJson = Often.getLocationQueryParamJson();
            var touchPoint = queryStringJson["utm_source"] || inputJson.ROUTE;
            GoogleTagManager.collect({
                "event": inputJson.TAG_EVENT,
                "company": inputJson.CMNM,
                "touchPoint": touchPoint,
                "consultDate": Time.currentTime(),
            })

            if(!isIndexPage()) location.href = "/consult-complete.act" + locationSearch;
            else {
                get$ConsultForm().each(function() {
                    this.reset();
                });
                $(".agree-txt").removeClass("d-none");
            }
        })
    }

    function getInputJson() {
        var inputJson = {}
        inputJson["TAG_EVENT"] = $("#consult").attr("data-tag-event");
        $.each(get$ConsultForm().find("input"), function (i, v) {
            inputJson[$(v).attr("id")] = $(v).val();
        })
        $.each(get$ConsultForm().find("select"), function (i, v) {
            var selectId = $(v).attr("id");
            if (selectId === "HOPE_CNT") {
                inputJson["HOPE_CONTENT"] = $("#" + selectId + " option:selected").text();
            }
            inputJson[selectId] = $(v).val();
        })
        inputJson["EDUCATION"] = $("#termsAgree").prop("checked") ? "Y" : "N";
        return inputJson;
    }

    function getInputJsonByConsult() {
        var inputJson = getInputJson();
        if (isContactFile()) {
            inputJson["CONTACT_TYPE"] = "ì†Œê°œ ë° ë¹„êµìžë£Œ ìš”ì²­";
            inputJson["TYPE"] = 1;
        } else if(isPtRecruit()){
            inputJson["CONTACT_CNTN"] = $("#CONTACT_CNTN").val();
            inputJson["CONTACT_TYPE"] = "íŒŒíŠ¸ë„ˆ ëª¨ì§‘";
            inputJson["ROUTE"] = "íŒŒíŠ¸ë„ˆ ëª¨ì§‘";
            inputJson["TYPE"] = 2;
        } else if(isTargeting()) {
            inputJson["TAG_EVENT"] = $("section").attr("data-tag-event");
            inputJson["CONTACT_TYPE"] = "ì†Œê°œ ë° ë¹„êµìžë£Œ ìš”ì²­ " + targetingType;
            inputJson["ROUTE"] = "íƒ€ì¼“íŒ… íŽ˜ì´ì§€" + targetingType;
            inputJson["TYPE"] = 3;
        } else if(isIndexPage()){
            inputJson["CONTACT_TYPE"] = "ì†Œê°œ ë° ë¹„êµìžë£Œ ìš”ì²­ (ì¸ë±ìŠ¤)";
            inputJson["ROUTE"] = "íƒ€ì¼“íŒ… íŽ˜ì´ì§€ (ì¸ë±ìŠ¤)";
            inputJson["TYPE"] = 1;
            inputJson["TAG_EVENT"] = $("section").attr("data-tag-event");
        } else {
            inputJson["CONTACT_CNTN"] = $("#CONTACT_CNTN").val();
            inputJson["CONTACT_TYPE"] = "ë„ìž…ë¬¸ì˜ (" + inputJson["CONTACT_TYPE"] + ")";
            inputJson["TYPE"] = 4;
        }
        return inputJson;
    }

    function getInputJsonByPartner() {
        var inputJson = getInputJson();
        const partnerId = getPartnerId();
        const companyKey = getCompanyKey(partnerId);
        const memberType = Often.null2Void(inputJson.MEMBER_TYPE, "-");
        inputJson["CONTACT_TYPE"] = "PARTNER_CONSULT_" + partnerId.toUpperCase();
        inputJson["CONTACT_CNTN"] = "" +
            "- " + companyKey + " : " + inputJson.CMNM + "\n" +
            "- ì‚¬ì—…ìžë“±ë¡ë²ˆí˜¸ : " + inputJson.BUSINESS_NUMBER + "\n" +
            "- íšŒì›êµ¬ë¶„ : " + memberType + "\n" +
            "- ì˜ˆìƒ ì‚¬ìš© ì¸ì› : " + inputJson.HOPE_CONTENT + "\n" +
            "- ì´ë¦„ : " + inputJson.USER_NM + "\n" +
            "- ì§ê¸‰/ì§ì±… : " + inputJson.POSITION + "\n" +
            "- ì—°ë½ì²˜ : " + inputJson.CLPH_NO + "\n" +
            "- ì´ë©”ì¼ : " + inputJson.EML + "\n" +
            "- ì—…ì¢… : " + inputJson.SECTORS + "\n" +
            "- ê²½ë¡œ : " + inputJson.ROUTE + "\n" +
            "";
        inputJson["CMNM"] = inputJson.CMNM + "/" + inputJson.BUSINESS_NUMBER + "/" + memberType;
        return inputJson;
    }

    function renderPartnerCompleteView() {
        renderPartnerConsultView(true);
    }

    function renderPartnerConsultView(isComplete) {

        var partnerId = getPartnerId();
        var partnerData = getPartnerList()[partnerId];
        var $consult = $("#consult");

        $consult.find("#consultForm").append('<input id="PARTNER_ID" type="hidden" value="' + partnerId + '" >');
        $consult.find(".visualWrap").prepend('' +
            '<img alt="logo" src="' + partnerData.logo + '" width="300" style="margin-bottom:30px">');

        if (isComplete) {
            $consult.find(".js-title").text(partnerData.title + " ì™„ë£Œ");
            $consult.find('.js-desc').html("");
            $consult.find('.btnWrap').remove();
            return;
        }

        //í—¤ë”
        $consult.css({padding: "10px"});
        $consult.find(".js-title").text(partnerData.title);
        $consult.find('.js-desc').html(partnerData.desc);
        partnerData.header.forEach(function (v) {
            $consult.find('.js-desc').after('<p class="textSubTitle">' + v + '</p>');
        })

        //íšŒì›êµ¬ë¶„
        var $contactType = $consult.find('#CONTACT_TYPE');

        var $memberType = $contactType.parent('li');
        $memberType.find("label").text(partnerId.toUpperCase() + " íšŒì› êµ¬ë¶„");
        $memberType.find("select").attr("id", "MEMBER_TYPE");
        $contactType.empty().html('' +
            '<option value="ì‹ ê·œ">ì‹ ê·œ</option>' +
            '<option value="ê¸°ì¡´">ê¸°ì¡´</option>');

        //íšŒì›ì‚¬ëª…
        var $ul = $consult.find('ul.formList');
        var $memberName = $ul.find("li:eq(1)");
        const companyKey = getCompanyKey(partnerId);
        $memberName.find("label").text(companyKey)
        $memberName.find("input").attr({id: "CMNM", placeholder: companyKey});

        //ì‚¬ì—…ìžë“±ë¡ë²ˆí˜¸
        var $businessNumber = $memberName.clone();
        $businessNumber.find("label").text("ì‚¬ì—…ìžë“±ë¡ë²ˆí˜¸");
        $businessNumber.find("input").attr({id: "BUSINESS_NUMBER", placeholder: "ì‚¬ì—…ìžë“±ë¡ë²ˆí˜¸ (-ì œì™¸)", maxlength: 13});
        $ul.find("li:eq(1)").after($businessNumber);

        //í”Œë¡œìš°ë¥¼ ì ‘í•œê³³
        const $route = $consult.find("#ROUTE");
        $route.empty();
        partnerData.route.forEach(function (v) {
            $route.append('<option value="' + v + '">' + v + '</option>');
        });
        if (isActiveRoute(partnerId)) {
            $route.find("option:first").attr("value", "");
        } else {
            $route.closest("li").css("display","none");
        }

        //ë¬¸ì˜ì‚¬í•­
        $consult.find("#CONTACT_CNTN").parent("li").remove();

        //í‘¸í„°
        partnerData.footer.forEach(function (v) {
            $consult.find("ul.agreeList").append('<li><p style="color:black">' + v + '</p></li>');
        })

        //ìˆœì„œ ì¡°ì •
        var $orderMemberType = $consult.find("#MEMBER_TYPE").parent("li");
        var $orderHopeCnt = $consult.find("#HOPE_CNT").parent("li");
        var $orderPosition = $consult.find("#POSITION").parent("li");
        var $orderBusinessNumber = $consult.find("#BUSINESS_NUMBER").parent("li");
        var $orderUserNm = $consult.find("#USER_NM").parent("li");
        $orderBusinessNumber.after($orderHopeCnt);
        $orderBusinessNumber.after($orderMemberType);
        $orderUserNm.after($orderPosition);

        if (!partnerData.isMemberType) {
            $("#MEMBER_TYPE").parent("li").remove();
        }

        if (partnerData.hasGuideVideo) {
            var $videoWrap = $consult.find(".js-video-wrap");
            $videoWrap.append(getVideo(partnerId)).removeClass("d-none");
        }
    }

    function getPartnerList() {
        return {
            kova: {
                logo: 'flow-renewal/homepage/assets/images/page-consult/kova-logo.gif',
                name: 'ë²¤ì²˜ê¸°ì—…í˜‘íšŒ',
                title: 'í”Œë¡œìš° ë„ìž… ì‹ ì²­',
                desc: 'ë²¤ì²˜ê¸°ì—…í˜‘íšŒ íšŒì‚¬ë¥¼ ìœ„í•œ í”Œë¡œìš° ë„ìž…ì‹ ì²­ íŽ˜ì´ì§€ìž…ë‹ˆë‹¤.<br>' +
                    'ì•„ëž˜ í•­ëª©ë“¤ì„ ìž…ë ¥ í›„ ì‹ ì²­ì£¼ì‹œë©´ ë‹´ë‹¹ìžê°€ ë¹ ë¥´ê²Œ ì•ˆë‚´ ë“œë¦¬ê² ìŠµë‹ˆë‹¤.',
                route: ['-'],
                header: [
                    'â€» <b>ë²¤ì²˜ê¸°ì—…í˜‘íšŒ</b>ë¥¼ í†µí•´ ê°€ìž…í•œ íšŒì›ì—ê²ŒëŠ” ë¬´ë£Œì²´í—˜ê¸°ê°„ 3ê°œì›”ì„ ì œê³µí•©ë‹ˆë‹¤.'
                ],
                footer: [],
                isMemberType: false,
                hasGuideVideo: true,
            },
            kita: {
                logo: 'flow-renewal/homepage/assets/images/page-consult/kita-logo.png',
                name: 'KITA',
                title: 'í”Œë¡œìš° ë„ìž… ì‹ ì²­',
                desc: 'KITA íšŒì›ì‚¬ë¥¼ ìœ„í•œ í”Œë¡œìš° ë„ìž…ì‹ ì²­ íŽ˜ì´ì§€ìž…ë‹ˆë‹¤.<br>' +
                    'ì•„ëž˜ í•­ëª©ë“¤ì„ ìž…ë ¥ í›„ ì‹ ì²­ì£¼ì‹œë©´ ë‹´ë‹¹ìžê°€ ë¹ ë¥´ê²Œ ì•ˆë‚´ ë“œë¦¬ê² ìŠµë‹ˆë‹¤.',
                route: ['í”Œë¡œìš°ë¥¼ ì ‘í•œê³³ì„ ì„ íƒí•˜ì„¸ìš”', 'KITA ì›¹íŽ˜ì´ì§€', 'ì–¸ë¡ í™ë³´', 'ë‰´ìŠ¤ë ˆí„°', 'Email', 'ê²€ìƒ‰', 'ê¸°íƒ€'],
                header: [],
                footer: [
                    'â€» í•´ë‹¹ íŽ˜ì´ì§€ë¥¼ í†µí•œ ì„œë¹„ìŠ¤ ë„ìž…ì€ <b>KITA</b> íšŒì›ì‚¬ì— í•œí•˜ë©°, í”Œë¡œìš° ì‹ ê·œ ê°€ìž… ë° ì—°ê²°ì œ ì‹œ ì ìš©ë©ë‹ˆë‹¤.',
                    'â€» <b>KITA</b> ì‹ ê·œ íšŒì›ì‚¬ì™€ ê¸°ì¡´ íšŒì›ì‚¬ì˜ ê²½ìš° ì ìš© í˜œíƒì´ ë‹¤ë¥´ë©°, ìžì„¸í•œ ë‚´ìš©ì€ í˜œíƒ íŽ˜ì´ì§€ë¥¼ ì°¸ì¡°í•´ì£¼ì„¸ìš”.\t' +
                    '<a href="https://membership.kita.net/card/dcsc/groupWare.do?subIndex=2" target="KITA" ' +
                    'style="color:#623AD6; text-decoration: underline">í˜œíƒ ìžì„¸ížˆ ë³´ê¸°</a>',
                ],
                isMemberType: true,
                hasGuideVideo: false,
            }
        }
    }

    function formInputError(isError, isindex) {
        var indexFormInputError = false;

        $.each(get$ConsultForm().find('.bullet'), function (i, v) {
            var isSelectType = $(v).hasClass("js-select");
            var $targetObj = $(v).next();

            // index íŽ˜ì´ì§€ê°€ ì•„ë‹Œ form
            if(!isindex) {
                if (isSelectType) {
                    var isEmptySelect = ($($targetObj).attr("data-required-yn") === "Y" && $($targetObj).val() === "");
                    if (isEmptySelect) {
                        Often.toast("error", $(v).text() + " required!");
                        $targetObj.focus();
                        isError = true;
                        return false;
                    }
                } else {
                    var checkInputJson = Validation.checkInput($targetObj);
                    if (Object.keys(checkInputJson).length > 0) {
                        Often.toast("error", checkInputJson.errorMessage);
                        checkInputJson.errorObj.focus();
                        isError = true;
                        return false;
                    }
                }
            }
            // index Form
            else {
                if (isSelectType) {
                    var isEmptySelect = ($($targetObj).next().attr("data-required-yn") === "Y" && $($targetObj).next().val() === "");
                    if (isEmptySelect) {
                        $targetObj.attr('class', 'agree-important');
                        if(!indexFormInputError) {
                            Often.toast("error", $(v).text() + " ì„ íƒ ë¶€íƒë“œë¦½ë‹ˆë‹¤!");
                            checkInputJson.errorObj.focus();
                            indexFormInputError = true;
                        }
                        isError = true;
                    } else{
                        $targetObj.attr('class', 'd-none');
                    }
                } else {
                    var checkInputJson = Validation.checkInput($targetObj.next())
                    if (Object.keys(checkInputJson).length > 0) {
                        $targetObj.attr('class', 'agree-important');
                        if(!indexFormInputError) {
                            Often.toast("error", checkInputJson.errorMessage)
                            checkInputJson.errorObj.focus();
                            indexFormInputError = true;
                        }
                        isError = true;
                    } else {
                        $targetObj.attr('class', 'd-none');
                    }
                }
            }
        })
        return isError;
    }

    function getCompanyKey(partnerId) {
        if ("kova" === partnerId) {
            return "íšŒì‚¬ëª…";
        } else {
            return "íšŒì›ì‚¬ëª…";
        }
    }

    function isActiveRoute(partnerId) {
        if ("kova" === partnerId) {
            return false;
        } else {
            return true;
        }
    }

    function getVideo(partnerId) {
        var url = "";
        if ("kova" === partnerId) {
            url = "https://www.youtube.com/embed/qaEz3KDHqFE";
        } else {
            url = "";
        }
        return `<iframe src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }
}()