import React from 'react';

const ConversionForm = ({ currencies, amount, setAmount, fromCurrency, setFromCurrency, toCurrency, setToCurrency, convertCurrency }) => {
  return (
    <div>
      <section>Enter The Amount to Convert:</section>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input"
      />
      <br />
      <label>CONVERT FROM</label>
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
  );
};

export default ConversionForm;
