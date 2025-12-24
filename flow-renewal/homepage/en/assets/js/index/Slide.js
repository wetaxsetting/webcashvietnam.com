var Slide = function () {

    return {
        slideFunc: slideFunc,
    }

    /**
     slideFunc
     1. ì¸ìž ê°’: ìŠ¬ë¼ì´ë“œ ë°°ë„ˆê°€ ë™ìž‘í•´ì•¼í•  divì˜ í´ëž˜ìŠ¤ëª…, ì•„ì´ë””ëª…ì„ ë„£ëŠ”ë‹¤
     ex) slideFunc(className)

     2. í•„ìš”í•œ í´ëž˜ìŠ¤ëª…
     - slideFunc, slideFuncItem, slideFuncTxt, slide-gauge
     */

    function slideFunc(targetWrap) {
        renewalSlideInteractionFunc();
        var timer;

        if (targetWrap === ".flowAllInOne" && document.body.clientWidth < 768) {
            //pass
        } else {
            interval();
        }

        $("#flowAllInOneNav").on("click", clickAllInOneNav);

        $(targetWrap).find(".slideNextBtn").on("click", function () {
            btnFunc(slideNextFunc);
        })

        $(targetWrap).find(".slidePrevBtn").on("click", function () {
            btnFunc(slidePrevFunc);
        })

        function interval() {
            timer = setInterval(function () {
                slideNextFunc();
                changeTabBySlideOn();
            }, 5000)
        }

        function changeTabBySlideOn() {
            if (targetWrap !== ".flowAllInOne") return;
            var $flowAllInOne = $(targetWrap);
            var $items = $flowAllInOne.find(".slideFuncItem");
            var $onItem = $flowAllInOne.find(".slideFuncItem.on");
            var idx = $items.index($onItem);
            $flowAllInOne.find("#flowAllInOneNav").find('li').removeClass('active');
            $flowAllInOne.find("#flowAllInOneNav").find('li').eq(idx).addClass('active');
        }

        function btnFunc(arrowFuncName) {
            clearInterval(timer);
            arrowFuncName(targetWrap);
            interval()
        }

        function slideNextFunc() {
            var slideFuncWrap = $(targetWrap).find(".slideFunc");
            var slideFuncItem = slideFuncWrap.find(".slideFuncItem")
            var slideFuncItemNum = slideFuncItem.length;

            for (var i = 0; i <= slideFuncItemNum; i++) {
                if (slideFuncItem.eq(i).hasClass("on")) {
                    if (slideFuncItemNum === i + 1) {
                        slideFuncItem.removeClass("on")
                        slideFuncItem.eq(0).addClass("on")
                        slideFuncItem.eq(0).find(".slideFuncTxt").addClass("on");
                        break;
                    } else {
                        slideFuncItem.removeClass("on")
                        slideFuncItem.eq(i + 1).addClass("on")
                        slideFuncItem.children(".slideFuncTxt").removeClass("on");
                        slideFuncItem.eq(i + 1).find(".slideFuncTxt").addClass("on");
                    }
                    break;
                }
            }

            clientStoryCase();
            cooperationWrapCase();
            flowAllInOneCase();
            flowAllInOneNewCase()
        }

        function slidePrevFunc(target) {
            target = targetWrap;
            var slideFuncWrap = $(target).find(".slideFunc");
            var slideFuncItem = slideFuncWrap.find(".slideFuncItem")
            var slideFuncItemNum = slideFuncItem.length;

            for (var i = 0; slideFuncItemNum >= i; i++) {
                if (slideFuncItem.eq(i).hasClass("on")) {
                    if (slideFuncItemNum === 0) {
                        slideFuncItem.removeClass("on")
                        slideFuncItem.eq(slideFuncItemNum - 1).addClass("on")
                        slideFuncItem.eq(slideFuncItemNum - 1).find(".slideFuncTxt").addClass("on");
                        break;
                    } else {
                        slideFuncItem.removeClass("on")
                        slideFuncItem.eq(i - 1).addClass("on")
                        slideFuncItem.children(".slideFuncTxt").removeClass("on");
                        slideFuncItem.eq(i - 1).find(".slideFuncTxt").addClass("on");
                    }
                    break;
                }
            }

            clientStoryCase();
            cooperationWrapCase();
            flowAllInOneCase();
            flowAllInOneNewCase()
        }

        function clientStoryCase() {
            var url = $(".slideFuncItem.on").attr("data-url");
            $(".clientStory-slide-wrap")
                .css('background', 'linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(' + url + ') center no-repeat')
                .css('background-size', 'cover');
        }

        function flowAllInOneCase() {
            var $flowAllInOne = $(".mainSection .flowAllInOne.flow-original");
            var url = $flowAllInOne.find(".slideFuncItem.on").attr("data-url");
            $flowAllInOne.find('.innerSection')
                .css('background', '#F5F4F9 url(' + url + ') bottom left 50px no-repeat')
                .css('background-size', '40%');
        }

        function flowAllInOneNewCase() {
            var $flowAllInOne = $(".mainSection.renewal-section .flowAllInOne.flow-renewal");
            var url = $flowAllInOne.find(".slideFuncItem.on").attr("data-url");
            $flowAllInOne.find('.innerSection')
                .css('background', 'url(' + url + ') bottom right no-repeat')
                .css('background-size', '1000px 820px');
        }

        function renewalSlideInteractionFunc(){
            var slideFuncItem = $(".mainSection.renewal-section .slideFuncItem");
            if (document.body.clientWidth <= 1024) {
                for(var i = 1; i <= slideFuncItem.length; i++){
                    slideFuncItem.eq(i-1).attr('data-url', '/flow-renewal/homepage/en/assets/images/main/main-function-mb'+i+'.png')
                }
            }
        }

        function cooperationWrapCase() {
            var cooperationWrap = $(".cooperationWrap");
            var url = cooperationWrap.find(".slideFuncItem.on").attr("data-url");
            cooperationWrap.find('.innerSection')
                .css('background', 'url(' + url + ') center left no-repeat')
                .css('background-size', '40%');
        }


        // ë©”ì¸íŽ˜ì´ì§€ì— ìžˆëŠ” íƒ­ ë‹¬ë¦° ìŠ¬ë¼ì´ë“œë°°ë„ˆ ë™ìž‘ ê¸°ëŠ¥
        function clickAllInOneNav(e) {

            var $slideFuncItem = $(".flowAllInOne").find(".slideFuncItem");
            var $this = $(e.currentTarget);
            var $item = $(e.target).closest("li");
            var $items = $this.children("li");
            var idx = $items.index($item);
            if ($item.length === 0) return;

            $items.removeClass("active");
            $item.addClass("active");

            if (document.body.clientWidth <= 1024) {
                $slideFuncItem.removeClass('on');
                $slideFuncItem.eq(idx).addClass('on');
                flowAllInOneCase();
                flowAllInOneNewCase();
                return;
            }

            btnFunc(function () {
                $slideFuncItem.removeClass('on');
                $slideFuncItem.eq(idx).addClass('on');
                flowAllInOneCase();
                flowAllInOneNewCase();
            })
        }
    }
}()
