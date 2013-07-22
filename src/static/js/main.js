jQuery(document).ready(function() {
            var pushi = new Pushi("app_key", {
            	authEndpoint : ""
            });
            pushi.bind("message", function(event, data) {
                        jQuery("body").append("<div>" + data + "</div>");
                    });
        });
