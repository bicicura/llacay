$('.owl-carousel').owlCarousel({
    loop:true,
    animateOut: 'fadeOut',
    margin:0,
    autoplay: true,
    autoplayTimeout:5000,
    nav:false,
    dots: false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})