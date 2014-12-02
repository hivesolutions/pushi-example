<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="{{ url_for('static', filename = 'css/layout.css') }}" />
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
        <script type="text/javascript" src="{{ url_for('static', filename = 'libs/pushi/pushi.js') }}"></script>
        <script type="text/javascript" src="{{ url_for('static', filename = 'js/main.js') }}"></script>
    </head>
    <body>
        <h1>Pushi Example</h1>
        {% block content %}{% endblock %}
        <div class="footer">
            {% if session.username %}
                <div>logged in as <strong>{{ session.username }}</strong></div>
                <div><a href="{{ url_for('logout') }}">logout</a></div>
            {% else %}
                <div><a href="{{ url_for('login') }}">login</a></div>
            {% endif %}
        </div>
        <div class="hidden">
            <div class="pushi-url">{{ base_url|default("", True) }}</div>
            <div class="pushi-key">{{ app_key|default("", True) }}</div>
        </div>
    </body>
</html>
