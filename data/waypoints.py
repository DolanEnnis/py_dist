class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age


class Waypoint:
    def __init__(self, name, lat, longtit, dist_to_kil, use_waypoint):
        self.name = name
        self.lat = lat
        self.longtit = longtit
        self.distToKil = dist_to_kil
        self.use_waypoint = use_waypoint


def waypoint(name, lat, longtit, dist_to_kil):
    return Waypoint(name, lat, longtit, dist_to_kil, name)


def guard(lat, longtit, use_waypoint):
    return Waypoint("guard", lat, longtit, 1000000, use_waypoint)


waypoints = [
    waypoint("Kilcreadaun", 52.57, -9.69, 0),
    waypoint("Loop Head", 52.53333, -10, 11.56569),
    waypoint("Slyne Head", 53.40000, -10.46667, 65.11+1.16569),
    waypoint("Black Rock", 54.08333, -10.48333, 106.12+1.16569),
    waypoint("Eagle Island", 54.31333, -10.33333, 120.89+1.16569),
    waypoint("Tory Island", 55.32167, -8.28333, 214.19+1.16569),
    waypoint("Inishtrahull", 55.50833, -7.23333, 251.74+1.16569),
    waypoint("Middle Bank", 55.42500, -6.24333, 285.86+1.16569),
    waypoint("Rathlin TSS", 55.40167, -6.05, 292.60+1.16569),
    waypoint("East Maiden", 55.06667, -5.46667, 320.96+1.16569),
    waypoint("Black Head", 54.75833, -5.63333, 340.33+1.16569),
    waypoint("Inishtooskert", 52.15935, -10.61583, 40.63+1.38),
    waypoint("Inishtearaght", 52.08675, -10.72698, 46.61+1.38),
    waypoint("Little Foze", 52.01442, -10.75322, 51.05+1.38),
    waypoint("Skellig", 51.75122, -10.60485, 67.7783+1.38),
    waypoint("Bull", 51.56700, -10.3489, 82.3865+1.38),
    waypoint("Fastnet", 51.25328, -9.57865, 116.877+1.38),
    waypoint("BANN SHOAL BUOY", 50.34187, -5.88902, 267.458+1.38),
    waypoint("Wolf Rock", 49.99257, -5.8866, 288.42+1.38),
    waypoint("Lizard", 49.90167, -5.20282, 315.45+1.38),
    waypoint("CS1", 50.53037, -0.05217, 517.30+1.38),
    waypoint("Scilly", 49.72, -6.6412, 261.88+1.38),
    guard(52.532953, -9.99620, "Kilcreadaun"),
    guard(53.39683, -10.46664, "Loop Head"),
    guard(54.08, -10.48333, "Slyne Head"),
    guard(54.31333, -10.33633, "Black Rock"),
    guard(55.31951, -8.28533, "Eagle Island"),
    guard(55.50833, -7.23433, "Tory Island"),
    guard(55.42549, -6.243823, "Inishtrahull"),
    guard(55.40236, -6.05070, "Middle Bank"),
    guard(55.06903, -5.46967, "Rathlin TSS"),
    guard(54.76152, -5.63633, "East Maiden"),
    guard(52.16129, -10.61883, "Kilcreadaun"),
    guard(52.16, -10.615, "Kilcreadaun"),
    guard(52.08918, -10.72998, "Inishtooskert"),
    guard(52.01767, -10.75324, "Inishtearaght"),
    guard(51.75121, -10.60785, "Little Foze"),
    guard(51.75122, -10.75322, "Little Foze"),
    guard(51.5670, -10.35190, "Skellig"),
    guard(51.25328, -9.58165, "Bull"),
    guard(50.34487, -5.89052, "Fastnet"),
    guard(49.9959, -5.88660, "BANN SHOAL BUOY"),
    guard(49.89867, -5.20582, "Wolf Rock"),
    guard(50.52974, -0.05317, "Lizard"),
    guard(49.72, -6.6418, "Bull"),
    guard(49.99, -5.89, "Scilly"), ]


def get_waypoints() -> []:
    return waypoints
