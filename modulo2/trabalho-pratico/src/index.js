import express from 'express';
import { promises } from 'fs';
import routesStates from '../routes/states.js';
import { maxHeaderSize } from 'http';

const app = express();
const { readFile, writeFile } = promises;

app.use(express.json());
app.use('/states', routesStates);

app.listen(3333, () => console.log('[API iniciada]'));

start();

async function start() {
  try {
    const jsonCities = await readFile('cidades.json');
    const jsonStates = await readFile('estados.json');
    const states = JSON.parse(jsonStates);
    const cities = JSON.parse(jsonCities);

    const statesAndCities = states.map(
      ({ ID: id, Sigla: initials, Nome: name } = state) => {
        const listCities = cities
          .map(({ ID, Nome, Estado } = city) => ({
            id: ID,
            city: Nome,
            stateId: Estado,
          }))
          .filter(({ stateId } = city) => id === stateId);

        return {
          id: id,
          initials: initials,
          state: name,
          cities: listCities,
        };
      }
    );

    saveStatesForJsonFile(statesAndCities);
    fistFiveAndLastFive(statesAndCities);
    orderNamesCityForState(statesAndCities);
    biggestAndSmallestCityName(statesAndCities);
  } catch (error) {
    console.log(error);
  }
}

async function saveStatesForJsonFile(statesAndCities) {
  statesAndCities.forEach((state) => {
    const file = `./states/${state.initials}.json`;
    writeFile(file, JSON.stringify(state));
  });
}

function fistFiveAndLastFive(statesAndCities) {
  let arrayResults = [];
  let orderStates = statesAndCities
    .sort((a, b) => {
      return b.cities.length - a.cities.length;
    })
    .map(({ initials, cities } = state) => {
      return `${initials} - ${cities.length}`;
    });

  //first five
  arrayResults.push(orderStates.slice(0, 5));
  //last five
  arrayResults.push(orderStates.slice(orderStates.length - 5));

  console.log(arrayResults[0]);
  console.log(arrayResults[1]);
}

function orderNamesCityForState(statesAndCities) {
  let biggerNames = [];
  let smallNames = [];
  statesAndCities.map(({ initials, cities } = state) => {
    let nameSizeBigger = 0;
    let nameSizeSmall = 150;
    cities.forEach(({ city } = city) => {
      if (city.length > nameSizeBigger) {
        nameSizeBigger = city.length;
      }
      if (city.length < nameSizeSmall) {
        nameSizeSmall = city.length;
      }
    });

    biggerNames.push(filterCities(cities, initials, nameSizeBigger));
    smallNames.push(filterCities(cities, initials, nameSizeSmall));
  });

  console.log(biggerNames);
  console.log(smallNames);
}

function filterCities(city, initials, size) {
  let order = city
    .filter(({ city } = city) => city.length === size)
    .sort((a, b) => a.city.localeCompare(b.city))
    .map(({ city } = city) => {
      return `${city} - ${initials}`;
    });

  return order[0];
}

function biggestAndSmallestCityName(statesAndCities) {
  let allCities = [];
  let biggerNames = [];
  let smallNames = [];
  let nameSizeBigger = 0;
  let nameSizeSmall = 150;

  statesAndCities.map(({ initials, cities } = state) => {
    cities.forEach(({ city } = city) => {
      if (city.length > nameSizeBigger) {
        nameSizeBigger = city.length;
      }
      if (city.length < nameSizeSmall) {
        nameSizeSmall = city.length;
      }
      allCities.push({ city, initials });
    });
  });

  biggerNames = filterAllCities(allCities, nameSizeBigger);
  smallNames = filterAllCities(allCities, nameSizeSmall);

  console.log(biggerNames);
  console.log(smallNames);
}

function filterAllCities(allCities, size) {
  let order = allCities
    .filter(({ city } = city) => city.length === size)
    .sort((a, b) => a.city.localeCompare(b.city))
    .map(({ city, initials } = city) => {
      return `${city} - ${initials}`;
    });
  return [order[0]];
}
