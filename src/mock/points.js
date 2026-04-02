import { DESTINATIONS } from './destinations.js';
import { OFFERS } from './offers.js';
import { POINT_TYPES } from '../const.js';

const POINTS = [
  {
    id: 'p1',
    basePrice: 20,
    dateFrom: '2026-03-18T10:30:00.000Z',
    dateTo: '2026-03-18T11:00:00.000Z',
    destination: DESTINATIONS[0].id,
    isFavorite: true,
    offers: [OFFERS[0].offers[0].id],
    type: POINT_TYPES[0]
  },
  {
    id: 'p2',
    basePrice: 160,
    dateFrom: '2026-03-18T12:25:00.000Z',
    dateTo: '2026-03-18T13:35:00.000Z',
    destination: DESTINATIONS[1].id,
    isFavorite: false,
    offers: [OFFERS[1].offers[0].id],
    type: POINT_TYPES[5]
  },
  {
    id: 'p3',
    basePrice: 160,
    dateFrom: '2026-03-18T14:30:00.000Z',
    dateTo: '2026-03-18T16:05:00.000Z',
    destination: DESTINATIONS[5].id,
    isFavorite: true,
    offers: [OFFERS[2].offers[0].id],
    type: POINT_TYPES[4]
  },
  {
    id: 'p4',
    basePrice: 600,
    dateFrom: '2026-03-18T16:20:00.000Z',
    dateTo: '2026-03-18T17:00:00.000Z',
    destination: DESTINATIONS[4].id,
    isFavorite: true,
    offers: [OFFERS[3].offers[0].id],
    type: POINT_TYPES[6]
  },
  {
    id: 'p5',
    basePrice: 50,
    dateFrom: '2026-03-19T14:20:00.000Z',
    dateTo: '2026-03-19T15:40:00.000Z',
    destination: DESTINATIONS[3].id,
    isFavorite: false,
    offers: [OFFERS[4].offers[0].id],
    type: POINT_TYPES[7]
  },
  {
    id: 'p6',
    basePrice: 20,
    dateFrom: '2026-03-19T16:00:00.000Z',
    dateTo: '2026-03-19T17:00:00.000Z',
    destination: DESTINATIONS[2].id,
    isFavorite: false,
    offers: [],
    type: POINT_TYPES[1]
  },
  {
    id: 'p7',
    basePrice: 20,
    dateFrom: '2026-03-19T18:00:00.000Z',
    dateTo: '2026-03-19T19:00:00.000Z',
    destination: DESTINATIONS[6].id,
    isFavorite: false,
    offers: [],
    type: POINT_TYPES[2]
  }

];

export { POINTS };
