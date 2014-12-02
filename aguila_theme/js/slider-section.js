/*global jQuery2 */
(function ($) {
    $(document).ready(function(){
        var slider = $('.view-banner-principal .view-content'),
            borderClass,
            imagePath;
        //Set slider images as css background images
        slider.find(".views-row").each(function(index, el) {
            borderClass = $.trim($(this).find('.slider-border').text());
            imagePath = $.trim($(this).find('.slider-background img').attr('src'));
            $(this).css({'background-image': 'url('+imagePath+')'});
            $(this).addClass(borderClass);
        });
        //Initialize Slick slider
        slider.slick({
            dots: true,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        });
    });
}(jQuery2));

