(function($){    
    var favicon = $("link[rel='shortcut icon']");
    if(favicon.length>0) {
        favicon.attr("href","/sites/g/files/ogq836/themes/site/suprema_theme/favicon.ico");
    }else{
        favicon = $('<link rel="shortcut icon" href="/sites/g/files/ogq836/themes/site/suprema_theme/favicon.ico" />');
        $("head").append(favicon);
    }    
})(jQuery2);
