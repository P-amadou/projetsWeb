var $numberofSlides = $('.carousel-item').length;
var $currentSlide = Math.floor((Math.random() * $numberofSlides));

$('.carousel').carousel({
  interval: 4000,
    ride: true,
    pause: false
})


    // retrecissement barre grise et logo header
    var shrinkHeader = 50;
    $(window).scroll(function () {
        var scroll = getCurrentScroll();
        //      var largeur = window.innerWidth;
        if ((scroll >= shrinkHeader) && (window.innerWidth > 990)) {
            $('.header-top').addClass('shrink');
            $('.logo').addClass('shrink');
            $('.input-group').addClass('shrink');
            $('.input-group-btn').addClass('shrink');
        } else {
            $('.header-top').removeClass('shrink');
            $('.logo').removeClass('shrink');
            $('.input-group').removeClass('shrink');
            $('.input-group-btn').removeClass('shrink');
        }
    });

    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    // ancre haut de page
    $(".ancre").click(function () {
        $('html, body').animate({
            scrollTop: $("#banner").offset().top
        }, 1000);
    });

    $('.ancre').on('click', function (evt) {
        evt.preventDefault();
        var target = $(this).attr('href');
        $('html, body')
            .stop()
            .animate({
                scrollTop: $(target).offset().top
            }, 1000);
    });
    

// logo et barre de recherche
$(function (){
    if (window.innerWidth < 600){
         $('.header-top').addClass('flex-column');
    }
});


//MENU
$(document).ready(function () {

    "use strict";

    $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
    $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
    $(".menu > ul").before("<a href=\"#\" class=\"menu-mobile\"></a>");
    
    $(".menu > ul > li").hover(function (e) {
        if ($(window).width() > 990) {
            $(this).children("ul").stop(true, false).fadeToggle(350);
            e.preventDefault();  
        }
      else {
        
        
      }
    });


    $(".menu > ul > li").click(function () {
        if ($(window).width() <= 990) {
            $(this).children("ul").fadeToggle(250);
            $("div").removeClass("position-fixed");
        }
    });

    $(".menu-mobile").click(function (e) {
        $(".menu > ul").toggleClass('show-on-mobile');
        e.preventDefault();
    });

});