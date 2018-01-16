#!/usr/bin/python
# -*- coding: utf-8 -*-

# Hive Pushi System
# Copyright (c) 2008-2018 Hive Solutions Lda.
#
# This file is part of Hive Pushi System.
#
# Hive Pushi System is free software: you can redistribute it and/or modify
# it under the terms of the Apache License as published by the Apache
# Foundation, either version 2.0 of the License, or (at your option) any
# later version.
#
# Hive Pushi System is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# Apache License for more details.
#
# You should have received a copy of the Apache License along with
# Hive Pushi System. If not, see <http://www.apache.org/licenses/>.

__author__ = "João Magalhães <joamag@hive.pt>"
""" The author(s) of the module """

__version__ = "1.0.0"
""" The version of the module """

__revision__ = "$LastChangedRevision$"
""" The revision number of the module """

__date__ = "$LastChangedDate$"
""" The last change date of the module """

__copyright__ = "Copyright (c) 2008-2018 Hive Solutions Lda."
""" The copyright for the module """

__license__ = "Apache License, Version 2.0"
""" The license for the module """

import pushi

from pushi_example.main import app
from pushi_example.main import flask
from pushi_example.main import quorum

@app.route("/", methods = ("GET",))
@app.route("/index", methods = ("GET",))
def index():
    base_url = quorum.conf("PUSHI_WS_URL", pushi.BASE_WS_URL)
    app_key = quorum.conf("PUSHI_KEY")
    return flask.render_template(
        "index.html.tpl",
        base_url = base_url,
        app_key = app_key
    )

@app.route("/login", methods = ("GET",))
def login():
    username = quorum.get_field("username", "anonymous")
    flask.session["active"] = True
    flask.session["username"] = username
    return flask.redirect(
        flask.url_for("index")
    )

@app.route("/logout", methods = ("GET",))
def logout():
    del flask.session["active"]
    del flask.session["username"]
    return flask.redirect(
        flask.url_for("index")
    )

@app.route("/create", methods = ("GET",))
def create():
    name = quorum.get_field("name", "example")

    proxy = pushi.API()
    proxy.create_app(
        name = name
    )
    return flask.render_template(
        "success.html.tpl"
    )

@app.route("/notification", methods = ("GET",))
def notification():
    channel = quorum.get_field("channel", "global")
    message = quorum.get_field("message", "hello world")

    proxy = pushi.API()
    proxy.trigger_event(
        channel = channel,
        data = message,
        event = "message"
    )
    return flask.render_template(
        "success.html.tpl"
    )

@app.route("/subscribe", methods = ("GET",))
def subscribe():
    event = quorum.get_field("event", "global")
    user_id = flask.session.get("username", "anonymous")

    proxy = pushi.API()
    proxy.subscribe(
        user_id = user_id,
        event = event
    )
    return flask.render_template(
        "success.html.tpl"
    )

@app.route("/unsubscribe", methods = ("GET",))
def unsubscribe():
    event = quorum.get_field("event", "global")
    user_id = flask.session.get("username", "anonymous")

    proxy = pushi.API()
    proxy.unsubscribe(
        user_id = user_id,
        event = event
    )
    return flask.render_template(
        "success.html.tpl"
    )

@app.route("/subscribe_apn", methods = ("GET",))
def subscribe_apn():
    token = quorum.get_field("token")
    event = quorum.get_field("event", "global")

    if not token: raise RuntimeError("no apn device token provided")

    proxy = pushi.API()
    auth = proxy.authenticate(event, token)
    proxy.subscribe_apn(
        token = token,
        event = event,
        auth = auth
    )
    return flask.render_template(
        "success.html.tpl"
    )

@app.route("/subscribe_apn", methods = ("GET",))
def unsubscribe_apn():
    token = quorum.get_field("token")
    event = quorum.get_field("event", "global")

    proxy = pushi.API()
    proxy.unsubscribe_apn(
        token = token,
        event = event
    )
    return flask.render_template(
        "success.html.tpl"
    )
