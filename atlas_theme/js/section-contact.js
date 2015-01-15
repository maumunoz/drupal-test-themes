/*global jQuery2 */
(function ($,$2) {
    //Initialize Contact
    $2.initModule(".webform-client-form", function ($, pageContent) {
        //Add css class to page based on URL

            $("#webform-client-form-86").validate({
                rules: {
                    "submitted[new_1420479030665]": {
                        required: true
                    }
                },
                messages: {
                    "submitted[new_1420479030665]": "Campo Requerido"
                }
            });
    });
}(jQuery,jQuery2));
