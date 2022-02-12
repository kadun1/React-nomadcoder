import { useState, useEffect, useLayoutEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cost, setCost] = useState(1);
  const [selected, setSelected] = useState(1);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers").then((response) =>
      response.json().then((json) => {
        setCoins(json);
        setLoading(false);
      })
    );
  }, []);
  const inputVal = (event) => {
    setCost(event.target.value);
  };
  const selectedVal = (event) => {
    setSelected(event.target.value);
    setCost(1);
  };
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select
            className="sel"
            onChange={selectedVal}
            style={{ display: "block" }}
          >
            <option>Select Coin!!</option>
            {coins.map((coin, index) => (
              <option key={index} value={coin.quotes.USD.price}>
                {coin.name}({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <input
            type="number"
            value={cost}
            onChange={inputVal}
            placeholder={"입력"}
          />
          $<h2>You Can get {cost / selected}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
