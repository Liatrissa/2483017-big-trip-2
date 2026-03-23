import { CITIES, DESCRIPTION_DESTINATION } from '../const.js';
import { getRandomInteger } from '../utils.js';

const DESTINATIONS = [
  {
    id: 'd1',
    name: CITIES[0],
    description: DESCRIPTION_DESTINATION,
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 9999)}`,
        description: 'Amsterdam photo'
      }
    ]
  },
  {
    id: 'd2',
    name: CITIES[1],
    description: DESCRIPTION_DESTINATION,
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=2',
        description: 'Chamonix photo'
      }
    ]
  },
  {
    id: 'd3',
    name: CITIES[2],
    description: DESCRIPTION_DESTINATION,
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=3',
        description: 'Geneva photo'
      }
    ]
  },
  {
    id: 'd4',
    name: CITIES[3],
    description: DESCRIPTION_DESTINATION,
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 9999)}`,
        description: 'Helsinki photo'
      }
    ]
  },
  {
    id: 'd5',
    name: CITIES[4],
    description: DESCRIPTION_DESTINATION,
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 9999)}`,
        description: 'Oslo photo'
      }
    ]
  },
  {
    id: 'd6',
    name: CITIES[5],
    description: DESCRIPTION_DESTINATION,
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 9999)}`,
        description: 'Paris photo'
      }
    ]
  },
  {
    id: 'd7',
    name: CITIES[6],
    description: DESCRIPTION_DESTINATION,
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 9999)}`,
        description: 'Rome photo'
      }
    ]
  }
];

export { DESTINATIONS };
