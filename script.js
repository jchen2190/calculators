let food = document.getElementById('food');
let bev = document.getElementById('bev');
let tipMenu = document.getElementById('tip-menu');
let taxMenu = document.getElementById('tax-menu');
let calcBtn = document.getElementById('calc-btn');
let response = document.getElementById('response');
let ppl = document.getElementById('people');

calcBtn.addEventListener('click', calcBill);

function calcBill(event) {
    event.preventDefault();

    let foodTotal = Number(food.value);
    let bevTotal = Number(bev.value);
    let tipPct = Number(tipMenu.value);
    let taxPct = Number(taxMenu.value);

    let subTotal = foodTotal + bevTotal;

    let taxTotal = subTotal * taxPct / 100;
    let tipTotal = subTotal * tipPct / 100;

    let total = subTotal + taxTotal + tipTotal;

    tipTotal = tipTotal.toFixed(2);
    taxTotal = taxTotal.toFixed(2);
    total = total.toFixed(2);

    let d = new Date();
    let hr = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();

    if(min < 10) min = '0' + min;
    if(sec < 10) sec = '0' + sec;
    let timeIs =`${hr}:${min}:${sec}`;
    let date = d.getDate(); // 1-31
    let month = d.getMonth(); // 0-11
    let year = d.getFullYear();
    let dateIs = `${month+1}/${date}/${year}`;

    let bill = `
    *** THIS CAFE ***
    <br>*** GUEST CHECK ***
    <br>Date: ${dateIs}
    <br>Time: ${timeIs}
    <br>
    <br>Food: $${foodTotal}
    <br>Beverage: $${bevTotal}
    <br>Sub-Total: $${subTotal}
    <br>Tax: ${taxPct} %
    <br>Tax: $${taxTotal}
    <br>Tip: ${tipPct} %
    <br>Tip: $${tipTotal}
    <br>
    <br>*** Please Pay ***
    <br>TOTAL: $${total}
    <br>
    <br>*** THANK YOU ***`;

    response.innerHTML = bill;
}

