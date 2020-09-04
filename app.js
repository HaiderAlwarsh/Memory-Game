const countDown = document.getElementsByClassName('countdown')[0],
  allCards = document.querySelectorAll('.card'),
  timer = document.querySelector('#time span'),
  cardsContainer = document.getElementsByClassName('cards-container')[0],
  newDiv = document.createElement('div'),
  btn = document.getElementsByClassName('btn')[0],
  color = Array.from(document.querySelectorAll('.color_container div')),
  faceCard = Array.from(document.querySelectorAll('.face-card'));
timeOut = 1000;

let number = countDown.textContent,
  interval,
  interval2;

newDiv.classList.add('newDiv');
newDiv.textContent = 'Game Over';
cardsContainer.append(newDiv);

window.onload = (event) => {
  countDownFunc(countDown);

  //After (1 second) will start count Down.
  interval = setInterval(() => {
    number--;
    countDown.textContent = number; // countDown is the number That display before game start.(4)
    if (number === 0) {
      // If number(countDown) is equal 0. Will flip the cards.To prevent user to see them.
      allCards.forEach((elm) => {
        elm.classList.remove('active');
        elm.style.pointerEvents = 'unset';
      });
      countDown.style.display = 'none'; // Will hidden the cuntDown.

      // Will start to decreasing time for game (25) seconds.
      decreasingTime(timer);
      clearInterval(interval);
    }
  }, timeOut);

  let newArray = [...Array(Array.from(allCards).length).keys()]; // First, i convert cards(allCards) To array. To new how cards i have. The keys for giv the index. and put it at array.
  shuffle(newArray);

  // Iteration in cards(allCards) and giv each one random order.
  allCards.forEach((cards, index) => {
    cards.style.order = newArray[index];
  });
};

// Iteration in all cards(allCards). And will flip the card i click on it.If i click on any of cards will add new class(active).
allCards.forEach((cards) => {
  cards.onclick = (elm) => {
    let target = elm.target.parentElement,
      currentTarget = elm.currentTarget;
    if (target === currentTarget) {
      target.classList.add('active');
    } else {
      return;
    }

    let filter = Array.from(allCards).filter((elm) => {
      // Will filter The cards(allCards). And if thar any card have a class name (active). Will save it in new array(filter).
      return elm.classList.contains('active');
    });

    if (filter.length === 2) {
      // If i Click on to card then the filter length will equal 2.
      if (filter[0].className !== filter[1].className) {
        // Will check if those two cards not equal will flip the cards.
        cardsContainer.classList.add('active');
        setTimeout(() => {
          filter[0].classList.remove('active');
          filter[1].classList.remove('active');
          cardsContainer.classList.remove('active');
        }, 700);
      } else {
        // IF cards equal will delete class (active) because to remove it from array (filter). and add new class (rotate).
        setTimeout(() => {
          filter[0].classList.remove('active');
          filter[0].classList.add('rotate');
          filter[1].classList.remove('active');
          filter[1].classList.add('rotate');
          cardsContainer.classList.remove('active');
        }, 500);
      }
    }
  };
});

// change color of game
color.forEach((elm) => {
  //Will make for loop in color(blue, red, yellow)
  elm.onclick = (event) => {
    let elementClassName = event.target.className;

    if (elementClassName === 'red') {
      // Will check what color user choose.
      btn.classList.remove('yellow');
      btn.classList.add('red');
      cardsContainer.style.backgroundColor = '#e94560';
      newDiv.style.color = '#e94560';
      faceCard.forEach((elm) => {
        elm.classList.remove('activeYellow'); // if elm have class name (activeYellow) will deleted then will add new class.
        elm.classList.add('activeRed');
      });
    }

    if (elementClassName === 'yellow') {
      btn.classList.remove('red');
      btn.classList.add('yellow');
      cardsContainer.style.backgroundColor = '#ffc93c';
      newDiv.style.color = '#ffc93c';
      faceCard.forEach((elm) => {
        elm.classList.remove('activeRed');
        elm.classList.add('activeYellow');
      });
    }
  };
});

// Shuffling the elements.
function shuffle(array) {
  array.forEach((elm, index) => {
    let random = Math.floor(1 + Math.random() * 16);
    [array[index], array[random]] = [array[random], array[index]];
  });
}

//reset btn
btn.onclick = (elm) => {
  window.location.reload();
};

// when window loaded will display cuntDown before game start
function countDownFunc(elm) {
  elm.style.display = 'block';
  allCards.forEach((elm) => {
    elm.classList.add('active');
    elm.style.pointerEvents = 'none';
  });
}

// After the game start  will start to decreasing time for game (25) seconds.
function decreasingTime(time) {
  interval2 = setInterval((elm) => {
    time.textContent--;
    if (time.textContent === '0') {
      //If time equal 0. will show div with (game over).
      newDiv.style.display = 'flex';
      clearInterval(interval2);
    }
  }, timeOut);
}

// Will check if all cards have class(rotate).
function Win(elm) {
  let checkCards = Array.from(elm).every((elm) => {
    return elm.classList.contains('rotate');
  });

  if (checkCards === true) {
    clearInterval(interval2);
    clearInterval(interval);
    cardsContainer.classList.add('active');
    clearInterval(interval3);
    newDiv.style.display = 'flex';
    newDiv.textContent = 'You win!!';
  }
}

//Will check if you win will stob.
let interval3 = setInterval(() => {
  Win(allCards);
}, 500);
