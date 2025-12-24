var HeaderNFooter = (function () {

    var urls = {
        manual : "https://support.flow.team/hc/ko",
        faq: "https://support.flow.team/hc/ko/categories/204406027-%EC%9E%90%EC%A3%BC-%EB%AC%BB%EB%8A%94-%EC%A7%88%EB%AC%B8",
        tip: "https://post.flow.team/category/tip",
        insight: "https://post.flow.team/category/insight",
        video: "https://post.flow.team/category/video",
        interview: "https://post.flow.team/category/interview",
        news: "https://post.flow.team/category/news",
        blog: "https://post.flow.team/",
        youtube: "https://www.youtube.com/channel/UCmnzKvpQMl8uyT1PUMdPsXQ",
        facebook: "https://www.facebook.com/flow.team/",
        instagram: "https://www.instagram.com/flow.designlab/",
    }

    return {
        addEvent: addEvent,
    };

    function addEvent() {
        $("nav").on({
            mouseover: activeItem,
            mouseleave: disabledItem,
        });
        $(".btnNavi").on("click", clickMobileHamburger);
        $(".btnTop").on("click", function () {
            $("html, body").animate({scrollTop: 0}, 500);
        });
        $(".btnBannerClose").on("click", function () {
            $('.mainBannerWrap').addClass('on');
        });
        $(".js-go-url").on("click", function (e) {
            e.preventDefault();
            var code = $(this).attr("data-code");
            window.open(urls[$(this).attr("data-code")], code);
        })
        $("#m-voucher-banner").on("click", function () {
            OpenUtil.openWindow('https://www.flow.team/goodchance', '_blank');
        })
        $(".js-signup-btn").on("click", function() {
            // const projectInviteKey = Often.null2Void(window.CONNECT_INVITE_KEY);
            // Often.submitForm("invite_form", "/signup.act", "_self", {INVT_KEY: projectInviteKey});
            // window.open("https://morningmate.com/vn/index", '_blank');

            // console.log('hihihi');
        });

        // ëª¨ë°”ì¼ (ë¹„ëŒ€ë©´ ë°”ìš°ì²˜ ë°°ë„ˆ) ì œì™¸
        /*
        < ëª¨ë“  ëª¨ë°”ì¼ì„œ ë¹„ëŒ€ë©´ ë°”ìš°ì²˜ ì œì™¸ (ìž„ì‹œì¡°ì¹˜) >
        var mobileVoucherExceptionPages = ["terms", "privacy", "company", "consult"];
        var isMobileVoucherNecessary = isArrayContainPage(mobileVoucherExceptionPages);
        if(Often.isMobile() && isMobileVoucherNecessary)
            $(".article_float_banner").css("display", "none");
        */

        // web (ë¹„ëŒ€ë©´ ë°”ìš°ì²˜ ë°°ë„ˆ) ì œì™¸
        var VoucherExceptionPages = ["company", "corpsignup", "corpsignin"];
        var isVoucherNecessary = isArrayContainPage(VoucherExceptionPages);
        if (isVoucherNecessary)
            $(".voucher").css("display", "none");

        // (ì†Œê°œ ë° íƒ€ì‚¬ ë¹„êµìžë£Œ ì‹ ì²­ ë°°ë„ˆ) ìœ ë¬´ íŒë³„
        var bannerNecessaryPages = ["terms", "privacy", "signin", "corpsignin", "setpwd_renewal", "signup", "corpsignup", "company", "consult", "pt-recruit", "finance", "marketing", "design"]; // web ë°°ë„ˆ ì œì™¸
        var mobileExceptionPages = ["terms", "privacy", "signin", "corpsignin", "setpwd_renewal", "signup", "corpsignup", "consult", "pt-recruit"]; // web ì œì™¸ ë¬´ì‹œ í›„ mobileì— ë°°ë„ˆ ì¶”ê°€
        var isNecessary = isArrayContainPage(bannerNecessaryPages);
        var isMobileNecessary = isArrayContainPage(mobileExceptionPages);

        if (!isNecessary || (Often.isMobile() && isMobileNecessary)) {
            $("#topBannerButton").removeClass('d-none');
        }

        function isArrayContainPage(pages) {
            var necessaryResult = false;
            pages.forEach(function (page){
                if (Often.isAct(page)) {
                    necessaryResult = true;
                    return necessaryResult;
                }
            })
            return necessaryResult;
        }

        if (Often.isAct("company")) {
            $("#topBannerButton").addClass("company");
            $("#headerInnerSection").addClass("company");
        }
    }

    function activeItem(e) {
        var $gnbList = $(e.target).closest(".gnbList");
        if ($gnbList.length === 0) return;
        $(e.currentTarget).find(".gnbList").removeClass('active');
        $gnbList.addClass('active');
    }

    function disabledItem(e) {
        $(e.currentTarget).find(".gnbList").removeClass('active');
    }

    function clickMobileHamburger() {
        var $mobileGnb = $(".mobileMenu");
        $mobileGnb.toggleClass("open");
        if ($mobileGnb.hasClass("open")) {
            $("#ch-plugin").css("display", "none");
            $("html").css("overflow", "hidden");
            $('.mobileGnbItem').on("click", function () {
                $(this).toggleClass('open');
            });
            $(".top-thin-banner").css("display", "none");
            mobileBtnWrapToggle("flex");

        } else {
            $("#ch-plugin").css("display", "");
            $("html").css("overflow", "visible");
            $('.mobileGnbItem').off("click");
            $(".top-thin-banner").css("display", "block");
            mobileBtnWrapToggle("none");

        }
    }

    // KSH : ëª¨ë°”ì¼ìš© í•˜ë‹¨ 2ê°œì˜ ë²„íŠ¼ì´ ë‚˜ì˜¤ì§€ ì•ŠëŠ” íŽ˜ì´ì§€ì—ì„œ, í–„ë²„ê±° ë©”ë‰´ ë„ìš¸ì‹œì—ëŠ” 2ê°œì˜ ë²„íŠ¼ì´ ë³´ì´ë„ë¡ ì²˜ë¦¬í•˜ëŠ” í•¨ìˆ˜.
    // íšŒì‚¬ì†Œê°œ - /company.act
    // ì†Œê°œ ë° ë¹„êµìžë£Œ ì‹ ì²­ - /consult.act?contact=resource
    // ë„ìž…ë¬¸ì˜ - /consult.act
    function mobileBtnWrapToggle(displayVal){
        var companySection = $("#company");
        var consultSection = $("#consult");

        if(companySection || consultSection){
            $(".mobile-button-wrap").css("display", displayVal);
        }
    }

})();