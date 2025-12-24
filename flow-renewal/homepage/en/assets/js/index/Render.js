var Render = (function () {

    return {
        init: init,
    };

    function init(){
        hideFunc();
        slickFunc();
        buttonFloatFunc();
        introBtnEvent();
        tabClickEvent();
        isFormPage();
        hideLabel();
    }

    function isFormPage() {
        if(Often.isAct("form")){
            displayIntroLink('none');
            showPopUp();
        }
    }

    function hideFunc(){
        $('.mobile-button-wrap').css("display", "none");
    }

    function slickFunc(){
        $('.js-slide-wrap').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            autoplay: true,
            autoplaySpeed: 3000,
        });
    }

    function buttonFloatFunc(){
        $(window).on('scroll', function(e){
            var wheelHeight = $(document).scrollTop();
            var articleRenderVisualWrap = $(".article-render-visual-wrap");
            var btnFloatPoint = articleRenderVisualWrap.height();
            var productIntroLink = $(".js-point-intro-link");

            if (Math.round( $(window).scrollTop()) < $(document).height() - $(window).height() - $('footer').outerHeight() - 300) {
                productIntroLink.addClass('js-float');
                productIntroLink.removeClass('btn-hide');
            }else{
                productIntroLink.removeClass('js-float')
                productIntroLink.addClass('btn-hide');
            }
            if(wheelHeight < btnFloatPoint){
                $(".js-point-intro-link").addClass('btn-hide');
            }
        })
    }

    function introBtnEvent(){
        $(".product-intro-link").off("click").on("click", function(){
            showPopUp();
        });

        $("#popDimmed .btnPopClose").off("click").on("click", function (e) {
            if (e.target !== e.currentTarget) return;
            $('body').css("overflow", "auto");
            displayIntroLink('flex');
            isBtnHideLocation();
            hidePop();
        });

        $("#popDimmed .popBtnAgree, .mini-agree-pop .btnMiniopClose").off("click").on("click", function(){
            $(".mini-agree-pop").toggleClass("active");
        });

        // íŒì—… ë“œëž˜ê·¸ í´ë¦­ ë°©ì§€
        $("#popDimmed").off("click keyup").on("keyup")
            .mousedown(function (e){
                if (e.target !== e.currentTarget) return;
                $('body').css("overflow", "auto");
                displayIntroLink('flex');
                isBtnHideLocation();
                hidePop();
            });

        $(".product-intro-mail").on("click", function (){
            Consult.submitForm();
        });

    }

    function tabClickEvent() {
        $('.tab-cont > div').hide();
        $('.tab-nav a').on('click', function () {
            $('.tab-cont > div').hide().filter(this.hash).fadeIn();
            $('.tab-nav a').removeClass('active');
            $(this).addClass('active');

            $(".js-slide-wrap").slick("setPosition");
            return false;
        }).filter(':eq(0)').click();
    }

    function showPopUp(){
        $(".js-point-intro-link").css('display', 'none').addClass('btn-hide');
        var consultFormPopup =
            `<form id="consultForm">
                <p class="warn bullet">í•„ìˆ˜ìž…ë ¥ í•­ëª©ìž…ë‹ˆë‹¤.</p>
                <ul class="formList agreeList">
                    <li>
                        <label class="bullet js-input" style="display: none;">ì´ë¦„</label>
                        <input id="USER_NM" type="text" placeholder="ì´ë¦„*" autocomplete="off" data-required-yn="Y" maxlength="100" data-empty-msg="ì´ë¦„ì„ ìž…ë ¥í•´ì£¼ì„¸ìš”!" data-over-msg="ì´ë¦„ì´ 100ìžê°€ ë„˜ìœ¼ì…¨ìŠµë‹ˆë‹¤!">
                    </li>
                    <li>
                        <label class="bullet js-input" style="display: none;">ì „í™”ë²ˆí˜¸</label>
                        <input id="CLPH_NO" type="text" placeholder="ì „í™”ë²ˆí˜¸(-ì œì™¸)*" autocomplete="off" data-required-yn="Y" data-valid="number" maxlength="20" data-empty-msg="ì „í™”ë²ˆí˜¸ë¥¼ ìž…ë ¥í•´ì£¼ì„¸ìš”!" data-over-msg="ì „í™”ë²ˆí˜¸ê°€ 20ìžê°€ ë„˜ìœ¼ì…¨ìŠµë‹ˆë‹¤!" data-un-valid-msg="ì „í™”ë²ˆí˜¸ëŠ” ìˆ«ìžë§Œ ìž…ë ¥í•´ì£¼ì„¸ìš”!">
                    </li>
                    <li>
                        <label class="bullet js-input" style="display: none;">ì´ë©”ì¼</label>
                        <input id="EML" type="text" placeholder="ì´ë©”ì¼*" autocomplete="off" data-valid="email" maxlength="50" data-empty-msg="ì´ë©”ì¼ì„ ìž‘ì„±í•´ì£¼ì„¸ìš”!" data-over-msg="ì´ë©”ì¼ì´ 50ìžê°€ ë„˜ìœ¼ì…¨ìŠµë‹ˆë‹¤!" data-un-valid-msg="ì˜¬ë°”ë¥¸ ì´ë©”ì¼ì„ ìž‘ì„±í•´ì£¼ì„¸ìš”!">
                    </li>
                    <li>
                        <label class="bullet js-input" style="display: none;">íšŒì‚¬ëª…</label>
                        <input id="CMNM" type="text" placeholder="íšŒì‚¬ëª…*" autocomplete="off" data-required-yn="Y" maxlength="100" data-empty-msg="íšŒì‚¬ëª…ì„ ìž…ë ¥í•´ì£¼ì„¸ìš”!" data-over-msg="íšŒì‚¬ëª…ì´ 100ìžê°€ ë„˜ìœ¼ì…¨ìŠµë‹ˆë‹¤!">
                    </li>
                    <li>
                        <label class="bullet js-input" style="display: none;">ì§ê¸‰/ì§ì±…</label>
                        <input id="POSITION" type="text" placeholder="ì§ê¸‰/ì§ì±…*" autocomplete="off" data-required-yn="Y" maxlength="100" data-empty-msg="ì§ê¸‰/ì§ì±…ì„ ìž…ë ¥í•´ì£¼ì„¸ìš”!" data-over-msg="ì§ê¸‰/ì§ì±…ì´ 100ìžê°€ ë„˜ìœ¼ì…¨ìŠµë‹ˆë‹¤!">
                    </li>
                    <li>
                        <label class="bullet js-select" style="display: none;">ì—…ì¢…</label>
                        <select id="SECTORS" data-required-yn="Y">
                            <option value="">ì—…ì¢…ì„ ì„ íƒí•˜ì„¸ìš”*</option>
                            <option value="Produce">ì œì¡°ì—…</option>
                            <option value="IT">ì •ë³´í†µì‹ ì—…(IT)</option>
                            <option value="Franchise">F&amp;B, í”„ëžœì°¨ì´ì¦ˆ</option>
                            <option value="Logistics">ë„Â·ì†Œë§¤ ìœ í†µ íŒë§¤</option>
                            <option value="Entertain">ì—”í„°í…Œì¸ë¨¼íŠ¸, ì—¬í–‰, ì˜ˆìˆ </option>
                            <option value="Public">ê³µê³µ í–‰ì •</option>
                            <option value="Construct">ê±´ì„¤ ë° ê¸°ê°„ ì‚°ì—…</option>
                            <option value="Tax">ì„¸ë¬´, ë²•ë¬´, ë…¸ë¬´</option>
                            <option value="Transportation">ìš´ìˆ˜ ë° ë¬¼ë¥˜</option>
                            <option value="Medical">ì˜ë£Œ ë³´ê±´, ì‚¬íšŒ ë³µì§€</option>
                            <option value="Finance">ê¸ˆìœµ, ë³´í—˜, ë¶€ë™ì‚°</option>
                            <option value="Association">í˜‘íšŒ ë° ë‹¨ì²´</option>
                            <option value="Research">êµìœ¡ ë° ì—°êµ¬</option>
                            <option value="agriculture">1ì°¨ ì‚°ì—…(ë†Â·ìž„Â·ìˆ˜ì‚°ì—…)</option>
                            <option value="etc">ê¸°íƒ€</option>
                        </select>
                        <i class="icons-arrow-textgo"></i>
                    </li>
                    <li>
                        <label class="bullet js-select" style="display: none;">ì˜ˆìƒ ì‚¬ìš© ì¸ì›</label>
                        <select id="HOPE_CNT" data-required-yn="Y">
                            <option value="">ì˜ˆìƒ ì‚¬ìš© ì¸ì›ì„ ì„ íƒí•˜ì„¸ìš”*</option>
                            <option value="10">10ì¸ ì´í•˜</option>
                            <option value="11">10ì¸ ì´ìƒ ~ 30ì¸ ì´í•˜</option>
                            <option value="31">31ì¸ ì´ìƒ ~ 50ì¸ ì´í•˜</option>
                            <option value="51">51ì¸ ì´ìƒ ~ 100ì¸ ë¯¸ë§Œ</option>
                            <option value="100">100ì¸ ì´ìƒ</option>
                            <option value="500">500ì¸ ì´ìƒ</option>
                            <option value="1000">1000ì¸ ì´ìƒ</option>
                        </select>
                        <i class="icons-arrow-textgo"></i>
                    </li>
                </ul>
                <ul class="agreeList" style="width: 450px;">
                    <li class="privacy-agree">
                        <input id="privacyAgree" type="checkbox">
                        <label for="privacyAgree">
                            <p>
                                <span class="agree-txt-red">[í•„ìˆ˜]</span>&nbsp;
                                <a class="btnAgree js-privacy-agree-btn">ê°œì¸ì •ë³´ ìˆ˜ì§‘ ë° ì´ìš©</a>ì— ë™ì˜í•©ë‹ˆë‹¤.
                            </p>
                            <span class="d-none">í•„ìˆ˜ ë™ì˜ í•­ëª©ìž…ë‹ˆë‹¤.</span>
                        </label>
                    </li>
                    <li class="marketing-agree">
                        <input id="marketingAgree" type="checkbox">
                        <label for="marketingAgree" class="clearFix">
                            <p>
                                <span id="marketingRequired" class="agree-txt-red" data-required-yn="Y">[í•„ìˆ˜]</span>&nbsp;
                                <a class="btnAgree js-marketing-agree-btn">í™ë³´ ë° ë§ˆì¼€íŒ… ìˆ˜ì§‘ãƒ»ì´ìš©</a>ì— ë™ì˜í•©ë‹ˆë‹¤.
                            </p>
                        </label>
                        <em class="marketing-agree-badge"><span>âœ“</span> ì²´í¬ì‹œ í”Œë¡œìš° ë¬´ë£Œ êµìœ¡ / ë¦¬í¬íŠ¸ ì œê³µ</em>
                    </li>
                </ul>
            </form>`;
        $("#popConsultForm").append(consultFormPopup);
        $('body').css("overflow", "hidden");
        $("#popDimmed.intro-mail-send-pop").css("display", "flex");
    }

    function hidePop(){
        $("#popConsultForm").empty();
        $("#popDimmed.intro-mail-send-pop").hide();
    }

    function isBtnHideLocation(){
        var wheelHeight = $(document).scrollTop();
        var btnFloatPoint = $(".article-render-visual-wrap").height();
        var articleHeight = $(".article-main-cont-wrap").height() + 300;
        if(wheelHeight < btnFloatPoint || (articleHeight < wheelHeight)){
            $(".js-point-intro-link").addClass('btn-hide');
        } else {
            $(".js-point-intro-link").removeClass('btn-hide');
        }
    }

    function displayIntroLink(display){
        $(".js-point-intro-link").css('display', display);
    }

    function hideLabel(){
        $('.bullet.js-input, .js-select').css('display', 'none');
    }

})();