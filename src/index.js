import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';
import * as mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1Ijoicmdhc3RvbiIsImEiOiJJYTdoRWNJIn0.MN6DrT07IEKXadCU8xpUMg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rgaston/cjkehnc142gdu2sqwcjzu8ymz',
    center: [-118.4, 34],
    zoom: 9.5,
    pitch: 10
});

map.on('load', async function () {
    let neighborhoods = await import('../data/la-county-neighborhoods-v6-agg.json');
    neighborhoods.features.forEach((f, i) => {
        f.id = i;
    });
    map.addSource('neighborhoods', {
        'type': 'geojson',
        'data': neighborhoods
    });
    map.addLayer({
        'id': 'neighborhoods-outline',
        'type': 'line',
        'source': 'neighborhoods',
        "filter": ["!=", "count", 0],
        'paint': {
            'line-color': ["case", ["boolean", ["feature-state", "hover"], false],
                '#626262',
                'rgb(193, 193, 193)'
            ],
            'line-width': 1
        }
    });
    map.addLayer({
        'id': 'neighborhoods',
        'type': 'fill-extrusion',
        'source': 'neighborhoods',
        'layout': {},
        'paint': {
            'fill-extrusion-height': ['get', 'count'],
            'fill-extrusion-color': ["case", ["boolean", ["feature-state", "hover"], false],
                '#626262',
                'rgb(193, 193, 193)'
            ],
            'fill-extrusion-opacity': 0.3
        },
        "filter": ["!=", "count", 0]
    });

    let hoveredStateId =  null;
    let popup = document.querySelector('#popup');
    let countyNameEl = document.querySelector('#popup .county-name');
    let countEl = document.querySelector('#popup .count');
    map.on("mousemove", "neighborhoods", function(e) {
        if (e.features.length > 0) {
            if (hoveredStateId) {
                map.setFeatureState({
                    source: 'neighborhoods',
                    id: hoveredStateId
                }, {
                    hover: false
                });
            }
            hoveredStateId = e.features[0].id;
            map.setFeatureState({
                source: 'neighborhoods',
                id: hoveredStateId
            }, {
                hover: true
            });
            popup.style.display = "block";
            countyNameEl.innerHTML = e.features[0].properties.name;
            countEl.innerHTML = (e.features[0].properties.count/10);
        }
    });

    map.on("mouseleave", "neighborhoods", function() {
        if (hoveredStateId) {
            map.setFeatureState({
                source: 'neighborhoods',
                id: hoveredStateId
            }, {
                hover: false
            });
        }
        popup.style.display = "none";
        hoveredStateId = null;
    });
});
