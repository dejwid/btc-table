// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import axios from 'axios';

export async function getOfferFromPaybis(amount:number): Promise<string|void> {
  try {
    const res = await axios.post('https://api.paybis.com/public/processing/v2/quote/buy-crypto', {
      "currencyCodeFrom":"USD",
      "currencyCodeTo":"BTC",
      "requestedAmount":{"amount":amount.toString(),"currencyCode":"USD"},
      "requestedAmountType":"from",
      "promoCode":null,
      "paymentMethod":"credit-card"
    }); 
    return res.data?.paymentMethods?.[0]?.amountTo?.amount.toString();
  } catch(e) {
    console.error(e);
    return;
  }
}

export async function getOfferFromGuardarian(amount:number): Promise<string|void> {
  try {
    const res = await axios.get(
      `https://api-payments.guardarian.com/v1/estimate?to_currency=BTC&from_amount=${amount}&from_currency=USD&from_network=USD&to_network=BTC`,
      {
        headers: {
          'X-Api-Key': 'c14d927f-cb01-4561-9520-28ec22c92710',
        }
      }
    );
    return res?.data?.value?.toString();
  } catch(e) {
    console.error(e);
    return;
  }
}

export async function getOfferFromMoonpay(amount:number): Promise<string|void> {
  try {
    const res = await axios.get(`https://api.moonpay.com/v3/currencies/btc/buy_quote?apiKey=pk_live_R5Lf25uBfNZyKwccAZpzcxuL3ZdJ3Hc&baseCurrencyAmount=${amount}&baseCurrencyCode=usd&fixed=true&areFeesIncluded=true&regionalPricing=true&quoteType=principal`);
    return res?.data?.quoteCurrencyAmount?.toString();
  } catch(e) {
    console.error(e);
    return;
  }
}

export async function getOfferFromTransak(amount:number): Promise<string|void> {
  try {
    const res = await axios.get(`https://api.transak.com/api/v1/pricing/public/quotes?fiatCurrency=USD&cryptoCurrency=BTC&paymentMethod=credit_debit_card&isBuyOrSell=BUY&fiatAmount=${amount}&partnerApiKey=02624956-010b-4775-8e31-7b9c8b82df76&network=mainnet`);
    return res?.data?.response?.cryptoAmount?.toString();
  } catch(e) {
    console.error(e);
    return;
  }
}

type Results = {[keys:string]:string};

export async function getAllOffers(amount:number): Promise<Results> {
  const [paybis, guardarian, moonpay, transak] = await Promise.all([
    getOfferFromPaybis(amount),
    getOfferFromGuardarian(amount),
    getOfferFromMoonpay(amount),
    getOfferFromTransak(amount),
  ]);
  const results:Results = {};
  if (paybis) results.paybis = paybis;
  if (guardarian) results.guardarian = guardarian;
  if (moonpay) results.moonpay = moonpay;
  if (transak) results.transak = transak;
  return results;
}

