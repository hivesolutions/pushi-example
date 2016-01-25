// Hive Pushi System
// Copyright (c) 2008-2015 Hive Solutions Lda.
//
// This file is part of Hive Pushi System.
//
// Hive Pushi System is free software: you can redistribute it and/or modify
// it under the terms of the Apache License as published by the Apache
// Foundation, either version 2.0 of the License, or (at your option) any
// later version.
//
// Hive Pushi System is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// Apache License for more details.
//
// You should have received a copy of the Apache License along with
// Hive Pushi System. If not, see <http://www.apache.org/licenses/>.

// __author__    = João Magalhães <joamag@hive.pt>
// __version__   = 1.0.0
// __revision__  = $LastChangedRevision$
// __date__      = $LastChangedDate$
// __copyright__ = Copyright (c) 2008-2015 Hive Solutions Lda.
// __license__   = Apache License, Version 2.0

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
    var _body = jQuery("body");
    var pushiUrl = jQuery(".pushi-url", _body);
    var pushiKey = jQuery(".pushi-key", _body);
    pushiUrl = pushiUrl.length > 0 ? pushiUrl.text() : null;
    pushiKey = pushiKey.length > 0 ? pushiKey.text() : null;

    var pushi = new Pushi(pushiKey, {
        baseUrl: pushiUrl,
        authEndpoint: "/auth"
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
        this.global.send("echo", this.socketId + " := " + data);
        this.sendChannel("echo", data, "presence-presenca");
    });

    pushi.bind("echo", function(event, data, channel) {
        log("[" + channel + "] echo := " + data);
    });

    _body.data("pushi", pushi);
};

jQuery(document).ready(function() {
    var console = jQuery(".console");
    if (console.length > 0) {
        startPushi();
    }
});
