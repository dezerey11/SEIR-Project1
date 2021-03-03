# Matching Game

A matching game where the user matches League of Legends Champion images based on the theme they chose.

### Technologies Used

- HTML5
- CSS
- JavaScript
- jQuery
- AJAX
- Riot Games API
- Google Fonts

### Approach Taken:

To access the champions list an API from Riot Games was called by using jQuery and AJAX. Based on the user’s theme selection from the dropdown menu, champions matching that theme name will be picked out. The images of those champions will be duplicated and randomized into the game.

### Link to Site:

Play the game [here](https://dezerey11.github.io/SEIR-Project1/).

### Instructions:

- Open the game link
- Select a theme from the dropdown menu
- Push the “Start” button
- Click on a box
- Next click should be on the second choice box to see if they match
- Refresh the page to start over

### Unsolved Problems:

- Do not allow selecting the same image twice to count as a match
- Have both images show for one second and then hide
- Don’t allow another click to show an image until both images are hidden

### Future Updates:

- Count moves and have the "Best Run" stored in the local storage
- Player can choose how many images they want to match
- Add a flip animation on the images
