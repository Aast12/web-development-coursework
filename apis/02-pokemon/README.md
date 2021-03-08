# Querying the Pokémon API

Summary: In this assignment, you are required to employ your knowledge on AJAX, DOM manipulation, CSS, and JS to create a simple web page that queries an open and publicly available end point.

Description:

- [x] Create a web page that asks the user for the name of a pokémon and retrieve its information after clicking a button. The information is retrieved from the API seen during our last class: [https://pokeapi.co/api/v2/pokemon/pokemonName](https://pokeapi.co/api/v2/pokemon/pokemonName)
- [x] Select at least two available attributes of the pokémon and show them to the user. Showing the name and the image of the pokémon is mandatory.
  - [x] To help you in this, make use of the [Bootstrap card](https://getbootstrap.com/docs/5.0/components/card/) element. Feel free to define how you would put those attributes in the card (i.e., the inner design).
  - [x] Use the same attributes always, so your code can be simple.
- [x] If a pokémon with the given name does not exist, tell that to the user.
  - [x] Using a [Bootstrap alert](https://getbootstrap.com/docs/5.0/components/alerts/) is encouraged  
- [x] To show the image, you can use an endpoint available at [https://pokeres.bastionbot.org/images/pokemon/1.png](https://pokeres.bastionbot.org/images/pokemon/1.png) Just change the 1 for the number that corresponds to the pokémon. Since to do this you need the id of the pokémon, you first need to look in the pokemon API to identify what is the id value.
  - [x] It sounds a lot like you can use a promise here to load the image after the pokémon search was successful, nevertheless to give you flexibility you can use other strategies as well.
  - [x] Although there could be different approaches to show the image, you can simply append an img with the src or srcset attribute with the URL you just created (the bastionbot one). This should automatically load the image.
- [x] The card with the pokémon info should be shown in a separated container like a div, table, unordered list, etc. (working like a result list). Feel free to choose the type of your container, but trying to use the classes/elements provided by Bootstrap will help you to gain experience.
  - [x] Keep adding each retrieved pokémon to your container. Don't worry about duplicated elements

Bonuses:

- [x] Implement a delete functionality to individually remove a pokémon from the result list, whether by clicking on it, or adding a delete button to the media card, feel free to define your strategy. Remember that an option to do this is to have a nested hierarchy of elements for each pokémon record, then you can go up in such hierarchy until you can simply call a removeChild or equivalent method.

Small note: As you might have realized, assignments for this course require you to keep practicing and also doing some research to make them work, it is completely fine and even encouraged to look into mozilla dev, w3cschools and stackoverflow websites
