const convertBtn = document.getElementById("convert-btn");
const inputEl = document.getElementById("input-el");
const meterFeet = document.getElementById("meter-feet");
const literGallon = document.getElementById("liter-gallon");
const kiloPound = document.getElementById("kilo-pound");

convertBtn.addEventListener("click", function () {
  let inputNumber = inputEl.value;

  let meterToFeet = (inputNumber * 3.281).toFixed(3);
  let feetToMeter = (inputNumber / 3.281).toFixed(3);
  meterFeet.textContent = `${inputNumber} meters = ${meterToFeet} feet | ${inputNumber} feet = ${feetToMeter} meters`;

  let literToGallon = (inputNumber / 4.546).toFixed(3);
  let gallonToLiter = (inputNumber * 4.546).toFixed(3);
  literGallon.textContent = `${inputNumber} liters = ${literToGallon} gallons | ${inputNumber} gallons = ${gallonToLiter} liters`;

  let kiloToPound = (inputNumber * 2.205).toFixed(3);
  let poundToKilo = (inputNumber / 2.205).toFixed(3);
  kiloPound.textContent = `${inputNumber} kilos = ${kiloToPound} pounds | ${inputNumber} pounds = ${poundToKilo} kilos`;
});
