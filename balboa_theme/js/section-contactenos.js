/*global jQuery2 */
(function ($) {
    'use strict';

    //form contactenos
    $.initModule("#edit-submitted-new-1430260830705", function ($, formcontact) {
        
        $("#webform-client-form-141").validate();

        $("#edit-submitted-new-1430260827009").rules( "add", {
            email: true,
            messages: {
                email: "Correo inválido",
            }
        });
        $("#edit-submitted-new-1430260830705").rules( "add", {
            equalTo: "#edit-submitted-new-1430260827009",
            messages: {
                email: "No coincide con el correo",
            }
        });
    }); 

}(jQuery2));

