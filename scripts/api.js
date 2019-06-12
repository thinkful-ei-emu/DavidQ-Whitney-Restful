/* eslint-env jquery */
'use strict';

const Api = (function(){
  const URL = 'https://thinkful-list-api.herokuapp.com/DavidQueen/';
  function getItems(){
    return Promise.resolve('successful Ajax response');
  }
  return{
    getItems
  };


})();