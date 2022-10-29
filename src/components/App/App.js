import React, { useState, useEffect } from 'react';
import { FcCalculator } from 'react-icons/fc';
import { fetch } from '../Fetch/fetch';
import { Exchange } from '../Exchange/Exchange';
import { CurrencyRate } from '../CurrencyRate/CurrencyRates';
import { MainText, Equal, Wrap } from './App.styled';

export const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [maineCurrency, setMaineCurrency] = useState([]);
  const [sellCurrency, setSellCurrency] = useState();
  const [buyCurrency, setBuyCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amount, setAmount] = useState(1);
  const [isAmount, setIsAmount] = useState(true);

  let amountToSell;
  let amountToBuy;

  if (isAmount) {
    amountToSell = amount;
    amountToBuy = Number((amount * exchangeRate).toFixed(2));
  } else {
    amountToBuy = amount;
    amountToSell = Number((amount / exchangeRate).toFixed(2));
  }
  useEffect(() => {
    try {
      fetch().then(data => {
        const options = Object.keys(data.rates);
        setCurrencyOptions([...options]);
        setMaineCurrency([
          data.rates.UAH.toFixed(2),
          data.rates.EUR.toFixed(2),
          data.rates.GBP.toFixed(2),
        ]);
        setSellCurrency(data.base);
        setBuyCurrency(options[options.length - 1]);
        setExchangeRate(data.rates[options[options.length - 1]]);
      });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    if (sellCurrency !== undefined && buyCurrency !== undefined) {
      try {
        fetch(`https://cdn.cur.su/api/nbu.json`).then(data => {
          let sell = data.rates[sellCurrency];
          let buy = data.rates[buyCurrency];
          setExchangeRate(buy / sell);
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [sellCurrency, buyCurrency]);

  const toSellHandleChange = evt => {
    const sum = Number(evt.target.value);
    setAmount(sum);
    setIsAmount(true);
  };
  const toBuyHandleChange = evt => {
    const sum = Number(evt.target.value);
    setAmount(sum);
    setIsAmount(false);
  };

  return (
    <Wrap>
      <MainText>Currency converter</MainText>
      <CurrencyRate maineCurrency={maineCurrency} />
      <Exchange
        currencyOptions={currencyOptions}
        selectedCurrency={sellCurrency}
        onChange={evt => setSellCurrency(evt.target.value)}
        amount={amountToSell}
        onValueChange={toSellHandleChange}
        type={'Sell: '}
      />
      <Equal>
        <FcCalculator size="42" />
      </Equal>
      <Exchange
        currencyOptions={currencyOptions}
        selectedCurrency={buyCurrency}
        onChange={evt => setBuyCurrency(evt.target.value)}
        amount={amountToBuy}
        onValueChange={toBuyHandleChange}
        type={'Buy: '}
      />
    </Wrap>
  );
};
