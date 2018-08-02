import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';
import * as mapboxgl from 'mapbox-gl';
import neighborhoods from '../data/la-county-neighborhoods-v6-agg.json';
mapboxgl.accessToken = 'pk.eyJ1Ijoicmdhc3RvbiIsImEiOiJJYTdoRWNJIn0.MN6DrT07IEKXadCU8xpUMg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rgaston/cjkd7pcl1ccdp2stf8742ykxl',
    center: [-118.4, 34],
    zoom: 9.5,
    pitch: 60
});

map.on('load', () => {
    map.addSource('neighborhoods', {
        'type': 'geojson',
        'data': neighborhoods
    });
    map.addLayer({
        'id': 'neighborhoods',
        'type': 'fill-extrusion',
        'source': 'neighborhoods',
        'layout': {},
        'paint': {
            'fill-extrusion-color': '#53a682',
            'fill-extrusion-height': ['get', 'count'],
            'fill-extrusion-opacity': 0.7
        },
        "filter": ["!=", "count", 0]
    });
    map.addLayer({
        'id': 'neighborhoods-outline',
        'type': 'line',
        'source': 'neighborhoods',
        "filter": ["!=", "count", 0],
        'paint': {
            'line-color': '#00e281',
        }
    });
});
