import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Table head
const THead = () => {
  return (
    <thead>
      <tr id="head">
        <th>#</th>
        <th>Currency</th>
        <th>Price</th>
        <th>24h Volume</th>
        <th>Mkt Cap</th>
      </tr>
    </thead>
  );
};

// Table body
const TBody = (props) => {
  // use props to get currencies data
  const currencies = props.currencies;

  return (
    <tbody>
      {currencies.map((items, index) => {
        return (
          <tr key={items._id} id={items.Currency}>
            <td>{index + 1}</td>
            <td>{items.Currency}</td>
            <td>{"$" + ((items.High + items.Low) / 2).toFixed(3)}</td>
            <td>{"$" + items.Volume}</td>
            <td>{"$" + items.MarketCap}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

// The Whole Currency Table, contain Table Head, Table Body commponent
// and a button for requesting and displaing more information
const CurrencyTable = () => {
  const [currencies, setCurrencies] = useState([]);
  const currencyNames = currencies.map((item) => item.Currency);

  // get currency data as the first time page refresh
  useEffect(() => {
    axios.get("http://localhost:5000/currency").then((res) => {
      setCurrencies(res.data);
    });
  }, []);

  return (
    <React.Fragment>
      <Table striped bordered hover>
        <THead />
        <TBody currencies={currencies} />
      </Table>
      <button className="btn" onClick={() => fatchingMoreInfo(currencyNames)}>
        More Info
      </button>
    </React.Fragment>
  );
};

// onclick function, request 24h, 7d, 1m change difference
async function fatchingMoreInfo(currencyNames) {
  // add new table haed
  const head = document.getElementById("head");
  const newth_24h = document.createElement("th");
  const newhead_24h = document.createTextNode("24h");
  newth_24h.appendChild(newhead_24h);
  head.appendChild(newth_24h);

  const newth_7d = document.createElement("th");
  const newhead_7d = document.createTextNode("7d");
  newth_7d.appendChild(newhead_7d);
  head.appendChild(newth_7d);

  const newth_1m = document.createElement("th");
  const newhead_1m = document.createTextNode("1m");
  newth_1m.appendChild(newhead_1m);
  head.appendChild(newth_1m);

  // fetching data with loops
  currencyNames.forEach(async (currencyName) => {
    await fatching(currencyName);
  });
  const btn = document.getElementsByClassName("btn");
  btn[0].parentNode.removeChild(btn[0]);
}

// async function for fatching data
async function fatching(currencyName) {
  // send get request
  axios.get("http://localhost:5000/moreValue/" + currencyName).then((res) => {
    const _24h = (res.data["24h"] * 100).toFixed(2) + "%";
    const _7d = (res.data["7d"] * 100).toFixed(2) + "%";
    const _30d = (res.data["30d"] * 100).toFixed(2) + "%";

    const row = document.getElementById(currencyName);

    const newtd_24h = document.createElement("td");
    const newtext_24h = document.createTextNode(_24h);
    newtd_24h.appendChild(newtext_24h);
    row.appendChild(newtd_24h);

    const newtd_7d = document.createElement("td");
    const newtext_7d = document.createTextNode(_7d);
    newtd_7d.appendChild(newtext_7d);
    row.appendChild(newtd_7d);

    const newtd_30d = document.createElement("td");
    const newtext_30d = document.createTextNode(_30d);
    newtd_30d.appendChild(newtext_30d);
    row.appendChild(newtd_30d);
  });
}

export default CurrencyTable;
