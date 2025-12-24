var floatBannerClose = function () {
    var $closeButton = $(".js-button-close");
    var articleFloatBanner = $(".article_float_banner");
    $closeButton.on("click", function () {
        articleFloatBanner.hide();
    })
}();

var floatBannerOnedayClose = function () {
    var $onedayCloseButton = $(".js-button-close-one-day");
    var $articleFloatBanner = $(".article_float_banner");
    if ("N" === Often.getCookie('HOMEPAGE_POPUP')) {
        $articleFloatBanner.hide();
        return;
    }
    $onedayCloseButton.on("click", function () {
        todayClose();
    })
}();