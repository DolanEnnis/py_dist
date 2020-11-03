import flask
from flask_googlemaps import GoogleMaps
from flask_googlemaps import Map

from datetime import timedelta
from infrastructure.view_modifiers import response
from services import position_services
from data import waypoints
from viewmodels.position.position_viewmodel import PositionViewModel

blueprint = flask.Blueprint('position', __name__, template_folder='templates')


@blueprint.route('/position/', methods=['GET'])
@response(template_file='position.html')
def position_get():
    vm = PositionViewModel()
    mymap = Map(
        identifier="view-side",
        lat=52.55333,
        lng=-9.71667,
        zoom=7,
        style="height:500px;width:100%;margin:0;"
    )

    return {
        'lat': 52.57,
        'long': 9.69,
        'speed': 10,
        "mymap": mymap,
        'next_wp': position_services.next_wp(52.97, 9.69, waypoints.get_waypoints())
    }


@blueprint.route('/position/', methods=['POST'])
@response(template_file='position.html')
def position_post():
    r = flask.request
    lat = float(r.form.get('lat_deg')) + position_services.min_to_deg(r.form.get('lat_min'))
    long = float(r.form.get('long_deg')) + position_services.min_to_deg(r.form.get('long_min'))
    speed = position_services.null_to_zero(r.form.get('speed'))
    time_seen = position_services.time_seen(r.form.get('delay_hrs'), r.form.get('delay_min'))
    next_wp = position_services.next_wp(lat, long, waypoints.get_waypoints())
    wp_dist = position_services.dist_to_waypoint(lat, long, next_wp)
    dist = wp_dist + next_wp.distToKil
    time_to_go = dist / speed
    eta_kil = time_seen + timedelta(hours=time_to_go)
    eta_scattery = time_seen + timedelta(hours=time_to_go + 7.6 / speed)
    mymap = position_services.get_map(lat,long, waypoints.get_waypoints())

    return {
        "mymap": mymap,
        'lat': round(lat, 2),
        'long': round(long, 2),
        'speed': speed,
        'time_seen': time_seen.strftime("%H:%M %a"),
        'dist': str(round(dist, 1)),
        'next_wp': next_wp,
        'wp_dist': str(round(wp_dist, 1)),
        'time_to_go': str(round(time_to_go, 2)),
        'eta_kil': eta_kil.strftime("%H:%M %a"),
        'eta_scattery': eta_scattery.strftime("%H:%M %a"),
    }
