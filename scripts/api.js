/* eslint-env jquery */
'use strict';

const Api = (function(){
  const URL = 'https://thinkful-list-api.herokuapp.com/DavidQueen/';
  const itemsURL = URL + 'items';

  function getItems(){
    return fetch(itemsURL);
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
  function updateItem(id, data){
    let options ={
      headers: new Headers({'Content-Type': 'application/json'}),
      method: 'PATCH',
      body:JSON.stringify(data)
    };
    console.log(itemsURL+'/'+ id);
    console.log(options.body);
    return fetch(itemsURL+'/'+ id,options);
  }
  return{
    getItems,
    createItem,
    updateItem,
  };



})();