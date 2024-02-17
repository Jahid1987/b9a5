const allSeats = document.getElementsByClassName("kbd");
let remainingSeat = 40;
let selectedSeat = 0;

function addSeat(e) {
  if (selectedSeat < 4) {
    selectedSeat++;
    remainingSeat--;
    setTextContentById("remaining-seat", remainingSeat);
    setTextContentById("selected-seat", selectedSeat);
    e.target.classList.add("bg-green-400", "text-white");
  }else{
    alert('You cannot select more than 4 seat. ')
  }
//   console.log(selectedSeat, remainingSeat)
}

for (let seat of allSeats) {
  seat.addEventListener("click", addSeat);
}
