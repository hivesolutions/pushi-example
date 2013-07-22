<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="{{ url_for('static', filename = 'css/layout.css') }}" />
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
        <script type="text/javascript" src="{{ url_for('static', filename = 'js/pushi.js') }}"></script>
        <script type="text/javascript" src="{{ url_for('static', filename = 'js/main.js') }}"></script>
    </head>
    <body>
        <h1>Pushi Example</h1>
        <div class="console"></div>
    </body>
</html>
