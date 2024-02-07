(function($) {

	"use strict";

	/* ================ Dynamic content height. ================ */
	var winH = $(window).height(),
		barH  = $('.top-bar').outerHeight(),
		headH = $('.top-head').outerHeight(),
		footH = $('#footWrapper').outerHeight(),
		H = winH -(barH + headH + footH);
	$('#contentWrapper').css('min-height',H);
	
	var $rt = false;
	if($('html').attr('dir') == 'rtl'){
		$rt = true;
	}

	/* ================ Check for Mobile. ================ */
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	 	$('html').addClass('touch');
	}else{
		$('html').addClass('no-touch');
	}
	$('.touch .fx').addClass('animated'); // disables mobile animations
	
	/* ================ Top Menu. ================ */
	$('.current-menu-item').addClass('selected').parents('li').addClass('selected');
	var mnav = $('.nav-animate.top-nav > ul');
	var mainnav = $('.top-nav > ul');
	
	mnav.find(' > li').each(function(){
		var txtH = $(this).find('> a > span span').clone().children().remove().end().text();
		$(this).find('> a > span').attr('data-hover',txtH);
	});
	mainnav.find('li').not('.megamenu li').each(function(){
		var submenu = $(this).find('> ul');
		if (submenu.length){
			$(this).addClass('hasChildren');
		}
	});
	
	mainnav.find('li.megamenu').each(function(){
		$(this).find('> a').wrap('<span class="inner-mega"></span>');
	});
	
	/* =================== Side Nav ===================== */
	if($('.header-left').length > 0){
		$('.pageWrapper').addClass('left-side-wrap');
	}
	if($('.header-right').length > 0){
		$('.pageWrapper').addClass('right-side-wrap');
	}
	if($('.side-nav').length > 0){
		var side_menu = $('.side-nav > ul'),
			items = side_menu.find('li');
		side_menu.find('ul').addClass('main-bg');
		items.each(function(){
			var ul = $(this).find('ul:first');
			if (ul.length){
				$(this).addClass('hasChildren');
				$(this).hover(function(){
					$(this).find('> ul').stop(true, true).delay(500).fadeIn(500);
				},function(){
					$(this).find('> ul').stop(true, true).delay(300).fadeOut(300);
				});
			}
		});
	}
	
	/* ================ Show Hide Search box. ================ */
	$('.top-search .search-box').prepend('<a href="#" class="close-srch fa fa-times"></a>');
	$('.top-search > a').on("click",function(){
		var sbox = $(this).parent().find('.search-box');
		if(sbox.is(':visible')){
			$(this).parent().find('.srch-overlay').remove();
			sbox.hide().removeClass('animated zoomInDown').addClass('fx');
			return false;
		}else{
			$(this).parent().append('<div class="srch-overlay"/>');
			sbox.show().delay(500).removeClass('fx').addClass('animated zoomInDown');
			return false;
		}
	});
	$('.close-srch').on("click",function(e){
		$(this).parent().parent().find('.srch-overlay').fadeOut(500).remove();
		$(this).parent().parent().find('.search-box').hide().removeClass('animated zoomInDown').addClass('fx');
		return false;
	});	
	
	/* ================ Show Hide Cart box. ================ */
	$('.top-cart > a').on("click",function(){
		if($(this).parent().find('.cart-box').is(':visible')){
			$(this).parent().removeClass('selected').find('.cart-box').fadeOut(300);
			return false;
		}else{
			$(this).parent().addClass('selected').find('.cart-box').fadeIn(300);
			return false;
		}
	});
	
	$(document).on("mouseup",function(e){
		if($('.cart-box').is(':visible')){
			var targ = $(".cart-box");
			if (!targ.is(e.target) && targ.has(e.target).length === 0){
			$('.cart-box').fadeOut(300);
			$('.top-cart').removeClass('selected');
			}
		}
	});	
	
	if($('.lg-banner').hasClass('top-dark')){
		if($('.logo img').length){
			$('.top-head').addClass('dark');
			var logo = $('.logo').find('img').attr('src').replace("logo.png", "logo-light.png");
			$('.logo').find('img').attr('src',logo);
		}
	}
	
	/* ================ Responsive Menu ================= */
	if($('.responsive-nav').length){
		
		var responsnav = $('.responsive-nav').find('nav').html();
		$('.pageWrapper').prepend('<a class="navbtn" href="#"><i class="fa fa-navicon"></i></a><div class="new-nav">'+responsnav+'</div>');
		$('.new-nav').find('.menu-item-has-children').addClass('hasChildren')
		$('.navbtn').on("click",function(e){
			e.preventDefault();
			if($('.pageWrapper').hasClass('responsive-body')){
				$(this).find('i').removeClass('fa-times').addClass('fa-navicon');
				$('.new-nav').removeClass('active');
				$(this).removeClass('active');
				$('.pageWrapper').removeClass('responsive-body');
			}else{
				$(this).find('i').addClass('fa-times').removeClass('fa-navicon');
				$(this).addClass('active');
				$('.new-nav').addClass('active');
				$('.pageWrapper').addClass('responsive-body');
			}
		});
		
		$('.new-nav li.hasChildren').each(function(){
			$(this).find(' > a').append('<span class="collap"><i class="fa fa-chevron-down"></i></span>');
			$(this).find('.collap').on("click",function(e){
				e.preventDefault();
				$(this).parent().parent().find('> ul').slideToggle();
				$(this).parent().parent('li.hasChildren').toggleClass('active');
				return false;
			});
		});

		$('.new-nav li.megamenu.hasChildren').each(function(){
			$(this).find(' > a').append('<span class="collap"><i class="fa fa-chevron-down"></i></span>');
			$(this).find('.collap').on("click",function(e){
				e.preventDefault();
				$(this).parent().parent().parent().find('> ul').slideToggle();
				$(this).parent().parent().parent('li.hasChildren').toggleClass('active');
				return false;
			});
			$(this).find('span.inner-mega > a').append('<span class="collap"><i class="fa fa-chevron-down"></i></span>');
			$(this).find('span.inner-mega > a .collap').on("click",function(e){
				e.preventDefault();
				$(this).parent().parent().parent().find('> ul').slideToggle();
				$(this).parent().parent().parent('li').toggleClass('active');
				return false;
			});
		});
	}
	
	/* adjust submenu positions */
	if($('ul ul').length && $('.container').length){
		var $sub = $('ul ul');
		var $c = $('.container').width() + $('.container').offset().left + 30;
		$sub.each(function(){
			var $lft = $(this).offset().left + $(this).width() - 10;
			if( $lft > $c){
				$(this).addClass('rit-menu');
			}
		});
	}
	
	/* ================ boxed transparent header bottom line function =================== */
	if($('.top-head.boxed-transparent').length){
		var main_cont = $('.top-head.boxed-transparent > .container'),
			mW = main_cont.width(),			
			WW;
			
			if ($('.top-head.boxed-transparent .top-nav > ul > li.selected').length > 0){
				var selOff = $('.top-head.boxed-transparent .top-nav > ul > li.selected').offset().left,
					mOff = main_cont.offset().left,
					defW = selOff - mOff + ($('.top-head.boxed-transparent .top-nav > ul > li.selected').width() + 10);
					main_cont.append('<span class="bot-line"></span><span class="lft-line main-bg"></span>');
					$('.bot-line').css('width',defW + 'px');
			}else{
				var selOff = $('.top-head.boxed-transparent .logo').addClass('no-lines');
			}
		
		
		$('.top-head.boxed-transparent .top-nav > ul > li').each(function(){
			var thisOff = $(this).offset().left,
				thisW	= $(this).width() + 10;
			$(this).hover(function(){
				WW = thisOff - mOff + thisW;
				$('.bot-line').css('width',WW + 'px');
			},function(){
				$('.bot-line').css('width',defW + 'px');
			});
		});
	}	
	
	/* ================ Back to top button. ================ */
	var winScroll = $(window).scrollTop();
	if (winScroll > 1) {
		$('#to-top').css({'transform':'translate3d(0,0,0)'});
	} else {
		$('#to-top').css({'transform':'translate3d(50px,50px,0)'});
	}
	$('#to-top,.divider .to-top').on("click",function(){
		$('html, body').animate({scrollTop: '0px'}, 800);
		return false;
	});	
	
	/* ================ social links copy :after icon. ================ */
	$('.social-list li a').each(function(){
    	var contt = window.getComputedStyle(this,':before').content.replace(/\'/g, "").replace(/\"/g, "");
    	$(this).attr('data-hover',contt);
	});
			
	$('.login-popup').on("click",function(e) {
		e.stopPropagation();
	});
    
	$('.dropdown').on('show.bs.dropdown', function(e){
		var $dropdown = $(this).find('.dropdown-menu');
		var orig_margin_top = parseInt($dropdown.css('margin-top'));
		$dropdown.css({'margin-top': (orig_margin_top + 20) + 'px', opacity: 0}).animate({'margin-top': orig_margin_top + 'px', opacity: 1}, 300, function(){
			$(this).css({'margin-top':''});
		});
	});
   
	// Add slidedown & fadeout animation to dropdown
	$('.dropdown').on('hide.bs.dropdown', function(e){
		var $dropdown = $(this).find('.dropdown-menu');
		var orig_margin_top = parseInt($dropdown.css('margin-top'));
		$dropdown.css({'margin-top': orig_margin_top + 'px', opacity: 1, display: 'block'}).animate({'margin-top': (orig_margin_top + 20) + 'px', opacity: 0}, 300, function(){
			$(this).css({'margin-top':'', display:''});
		});
	});
		
	$('.accordion.style-2 [data-toggle="collapse"]').each(function(){
		$(this).on("click",function(e) {
			e.preventDefault();
			if(!$(this).parent().parent().parent().hasClass('main-bg')){
				$(this).parent().parent().parent().parent().find('.panel').removeClass('main-bg');
				$(this).parent().parent().parent().addClass('main-bg');
			}else{
				$(this).parent().parent().parent().removeClass('main-bg')
			}
		});
	});
	
	/* ================ Masonry IsoTope. ================ */
	if($('#content.masonry').length){
		var $masonry = $('#content.masonry').masonry({
			layoutMode: 'masonry',
			isFitWidth: true
		});
		$masonry.imagesLoaded( function() {
			$masonry.isotope();
		});	
	}
		
	/* testimonials grid adjust height */
	var maxHeight = -1;
	$('.testimonials-5 [class*="col-md-"]').each(function() {
		if($(this).height() > maxHeight){
			maxHeight = $(this).height();
		}
	});
	$('.testimonials-5 [class*="col-md-"]').each(function() {
		$(this).height(maxHeight);
	});
	
	/* ============== WP scripts ============================ */
	$('.widget_calendar').find('table').addClass('table-style2').find('th').addClass('main-bg');
	$('span.rss-date').prepend('<i class="fa fa-clock-o"></i>');
	$('.widget_rss').find('cite').prepend('<i class="fa fa-user"></i>');
	$('#wp-calendar').find('a').each(function(){
		var tp = $(this).attr('title');
		$(this).attr('data-title',tp).attr('data-tooltip','true').removeAttr('title');
	});
	$('.form-submit').find('input').addClass('btn btn-lg shape main-bg');
	$('.wpcf7-submit,.gform_button').addClass('btn btn-large main-bg');
	$('.form-allowed-tags').addClass('box-info');
	
	// Woocommerce styling
	$('.stock.in-stock').prepend('<b class="shape sm success-box left"><i class="fa fa-check"></i></b>');
	$('.stock.out-of-stock').prepend('<b class="shape sm error-box left"><i class="fa fa-times"></i></b>');
	$('.woocommerce div.product form.cart .button').removeClass('single_add_to_cart_button button alt').addClass('btn btn-lg add-cart main-bg');
	$('.item-box').find('.button.add_to_cart_button').addClass('shape');
	$('.second-shop-catalog').wrap('<div class="hidden-img"></div>');
	
	$('.footer-middle .col-md-6:nth-child(2n)').after('<div class="padding-vertical-40 footer-sep"><div class="divider centered"><i class="fa fa-heart-o"></i></div></div>');
	$('.footer-middle .col-md-12').after('<div class="padding-vertical-40 footer-sep"><div class="divider centered"><i class="fa fa-heart-o"></i></div></div>');
	$('.footer-middle .col-md-4:nth-child(3n)').after('<div class="padding-vertical-40 footer-sep"><div class="divider centered"><i class="fa fa-heart-o"></i></div></div>');
	$('.footer-middle .col-md-3:nth-child(4n)').after('<div class="padding-vertical-40 footer-sep"><div class="divider centered"><i class="fa fa-heart-o"></i></div></div>');
	//.wrapAll('<div class="formItem"/>')
	$('.footer-sep:last-child').remove();
	
	if(!$('.page-icon').hasClass('selectedI'))$('.page-icon').remove();
	$('.pager-bbp').children().wrapAll('<div class="page-numbers"></div>').wrap('<span></span>');
	$('.pager-bbp').find('.next.page-numbers').html('<i class="fa fa-angle-right"></i>');
	$('.pager-bbp').find('.prev.page-numbers').html('<i class="fa fa-angle-left"></i>');
	$('.wpb_toggle').wrapInner('<a class=""><span class=""></span></a>');
	$('.wpb_toggle').find('a').prepend('<u></u>');
	$('.post-password-form input[type="submit"]').addClass('btn main-bg');
	if($('.post-tags').length){
		$('.post-tags').children('a').wrapAll('<ul class="tags hover-effect"></ul>');
		var pp = $('.post-tags').html();
		pp = pp.replace(/,/g, '');
		$('.post-tags').html(pp).contents().filter(function(){return this.nodeType === 3}).wrap('<span class="main-color" />');;
		$('.post-tags').find('a').wrap('<li class="shape sm"></li>');
		$('.post-tags').find('a').each(function(){
			var thistxt = $(this).text();
			$(this).attr('data-hover',thistxt);
		});
	}
	$('.timeline_no_bar').parent().addClass('full');
	$('.timeline-right').parent().parent().addClass('rit-tl');
	$('.timeline-left').parent().parent().addClass('lft-tl');
		
	$('.pagination.default').find('li').addClass('shape');
	$('.pager-bbp.default div.page-numbers').find('> span').addClass('shape');
	$('.pagination').find('span.current').parent().addClass('selected');
	
	$('.bbpress input.button, .bbpress button.button,.buddypress input[type="submit"],.buddypress input[type="button"],.forum-search form > div,.bbpress .widget input#bbp_search,.bbp-login-form .bbp-username input, .bbp-login-form .bbp-email input, .bbp-login-form .bbp-password input,.widget .standard-form input[type=text], .widget .standard-form input[type=password],#lang_sel > ul > li > a, #lang_sel_click > ul > li > a,.ginput_container input,.ginput_container textarea,.ginput_container select').addClass('shape');
	$('.gform_button').addClass('shape btn vc_btn3 vc_btn3-size-lg main-bg btn-large');
	$('.gfield_checkbox input').addClass('checkbox');
	
	/* ================ pager bar 3. ================ */
	$('.pagination.bar-3 ul,.pager-bbp.bar-3 div.page-numbers').append('<div class="pager-slider"></div>');
	var page_n  = $('.pagination.bar-3 ul li.selected'),
		pageb_n = $('.pager-bbp.bar-3 div.page-numbers > span.selected'),
		sel_pag = page_n.prevAll('li').length,
		sel_pagb = pageb_n.prevAll('span').length,
		sel_off = (sel_pag*40)+40,
		selb_off = (sel_pagb*40)+40;
	setTimeout(function(){
		if($('.pager-bbp.bar-3').length){
			$('.pager-slider').animate({width:selb_off+'px'},300);
		}else{
			$('.pager-slider').animate({width:sel_off+'px'},300);
		}
		
	},2000);
	
	$('.tagcloud a').each(function(){
		var thistxt = $(this).text();
		$(this).attr('data-hover',thistxt).removeAttr('style');
	});
	$('.tagcloud').children().wrap('<li class="shape sm"></li>');
	$('.tagcloud').wrapInner('<ul class="tags hover-effect" />');
	
	var divs = $('.grid-list').find('.product-category.product');
	for(var i=0; i<divs.length;){
	i += divs.eq(i).nextUntil(':not(.product-category.product)').andSelf().wrapAll('<div class="products_cat" />').length;
	}
	
	// Comments styling and Empty Comment validation
	$('.comment-reply-link').addClass('main-color').prepend('<i class="fa fa-comment"></i>');
	$('.comment-list .comment.parent').addClass('shape');
	
	$('.comment-reply-title').addClass('uppercase font-20 bolder').prepend('<i class="fa fa-pencil main-color"></i>').wrap('<div class="heading side-head head-6" />');
	$('.products h2,.cross-sells h2,.cart_totals h2,.woocommerce-billing-fields h3,.woocommerce-shipping-fields h3,form.woocommerce-checkout h3,.woocommerce-checkout .woocommerce h2,.woocommerce-checkout .woocommerce h3').addClass('uppercase head-5 bold font-20').wrap('<div class="heading"></div>');
	$('.comment-form-author,.comment-form-email').addClass('col-md-6').wrapAll('<div class="row"></div>');
	$('.comment-form-comment,.form-submit,.comment-form-url,.comment-notes').addClass('col-md-12').find('textarea').addClass('txt-box textArea shape');
	$('.comment-form').find('#author,#email,#url').addClass('form-control shape');
	$('.comment-form-url,.comment-form-comment,.comment-notes,.form-submit').wrapInner('<div class="row"></div>');
	
	$('.wpb_widgetised_column > .wpb_wrapper').find('> ul').addClass('sidebar_widgets');
	
	var req = $('*[aria-required="true"]');
	req.parent().prepend('<i class="fa fa-info comment-validate" style="display:none"></i>');
	$('.comment-form').submit(function(e){
		var em = $(this).find('#email').val();
		if($('#author').length && $('#author').val() == ''){
			$('#author').addClass('error');
			$('#author').parent().find('.comment-validate').show().delay(3000).fadeOut();
			e.preventDefault();
			return false;
		}else if($('#email').length && ($('#email').val() == '' || !isValidEmailAddress( em ))){
			$('#email').addClass('error');
			$('#email').parent().find('.comment-validate').show().delay(3000).fadeOut();
			e.preventDefault();
			return false;
		}else if($('#comment').length && $('#comment').val() == ''){
			$('#comment').addClass('error');
			$('#comment').parent().find('.comment-validate').show().delay(3000).fadeOut();
			e.preventDefault();
			return false;
		}else{
			$('#author,#email,#comment').removeClass('error');
		}
		
		
	});
	req.change(function(){
		$(this).removeClass('error');
	});
	function isValidEmailAddress(emailAddress) {
	    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	    return pattern.test(emailAddress);
	};
		
	/* ================ Grid IsoTope. ================ */
	if($('#grid').length){
		var $grid = $('#grid').isotope({
			layoutMode: 'fitRows'
		});
		$grid.imagesLoaded( function() {
			$grid.isotope();
		});
	}
		
	/* ================ Slick Sliders. ================ */
	var runSlick = function() {
	
		/* Horizontal slider */
		if($('.horizontal-slider').length > 0){
			
			$('.horizontal-slider').each(function(){
				var slides_n 	= parseInt($(this).attr('data-slidesnum'),10),
					sscrol 		= parseInt($(this).attr('data-scamount'),10),
					t_infinite 	= $(this).attr('data-infinite'),
					t_arr 		= $(this).attr('data-arrows'),
					speed_n 	= $(this).attr('data-speed'),
					t_fade 		= $(this).attr('data-fade'),
					t_dots 		= $(this).attr('data-dots'),
					t_auto 		= $(this).attr('data-auto'),
					fd 			= false,
					tinfinite 	= false,
					aut 		= false,
					arr 		= false,
					tdots 		= false,
					resp_n 		= 1;
				
				
				if(t_infinite == '1'){
					tinfinite = true;
				}
				if(t_auto == '1'){
					aut = true;
				}
				if(t_fade == '1'){
					fd = true;
				}
				if(t_arr == '1'){
					arr = true;
				}
				if(t_dots == '1'){
					tdots = true;
				}				
				if(slides_n > 2){
					resp_n = 2;
				}
				
				$(this).slick({
					slidesToShow: slides_n,
					slidesToScroll: sscrol,
					dots: tdots,
					infinite: tinfinite,
					speed: speed_n,
					rtl: $rt,
					fade: fd,
					autoplay: aut,
					arrows: arr,
					responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: resp_n,
							slidesToScroll: resp_n
						}
					},
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
				    }
				  ]
				});
			});
		}
		
		if($('.vertical-slider').length > 0){
			
			$('.vertical-slider').each(function(){
				var slides_n 	= parseInt($(this).attr('data-slidesnum'),10),
					sscrol 		= parseInt($(this).attr('data-scamount'),10),
					t_infinite 	= $(this).attr('data-infinite'),
					t_arr 		= $(this).attr('data-arrows'),
					speed_n 	= $(this).attr('data-speed'),
					t_fade 		= $(this).attr('data-fade'),
					t_dots 		= $(this).attr('data-dots'),
					t_auto 		= $(this).attr('data-auto'),
					fd 			= false,
					tinfinite 	= false,
					aut 		= false,
					arr 		= true,
					tdots 		= true,
					resp_n 		= 1;
				
				
				if(t_infinite == '1'){
					tinfinite = true;
				}
				if(t_auto == '1'){
					aut = true;
				}
				if(t_fade == '1'){
					fd = true;
				}
				if(t_arr != ''){
					arr = false;
				}
				if(t_dots != ''){
					tdots = false;
				}				
				if(slides_n > 2){
					resp_n = 2;
				}
				
				$(this).slick({
					slidesToShow: slides_n,
					slidesToScroll: sscrol,
					dots: tdots,
					infinite: tinfinite,
					speed: speed_n,
					vertical: true,
					fade: fd,
					autoplay: aut,
					arrows: arr,
				});
			});
		}
		
		$('.slick-gal,.posts-gal').slick({
			dots: true,
			rtl: $rt,
			arrows: false,
		});		
				
		/* breaking news */
		$('.break-news-slider').slick({
			dots: false,
			arrows: true,
			vertical: true,
			slidesToShow: 1,
			touchMove: true,
			slidesToScroll: 1,
			autoplay:true
		});
		
		/* banner slick */
		$('.banner-slick').slick({
			dots: false,
			arrows: false,
			vertical: true,
			rtl: $rt,
			slidesToShow: 1,
			touchMove: true,
			slidesToScroll: 1,
			autoplay:true
		});
		
		$('.t_slider-1').each(function(){
			$(this).find('.slick-dots,.slick-prev,.slick-next').wrapAll('<div class="slider_controls" />');
		});
	}
	runSlick();
	
	/* ================= Grid - List view =============== */
	$('.list-btn').on("click",function() {
		$('.grid-list').addClass('list');
		$('.grid-btn').removeClass('selected');
		$(this).addClass('selected');
		return false;
	});
	$('.grid-btn').on("click",function() {
		$('.grid-list').removeClass('list');
		$('.list-btn').removeClass('selected');
		$(this).addClass('selected');
		return false;
	});
		
		
	/* ================= Camera SlideShow =============== */		
	if($('.camera-slider').length){
		$('.camera-slider').each(function(){
			var thisFX = $(this).attr('data-fx'),
				thisAlign = $(this).attr('data-alignment'),
				thisHeight = $(this).attr('data-height'),
				thisPag = $(this).attr('data-pagination'),
				thisThumbs = $(this).attr('data-thumbnails'),
				thisLoader = $(this).attr('data-loader'),
				thisDIR = $(this).attr('data-bardirection'),
				thisNav = $(this).attr('data-navigation'),
				thisPL = $(this).attr('data-playPause'),
				thisPOS = $(this).attr('data-barposition');
				
			var th_p = false,th_thumb = false,th_nv = false,th_pl = false;
			
			if(thisPag == '1'){
				th_p = true
			}
			
			if(thisThumbs == '1'){
				th_thumb = true
			}
			
			if(thisNav == '1'){
				th_nv = true
			}
			
			if(thisPL == '1'){
				th_pl = true
			}
			
				
			$(this).camera({
				height: thisHeight,
				alignment: thisAlign,
				loader: thisLoader,
				pagination: th_p,
				thumbnails: th_thumb,
				navigation: th_nv,
				barPosition: thisPOS,
				barDirection: thisDIR,
				fx: thisFX,
				playPause: th_pl
			});
		});
	}
	
	if($('.camera-slider-boxed').length){
		$('.camera-slider-boxed').camera({
			height: '600px',
			loader: 'none',
			pagination: false,
			thumbnails: true,
			fx: 'scrollTop'
		});
	}
	
	/* ================ Checkbox Styling. ================ */
	function chk(){
		var checkBox = $('.checkbox');
		$(checkBox).each(function(){
			$(this).wrap( "<span class='custom-checkbox'></span>" );
			if($(this).attr('value') == '1'){
				$(this).parent().addClass("selected main-bg");
			}
		});
		$(checkBox).on("click",function(){
			$(this).parent().toggleClass("selected main-bg");
			if ($(this).attr('value') == '1'){
				$(this).attr('value','0');
			}else{
				$(this).attr('value','1');
			}
		});
		$('.custom-checkbox').append('<div class="switcher"/>');
	}
	chk();
	$('.custom-radio').find('label').prepend('<span><span></span></span>');
	
	$('.n-video').videoPlayer({
		'playerWidth' : 0.95,
		'videoClass' : 'video'	
	});
	
	if($('.animsition').length){
		var thisIn = $(this).attr('data-animsition-in-class'),
			thisOut = $(this).attr('data-animsition-out-class');
		$(".animsition").animsition({
			inClass					: thisIn,
			outClass				: thisOut,
			inDuration				: 2000,
			outDuration				: 800,
			linkElement				: '.top-nav ul li a:not([target="_blank"]):not([href^=#])',
			loading					: true,
			loadingParentElement	: 'body',
			loadingClass			: 'page-loader',
			loadingInner			: '<div class="inner-l"><span></span><span></span><span></span></div>',
			overlay					: false
		});
	}	
	
	/* =============== Window.load ================== */
	$(window).bind("load",function(){
		
		/* =============== login box vertical alignment ================== */
		function loginpadding(){
			var winH 	= parseInt($(window).height(),10)/2,
				docH 	= parseInt($(window).height(),10),
				loginH 	= parseInt($('.login-box-lg').height(),10)/2,
				padd 	= winH - loginH;
			$('.login-page .pageWrapper').css('padding-top',padd+'px');
			$('.fullscreen').css('height',docH+'px');
		}
		
		loginpadding();
		
		$(window).resize(function(){
			loginpadding();
		});
		
		$('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="popover"]').popover();
		$('[data-toggle="dropdown"]').dropdown();
		
		/* ================ Waypoints: on scroll down animations. =============== */
		$('.no-touch .fx').waypoint(function() {
			var anim = $(this).attr('data-animate'),
				del = $(this).attr('data-animation-delay');
			$(this).addClass('animated '+anim).css({animationDelay: del + 'ms'});
		},{offset: '80%',triggerOnce: true});
		
		/* ================ circliful charts. ================ */
		$('.c-chart').each(function(){
			$(this).waypoint(function() {
				$(this).circliful();
				var LH = $(this).find('.circle-text').css('line-height'),
					half = parseInt($(this).find('.circle-text-half').css('height'),10);
				if ($(this).hasClass('bottom-txt')){
					$(this).find('.fa').css('line-height',LH);
				}
				if ($(this).attr('data-type') == 'half'){
					$(this).css('height',half-48+'px');
				}
			},{offset: '90%',triggerOnce: true});
		});
		
		/* ================ Counter. ================ */
		$('.odometer').each(function(){
			$(this).waypoint(function() {
				var the = $(this),
				timerss = the.attr('data-timer');
				var timeout = setTimeout(function(){
					var initVal = the.attr('data-initial'),
					currVal = the.attr('data-value');
					the.html(currVal);
				},timerss);
			},{offset: '90%',triggerOnce: true});
		});
		
		/* ================ Progress Bars ================= */
		$('.progress-bar').each(function(){
			$(this).waypoint(function() {
				var num = $(this).attr('aria-valuenow'),
					percent = $.animateNumber.numberStepFactories.append('%');
				if($(this).parent().parent().parent().hasClass('tool-tip')){
					$(this).find('> span').animateNumber({number: num,numberStep: percent});
				}else{
					$(this).find('> span').animateNumber({number: num,numberStep: percent},num*20);
				}
				$(this).css('width',num+'%').animate({left:'0%',opacity:'1'},num*20);
				
				if(num <= 40){
					$(this).find('> span').addClass('sm-progress');
				}
			},{offset: '90%',triggerOnce: true});
		});
		
		/* =============== fix parallax bg in safari. ================== */
		if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){
			$('.tags').addClass('saf-tags');
		}else{			
			/* ============= Stick Header logo change ========================== */
			var Scrl = $(window).scrollTop();
			if (Scrl > 1) {
				if($('.top-head').attr('data-sticky') == "true"){
					$('.top-head').addClass('sticky-nav');
				}
			}else{
				$('.top-head').removeClass('sticky-nav');
			}
			
			$.stellar({
			horizontalScrolling: false,
			verticalScrolling: true,
			responsive: true,
			parallaxElements: true,
			verticalOffset:-4,
			hideDistantElements: false
		});
		
		if($('.parallax').length > 0){
			$('.parallax').each(function(){
				var pover = $(this).attr('data-overlay');
				if(pover != undefined){
					$(this).prepend('<div class="parallax-overlay" style="background-color:'+pover+'"></div>');
				}
			});
		}
			
		}
		
		if($('.top-head').hasClass('sticky-nav')){
			if($('.logo img').length){
				var logo = $('.logo').find('img').attr('src').replace("logo-light.png", "logo.png");
				$('.logo').find('img').attr('src',logo);
			}
		}
		
		// youtube video in popup..
		var trigger = $("body").find('[data-toggle="modal"]');
		trigger.on("click",function () {
			var theModal = $(this).data("target"),
				videoSRC = $(this).attr("data-theVideo"),
				videoSRCauto = videoSRC + "?autoplay=1";
				$(theModal + ' iframe').attr('src', videoSRCauto);
			$(theModal + ' button.close').on("click",function () {
				$(theModal + ' iframe').attr('src', videoSRC);
			});
			$('.modal').on("click",function () {
				$(theModal + ' iframe').attr('src', videoSRC);
			});
		});
		
		/* =============== One Page Navigation ================ */
		if($('.one-page .top-nav').length){
			$('.one-page .top-nav').onePageNav();
		}
		
		function one_nav(){
			if($('.one-2').length){
				$('.one-2').find('nav').removeClass('nav-animate');
				$('.one-2').find('a').removeClass('shape');
				var scrollHeight2 = $(window).scrollTop(),
					tp2 = $('#home').outerHeight();
				if(scrollHeight2 >= tp2 ){
					$('.one-2').removeClass('diamonds-nav').find('nav').removeClass('top-nav');
					$('.one-2').addClass('side-one');
				}else{
					$('.one-2').removeClass('side-one').addClass('diamonds-nav').find('nav').addClass('top-nav');
				}
			}
		}
		
		one_nav();
		
		$('.one-page a').on("click",function(){
			one_nav();
		});
		
		/* ================ flickr Photos. ================ */
		if ($('.flickDiv').length > 0){    
			$('.flickDiv').each(function(){
				var thisID = $(this).find('.wid_id').val(),
					thisLmt = $(this).find('.wid_limit').val(),
					thisFlick = $(this).find('.flick_id').val();
				$(this).find(' > ul').jflickrfeed({
					limit: thisLmt,
					qstrings: {
					id: thisFlick
				},
				itemTemplate: '<li><a href="{{image_b}}" class="zoom"><img src="{{image_s}}" alt="{{title}}" /><span class="img-overlay"></span></a></li>',
				}, function(data) {
					$('.zoom').magnificPopup({
						type:'image',
						gallery: {
							enabled: true
						}
					});
				});
			});
		}
		
		// Latest tweets.
		if($('.tweet').length){
			!function(d,s,id){
				var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
				if(!d.getElementById(id)){
					js=d.createElement(s);
					js.id=id;
					js.async=true;
					js.src=p+"://platform.twitter.com/widgets.js";
					fjs.parentNode.insertBefore(js,fjs);
				}
			}(document,"script","twitter-wjs");
			var themeurls = $('#custom_style-css').attr('href').split('/css')[0];
			$('.tweet').prepend('<div class="loading-container"><img src="'+themeurls+'/images/ajax-loader.gif" alt="tweet loader" /></div>');
			setTimeout( function() {		
				var _html = $(".widget_it_widget_tweets").find('iframe').contents().find("body").html();
				$('.widget_it_widget_tweets .tweet').append(_html);
				$(".widget_it_widget_tweets .tweet").find('.timeline-LoadMore,iframe,.timeline-Header,.new-tweets-bar,.timeline-Footer,.timeline-Tweet-brand,.u-url.permalink.customisable-highlight,.retweet-credit,.inline-media,.footer.customisable-border,.timeline-Tweet-actions,.timeline-Tweet-metadata').remove();
						
				var _html2 = $("#twitter-feed").find('iframe').contents().find("body").html();
				
				$('#twitter-feed .tweet').append(_html2);
				$('#twitter-feed .tweet').find('.timeline-LoadMore,iframe,.timeline-Header,.new-tweets-bar,.timeline-Footer,.timeline-Tweet-brand,.u-url.permalink.customisable-highlight,.retweet-credit,.inline-media,.footer.customisable-border,.timeline-Tweet-actions,.timeline-Tweet-metadata').remove();
		
				$('.post-item .post-content iframe').contents().find('.EmbeddedTweet').css('max-width','100%');
				$('.sidebar_widgets .timeline-TweetList').each(function(){
					$(this).slick({
						dots: false,
						infinite: true,
						arrows:true,
						speed: 500,
						fade: true,
						rtl: $rt,
						slide: 'li',
						autoplay:true,
						slidesToShow: 1,
						touchMove: true,
						slidesToScroll: 1
					});
				});
				
				$('.slick-s .timeline-TweetList').slick({
					dots: false,
					slide: 'li',
					arrows: true,
					autoplay:true,
					slidesToShow: 1,
					touchMove: true,
					vertical:true,
					slidesToScroll: 1
				});
				
				$(".footer-middle .timeline-TweetList").slick({
					dots: false,
					infinite: true,
					arrows:true,
					speed: 300,
					slide: 'li',
					autoplay:true,
					slidesToShow: 1,
					touchMove: true,
					vertical:true,
					slidesToScroll: 1
				});
				$('.loading-container').hide();
			}, 1500);
		}
		
		
		$(window).on("scroll",function(){
			/* ================ One Page side menu. =============== */
			if($('#side_one').length > 0){
				var scrollHeight2 = $(document).scrollTop(),
					tp2 = $('#home').outerHeight();
				if($(this).scrollTop() > tp2 ){
					$('#side_one').css('left','0px');
				}else{
					$('#side_one').css('left','-100%');
				}
			}
			/* ================ Sticky nav. ================ */
			if($('.top-head').attr('data-sticky') == "true"){
				var Scrl = $(window).scrollTop();
				if (Scrl > 10) {
					$('.top-head').addClass('sticky-nav');
					if($('.top-head').hasClass('sticky-nav')){
						if($('.logo img').length){
							var logo = $('.logo').find('img').attr('src').replace("logo-light.png", "logo.png");
							$('.logo').find('img').attr('src',logo);
						}
					}
				}else{
					$('.top-head').removeClass('sticky-nav');
					if($('.top-head').hasClass('dark') || $('.logo').hasClass('light')){
						if($('.logo img').length){
							var logo = $('.logo').find('img').attr('src').replace("logo.png", "logo-light.png");
							$('.logo').find('img').attr('src',logo);
						}
					}
				}
			}
			winScroll = $(window).scrollTop();
			//  Show Hide back to top button.
			if (winScroll > 1) {
				$('#to-top').css({'transform':'translate3d(0,0,0)'});
			} else {
				$('#to-top').css({'transform':'translate3d(50px,50px,0)'});
			}
			one_nav();
		});
		$('.shape-skin .esg-filter-wrapper').wrap('<div class="container"></div>').children().wrapAll('<div class="filter-by"></div>');
		$('.shape-skin .esg-filterbutton').addClass('shape').wrapInner('<b class="par"/>');
		var htmlclass = $('html').attr('data-class');
		
		$('.header-5 .top-cart > a,.header-6 .top-cart > a,.header-8 .top-cart > a').addClass('dark-bg shape sm');
		if($('.top-head').hasClass('header-left') || $('.top-head').hasClass('header-right')){
			$('.top-nav').removeClass('top-nav').addClass('side-nav');
		}
		$('.top-nav li li a').removeClass('shape');
		$('.shape').addClass(htmlclass);
		
		var $form = $('#mc-embedded-subscribe-form');

		$('form[id*="subscribe-form"]').on('submit', function(event) {
			event.preventDefault();
			register($form);
		});
		
		/* ================= Magnific popup =============== */
		$('.zoom').magnificPopup({
			type:'image',
			gallery: {
				enabled: true
			}
		});
		
		$('.gallery-size-thumbnail li,.posts-gal .slick-slide').each(function(){
			var ssrr = $(this).find('img').attr('src'),
				titl = $(this).find('img').attr('alt'),
				ext = ssrr.substring(ssrr.lastIndexOf('.') + 1); 
			ssrr = ssrr.substr(0, ssrr.lastIndexOf("-"));
			$(this).find('a').attr('title',titl).attr('href',ssrr+'.'+ext).addClass('zoom').append('<span class="img-overlay"></span>');
		});
		
		$('.gallery,.posts-gal').each(function(){
			$(this).magnificPopup({
				type:'image',
				titleSrc: 'title',
				delegate: 'a.zoom',
				gallery: {
					enabled: true
				}
			});
		});
		
		$('.images.product-img').each(function() {
			$(this).magnificPopup({
				delegate: 'a',
				type: 'image',
				gallery: {
					enabled:true
				}
			});
		});
		
		function register($form) {
			$.ajax({
				type: $form.attr('method'),
				url: $form.attr('action'),
				data: $form.serialize(),
				cache       : false,
				dataType    : 'json',
				contentType: "application/json; charset=utf-8",
				error       : function(err) { 
				  $('.nl-note').addClass('msg-box error-box').fadeIn().find('p').html('Could not connect to server. Please try again later.');
				 },
				success     : function(data) {
				  if (data.result != "success") {
				    var message = data.msg.substring(4);
				    $('.nl-note').addClass('msg-box error-box').fadeIn().find('span').html(message);
				  } 
				  else {
				    $('.nl-note').addClass('msg-box success-box').fadeIn().find('span').html('please click the link in the email we just sent you!');
				  }
				 	setTimeout( $('.nl-note').fadeOut(500),4000 );
				}
			});
		}

		
	});
	if($('.gform_wrapper').length){
		$(document).bind('gform_post_render',function() {
		    $('.ginput_container input,.ginput_container textarea,.ginput_container select').addClass('shape');
		    $('.gform_button').addClass('shape btn vc_btn3 vc_btn3-size-lg main-bg btn-large');
			$('.gfield_checkbox input').addClass('checkbox');
			var htmlclass = $('html').attr('data-class');
			$('.shape').addClass(htmlclass);
			chk();
		});
	}

})(jQuery);
