import "./styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as mapboxgl from "mapbox-gl";
import settings from "./settings.json";

mapboxgl.accessToken = settings.accessToken;

async function init(e) {
    const map = e.target;
    const custom = await import("./custom-style.json");
    const aqiResponse = await fetch("http://www.baaqmd.gov/Files/Feeds/aqi_rss.xml");
    const aqiText = await aqiResponse.text()
    const parser = new DOMParser();
    const aqiDOM = parser.parseFromString(aqiText, "application/xml");

    let aqiData = [];
    aqiDOM.querySelectorAll("item").forEach((item) => {
        let itemData = {
            date: item.querySelector('date').innerHTML,
            zones: []
        };
        item.querySelectorAll('zone').forEach((zone) => {
            let measurement = zone.querySelector('measurement').innerHTML;
            if (!isNaN(parseFloat(measurement))) {
                measurement = parseFloat(measurement);
            }

            itemData.zones.push({
                title: zone.querySelector('title').innerHTML,
                measurement: measurement,
                pollutant: zone.querySelector('pollutant').innerHTML
            })
        });
        aqiData.push(itemData);
    });

    console.log(aqiData);

    let style = map.getStyle();

    style.sources = {
        ...style.sources,
        ...custom.sources
    };
    style.layers.push(...custom.layers);

    let forecastLayer = style.layers.find((l) => l.id === 'features');

    forecastLayer.paint["fill-opacity"] = ["case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0.5
    ];
    forecastLayer.paint["fill-color"] = [
      "step",
      ["feature-state", "forecast"],
      "#096",
      61,
      "#ffde33"
    ]

    let zones = ["Eastern Zone", "Coast and Central Bay", "South Central Bay", "Northern Zone", "Santa Clara Valley"];
    zones.forEach((zone, i) => {
        map.setFeatureState({
            id: i+1,
            source: 'composite',
            sourceLayer: 'features'
        }, {forecast: 62});
    })

    let hoveredFeature = false;
    map.on("mousemove", "features", (e) => {
        if (hoveredFeature) {
            map.setFeatureState(hoveredFeature, {hover: false});
            hoveredFeature = false;
        }
        if (e.features.length > 0) {
            hoveredFeature = e.features[0];
            console.log(hoveredFeature);
            map.setFeatureState(hoveredFeature, {hover: true});
        }
    });


    map.setStyle(style);
}

new mapboxgl.Map(settings).on("load", init);
