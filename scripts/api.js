/* eslint-env jquery */
'use strict';

const Api = (function(){
  const URL = 'https://thinkful-list-api.herokuapp.com/DavidQueen/';
  const itemsURL = URL + 'items';

  function handleFetch(method, body, id=null) {
    let destinationURL = itemsURL;
    let options = {
      headers: new Headers({'Content-Type': 'application/json'}),
      method: method,
      body: JSON.stringify(body)
    };
    if(id) {
      destinationURL += '/'+id;
    }
    //console.log(options.body);
    return fetch(destinationURL, options)
      .then(res => {
        if(res.ok) {
          return res.json();
        }else{
          return Promise.reject(new Error(res.statusText));
        }
      });
  }
  function getItems(){
    return fetch(itemsURL);
  }

  function createItem(name) {
    const newItem = {
      name
    };
    return handleFetch('POST', newItem);
  }

  function updateItem(id, data){
    return handleFetch('PATCH', data, id);
  }
  function deleteItem(id) {
    return handleFetch('DELETE',{},id);
  }
  return{
    getItems,
    createItem,
    updateItem,
    deleteItem
  };
})();