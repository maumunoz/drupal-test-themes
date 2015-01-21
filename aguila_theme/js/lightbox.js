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
                    callbacks: {
                        open: function() {
                            jQuery(".mfp-prevent-close").insertBefore(".mfp-close");
                        }
                    },
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
        jQuery2(".popup").magnificPopup({
                type: 'iframe',
                tClose: 'Cerrar (Esc)',
                tLoading: 'Cargando...',
                    callbacks: {
                        open: function() {
                            jQuery(".mfp-prevent-close").insertBefore(".mfp-close");
                        }
                    },
                iframe: {
                    patterns: {
                        youtube: {
                          index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                          id: 'v=', // String that splits URL in a two parts, second part should be %id%
                          // Or null - full URL will be returned
                          // Or a function that should return %id%, for example:
                          // id: function(url) { return 'parsed id'; } 

                          src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe. 
                        },
                        vimeo: {
                          index: 'vimeo.com/',
                          id: '/',
                          src: '//player.vimeo.com/video/%id%?autoplay=1'
                        },
                        gmaps: {
                          index: '//maps.google.',
                          src: '%id%&output=embed'
                        }
                    // you may add here more sources
                    },

//                    srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
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
