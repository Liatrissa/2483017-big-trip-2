import { POINT_TYPES, OFFER_TITLES} from '../const.js';

const OFFERS = [
  {
    type: POINT_TYPES[0],
    offers: [
      { id: 'o1', title: OFFER_TITLES[0], price: 20 }
    ]
  },
  {
    type: POINT_TYPES[5],
    offers: [
      { id: 'o2', title: OFFER_TITLES[1], price: 50 },
      { id: 'o3', title: OFFER_TITLES[2], price: 80 }
    ]
  },
  {
    type: POINT_TYPES[4],
    offers: [
      { id: 'o4', title: OFFER_TITLES[3], price: 200 }
    ]
  },
  {
    type: POINT_TYPES[6],
    offers: [
      { id: 'o5', title: OFFER_TITLES[4], price: 50 }
    ]
  },
  {
    type: POINT_TYPES[7],
    offers: [
      { id: 'o6', title: OFFER_TITLES[5], price: 40 },
      { id: 'o7', title: OFFER_TITLES[6], price: 30 }
    ]
  }
];

export { OFFERS };
