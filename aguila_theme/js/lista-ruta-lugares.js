/*global jQuery2, jQuery, document */
(function ($, jq) {


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
    
    function updateMapMarkers() {
        
        var centerLat = 0;
        var centerLong = 0;
        var counter = 0;
        var linksWithCoords = $('.lista-lugares-fiesta').find('.view-map');
        var markers = [];
        var map;
        var centerLatlng;
        linksWithCoords.each(function(i, node) {
            node = $(node);
            if (validGeolocation(node.data('latitude')) && validGeolocation(node.data('longitude'))) {
                centerLat += parseFloat(node.data('latitude'));
                centerLong += parseFloat(node.data('longitude'));
                counter++;
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(parseFloat(node.data('latitude')),parseFloat(node.data('longitude'))),
                    title: node.data('placename')
                });
                infowindow = new google.maps.InfoWindow({
                    content: '<div class="lugar-info-window map-info-window"><h1>' + node.data('placename') + '</h1></div>'
                });
                markers.push({marker:marker, infowindow: infowindow});
                node.bind("click", function(event ) {
                    var position = new google.maps.LatLng(parseFloat($(this).data('latitude')),parseFloat($(this).data('longitude')))
                    map.panTo(position);
                    map.setZoom(16);
                });
            }else{
                node.addClass("hidden");
            }
        });
        console.log("Map");
        console.log(google);
        console.log(counter);
        if (counter>0) {
            centerLat /= counter;
            centerLong /= counter;
            centerLatlng = new google.maps.LatLng(centerLat,centerLong);
            mapOptions = {
                zoom: 6,
                center: centerLatlng,
                styles: $.mapStyles.grayscale
            },
            map = new google.maps.Map($('.mapa-lugar-detalle')[0], mapOptions)
        }
        $(markers).each(function(i,data) {
            data.marker.setMap(map);
            google.maps.event.addListener(data.marker, 'click', function () {
                data.infowindow.open(map, data.marker);
            });
        });
        $('.view-map-all').bind("click",function(){
            map.setZoom(6);
            map.panTo(centerLatlng);
        });
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