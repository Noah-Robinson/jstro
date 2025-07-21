//INIT vanilla tilt
let tiltParams = {
  reverse: true,
  scale: 1.05,
  gyroscope: false,
}

VanillaTilt.init(document.querySelectorAll(".card"), tiltParams);

// DEFINE VARIABLES
const cardContainer = document.getElementById("playing-card-container");
let cards = cardContainer.children;
let cardWidth = cards[0].offsetWidth;
let cardHeight = cards[0].offsetHeight;

//DEFINE GAME VARIABLES
let handSize = 7;
let selectedCards = 0;

function windowResize() {
  cardWidth = cards[0].offsetWidth;
  cardHeight = cards[0].offsetHeight;
  console.log(cardWidth + " , " + cardHeight);
  moveCards();
  displayCards();
}

function moveCards() {
  for (let i = 0; i < cards.length; i++) {
    let offset = (cardContainer.offsetWidth - cardWidth) / (cards.length);
    let realOffset = offset * i + offset / 2;
    if (cards[i].classList.contains("selected")) {
      cards[i].style.translate = realOffset + "px -40px";
    } else {
      cards[i].style.translate = realOffset + "px 0px";
    }
  }
}

function displayCards() {
  for (let i = 0; i < cards.length; i++) {
    let suite = cards[i].dataset.suite;
    let type = cards[i].dataset.type;
    cards[i].style.backgroundImage = "url('playing-card/" + suite + "/" + type + ".svg')";
    cards[i].style.backgroundSize = cardWidth + "px " + cardHeight + "px";
  }
}


cardContainer.addEventListener("click", (event) => {
  if ([...cardContainer.children].indexOf(event.target) == -1) {
    //This is div do nothing
  } else if (event.target.classList.contains("selected")) {
    event.target.classList.remove("selected");
    selectedCards -= 1;
  } else if (selectedCards <= 4) {
    event.target.classList.add("selected");
    selectedCards += 1;
  }
  moveCards();
});
cardContainer.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text", [...cardContainer.children].indexOf(event.target));
});
cardContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
});
cardContainer.addEventListener("drop", (event) => {
  event.preventDefault();
  let reorder = document.createDocumentFragment();
  let draggedIndex = parseInt(event.dataTransfer.getData("text"));
  let droppedIndex = parseInt([...cardContainer.children].indexOf(event.target));
  if (draggedIndex == -1 || droppedIndex == -1) {
    return
  }
  //console.log(draggedIndex);
  //console.log(droppedIndex);
  for (let i = 0; i < cardContainer.children.length; i++) {
    if (i == draggedIndex) {
      reorder.appendChild(cardContainer.children[droppedIndex].cloneNode(true));
      //console.log("APPENDED DROP");
    } else if (i == droppedIndex) {
      reorder.appendChild(cardContainer.children[draggedIndex].cloneNode(true));
      //console.log("APPENDED DRAG");
    } else {
      reorder.appendChild(cardContainer.children[i].cloneNode(true));
      //console.log("APPENDED NORM");
    }
  }
  //console.log(reorder.children);
  cardContainer.innerHTML = null;
  cardContainer.appendChild(reorder);
  VanillaTilt.init(document.querySelectorAll(".card"), tiltParams);
  moveCards();
});

let winResizeTimeout;
window.addEventListener("resize", (event) => {
  winResizeTimeout = setTimeout(windowResize, 175);
});

moveCards();
displayCards();