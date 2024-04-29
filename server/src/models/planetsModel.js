const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
// const parse = require('csv-parser')

const planets = require('./planets.mongo');

// const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

async function loadPlanetsData() {
     // let habitablePlanetsCount = 0; // Initialize count of habitable planets
    return new Promise((resolve, reject) => { // Reversed the order of resolve and reject in the Promise constructor
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    // habitablePlanets.push(data);
                    savePlanet(data);
                   // habitablePlanetsCount++;
                }
            })
            .on('error', (err) => {
                console.error(err); 
                reject(err);
            })
            .on('end', async () => {
                // console.log(habitablePlanets.map((planet) => {
                //     return planet['kepler_name'];
                // }));
                const countPlanetsFound = (await getAllPlanets()).length;
                console.log(`${countPlanetsFound} habitable planets found!`);
                resolve();
            });
    });
}

 async function getAllPlanets() {
    return await planets.find({}, {
        '_id': 0, '__v': 0,
    });
}

 async function savePlanet(planet){
    // console.log("DAta",planet)
       try {
      // TODO: Replace below create with insert + update = upsert
       await planets.updateOne({
        keplerName: planet.kepler_name,
       }, {
        keplerName: planet.kepler_name,
       }, {
        upsert: true,
       });
       
     } catch (err) {
        console.error(`Could not save planet ${err}`);
     }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
};