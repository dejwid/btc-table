// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import { getAllOffers } from './providers';

export default async function (params: any, context: any) {
  const {amount} = params;
  return getAllOffers(amount);
};
