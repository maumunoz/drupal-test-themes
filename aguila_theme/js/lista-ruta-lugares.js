/*global jQuery2, jQuery, document */
(function ($, jq) {

    var map;
    var markers = [];
    var centerLatlng;

    function transformar() {
        // no se puede utilizar la referencia a la lista porque el nodo en el DOM cambia
        $('.lista-lugares-fiesta').find('.view-content > .item-list > ul > li.views-row:not(.transformado)').transform({
            process: function ($, el) {
                var rating,
                    ratingText;

                el.addClass('transformado');

                if (el.find('.favoritos.logged-in').length === 0) {
                    el.find('.favoritos.hidden').removeClass('hidden');
                }
                if (el.find('.favoritos-hover.link')) {
                    el.find('.favorites-hover.hidden').removeClass('hidden');
                }

                // clean the rating field
                rating = el.find('.views-field-field-rating .clearfix');
                ratingParent = rating.parent();
                rating.remove();
                ratingParent.prepend('<span>' + rating.text().replace('/5', '') + '</span>');
            }
        });
    }
    
    function validGeolocation(value) {
        return value !== undefined && value !== null && value !== '';
    }
    function centerMap() {
        var latlngbounds = new google.maps.LatLngBounds();
        $(markers).each(function(i,data) {
           latlngbounds.extend(data.marker.getPosition());
        });
        centerLatlng = latlngbounds.getCenter();
        map.setCenter(centerLatlng);
        map.fitBounds(latlngbounds); 
    }
    
    function updateMapMarkers() {
        
        
        mapOptions = {
            zoom: 6,
            styles: $.mapStyles.grayscale,
            center: new google.maps.LatLng(4.6194477,-74.110567),
            scrollwheel: false,
        },
        map = new google.maps.Map($('.mapa-lugar-detalle')[0], mapOptions);
        $('.mapa-lugar-detalle').removeClass("hidden");
        
        var linksWithCoords = $('.lista-lugares-fiesta').find('.view-map');
        linksWithCoords.each(function(i, node) {
            node = $(node);
            if (validGeolocation(node.data('latitude')) && validGeolocation(node.data('longitude'))) {
                var position = new google.maps.LatLng(parseFloat(node.data('latitude')),parseFloat(node.data('longitude')));
                var marker = new google.maps.Marker({
                    position: position,
                    title: node.data('placename')
                });
                infowindow = new google.maps.InfoWindow({
                    content: '<div class="lugar-info-window map-info-window"><h1>' + node.data('placename') + '</h1></div>'
                });
                node.data("marker",marker);
                node.data("position",position);
                node.data("infowindow",infowindow);
                markers.push({marker:marker, infowindow: infowindow});
                node.bind("click", function(event ) {
                    event.preventDefault();
                    jQuery("body").scrollTo('.mapa-lugar-detalle',800);
                    $(markers).each(function(j,alldata) { alldata.infowindow.close(); });
                    var position = $(this).data("position");
                    var marker = $(this).data("marker");
                    map.panTo(position);
                    map.setZoom(16);
                    $(this).data("infowindow").open(map, marker);
                });
                
                marker.setMap(map);
                google.maps.event.addListener(marker, 'click', function () {
                    $(markers).each(function(j,alldata) { 
                        if(alldata.marker == marker) {
                            alldata.infowindow.open(map, marker);
                        }else{
                            alldata.infowindow.close(); 
                        }
                    });
                });
                
            }else{
                node.addClass("hidden");
            }
        });
        if (markers.length>0) {
            $('.view-map-all').bind("click",function(){
                event.preventDefault();
                map.setZoom(6);
                $(markers).each(function(j,alldata) { alldata.infowindow.close(); });
                map.panTo(centerLatlng);
                jQuery("body").scrollTo('.mapa-lugar-detalle',800);

            });
            google.maps.event.addListener(map, 'click', function () {
                map.setOptions({
                    scrollwheel: true,
                });
            });
            google.maps.event.addDomListener(window, "resize", function() {
                centerMap();
            });
            centerMap();
        }
    }

    $.initModule('.lista-lugares-fiesta', function () {
        transformar();
        jq(document).ajaxComplete(function () {
            setTimeout(transformar, 50)
        });
        $.mapsLoaded.promise().then(function () {
            updateMapMarkers();
        });
    });
    

}(jQuery2, jQuery));