import React from 'react';

const ConversionResult = ({ amount, fromCurrency, convertedAmount, toCurrency, error }) => {
  return (
    <div className="conversion-result">
      <p>CONVERSION RESULT</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {convertedAmount !== null && !error && (
        <p>
          {amount} {fromCurrency} is approximately {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default ConversionResult;
