/* globals WebFontConfig:true */

WebFontConfig = {
    google: { families: [ 'Oswald:400,300,700:latin' ] }
};

(function() {
    'use strict';
    var wf = document.createElement('script'),
        s = document.getElementsByTagName('script')[0];
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    s.parentNode.insertBefore(wf, s);
})();