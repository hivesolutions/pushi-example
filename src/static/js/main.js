// Hive Pushi Framework
// Copyright (C) 2008-2012 Hive Solutions Lda.
//
// This file is part of Hive Pushi Framework.
//
// Hive Pushi Framework is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Hive Pushi Framework is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Hive Pushi Framework. If not, see <http://www.gnu.org/licenses/>.

// __author__    = João Magalhães <joamag@hive.pt>
// __version__   = 1.0.0
// __revision__  = $LastChangedRevision$
// __date__      = $LastChangedDate$
// __copyright__ = Copyright (c) 2010-2012 Hive Solutions Lda.
// __license__   = GNU General Public License (GPL), Version 3

var log = function(message) {
    var console = jQuery("body > .console");

    var date = new Date();
    var dateString = date.getHours() + ":" + date.getMinutes() + ":"
            + date.getSeconds();
    var messageHtml = jQuery("<div>" + dateString + " " + message + "</div>");
    console.append(messageHtml);
};

jQuery(document).ready(function() {
            var pushi = new Pushi("app_key", {
                        authEndpoint : ""
                    });

            pushi.bind("connect", function(event) {
                        log("connected := " + this.socketId);
                    });

            pushi.bind("disconnect", function(event) {
                        log("disconnected");
                    });

            pushi.bind("subscribe", function(event, channel) {
                        log("subscribed := " + channel);
                    });

            pushi.bind("message", function(event, data) {
                        log("message := " + data);
                    });
        });
