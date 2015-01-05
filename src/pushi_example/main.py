#!/usr/bin/python
# -*- coding: utf-8 -*-

# Hive Pushi Framework
# Copyright (C) 2008-2015 Hive Solutions Lda.
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

__copyright__ = "Copyright (c) 2008-2015 Hive Solutions Lda."
""" The copyright for the module """

__license__ = "GNU General Public License (GPL), Version 3"
""" The license for the module """

import flask #@UnusedImport

import quorum

SECRET_KEY = "fs8t3cty11net89x6suvked09v56pa80"
""" The "secret" key to be at the internal encryption
processes handled by flask (eg: sessions) """

app = quorum.load(
    name = __name__,
    secret_key = SECRET_KEY,
    redis_session = True,
    logger = "pushi_example.debug"
)

import pushi_example.views #@UnusedImport

if __name__ == "__main__":
    quorum.run(server = "netius")
