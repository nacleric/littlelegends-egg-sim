// holds general state of the application
const state = {
  eggSelected: null
}

/*
 *  Helper functions that return a random rarity
 */

function getRandomNum (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function getRandomRarity () {
  const randomNum = getRandomNum(100)
  if (randomNum > 0 && randomNum <= 5) {
    return 'legendary'
  } else if (randomNum > 5 && randomNum <= 30) {
    return 'epic'
  } else {
    return 'rare'
  }
}

/*
 *  Renders img of the selected radio Button
 */

// holds keyvalue pairs for eggSeries images
const eggList = {
  eggSeries1: './static/egg_series1.png',
  eggSeries2: './static/egg_series2.png'
}

// displays image of selected egg
function showEgg (srcString) {
  const eggResult = document.getElementById('eggResult')
  if (eggResult.src === '') {
    eggResult.src = srcString
  } else {
    eggResult.src = srcString
  }
}

// checks if eggSeries1 radio button is selected
const eggSeries1 = document.getElementById('e1')
eggSeries1.addEventListener('click', () => {
  if (eggSeries1.checked) {
    state.eggSelected = 'eggSeries1'
    console.log('radio button is checked') // remove this later
    showEgg(eggList[state.eggSelected])
  }
})

// checks if eggSeries2 radio button is selected
const eggSeries2 = document.getElementById('e2')
eggSeries2.addEventListener('click', () => {
  if (eggSeries2.checked) {
    state.eggSelected = 'eggSeries2'
    console.log('radio button is checked') // remove this later
    showEgg(eggList[state.eggSelected])
  }
})

/*
 *  Main Click event
 */

// displays img of random drop
function renderLittleLegends (egg) {
  const rarity = getRandomRarity()
  if (egg === 'eggSeries1') {
    console.log(rarity) // remove this later
    console.log(pickLittleLegends[rarity])
  } else if (egg === 'eggSeries2') {
    console.log(rarity) // remove this later
  }
}

const pickLittleLegends = {
  legendary: () => {
    const obj = littlelegends.egg_series_1.legendary.skins
    const rand = getRandomNum(obj.length)
    console.log(obj[rand])
  },
  epic: () => {
    const obj = littlelegends.egg_series_1.epic.skins
    const rand = getRandomNum(obj.length)
    console.log(obj[rand])
  },
  rare: () => {
    const obj = littlelegends.egg_series_1.rare.skins
    const rand = getRandomNum(obj.length)
    console.log(obj[rand])
  }
}

// Click event for egg roll button
eggRollBtn.addEventListener('click', () => {
  let value = null
  const radioButtons = document.getElementsByName('radioButton')

  // binds a value to each radio button
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      value = radioButtons[i].value
    }
  }

  if (value === 'eggSeries1') {
    console.log('eggSeries1') // remove this later
    renderLittleLegends(value)
  } else if (value === 'eggSeries2') {
    console.log('eggSeries2') // remove this later
    renderLittleLegends(value)
  }
})
