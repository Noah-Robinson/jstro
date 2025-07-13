let cards = document.getElementsByClassName("card");

function reassignIds() {
  for (let i = 0; i < cards.length; i++) {
    let cards = document.getElementsByClassName("card");
    cards[i].id = "card" + i
  }
}

for (let i = 0; i < cards.length; i++) {
  reassignIds()
  // FOR MOVING CARDS AROUND
  cards[i].addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text", event.target.id);
  });
  cards[i].addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  cards[i].addEventListener("drop", (event) => {
    event.preventDefault();
    data = event.dataTransfer.getData("text");
    prevcard = document.getElementById(data);
    prevcardclass = String(prevcard.classList);
    prevcard.classList = event.target.classList;
    event.target.classList = prevcardclass;
  });
  // FOR SELECTING CARDS
  cards[i].addEventListener("click", (event) => {
    if (event.target.classList.contains("selected")) {
      event.target.classList.remove("selected")
    } else {
      event.target.classList.add("selected");
    }
  });
}