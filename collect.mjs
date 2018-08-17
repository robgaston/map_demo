import fs from 'fs';
import turf from '@turf/turf';
import neighborhoods from './data/neighborhoods.json';
import sites from './data/sites.json';

sites.features.forEach(function(feature) {
    feature.properties = {
        count: 1
    };
});

let collected = turf.collect(neighborhoods, sites, 'count', 'count');

collected.features = collected.features.filter(function(feature, i) {
    feature.id = i;
    feature.properties.count = feature.properties.count.length;
    return feature.properties.count > 0;
});

collected = JSON.stringify(collected, null, '\t');

fs.writeFile('./data/collected.json', collected, function(err) {
    if (err) throw err;

    console.log('done.');
});
