import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';
import * as token from './token';
import * as mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = token;

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9'
});
