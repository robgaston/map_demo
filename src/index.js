import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';
import './token';
import * as mapboxgl from 'mapbox-gl';
import style from './styles/mapbox_streets_v8.json';
import places from './data/la_historic_places.json';
import neighborhoods from './data/la-county-neighborhoods-v6.json';

style.sources = Object.assign(style.sources, {
    'places': {
        'type': 'geojson',
        'data': places
    },
    'neighborhoods': {
        'type': 'geojson',
        'data': neighborhoods
    }
});

style.layers.push({
    'id': 'places',
    'type': 'heatmap',
    'source': 'places'
}, {
    'id': 'neighborhoods',
    'type': 'fill',
    'source': 'neighborhoods',
    'layout': {},
    'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.1,
        'fill-outline-color': 'black'
    }
});

new mapboxgl.Map({
    container: 'map',
    style: style,
    center: [-118.5, 34],
    zoom: 9
});
