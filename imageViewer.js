var data;
var server;
var insertData = function (data, index) { };
var close = function () { };
$(function () {
	var totalSlides,sliderWidth;
	var $maskImage=$(".main_content img");
	var contentWidth=1100;
	var minContentWidth=1030;
	var yearIndex;
	var clickOnce;
	var picHeight;
	var pos;
	var dataTitle;
	var dataContent;
	$(".slider_contain").outerWidth(contentWidth - 140);
	$(document).on("click", ".main img", function () {
		picHeight = $(window).innerHeight() - 230;
		initialPage();
		$(".content_box").addClass("old_image_style");
		$(".img_effect").fadeIn().css({
			"display": "inline-block",
			"max-width": contentWidth - 140
		});
		$(".bottom_contain").height("120px");
		slideWidth();
		$(".prev").unbind("click").bind("click", function () {
			clearTimeout(clickOnce);
			clickOnce = setTimeout(function () {
				slidePrev();
				$(".min_slider_contain,.page_num,.white").hide();
			}, 300);
		});
		/*向后滑动*/
		$(".next").unbind("click").bind("click", function () {
			clearTimeout(clickOnce);
			clickOnce = setTimeout(function () {
				slideNext();
				$(".min_slider_contain,.page_num,.white").hide();
			}, 300);
		});
		$(".min_slider_contain,.page_num,.white").hide();
		$(window).resize(function () {
			picHeight = $(window).innerHeight() - 230;
			resizePage();
		});
		resizePage();
		$(".close").click(function () {
			close();
		});

	});
	//$("img").click(function () {

	//	});
		/*Ajax请求数据*/
	insertData = function getData(data,index) {
			dataTitle = [];
			dataContent = [];
			pos = index;
			var left = $(".slider_contain").outerWidth() / 2 - 75;
			$(".bottom_contain").show();
			for (var i = data.length - 1; i >= 0; i--) {
				$(".main_pic").prepend('<div class="main_content"><span class="helper"></span><img class="img_effect" src="'+ data[i].pics + '"></div>');
			}
			for (var i = 0; i < data.length; i++) {
				dataTitle.push(data[i].title);
				dataContent.push(data[i].content);
			}
			$(".img_effect,.img_wrap").fadeIn();
			$(".img_wrap").css("display", "block");
			$(".img_effect").css({
				"display": "inline-block",
				"max-width": contentWidth - 140
			});
			$(".top_contain").find("span").html(yearIndex);
			$(".main_content").outerWidth(contentWidth - 140);
			resizePage();
			slideWidth();
			$(".describ_title").html(dataTitle[pos]);
			$(".describe_content").html(dataContent[pos]);
			$(".main_pic").css("left", -(sliderWidth * index));
		}
		/*弹出页面初始化  初始化图片位置*/
		function initialPage(){
			$(".mask,.content_box").show();
			$(".min_img,.main_pic").empty();
			$(".content_box").width(contentWidth);
			$(".content_box").css("margin-left",-contentWidth/2);
			$(".bottom_contain").width(minContentWidth);
			$(".bottom_contain").css("margin-left", -minContentWidth / 2);
			$("body").css("overflow", "hidden");
		}
		/*slider宽度计算*/
		function slideWidth(){
			totalSlides=$(".main_content").length;
			sliderWidth = $(".main_content").width();
			$(".main_pic").width(totalSlides*sliderWidth);
		}
		/*向前滑动*/
		function slidePrev(){
			if (pos>=1) {
					pos--;
					$(".main_pic").animate({
						"left":-(sliderWidth*pos)
					}, "linear");
					$(".describ_title").html(dataTitle[pos]);
					$(".describe_content").html(dataContent[pos]);
			}
			else{
					pos=totalSlides-1;
					$(".main_pic").css("left", -(totalSlides - 1) * sliderWidth);
					$(".describ_title").html(dataTitle[pos]);
					$(".describe_content").html(dataContent[pos]);
			}
		}
		/*向后滑动*/
		function slideNext() {
			if (pos<=(totalSlides-2)) {
				pos++;
				$(".main_pic").animate({
				"left":-(sliderWidth*pos)
			},"linear");
				$(".describ_title").html(dataTitle[pos]);
				$(".describe_content").html(dataContent[pos]);
			}
			else{
				pos=0;
				$(".main_pic").css("left", "0");
				$(".describ_title").html(dataTitle[0]);
				$(".describe_content").html(dataContent[0]);
			}
		}
		function resizePage() {
			$(".main_content").outerHeight(picHeight);
			$(".img_effect").css("max-height",picHeight);
		}
		/*关闭事件*/
	close=	function () {
			$maskImage.fadeOut(100);
			setTimeout(function () {
				$(".mask,.content_box").fadeOut(100);
				$(".year_Box").empty();
				$("body").css("overflow", "auto");
			}, 100);
		}
	});