const hamMenu = document.querySelector('.ham-menu')
const ofScreenMenu = document.querySelector('.off-screen-menu')

hamMenu.addEventListener('click', () => {
  console.log('clicked')
  hamMenu.classList.toggle('active')
  ofScreenMenu.classList.toggle('active')
})