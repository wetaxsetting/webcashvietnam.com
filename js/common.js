// JavaScript Document

$(document).ready(function() {
	$(window).scroll(function(){
		/* move fixed header */
		$('.header').css('left', -$(this).scrollLeft() + "px");
	});
	/* menu click */
	$(".gsnb_wrap ul").addClass("js_animated");
	$(".js_animated").wrap("<div class='gsnb_inner'></div>");
	$('<div class="header_ly"></div>').appendTo('body');
	var oldIndex = 11;
	$(".gnb .js_menu").click(function(){
		var thisIndex = $(this).parent().index();
		console.log("index:", thisIndex);
		console.log("oldIndex:", oldIndex)

		if(oldIndex == thisIndex){
			console.log("1");
			$(".gsnb_wrap").slideUp(300);
			$(".header_ly").fadeOut(200);
			$("body").css({"overflow":""});
			$(".gnb .js_menu").removeClass('on');
			oldIndex = 111;
		}else{
			console.log("2");
			oldIndex = thisIndex;
			$(".gnb .js_menu").removeClass('on');
			$(this).addClass('on');
			$("body").css({"overflow":"hidden"});
			$(".gsnb_wrap").slideUp(300);
			$(".header_ly").fadeIn(200);
			$(this).next().slideDown(300);
		}
	});
	$(".gsnb_wrap ul li a").click(function(){
		$(".gsnb_wrap").slideUp(300);
		$(".header_ly").fadeOut(200);
		$("body").css({"overflow":""});
		$(".gnb .js_menu").removeClass('on');
		oldIndex =111;
	});
	$(".header_ly").click(function(){
		$(".gsnb_wrap").slideUp(300);
		$(".header_ly").fadeOut(200);
		$("body").css({"overflow":""});
		$(".gnb .js_menu").removeClass('on');
		oldIndex = 111;
	});

	$('.js_wrap').toggleAccordion({
		wrapClass:".js_wrap",
		clickClass:".js_click",
		showClass:".js_show",
		layer:true,
		speed:200
	});

	$('.js_wrap').selectText({
		wrapClass:".js_wrap",
		clickOn:".js_show li a",
		setTextToClass:".js_click",
	});


});
