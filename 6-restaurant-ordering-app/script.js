
import { menuData } from './data.js'

const cardNumberInputEl = document.getElementById('card-number')
const menuEl = document.querySelector('.menu')
const orderEl = document.querySelector('.orders')
const ordersData = []
const paymentModal = document.querySelector('.payment-modal')
const form = document.getElementById('customer-card-details')
const innerWrapFooter = document.querySelector('.inner-wrap-footer')
const completeMessageEl = document.querySelector('.complete-message')

document.addEventListener('click', (e) => {
  if (e.target.dataset.item) {
    handleMealAddBtn(e.target.dataset.item)
  } else if (e.target.className === 'remove-btn') {
    handleRemoveMealBtn(e.target.id)
  } else if (e.target.id === 'order-btn') {
    handleOrderCompleteBtn()
  }
});


cardNumberInputEl.addEventListener('input', (e) => {
  // 1. Remove everything except digits (0-9)
  let digits = e.target.value.replace(/\D/g, '');

  // 2. Limit to a maximum of 19 digits
  digits = digits.substring(0, 19);

  // 3. Add a space after every 4 digits
  const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');

  // 4. Update the input value
  e.target.value = formatted;
})


form.addEventListener('submit', handleCheckout)


function handleMealAddBtn(mealName) {
  completeMessageEl.classList.add('hidden')
  innerWrapFooter.classList.remove('hidden')

  let existingOrder = ordersData.find(item => item.name === mealName)
  if (existingOrder) {
    existingOrder.count++
    existingOrder.calculatedPrice = existingOrder.originalPrice * existingOrder.count
  } else {
    const price = menuData.find(item => item.name === mealName).price
    ordersData.push({
      name: mealName,
      count: 1,
      originalPrice: price,
      calculatedPrice: price
    })
  }
  document.getElementById('order-btn').classList.remove('disabled')
  updateTotalPrice()
}


function updateTotalPrice() {
  const totalHtml = document.querySelector('.total-price')
  let total = 0
  if (ordersData.length > 0) {
    total = ordersData.reduce((start, current) => start + current.calculatedPrice, 0)
  }
  totalHtml.textContent = `$${total}`
  render()
}


function handleRemoveMealBtn(targetId) {
  ordersData.forEach((order, index) => {
    if (order.name === targetId) {
      if (order.count === 1) {
        ordersData.splice(index, 1)
      } else {
        order.count--
        order.calculatedPrice -= order.originalPrice
      }
    }
  })
  if (ordersData.length === 0) {
    document.getElementById('order-btn').classList.add('disabled')
  }
  updateTotalPrice()
}


function handleOrderCompleteBtn() {
  if (ordersData.length > 0) {
    paymentModal.classList.remove('hidden')
  }
}

function handleCheckout(e) {
  e.preventDefault()
  const formData = new FormData(form)
  const customerName = formData.get('cardHolderFullName')
  orderMessage(customerName)
}

function orderMessage(name) {
  paymentModal.classList.add('hidden')
  innerWrapFooter.classList.add('hidden')
  completeMessageEl.classList.remove('hidden')
  completeMessageEl.innerHTML = `
    <h1>Thanks, ${name}! Your order is on its way!</h1>
  `
  ordersData.length = 0
  form.reset()
  document.getElementById('order-btn').classList.add('disabled')
  updateTotalPrice()
}

function render() {
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
          <button class="add-btn" data-item=${item.name}>+</button>
        </div>
        `
  }).join('')

  let orderHtml = ''
  if (ordersData.length > 0) {
    orderHtml += ordersData.map(item => {
      return ` 
      <div class="order">
        <p class="order-name">${item.name} X ${item.count}</p>
        <button class="remove-btn" id="${item.name}">remove</button>
        <p class="order-price">$${item.calculatedPrice}</p>
      </div>
    `
    }).join('')
  }

  menuEl.innerHTML = menuHtml
  orderEl.innerHTML = orderHtml
}

render()