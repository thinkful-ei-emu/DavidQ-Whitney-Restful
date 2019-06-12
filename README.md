##API SHOPPING LIST

##1. Test an AJAX call to our API
It's a good practice to simply start off making sure you can make an AJAX request and get an expected API server response.

Go into the index.js and add this to the bottom:

`fetch('https://thinkful-list-api.herokuapp.com/ei-student/items')
  .then(res => res.json())
  .then(data => console.log(data));`
You should get an empty array or some old data in the console. If you get a red error message, carefully check your syntax and the error message and debug until you're able to make a successful AJAX call. Call in your Instructor/TA if you can't resolve!

Once tested, delete this code.

##2. Create an API module
Objective: Create a new module to handle all the API calls your application will make. These will all be async functions responsible only for returning responses.

Create a new api.js file and as before, make an IIFE that is captured by a global api variable.
In your index.html, link in the api.js script, making sure to do it before your index.js
Inside the IIFE, declare a BASE_URL constant containing https://thinkful-list-api.herokuapp.com/[yourname]. (Replace [yourname] with your own -- the API will keep all items under this name separate from others.)
Inside the IIFE, make a getItems function that returns a resolved Promise:
  return Promise.resolve('A successful response!');
Return an object from your IIFE, and expose your getItems function so it's available in your global api object

Test it!

Inside index.js, add the following:
api.getItems()
  .then(res => console.log(res));

console.log(api.BASE_URL);
Open the app in your browser and open the console
You should see 'A successful response!' as the first line and undefined as the second. This proves your API module works, getItems() is an exposed method, and BASE_URL is private
#2. Write the getItems() method
Objective: This method will GET request on /items and return the promise.

Instead of just sending a basic resolved Promise, we want getItems to make the correct response and return the promise.
Inside getItems() make a fetch GET request to the url of {BASE_URL}/items and make sure to return it! (Remember: fetch always returns a promise object, so getItems is now returning a promise.)
You'll need to update your index.js call to api.getItems() to first resolve the response datastream with .json() and then log out the data from the second resolved promise
Now refresh your app and instead of logging the test message, the console should log an empty array.
Delete this test once you're sure it works.
#3. Write the createItem() method
Objective: This method will POST request on /items, sending JSON in the request body, and return the promise

Make a createItem method that accepts name parameter
Expose the createItem method in your returned object at the bottom of the IIFE
Inside createItem, declare a newItem variable and assign it to a new object with a name key equal to the name value passed in. Then wrap that object in JSON.stringify(). This is the data we will send into our POST request.
Next, call and return fetch() with the following options:
the first argument should be our URL: {BASE_URL}/items
the second argument will be an object of options:
method should be 'POST'
headers should be a new Headers object with the 'Content-Type': 'application/json' key-value pair
body should equal our newItem stringified JSON object
Test it!
In index.js, add the following:
api.createItem('pears')
  .then(res => res.json())
  .then((newItem) => {
    return api.getItems();
  })
  .then(res => res.json())
  .then((items) => {
    console.log(items);
  });
Notice we're performing two asynchronous functions sequentially with a Promise chain. First we create an item, parse the json response, then we fetch all items, parse the json response, then log it out.
You should see an array of items including the created item. Every time you refresh the page, you'll create a new item so you might end up with quite a few pears!
Delete this test code when you're sure it works.
#4. Fetch the items and add them to the store
Objective: Use the API getItems() method to fetch data, place it in the store, and re-render the page.

It's time to use our API data for our Shopping List instead of starting blank every time.

Bear in mind, we're soon going to make our Item module obsolete. Validation and unique id creation is performed on the server, so we're going to get an item object from the server and put it directly into our store.

Let's simplify our store.addItem method. Remove all the current logic and change the signature to accept only an item parameter. Then just push the item to this.items.

In index.js, first remove any code that creates test data in the store if it still exists.

In index.js, inside the DOM ready function, add the lines:

api.getItems()
  .then(res => res.json())
  .then((items) => {
    items.forEach((item) => store.addItem(item));
    shoppingList.render();
  });
So when the DOM is ready, we're fetching all our items, we're iterating through the response and running store.addItem on each, then we re-run our render.
If all's working you should see some of the test items you made now displayed in the DOM.
#5. Connect the Add Item event listener to our API
Objective: Modify the event listener for adding shopping items so that it first calls createItem() on the API module, then places the response item in the store, then re-renders

Inside shoppingList.js, inside handleNewItemSubmit, we're going to add a call to our API before we add to our local store.
Try this yourself for 15 mins before continuing.
...
...
...
Here's the code you should have inserted in the appropriate place:
api.createItem(newItemName)
  .then(res => res.json())
  .then((newItem) => {
    store.addItem(newItem);
    render();
  });
Test it!
Try adding an item normally in your app. Notice a slight delay now when you click "Add" as the app needs to contact a server and wait for a response before making the change to the view.
Try adding an item without entering a name. Nothing should happen. Open the console and you should see a Bad Request error appearing. Open the Network tab and click on the request. You can look at the response to see the specific error message from the server.
Ideally, we would have errors appear in the DOM to give the user feedback. Let's not worry about that yet.
#6. Write the updateItem() API method
Objective: Create an API method that takes in the item id and an object containing key-values intended to be updated, which makes a PATCH request to /items/[id] with the JSON request body

Inside api.js, add an updateItem method that accepts id and updateData and expose it in our object at the bottom of the IIFE

Make a fetch call with the following options:

the url should be {BASE_URL}/items/{id}
method should be PATCH
Content-Type header is 'application/json'
body is a JSON stringified version of updateData
Test it!

Inside index.js, add in:
api.getItems()
  .then(res => res.json())
  .then((items) => {
    const item = items[0];
    return api.updateItem(item.id, { name: 'foobar' });
  })
  .then(res => res.json())
  .then(() => console.log('updated!'));
If the request was well formed, you will get a 200 OK response and the callback will run and print 'updated!'.
You can verify the item's name changed as expected by using Postman to fetch the item directly from the API. (Or refresh your browser and the updated item should be there.)
Try changing the checked prop too. Try sending in an invalid prop. The API should send you a Bad Request response.
Delete the test code when done.
#7. Simplify the store update methods
Objective: Create a single findAndUpdate store method which takes in an id and an newData object containing new key/value pairs to merge into the current store object. (This will obsolete the separate store methods for changing checked and name, as well as the Item module.)

Let's remove both findAndToggleChecked and findAndUpdateName from the store

We're going to create a consolidated findAndUpdate method which merges the attributes of the received newData object with the item in the store.

Remember to expose the new findAndUpdate method from your IIFE and remove the old ones!

Have the method accept id and newData parameters

First, find the item from this.items using the passed in id

Now use Object.assign() to merge the newData into the current found item

Test it!

Inside index.js and inside the first resolved getItems() promise:
const item = store.items[0];
console.log('current name: ' + item.name);
store.findAndUpdate(item.id, { name: 'foobar' });
console.log('new name: ' + item.name);
The item.name should be updated after .findAndUpdate is executed.
This didn't update the server, it was just a test of the local store method
Delete the test code.
#8. Connect the Update Event Handlers to our API
Objective: As before, wire up the listeners for editing the item name and toggling the item completed prop to use the new findAndUpdate methods on your API and store.

Inside shoppingList.js, modify the handleEditShoppingItemSubmit method
After you get the id and newName from the DOM, you'll need to do the following:
Call api.updateItem, sending in the id and a new object containing the newName
Using code similar to what was in step #6, once you've checked the response was successful, call store.findAndUpdate on id and newName, and run render
Now modify the handleItemCheckClicked method:
This one's a little trickier!
First grab the current item in the store of the Shopping Item that the user just tried to toggle
Call api.updateItem, sending in the id and a new object containing the OPPOSITE of what item.checked currently is (you always want to treat the store as source of truth, not the condition of the DOM)
As before, inside the then() callback function, call store.findAndUpdate sending in the same arguments, and then run render
#9. Complete the delete item work
Objective: Get the delete action working completely in your app, syncing with the server

See if you can finish the final CRUD action on your own.
10. Add Error Handlers for when the server responds with an error
Objective: Add error handling to all your API functions

Use the techniques you've learned today to complete this exercise.
Add catches to your promise chains.
Update your event handlers to react when an error is caught.
Add an error key to your store and use your render method to display the error value if it exists
Can you use the technique in the PM workshop to DRY up all the repeating code?