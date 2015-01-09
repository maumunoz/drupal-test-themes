/*global jQuery2 */
(function ($) {
    $(document).ready(function () {
        $.mapStyles = {
            grayscale: [
                {
                    featureType: 'all',
                    elementType: 'all',
                    stylers: [
                        {
                            saturation: -100,
                            lightness: 40
                        }
                    ]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [
                        {
                            lightness: 70
                        }
                    ]
                },
                {
                    featureType: "poi",
                    stylers: [
                      { visibility: "off" }
                    ]
                }
            ]
        };
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBYt6Hn9ur5OB88AV3XCWv9MZJK5RDLnE8&callback=initMaps');
    });
}(jQuery2));