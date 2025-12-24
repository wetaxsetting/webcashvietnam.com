var mainPageFunc = function(){
    function init(){
        topHumanFunc();
        customerSLickFunc();
        accordFunc();
        $(window).on('scroll', function () {
            Interaction.fadeInOnScroll($('.js-opcity-section'));
        });
    }

     // humanì˜ì—­ ë§ˆìš°ìŠ¤ ì¸í„°ë ‰ì…˜
     function topHumanFunc(){
         if(window.innerWidth > 1280){

             var bg;
             var x = 0;
             var y = 0;
             var mx = 0;
             var my = 0;
             var speed = 0.025;
             window.onload = function(){
                 bg = document.getElementsByClassName("js-parallax-wrap")[0];

                 window.addEventListener("mousemove", mouseFunc, false);

                 function mouseFunc(e){
                     x = (e.clientX - window.innerWidth / 2);
                     y = (e.clientY - window.innerHeight / 2);
                 }
                 loop();
             }

             function loop(){
                 mx += (x - mx) * speed;
                 my += (y - my) * speed;

                 bg.style.transform = "translate("+ -(mx/6) +"px," + -(my/6) +"px)";

                 window.requestAnimationFrame(loop);
             }
         }

     }

     // ê³ ê°ì‚¬ ì†Œê°œ ìŠ¬ë¼ì´ë“œ ì˜ì—­ slick ì‚¬ìš© í•¨ìˆ˜
     function customerSLickFunc(){
         $('.js-enter-cont').slick({
             slide: 'div',		//ìŠ¬ë¼ì´ë“œ ë˜ì–´ì•¼ í•  íƒœê·¸ ex) div, li
             infinite : true, 	//ë¬´í•œ ë°˜ë³µ ì˜µì…˜
             slidesToShow : 1,		// í•œ í™”ë©´ì— ë³´ì—¬ì§ˆ ì»¨í…ì¸  ê°œìˆ˜
             slidesToScroll : 1,		//ìŠ¤í¬ë¡¤ í•œë²ˆì— ì›€ì§ì¼ ì»¨í…ì¸  ê°œìˆ˜
             speed : 0,	 // ë‹¤ìŒ ë²„íŠ¼ ëˆ„ë¥´ê³  ë‹¤ìŒ í™”ë©´ ëœ¨ëŠ”ë°ê¹Œì§€ ê±¸ë¦¬ëŠ” ì‹œê°„(ms)
             arrows : true, 		// ì˜†ìœ¼ë¡œ ì´ë™í•˜ëŠ” í™”ì‚´í‘œ í‘œì‹œ ì—¬ë¶€
             dots : false, 		// ìŠ¤í¬ë¡¤ë°” ì•„ëž˜ ì ìœ¼ë¡œ íŽ˜ì´ì§€ë„¤ì´ì…˜ ì—¬ë¶€
             autoplay : true,			// ìžë™ ìŠ¤í¬ë¡¤ ì‚¬ìš© ì—¬ë¶€
             autoplaySpeed : 8000, 		// ìžë™ ìŠ¤í¬ë¡¤ ì‹œ ë‹¤ìŒìœ¼ë¡œ ë„˜ì–´ê°€ëŠ”ë° ê±¸ë¦¬ëŠ” ì‹œê°„ (ms)
             pauseOnHover : false,		// ìŠ¬ë¼ì´ë“œ ì´ë™	ì‹œ ë§ˆìš°ìŠ¤ í˜¸ë²„í•˜ë©´ ìŠ¬ë¼ì´ë” ë©ˆì¶”ê²Œ ì„¤ì •
             pauseOnFocus: false,
             pauseOnDotsHover: false,
             vertical : false,		// ì„¸ë¡œ ë°©í–¥ ìŠ¬ë¼ì´ë“œ ì˜µì…˜
             prevArrow: $(".btn-slide-prev"),
             nextArrow: $(".btn-slide-nxt"),
             dotsClass : "slick-dots", 	//ì•„ëž˜ ë‚˜ì˜¤ëŠ” íŽ˜ì´ì§€ë„¤ì´ì…˜(ì ) css class ì§€ì •
             draggable : false, 	//ë“œëž˜ê·¸ ê°€ëŠ¥ ì—¬ë¶€
             variableWidth: true,
             centerMode: true,
             mobileFirst: true,
             initialSlide: 0,
             responsive: {
                 breakpoint: 1240
             }
         });
         $(".main-wrap__section__customer").css("opacity", 1);
     }

     // ìŠ¤í¬ë¡¤í•´ì„œ í•´ë‹¹ ì˜ì—­ ìœ„ì¹˜ê¹Œì§€ ì™”ì„ ë•Œ ì„¹ì…˜ ë…¸ì¶œ ì‹œí‚¤ëŠ” í•¨ìˆ˜
     var Interaction = function () {
         return {
             fadeInOnScroll: fadeInOnScroll,
         }
         function isElementUnderBottom(elem, triggerDiff) {
             var _elem$getBoundingClie = elem.getBoundingClientRect();

             var top = _elem$getBoundingClie.top;
             var _window = window;
             var innerHeight = _window.innerHeight;

             return top > innerHeight + (triggerDiff || 0);
         }

         function fadeInOnScroll() {
             var elems = document.querySelectorAll('.js-opcity-section');
             elems.forEach(function (elem) {
                 if (isElementUnderBottom(elem, -20)) {
                     elem.style.opacity = "0";
                 } else {
                     elem.style.opacity = "1";
                 }
             });
         }

     }();

     // ì•„ì½”ë””ì–¸ ì˜ì—­ í•¨ìˆ˜ (ì˜ìƒ ìž¬ìƒ ì˜ì—­ ê´€ë ¨í•¨ìˆ˜ í¬í•¨)
     function accordFunc(){
         var accordWrap = $('.js-accordian-wrap'),
             accordItem = accordWrap.children('li'),
             videoWrap = $(".video-wrap.js-video-wrap");

         accordItem.on("click", function(e){
             e.preventDefault();
             var targetNum = $(this).index()+1,
                 targetMo = $(this).find('dd > div');
             videoWrap.empty();
             if(window.innerWidth < 1280){
                 videoFunc(targetMo, targetNum);
             } else{
                 videoFunc(videoWrap, targetNum);
             }

             if($(this).find('dd').is(':hidden')){
                 accordItem.removeClass('active');
                 accordItem.find('dd').slideUp();
                 $(this).addClass('active');
                 $(this).find('dd').slideDown('normal');
             }
         })
     }
     function videoFunc(target, fileName){
         target.html(`
                <video loop="" autoplay="" muted="" playsinline src="/flow-renewal/homepage/en/assets/video/${fileName}.mp4" poster="/flow-renewal/homepage/en/assets/video/${fileName}.png">
                    <source src="/flow-renewal/homepage/en/assets/video/${fileName}.mp4" type="video/ogg">
                </video>
                `);
     }
     return {
        init: init
     }
}();

mainPageFunc.init();