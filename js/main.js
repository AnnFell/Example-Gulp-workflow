(function () {

  /** collection of variables **/
  const board      = document.querySelector('.gameboard');
  let words        = ['apple', 'banana', 'grape', 'orange', 'melon', 'mango', 'khaki', 'mandarin'];
  let clickedCards = [];
  let guesses      = 0;
  let numMatches   = 0;
  var wait         = false;

  console.log('test');

  /** add the cards with the words in random order **/
  words = words.concat(words);
  words = words.sort(function () {
    return 0.5 - Math.random()
  });
  words.forEach(function (word) {
    board.innerHTML += `<div class="card"><h1>${word}</h1></div>`;
  });

  /** add event listener to cards **/
  const cards = document.querySelectorAll('.card');
  cards.forEach(function (card) {
    card.addEventListener('click', openCard);
  });

  /**  when a card is clicked, open it **/
  function openCard() {
    // But not if the card is already open or if the wong cards are not yet closed
    if (this.classList.contains('open') || wait) {
      return;
    }

    this.classList.add('open');
    // Add the clicked card to the ClickedCards list
    clickedCards.push(this);

    /** When 2 cards are clicked, check if they match **/
    if (clickedCards.length === 2) {
      guesses++;

      let card1 = clickedCards[0].innerHTML;
      let card2 = clickedCards[1].innerHTML;

      if (card1 === card2) {
        // reset clickedCards
        clickedCards = [];
        // If they match, add to numMatches
        numMatches++;

        /** If there are 8 matches, game is over! **/
        if (numMatches === (words.length / 2)) {
          alert(`You won in ${guesses} guesses!`);
        }

      } else {
        /** If they don't match, close the cards again, but with a little pause **/
        wait = true; // prevent clicking a new card until cards are closed again
        // use timeout for a little delay (800 millisconds)
        // remove the 'open' class for both the cards in the clicked cards array
        setTimeout(function () {
          clickedCards.forEach(function (card) {
            closeCard(card);
          });
          // reset clickedCards
          clickedCards = [];
          wait         = false;
        }, 800);
      }
    }
  }

  function closeCard(element) {
    element.classList.remove('open');
  }

})();