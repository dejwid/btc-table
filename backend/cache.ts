// @see https://docs.aircode.io/guide/functions/
import {db} from 'aircode';
import { getAllOffers } from './providers';

export default async function (params: any, context: any) {
  const offers = await getAllOffers(100);
  const offersData = Object.keys(offers).map(provider => {
    return {
      provider,
      btc:offers[provider],
    };
  });
  await db.table('cachedOffers').save(offersData);
  
  return {
    message: 'ok',
  };
};
