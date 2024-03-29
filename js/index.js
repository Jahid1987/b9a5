const allSeats = document.getElementsByClassName("kbd");
let remainingSeat = 40;
let selectedSeat = 0;
let grossTotal = 0;
let seatNumbers = [];

const tbody = document.getElementById("t-body");

function updatingUi(e) {
  const tr = document.createElement("tr");

  const td1 = document.createElement("td");
  td1.textContent = e.target.textContent;
  tr.appendChild(td1);

  const td2 = document.createElement("td");
  td2.textContent = "Economy";
  tr.appendChild(td2);

  const td3 = document.createElement("td");
  td3.textContent = "550";
  tr.appendChild(td3);

  tbody.appendChild(tr);
}

// seat selection handdling
function addSeat(e) {
  if (selectedSeat < 4) {
    if (!seatNumbers.includes(e.target.innerText)) {
      // selecting seat
      seatNumbers.push(e.target.innerText);
      selectedSeat++;
      remainingSeat--;
      grossTotal = selectedSeat * 550;

      // updating ui
      e.target.classList.add("bg-green-400", "text-white");
      setTextContentById("remaining-seat", remainingSeat);
      setTextContentById("selected-seat", selectedSeat);
      setTextContentById("gross-total", grossTotal);
      setTextContentById("grand-total", grossTotal);
      updatingUi(e);
      // updateGrandTotal(grossTotal);
    } else {
      alert(`${e.target.innerText} is already selected.`);
    }
  } else {
    alert("You cannot select more than 4 seat. ");
  }
}

for (let seat of allSeats) {
  seat.addEventListener("click", addSeat);
}

// COUPON HANDLE SECTION
const applyCouponBtn = document.getElementById("apply-coupon");
const couponInput = document.getElementById('coupon-input');
const couponErrMsg = document.getElementById('coupon-err-msg');
const discount = document.getElementById('discount');
let couponCode = "";

function handleCoupon(e) {
  if (
    (e.target.value === "NEW15" || e.target.value === "Couple 20") &&
    seatNumbers.length > 0
  ) {
    applyCouponBtn.removeAttribute("disabled");
    couponCode = e.target.value;
    couponErrMsg.textContent = "";
  } else {
    applyCouponBtn.setAttribute("disabled", true);
    couponCode = "";
    couponErrMsg.textContent = "Either you selected 0 seat or entered wrong coupon code.";
  }
}
applyCouponBtn.addEventListener("click", () => {
  if (couponCode === "Couple 20") {
    const grandTotal = grossTotal - grossTotal * 0.2;
    setTextContentById("grand-total", grandTotal);
    discount.classList.remove('hidden');
    setTextContentById('discount-amount', grossTotal * 0.2);
    couponInput.style.display = 'none';
  } else if (couponCode === "NEW15") {
    const grandTotal = grossTotal - grossTotal * 0.15;
    setTextContentById("grand-total", grandTotal);
    discount.classList.remove('hidden');
    setTextContentById('discount-amount', grossTotal * 0.2);
    couponInput.style.display = 'none';
  }
});

// next button handle 
const gotoNextBtn = document.getElementById('goto-next');
const phoneErrMsg = document.getElementById('phone-err-msg');

function handleGotoNext(e){

  console.log();
  if(e.target.value.length > 0 && seatNumbers.length > 0 && !e.target.value.match(/[^0-9]/g)){
    gotoNextBtn.removeAttribute('disabled');
    phoneErrMsg.textContent = '';
  }else{
    gotoNextBtn.setAttribute('disabled', true);
    phoneErrMsg.textContent = ' Either you selected 0 seat or entered wrong mobile number';
  }
}

gotoNextBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  remainingSeat = 40;
  selectedSeat = 0;
  grossTotal = 0;
  setTextContentById("remaining-seat", remainingSeat);
  setTextContentById("selected-seat", selectedSeat);
  setTextContentById("gross-total", 0);
  setTextContentById("grand-total", 0);
  tbody.innerHTML = '';
  if(seatNumbers.length > 0){
    for(let seat of seatNumbers){
      document.getElementById(seat).classList.remove("bg-green-400", "text-white");
      seatNumbers=[];
    }
  }
})
