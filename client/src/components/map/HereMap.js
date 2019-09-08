function HereMap(platform, coord) {
    var mapita = platform.createDefaultLayers().normal.map;
    return new window.H.Map(document.getElementById("mapContainer"), mapita, {
        zoom: 10,
        center: coord
    });
}

export default HereMap;