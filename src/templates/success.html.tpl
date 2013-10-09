<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="{{ url_for('static', filename = 'css/layout.css') }}" />
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
        <script type="text/javascript" src="{{ url_for('static', filename = 'libs/pushi/pushi.js') }}"></script>
        <script type="text/javascript" src="{{ url_for('static', filename = 'js/main.js') }}"></script>
    </head>
    <body>
        <h1>Pushi Example</h1>
        <h2 class="message">Success</h2>
        <div class="footer">
            {% if session.username %}
                <div>logged in as <strong>{{ session.username }}</strong></div>
                <div><a href="{{ url_for('logout') }}">logout</a></div>
            {% else %}
                <div><a href="{{ url_for('login') }}">login</a></div>
            {% endif %}
        </div>
    </body>
</html>