// Hive Pushi Framework
// Copyright (C) 2008-2014 Hive Solutions Lda.
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
// __copyright__ = Copyright (c) 2008-2014 Hive Solutions Lda.
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
    if (console.length == 0) {
        return;
    }

    var dateString = getDate();
    var messageHtml = jQuery("<div>" + dateString + " " + message + "</div>");
    console.append(messageHtml);

    var _console = console[0];
    _console.scrollTop = _console.scrollHeight;
};

var startPushi = function() {
    var pushi = new Pushi(
            "274cb7377bdfd1f18eabe6eb7b43879ad821ce13d3c1a9400590fc0fe58ebd31",
            {
                authEndpoint : "/auth"
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

    pushi.bind("subscribe", function(event, channel, data) {
                log("subscribed := " + channel);
                log("data := " + JSON.stringify(data));
            });

    pushi.bind("member_added", function(event, channel, member) {
                log("member_added := " + channel + ":" + member);
            });

    pushi.bind("member_removed", function(event, channel, member) {
                log("member_removed := " + channel + ":" + member);
            });

    pushi.bind("ping", function(event, data) {
                log("ping := " + data);
            });

    pushi.bind("message", function(event, data, channel) {
                log("[" + channel + "] message := " + data);
                this.global.trigger("echo", this.socketId + " := " + data);
                this.sendChannel("echo", data, "presence-presenca");
            });

    pushi.bind("echo", function(event, data, channel) {
                log("[" + channel + "] echo := " + data);
            });
};

jQuery(document).ready(function() {
            var console = jQuery(".console");
            if (console.length > 0) {
                startPushi();
            }
        });
