var Interaction = function () {

    return {
        fadeInOnScroll: fadeInOnScroll,
        countup: countup,
        animateBannerTotal: animateBannerTotal,
    }


    function isElementUnderBottom(elem, triggerDiff) {
        var _elem$getBoundingClie = elem.getBoundingClientRect();

        var top = _elem$getBoundingClie.top;
        var _window = window;
        var innerHeight = _window.innerHeight;

        return top > innerHeight + (triggerDiff || 0);
    }

    function fadeInOnScroll() {
        var elems = document.querySelectorAll('.contentsWrap');
        elems.forEach(function (elem) {
            if (isElementUnderBottom(elem, -20)) {
                elem.style.opacity = "0";
                elem.style.transform = 'translateY(70px)';
            } else {
                elem.style.opacity = "1";
                elem.style.transform = 'translateY(0px)';
            }
        });
    }

    function countup($this) {
        var countTo = $this.attr('data-max');
        $({countNum: $this.text()}).animate(
            {countNum: countTo},
            {
                duration: 1000,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                }
            }
        );
    }

    function animateBannerTotal() {
        var windowWidth = $(window).width();
        var SPEED = 20;
        var leftImages = [56, 1, 2, 3, 4, 5, 59, 6, 7, 61, 55, 8, 9, 50, 10, 11, 12, 13, 14, 15, 16, 17, 56, 1, 2, 3, 4, 5, 6, 7, 55, 8, 9, 50, 10, 11, 12, 13, 14, 15, 16, 17];
        var rightImages = [18, 19, 20, 62, 53, 21, 57, 22, 23, 24, 25, 26, 51, 27, 28, 29, 52, 30, 31, 32, 33, 34, 18, 19, 20, 53, 21, 22, 23, 24, 25, 26, 51, 27, 28, 29, 52, 30, 31, 32, 33, 34];

        var IMG_FIX_WIDTH;
        if (windowWidth <= 1024) {
            IMG_FIX_WIDTH = 130;
        } else {
            IMG_FIX_WIDTH = 240;
        }

        //animateBanner2($("#bannerLeft"), leftImages, false);
        //animateBanner2($("#bannerRight"), rightImages, true);

        function get$Img(num) {
            var srcPath = "/flow-renewal/homepage/en/assets/images/company/";
            var $img = $("<img/>");
            $img.attr("src", srcPath + "company-" + num + ".svg");
            return $img;
        }

        function animateBanner2($bannerArea, images, isLeft) {
            var direction = isLeft ? -1 : 1;
            var base = isLeft ? ":first" : ":last";
            var indexControlNum = isLeft ? 0 : -1;
            images.forEach(function (v, i) {
                var index = i + indexControlNum;
                var $img = get$Img(v)
                    .attr({
                        id: "banner" + index,
                        class: "js-banner-item",
                    })
                    .css("left", IMG_FIX_WIDTH * index);
                $bannerArea.append($img);
            });

            var addTimer = 0;
            setInterval(function () {
                var isLeftEdge = $bannerArea.find(".js-banner-item:first").position().left > 0;
                var isRightEdge = $bannerArea.find(".js-banner-item:first").position().left < -IMG_FIX_WIDTH;
                //Todo. ë¶„ëª… ë°©ë²• ìžˆëŠ”ë°

                $bannerArea.find(".js-banner-item").each(function (index, el) {
                    $(el).css("left", $(el).position().left + direction); // 1pxì”© ì™¼ìª½ìœ¼ë¡œ ì´ë™
                    addTimer++;
                    if ((isLeft && isLeftEdge) || (!isLeft && addTimer > SPEED * IMG_FIX_WIDTH)) {
                        addTimer = 0;
                        var $firstObj = $bannerArea.find(".js-banner-item" + base);
                        var $firstClone = $firstObj.clone();
                        $firstClone.css("left", $firstObj.position().left - direction * IMG_FIX_WIDTH * images.length);
                        isLeft ? $bannerArea.append($firstClone) : $bannerArea.prepend($firstClone);
                        $firstObj.remove();
                    }
                });
            }, SPEED);
            // ì†ë„ì¡°ì •
        }
    }

}()