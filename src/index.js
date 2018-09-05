import "./styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as mapboxgl from "mapbox-gl";
import settings from "./settings.json";

mapboxgl.accessToken = settings.accessToken;

async function init(e) {
    const map = e.target;
    const popup = document.querySelector("#popup");
    const countyNameEl = document.querySelector("#popup .county-name");
    const countEl = document.querySelector("#popup .count");
    const custom = await import("./custom-style.json");
    const neighborhoods = await import("../data/output.json");

    let hoverId = null;
    let style = map.getStyle();

    style.sources = {
        ...style.sources,
        ...custom.sources
    };
    style.layers.push(...custom.layers);
    map.setStyle(style);

    map.getSource("neighborhoods").setData(neighborhoods);

    function clearHover() {
        if (hoverId) {
            map.setFeatureState({
                source: "neighborhoods",
                id: hoverId
            }, {
                hover: false
            });
        }
        popup.style.display = "none";
        hoverId = null;
    }

    map.on("mousemove", "neighborhoods", (e) => {
        clearHover();
        if (e.features.length > 0) {
            let feature = e.features[0];
            hoverId = feature.id;
            map.setFeatureState({
                source: "neighborhoods",
                id: hoverId
            }, {
                hover: true
            });
            popup.style.display = "block";
            countyNameEl.innerHTML = feature.properties.name;
            countEl.innerHTML = feature.properties.count;
        }
    });

    map.on("mouseleave", "neighborhoods", clearHover);
}

new mapboxgl.Map(settings).on("load", init);
