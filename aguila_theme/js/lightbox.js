/*global jQuery, jQuery2 */

function removeColorBox() {
    if(jQuery(".media-gallery-thumb.cbEnabled").hasClass("cboxElement") && jQuery.colorboxRemoved!=true) {
        jQuery(".media-gallery-thumb.cbEnabled").each(function(i,el){
            // we are gonna remove the ColorBox plugin (jQuery), and use Magnific (jQuery2) instead, but before removing ColorBox, we will use one of its attributes
            jQuery(el).attr("data-mfp-src", jQuery(el).attr("data-src"));
        });
        jQuery(".galeryCounter").html( jQuery(".media-gallery-thumb.cbEnabled").length + " FOTOS");
        // now we remove ColorBox
        jQuery.colorbox.remove();
        // and use Magnific
        jQuery2(".media-gallery-thumb.cbEnabled").magnificPopup({
                type: 'image',
                tClose: 'Cerrar (Esc)',
                tLoading: 'Cargando...',
                image: {
                    titleSrc: function(item) {
                        var parts =  item.el.attr('href').split("/");
                        var id = parts.pop();
                        var imageurl = item.el.attr('data-mfp-src');
                        return '<a href="media/'+id+'/download" target="_blank">Descargar</a> | <a href="#" onclick="facebookWindow(\''+imageurl+'\');" >Compartir</a>';
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

function facebookWindow(path) {
    window.open(
        'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(path), 
        'facebook-share-dialog', 
        'width=626,height=436'); 
    return false;
}

var colorBoxKiller;
if(jQuery('a.cbEnabled').length>0) colorBoxKiller = setInterval(function(){ removeColorBox(); }, 100);
