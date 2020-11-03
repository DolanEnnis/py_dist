from datetime import datetime, timedelta
from geopy.distance import geodesic
from flask_googlemaps import Map

from data.waypoints import Waypoint


def get_time() -> str:
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    return current_time


def min_to_deg(min) -> float:
    return (null_to_zero(min)) / 60


def dist_to_kilcredaun(lat, long) -> float:
    kilcredaun = (52.57, -9.69)
    wp = (lat, long * -1)
    dist = geodesic(kilcredaun, wp).nm
    return dist


def dist_to_waypoint(lat, long, waypoint) -> float:
    ship = (lat, long * -1)
    wp = (waypoint.lat, waypoint.longtit)
    return geodesic(ship, wp).nm


def next_wp(lat, long, waypoints):
    nearest_dist = 10000000
    near_wp = Waypoint("Nothing Near", 0, 0, 10000000, "")
    for wp in waypoints:
        dist = dist_to_waypoint(lat, long, wp)
        if dist < nearest_dist:
            nearest_dist = dist
            near_wp = wp
    if near_wp.name == 'guard':
        near_wp = next((x for x in waypoints if x.name == near_wp.use_waypoint), None)
    return near_wp


def time_seen(delay_hr, delay_min):
    delay_hr = null_to_zero(delay_hr)
    delay_min = null_to_zero(delay_min)
    last_seen = datetime.now() - timedelta(hours=delay_hr, minutes=delay_min)
    return last_seen


def null_to_zero(my_string):
    if my_string == '':
        return 0
    else:
        return float(my_string)


def get_map(lat, long, waypoints):
    circle = [{  # draw circles on map for each waypoint
        'stroke_color': '#030303',
        'stroke_opacity': .5,
        'stroke_weight': 5,
        # line(stroke) style
        'fill_color': '#FFFFFF',
        'fill_opacity': .2,
        # fill style
        'center': {  # set circle to user_location
            'lat': loc.lat,
            'lng': loc.longtit,
        },
        'radius': get_wp_radius(loc.distToKil)  # circle size (50 meters)
    } for loc in waypoints]

    map = Map(
        identifier="view-side",
        lat=52.55333,
        lng=-9.71667,
        zoom=7,
        maptype="TERRAIN",
        style="height:500px;width:100%;margin:0;",
        maptype_control=False,
        scale_control=False,
        markers=[
            {
                'lat': lat,
                'lng': -long,
                'infobox': "Ship Pos"
            },
            {
                'lat': 52.57,
                'lng': -9.69,
                'infobox': "Kilcreadaun"
            }

        ],
        fit_markers_to_bounds=True,
        circles=circle,  # pass circles
    )
    return map


def get_wp_radius(dist_to_kil):
    if dist_to_kil > 10000:
        print("position_service 103")
        return 50
    else:
        return 500
