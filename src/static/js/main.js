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

var getDate = function() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var hoursS = (hours < 10 ? "0" : "") + String(hours);
    var minutesS = (minutes < 10 ? "0" : "") + String(minutes);
    var secondsS = (seconds < 10 ? "0" : "") + String(seconds);

    return hoursS + ":" + minutesS + ":" + secondsS;
};

var log = function(message) {
    var console = jQuery("body > .console");

    var dateString = getDate();
    var messageHtml = jQuery("<div>" + dateString + " " + message + "</div>");
    console.append(messageHtml);
};

jQuery(document).ready(function() {
            var pushi = new Pushi("c62cd4e8-ea4b-4109-8406-3b68626738a6", {
                        authEndpoint : "http://localhost:5000/auth"
                    });

            pushi.bind("connect", function(event) {
                        log("connected := " + this.socketId);
                        this.global = this.subscribe("global");
                        this.subscribe("private-privado");
                        this.subscribe("presence-presenca");
                    });

            pushi.bind("disconnect", function(event) {
                        log("disconnected");
                    });

            pushi.bind("subscribe", function(event, channel) {
                        log("subscribed := " + channel);
                    });

            pushi.bind("member_added", function(event, channel, member) {
                        log("member_added := " + channel + ":" + member);
                    });

            pushi.bind("member_removed", function(event, channel, member) {
                        log("member_removed := " + channel + ":" + member);
                    });

            pushi.bind("message", function(event, data) {
                        log("message := " + data);
                        this.global.trigger("echo", this.socketId + ":" + data);
                    });

            pushi.bind("echo", function(event, data) {
                        log("echo := " + data);
                    });
        });
