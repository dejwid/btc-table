import axios from "axios";
import {useEffect, useState} from "react";
import AmountInput from "./AmountInput";
import LoadingSkeleton from "./LoadingSkeleton";
import ResultRow from "./ResultRow";
import {sortBy} from 'lodash';
import  useDebouncedEffect  from  'use-debounced-effect';

type CachedResult = {
  provider: string;
  btc: string;
};

type OfferResults = {[keys: string]:string};

const defaultAmount = '100';

function App() {
  const [prevAmount,setPrevAmount] = useState(defaultAmount);
  const [amount,setAmount] = useState(defaultAmount);
  const [cachedResults,setCachedResults] = useState<CachedResult[]>([]);
  const [offerResults,setOfferResults] = useState<OfferResults>({});
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    axios.get('https://rds54favbg.us.aircode.run/cachedValues')
      .then(res => {
        setCachedResults(res.data);
        setLoading(false);
      });
  }, []);

  useDebouncedEffect(() => {
    if (amount === defaultAmount) {
      return;
    }
    if (amount !== prevAmount) {
      setLoading(true);
      axios
        .get(`https://rds54favbg.us.aircode.run/offers?amount=${amount}`)
        .then(res => {
          setLoading(false);
          setOfferResults(res.data);
          setPrevAmount(amount);
        })
    }
  }, 300, [amount]);

  const sortedCache:CachedResult[] = sortBy(cachedResults, 'btc').reverse();
  const sortedResults:CachedResult[] = sortBy(Object.keys(offerResults).map(provider => ({
      provider,
      btc:offerResults[provider]
  })), 'btc').reverse();

  const showCached = amount === defaultAmount;

  const rows = showCached ? sortedCache : sortedResults;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="uppercase text-6xl text-center font-bold bg-gradient-to-br from-purple-600 to-sky-400 bg-clip-text text-transparent from-30%">Find cheapest BTC</h1>
      <div className="flex justify-center mt-6">
        <AmountInput
          value={amount}
          onChange={e => setAmount(e.target.value)}
          />
      </div>
      <div className="mt-6">
        {loading && (
          <LoadingSkeleton />
        )}
        {!loading && rows.map(result => (
          <ResultRow
            key={result.provider}
            providerName={result.provider}
            btc={result.btc}
          />
        ))}
      </div>
    </main>
  )
}

export default App
