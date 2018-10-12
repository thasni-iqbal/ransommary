$(document).ready(function(){

    (function($) {
        "use strict";
        $('.products__container').owlCarousel({
            loop:true,
            margin:10,
            nav:false,
            lazyLoad: true,
            autoplay: true,
            responsive:{
                0: {
                    items:1
                },
                991:{
                    items:3
                }
            }
        });
        $('.brands__container').owlCarousel({
            loop:true,
            margin:10,
            nav:false,
            lazyLoad: true,
            autoplay: true,
            responsive:{
                0: {
                    items:3
                },
                991:{
                    items:6
                }
            }
        })

    })(jQuery)
});