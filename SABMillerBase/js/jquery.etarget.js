(function ($, jq) {
    $.fn.etarget = function (type, destination) {
        this.on(type, function (e) {
            e.preventDefault();
            e.stopPropagation();
            jq(destination).trigger(type);
        });

        return this; // make it chainable
    };
})(jQuery2, jQuery);