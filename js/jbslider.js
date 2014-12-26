/*
 * jbSlider
 * http://www.burakkaya.com
 *
 * Created by Burak KAYA 
 * @yesilfasulye
 * 
 * 2013
 */

(function($) {  
    
    $.fn.jbSlider = function(uSettings){
    
        dSettings = {
            animSpeed       : 1000,
            autoPlay        : true,
            autoHide        : true,
            autoHideDelay   : 1000,
            autoHideSpeed   : 500,
            controlButtons  : false,
            controlDots     : true,
            controlDotsPos  : "center-top",
            loader          : false,
            nextText        : "Next",
            pauseTime       : 6000,
            pauseOnHover    : true,
            pauseTextShow   : false,
            pauseText       : "Pause",
            prevText        : "Prev",
            thumbView       : false,
            thumbWidth      : 90
        };
    
        var settings = $.extend({},dSettings,uSettings);
        
        return this.each(function(){  

            var jbSlider = $(this);
            var slideCount = $(this).find('> *').length;
            var jbActiveSlide = 0;

            if(slideCount <= 1){return false;}
            else{
                
                jbSlider.wrapInner('<div class="jbslider-holder" style="position:relative;"><div class="jbslider-slides">');
                
                var jbSliderHolder = jbSlider.find('.jbslider-holder').outerWidth(jbSlider.width()).outerHeight(jbSlider.height());
                var jbSlides = jbSlider.find('.jbslider-slides');

                jbSlides.find("> *").each(function(){   
                    if ($(this).data("active")) {
                        jbActiveSlide = $(this).prevAll().length - 1;
                    }
                }); 
        
                // control nav
                jbSliderHolder.append('<nav>');
                var jbSlideNav = $(this).find('nav');
                
                if(settings.controlDots){
                
                    for(i=1;i<=slideCount;i++){
                        jbSlideNav.append('<a href="#">'+i+'</a>');
                    }

                    // autohide
                    if(settings.autoHide){
                        jbSlideNav.hide();
                        jbSlider.hover(
                            function(){jbSlideNav.fadeIn(settings.autoHideSpeed);},
                            function(){jbSlideNav.delay(settings.autoHideDelay).fadeOut(settings.autoHideSpeed);}
                        );
                    }
                    
                    // position
                    switch (settings.controlDotsPos)
                    {
                        case "left-top":
                            jbSlideNav.css({top:'10px',left:'10px'});
                            break;
                        case "center-top":
                            jbSlideNav.css({top:'10px',left:'50%', marginLeft: -(jbSlideNav.outerWidth()/2)});
                            break;
                        case "right-top":
                            jbSlideNav.css({top:'10px',right:'10px'});
                            break;
                        case "left-bottom":
                            jbSlideNav.css({bottom:'10px',left:'10px'});
                            break;
                        case "center-bottom":
                            jbSlideNav.css({bottom:'10px',left:'50%', marginLeft: -(jbSlideNav.outerWidth()/2)});
                            break;
                        case "right-bottom":
                            jbSlideNav.css({bottom:'10px',right:'10px'});
                            break;
                        default:
                            jbSlideNav.css({top:'10px',left:'50%', marginLeft: -(jbSlideNav.outerWidth()/2)});
                            break;
                    }

                    
                    $('a',jbSlideNav).each(function(){
                        $(this).bind('click',function(e){
                            e.preventDefault();
                            $(this).addClass('active').siblings('a').removeAttr('class');
                            var $activeSlide = $('> .active',jbSlides);
                            var $nextSlide   = $('> *:eq('+$(this).prevAll().length+')',jbSlides);
                            $activeSlide.addClass('lastActive');
                            $nextSlide.css({opacity: 0.0}).addClass('active').animate({opacity: 1.0}, 500, function() {$activeSlide.removeClass('active lastActive');});
                        });
                    }); 

                    // thumbs
                    if (settings.thumbView) {
                        $('a',jbSlideNav).each(function(){
                            $(this).hover(function(){   
                                var el = jbSlides.find("> *:eq("+$(this).prevAll().length+")");
                                var src = null;
                                if (el.attr("src")) {
                                    src = el.attr("src");
                                }else{
                                    src = el.find("img").attr("src");
                                }                               
                                jbSliderHolder.append('<div class="jbslider-thumb" style="width:'+settings.thumbWidth+'px;"><img src="'+src+'"/></div>');
                                var jbSlideThumb = $(".jbslider-thumb");
                                
                                // thumb position
                                var negativeMargin = jbSlideNav.css("marginLeft").replace("px","").replace("-","");
                                var topPos  = jbSlideNav.position().top + jbSlideNav.outerHeight() + 5;
                                var leftPos = jbSlideNav.position().left + $(this).position().left - (jbSlideThumb.width()/2) - negativeMargin;
                                jbSlideThumb.css({left:leftPos+"px", top:topPos+"px"}).fadeIn();

                            }, function(){
                                jbSliderHolder.find(".jbslider-thumb").remove();
                            });
                        });
                    }
                }else{
                    jbSlideNav.hide();
                }
                
                // Slide Switch
                var slideSwitch = function(dir) {
                    var $activeSlide  = $('> .active',jbSlides),
                        $activeNav    = $('a.active',jbSlideNav);
                
                    if ( $activeSlide.length == 0 ){
                        $activeSlide = $('> *:last',jbSlides);
                        $activeNav   = $('a:last',jbSlideNav);
                    }
                
                    if(dir == false){
                        var $nextSlide =  $activeSlide.prev().length ? $activeSlide.prev() : $('> *:last',jbSlides);
                        var $nextNav   =  $activeNav.prev().length ? $activeNav.prev() : $('a:last',jbSlideNav);
                    }else{
                        var $nextSlide =  $activeSlide.next().length ? $activeSlide.next() : $('> *:first',jbSlides);
                        var $nextNav   =  $activeNav.next().length ? $activeNav.next() : $('a:first',jbSlideNav);
                    }
                    
                    $activeSlide.addClass('lastActive');    
                    $nextNav.addClass('active');
                    $activeNav.removeClass('active');
                    
                    $nextSlide.css({opacity: 0.0})
                        .addClass('active')
                        .animate({opacity: 1.0}, settings.animSpeed, function() {
                            $activeSlide.removeClass('active lastActive').animate({opacity : 0.0}, settings.animSpeed);
                        });
                }


                var sliderLoader = function(){
                    jbSliderHolder.find(".jbslider-loader").animate({width:'100%' }, settings.pauseTime, function(){
                        $(this).css({width:'0'});
                    });
                }

            
                //AutoPlay
                if(settings.autoPlay){
                    if (settings.loader) {
                        jbSliderHolder.append('<div class="jbslider-loader">');
                        sliderLoader();
                    }
                    var mainSlideInterval = setInterval(function(){slideSwitch(true);sliderLoader();}, settings.pauseTime );                    
                    if(settings.pauseOnHover){
                        if(settings.pauseTextShow){
                            jbSliderHolder.append('<span class="jbslider-pause">'+ settings.pauseText +'</span>');
                            var jbPause = jbSliderHolder.find('.jbslider-pause');
                            jbSliderHolder.hover(
                                function(){jbPause.fadeIn(settings.autoHideSpeed);},
                                function(){jbPause.fadeOut(settings.autoHideSpeed);}
                            );
                        }
                        jbSliderHolder.hover(
                            function(){
                                clearInterval(mainSlideInterval);
                                if (settings.loader) {
                                    jbSliderHolder.find(".jbslider-loader").stop().css({width:'0'});
                                }
                            },
                            function(){
                                clearInterval(mainSlideInterval);
                                sliderLoader();
                                mainSlideInterval = setInterval( function(){slideSwitch(true);sliderLoader();}, settings.pauseTime );
                            }
                        );
                    }

                }
                            
                //Arrow Control
                if(settings.controlButtons){
                    jbSliderHolder.append('<a href="#" data-direction="prev" class="jbslider-arrow">'+settings.prevText+'</a><a href="#" data-direction="next" class="jbslider-arrow">'+settings.nextText+'</a>');
                    var jbSliderArrows = jbSliderHolder.find('.jbslider-arrow');
                    jbSliderArrows.each(function(){
                        $(this).css({top:'50%',marginTop: -($(this).outerHeight()/2)});
                        if($(this).data("direction") == "prev"){
                            $(this).css({left:'0'});
                            $(this).bind('click',function(e){
                                e.preventDefault();
                                slideSwitch(false);
                            });
                        }
                        else{
                            $(this).css({right:'0'});
                            $(this).bind('click',function(e){
                                e.preventDefault();
                                slideSwitch(true);
                            });
                        }
                    });
                    
                    if(settings.autoHide){
                        jbSliderArrows.hide();
                        jbSliderHolder.hover(
                            function(){jbSliderArrows.fadeIn(settings.autoHideSpeed);},
                            function(){jbSliderArrows.delay(settings.autoHideDelay).fadeOut(settings.autoHideSpeed);}
                        );
                    }
                }

                var setActiveSlide = function(){
                    jbSlides.find("> *:eq("+jbActiveSlide+")").addClass("active").siblings("*").removeClass("active");
                    if (jbSlideNav) {
                        jbSlideNav.find("a:eq("+jbActiveSlide+")").addClass("active").siblings("a").removeClass("active");  
                    }                   
                }
                setActiveSlide();
        
            }
        });
    
    }
    // end of jbSlider function
    
})(jQuery);
