/* eslint-disable no-console */
'use strict';
/* global shoppingList, store, Item,Api */
/* eslint-env jquery */
// eslint-disable-next-line no-unused-vars
$(document).ready(function() {
  shoppingList.bindEventListeners();
  shoppingList.render();
  Api.getItems().then(res=>res.json()).then(obj=>{
    obj.forEach((i)=>store.addItem(i));
    shoppingList.render();
  });
  
});
Api.getItems()
  .then(res => res.json())
  .then((items) => {
    const item = items[0];
    return Api.updateItem(item.id, {name: 'foobar'});
  })
  .then(res => res.json())
  .then(() => console.log('updated!'));



