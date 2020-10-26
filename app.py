import data.db_session as db_session
import os
import sys
import flask
from flask_googlemaps import GoogleMaps
import environment

from views import home_views

folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, folder)


app = flask.Flask(__name__)

GoogleMaps(app, key=environment.map_key)


def main():
    register_blueprints()
    setup_db()
    app.run(debug=True)


def setup_db():
    db_file = os.path.join(
        os.path.dirname(__file__),
        'db',
        'sp.sqlite')

    db_session.global_init(db_file)


def register_blueprints():
    from views import home_views
    from views import account_views
    from views import position_views
    app.register_blueprint(home_views.blueprint)
    app.register_blueprint(account_views.blueprint)
    app.register_blueprint(position_views.blueprint)


if __name__ == '__main__':
    main()
else:
    register_blueprints()

if __name__ == '__main__':
    app.run(debug=True)
