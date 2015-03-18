/*global jQuery, jQuery2 */
var colorBoxKiller;

function removeColorBox() {
    if(jQuery(".media-gallery-thumb.cbEnabled").hasClass("cboxElement") && jQuery.colorboxRemoved!=true) {
        jQuery(".media-gallery-thumb.cbEnabled").each(function(i,el){
            // we are gonna remove the ColorBox plugin (jQuery), and use Magnific (jQuery2) instead, but before removing ColorBox, we will use one of its attributes
            jQuery(el).attr("data-mfp-src", jQuery(el).find("img").attr("src").replace("media_gallery_thumbnail","media_gallery_large"));
        });
        jQuery(".galeryCounter").html( jQuery(".media-gallery-thumb.cbEnabled").length + " FOTOS");
        // now we remove ColorBox
        jQuery.colorbox.remove();
        jQuery.colorboxRemoved = true;
        // and use Magnific
        jQuery2(".media-gallery-thumb.cbEnabled").magnificPopup({
                type: 'image',
                tClose: 'Cerrar (Esc)',
                tLoading: 'Cargando...',
                callbacks: {
                    open: function() {
                        if (Drupal.initMediaGalleryLightboxPhoto) Drupal.MediaGalleryLightboxOpen(this);
                    }
                },
                image: {
                    titleSrc: function(item) {
                        if (Drupal.initMediaGalleryLightboxImageTitle) return Drupal.initMediaGalleryLightboxImageTitle(item);
                    },
                    tError: 'No se pudo cargar <a href="%url%">la imagen</a>.'
                },
                gallery: {
                    enabled: true,
                    tPrev: 'Anterior (Tecla de flecha izquierda)',
                    tNext: 'Siguiente (Tecla de flecha derecha)',
                    tCounter: '%curr% de %total%'
                }
        });
        clearInterval(colorBoxKiller);
    }
}

jQuery( document ).ready( function( $ ) {
    if(jQuery('a.cbEnabled').length>0) colorBoxKiller = setInterval(function(){ removeColorBox(); }, 100);
});