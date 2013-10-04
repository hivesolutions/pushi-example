#!/usr/bin/python
# -*- coding: utf-8 -*-

# Hive Pushi Framework
# Copyright (C) 2008-2012 Hive Solutions Lda.
#
# This file is part of Hive Pushi Framework.
#
# Hive Pushi Framework is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Hive Pushi Framework is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Hive Pushi Framework. If not, see <http://www.gnu.org/licenses/>.

__author__ = "João Magalhães <joamag@hive.pt>"
""" The author(s) of the module """

__version__ = "1.0.0"
""" The version of the module """

__revision__ = "$LastChangedRevision$"
""" The revision number of the module """

__date__ = "$LastChangedDate$"
""" The last change date of the module """

__copyright__ = "Copyright (c) 2008-2012 Hive Solutions Lda."
""" The copyright for the module """

__license__ = "GNU General Public License (GPL), Version 3"
""" The license for the module """

import pushi

from pushi_example import app
from pushi_example import flask
from pushi_example import quorum

@app.route("/auth", methods = ("GET",), json = True)
def auth():
    # check if the the session is currently active (user logged in)
    # in case it's not raises an error for the problem
    is_active = flask.session.get("active", False)
    if not is_active: raise RuntimeError("User is not authenticated")

    # retrieves the current username in session, defaulting to
    # anonymous in case no username is currently in session
    username = flask.session.get("username", "anonymous")

    # retrieves both the channel and the socket id information
    # from the provided field parameters, these values are going
    # to be used in the authentication process
    channel = quorum.get_field("channel")
    socket_id = quorum.get_field("socket_id")

    # authenticates the provided socket id in the provided channel
    # retrieving the token for authentication and returning a message
    # containing both the authentication token and the user info
    auth = pushi.Pushi().authenticate(channel, socket_id)
    return dict(
        auth = auth,
        channel_data = dict(
            user_id  = username,
            username = username,
            peer = True
        )
    )
