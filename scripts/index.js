'use strict';
/* global shoppingList, store, Item,Api */
/* eslint-env jquery */
// eslint-disable-next-line no-unused-vars
$(document).ready(function() {
  shoppingList.bindEventListeners();
  shoppingList.render();
});

store.items.push(Item.create('apples'));

Api.getItems().then(res=>console.log(res));