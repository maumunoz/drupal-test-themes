/*global jQuery2 */
(function ($) {

    // dummy test
    $('.mapa-lugar-detalle').css('minHeight', '100px');

    function validGeolocation(value) {
        return value !== undefined && value !== null && value !== '';
    }

    $.initModule('.ver-mapa-lugar-detalle a', function ($, node) {
        if (validGeolocation(node.data('latitude')) && validGeolocation(node.data('longitude'))) {
            $.mapsLoaded.promise().then(function () {
                var position = new google.maps.LatLng(parseFloat(node.data('latitude')), parseFloat(node.data('longitude'))),
                    mapOptions = {
                        zoom: 17,
                        center: position,
                        styles: $.mapStyles.grayscale
                    },
                    map = new google.maps.Map($('.mapa-lugar-detalle')[0], mapOptions),
                    marker = new google.maps.Marker({
                        position: position,
                        title: $('.banner-lugar-fiesta h1').text(),
                        map: map
                    }),
                    infowindow = new google.maps.InfoWindow({
                        content: '<div class="lugar-info-window map-info-window"><h1>' + $('.banner-lugar-fiesta h1').text() + '</h1></div>'
                    });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });
            });
        }
    });
}(jQuery2));