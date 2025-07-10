let cards = document.getElementsByClassName("card");

for (let i = 0; i < cards.length; i++) {
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
}