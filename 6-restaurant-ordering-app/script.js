
import { menuData } from './data.js'

const cardNumberInputEl = document.getElementById('card-number')
const menuEl = document.querySelector('.menu')

cardNumberInputEl.addEventListener('input', (e) => {
  // 1. Remove everything except digits (0-9)
  let digits = e.target.value.replace(/\D/g, '');

  // 2. Limit to a maximum of 19 digits
  digits = digits.substring(0, 19);

  // 3. Add a space after every 4 digits
  const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');

  // 4. Update the input value
  e.target.value = formatted;
});

const menuHtml = menuData.map(item => {
  return `
        <div class="menu-item">
          <img
            class="product-image"
            src="${item.image}"
            alt="Photo of the ${item.name} for the menu"
          />
          <div class="product-info">
            <h2 class="product-name">${item.name}</h2>
            <p class="product-ingredients">${item.ingredients}</p>
            <p class="product-price">$${item.price}</p>
          </div>
          <button class="add-btn">+</button>
        </div>
        `
})

function render() {
  menuEl.innerHTML = menuHtml
}

render()