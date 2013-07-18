/*
 * jQuery Slider v1.0.0
 * http://www.burakkaya.com
 *
 * Created by Burak KAYA
 * Free to use
 * 
 * May 2012
 */

(function($) {	
	
	$.fn.jbSlider = function(uSettings){
	
		dSettings = {
			arrow			: false,
			autoPlay  		: true,
			autoHide		: false,
			autoHideDelay	: 1000,
			autoHideSpeed	: 500,
			controlNav		: true,
			controlPos		: true,
			nextText		: "Next",
			prevText		: "Prev",
			pauseTime		: 6000,
			animSpeed		: 1000,
			pauseOnHover	: true,
			pauseTextShow	: true,
			pauseText		: "ll"
		};
	
		var settings = $.extend({},dSettings,uSettings);
		
		var slideCount = $(this).find('div').length;
		
		if(slideCount<=1){return false;}
		else{
			
			$(this).wrapInner('<div id="jb_slides" class="position:relative;height:'+$('div:first',this).height()+';overflow:hidden;width:'+$('div:first',this).innerWidth()+';">');
			var jbSlides = $('#jb_slides');
			$('div:first',jbSlides).addClass('current');
	
			if(settings.controlNav){
				$(this).append('<div id="jb_nav">');
				var jbSlideNav = $('#jb_nav');
				for(i=1;i<=slideCount;i++){
					jbSlideNav.append('<span id="sn_'+i+'">'+i+'</span>');
				}	
				$('span:first',jbSlideNav).addClass('current');
				
				if(settings.autoHide){
					jbSlideNav.hide();
					$(this).hover(
						function(){jbSlideNav.fadeIn(settings.autoHideSpeed);},
						function(){jbSlideNav.delay(settings.autoHideDelay).fadeOut(settings.autoHideSpeed);}
					);
				}
				
				if(settings.controlPos){
					jbSlideNav.css({left:'50%', marginLeft: -(jbSlideNav.innerWidth()/2)});	
				}
				
				$('span',jbSlideNav).each(function(){
					$(this).bind('click',function(){
						$('span',jbSlideNav).removeAttr('class');
						$(this).addClass('current');
						
						var $activeSlide = $('> div.current',jbSlides);
						var $nextSlide   = $('> div:eq('+$(this).prevAll().length+')',jbSlides);
									
						$activeSlide.addClass('lastCurrent');
						$nextSlide.css({opacity: 0.0}).addClass('current').animate({opacity: 1.0}, 500, function() {$activeSlide.removeClass('current lastCurrent');});
						
						return false;
					});
				});	
			}
			
			
			
			
			// Slide Switch
			var slideSwitch = function(dir) {
				var $activeSlide  = $('> div.current',jbSlides),
					$activeNav    = $('span.current',jbSlideNav);
			
				if ( $activeSlide.length == 0 ){
					$activeSlide = $('> div:last',jbSlides);
					$activeNav   = $('span:last',jbSlideNav);
				}
			
				if(dir == false){
					var $nextSlide =  $activeSlide.prev().length ? $activeSlide.prev() : $('> div:last',jbSlides);
					var $nextNav   =  $activeNav.prev().length ? $activeNav.prev() : $('span:last',jbSlideNav);
				}else{
					var $nextSlide =  $activeSlide.next().length ? $activeSlide.next() : $('> div:first',jbSlides);
					var $nextNav   =  $activeNav.next().length ? $activeNav.next() : $('span:first',jbSlideNav);
				}
				
				$activeSlide.addClass('lastCurrent');	
				$nextNav.addClass('current');
				$activeNav.removeClass('current');
				
				$nextSlide.css({opacity: 0.0})
					.addClass('current')
					.animate({opacity: 1.0}, settings.animSpeed, function() {
						$activeSlide.removeClass('current lastCurrent').animate({opacity : 0.0},settings.animSpeed);
					});
			}
		
			//AutoPlay
			if(settings.autoPlay){
				mainSlideInterval = setInterval(function(){slideSwitch(true)}, settings.pauseTime );
				
				if(settings.pauseOnHover){
					if(settings.pauseTextShow){
						$(this).append('<span id="jb_pause">');
						var jbPause = $('#jb_pause');
						jbPause.text(settings.pauseText);
						$(this).hover(
							function(){jbPause.fadeIn(settings.autoHideSpeed);},
							function(){jbPause.delay(settings.autoHideDelay).fadeOut(settings.autoHideSpeed);}
						);
					}
					$(this).hover(
						function(){
							clearInterval(mainSlideInterval);
						},
						function(){
							clearInterval(mainSlideInterval);
							mainSlideInterval = setInterval( function(){slideSwitch(true)}, settings.pauseTime );
						}
					);
				}
			}
			
			
			
			//Arrow Control
			if(settings.arrow){
				$(this).append('<a href="#" id="jb_prev" rel="prev" class="jb_arrow">'+settings.prevText+'</a><a href="#" id="jb_next" rel="next" class="jb_arrow">'+settings.nextText+'</a>');
				$('.jb_arrow').each(function(){
					$(this).css({top:'50%',marginTop: -($(this).innerWidth()/2)});							 			
					$(this).bind('click',function(){
						if($(this).attr("rel") == "prev"){slideSwitch(false);}
						else{slideSwitch(true);}
						return false;
					});
				});
				
				if(settings.autoHide){
					$('.jb_arrow').hide();
					$(this).hover(
						function(){$('.jb_arrow').fadeIn(settings.autoHideSpeed);},
						function(){$('.jb_arrow').delay(settings.autoHideDelay).fadeOut(settings.autoHideSpeed);}
					);
				}
			}
	
		}
	
	
		return this;
	}
	// end of jbSlider function
	
})(jQuery);


	
	




