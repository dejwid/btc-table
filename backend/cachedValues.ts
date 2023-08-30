// @see https://docs.aircode.io/guide/functions/
import {db} from 'aircode';

async function getCachedForProvider(providerName:string): Promise<object> {
  return await db.table('cachedOffers')
    .where({provider:providerName})
    .sort({createdAt:-1})
    .findOne();
}

export default async function (params: any, context: any) {
  const providers = ['guardarian', 'moonpay', 'transak', 'paybis'];

  const results = await Promise.all([
    getCachedForProvider(providers[0]),
    getCachedForProvider(providers[1]),
    getCachedForProvider(providers[2]),
    getCachedForProvider(providers[3]),
  ]);
  
  return results;
};
