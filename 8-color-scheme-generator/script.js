const formEl = document.getElementById('form')
let newColors = ['#780000', '#c1121f', '#fdf0d5', '#003049', '#669bbc']



formEl.addEventListener('submit', e => {
  e.preventDefault()
  const mode = e.target.mode.value
  const color = e.target.color.value.slice(1)
  fetchColorData(mode, color)
})

async function fetchColorData(mode, color) {
  try {
    const res = await fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`)
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`)
    }
    const data = await res.json()
    newColors = data.colors.map(c => c.hex.value)
    render()
  } catch (err) {
    console.error('Failed to fetch color scheme:', err)
  }
}

function render() {
  for (let i = 0; i < newColors.length; i++) {
    document.getElementById(`color-${i}`).textContent = newColors[i]
    document.querySelector(`.color-${i}`).style.backgroundColor = newColors[i];
  }
}

document.addEventListener('click', (e) => {
  const isColorBox = e.target.classList.contains('color')
  const isColorText = e.target.matches('.colors p')
  if (!isColorBox && !isColorText) return

  const index = isColorBox
    ? e.target.classList[1].slice(6)
    : e.target.id.slice(6)

  const hex = newColors[index]
  navigator.clipboard.writeText(hex)

  const textEl = document.getElementById(`color-${index}`)
  textEl.textContent = 'Copied!'
  setTimeout(() => {
    textEl.textContent = newColors[index]
  }, 1000)
})