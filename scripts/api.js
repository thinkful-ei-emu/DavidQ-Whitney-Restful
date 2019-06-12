/* eslint-env jquery */
'use strict';

const Api = (function(){
  const URL = 'https://thinkful-list-api.herokuapp.com/DavidQueen/';
  const itemsURL = URL + 'items';

  function getItems(){
    return fetch(itemsURL)
      .then(response => response.json())
      .then(jsonResponse => jsonResponse);
  }

  function createItem(name) {
    const newItem = {
      name
    };
    let itemJSONified = JSON.stringify(newItem);

    const httpHeader = {'Content-Type': 'application/json'};
    let options = {
      method: 'POST',
      headers: new Headers(httpHeader),
      body: itemJSONified
    };
    return fetch(itemsURL, options);
  }
  return{
    getItems,
    createItem
  };



})();