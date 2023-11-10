import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3000/currencies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCurrencies(data);
        setFromCurrency(Object.keys(data)[0]);
        setToCurrency(Object.keys(data)[1]);
      })
      .catch((error) => {
        setError('Failed to fetch currency data. Please try again later.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const convertCurrency = () => {
    setError(null); // Clear previous errors

    if (!fromCurrency || !toCurrency) {
      setError("Please select both 'FROM' and 'TO' currencies.");
      setConvertedAmount(null);
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      setError('Please enter a valid amount greater than 0.');
      setConvertedAmount(null);
      return;
    }

    if (fromCurrency === toCurrency) {
      setConvertedAmount(amountNumber);
      return;
    }

    const fromRate = currencies[fromCurrency].exchangeRate;
    const toRate = currencies[toCurrency].exchangeRate;
    const converted = (amountNumber / fromRate) * toRate;
    setConvertedAmount(converted.toFixed(2)); // Round to 2 decimal places
  };

  if (isLoading) {
    return <div className="card-container">Loading currencies...</div>;
  }

  return (
    <div className="App">
      <div className="card-container">
        <h1>Dee's Currency Converter</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <section> Enter The Amount to Convert: </section>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input"
          />
          <br />
          <label>CONVERT FROM </label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="select"
          >
            {Object.keys(currencies).map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {currencies[currencyCode].name}
              </option>
            ))}
          </select>
          <br />
          <label>TO</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="select"
          >
            {Object.keys(currencies).map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {currencies[currencyCode].name}
              </option>
            ))}
          </select>
          <br />
          <button onClick={convertCurrency} className="button">Convert</button>
        </div>
        <div className="conversion-result">
          <p>CONVERSION RESULT</p>
          {convertedAmount !== null && !error && (
            <p>
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;






