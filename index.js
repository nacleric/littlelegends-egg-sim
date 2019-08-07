// Holds some state of the application
const state = {
  eggSelected: null
}

// Holds keyvalue pairs of opened eggs
const dict = {}

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

// Holds key-value pairs for eggSeries images
const eggList = {
  eggSeries1: './static/egg_series1.png',
  eggSeries2: './static/egg_series2.png'
}

// Displays image of selected egg
function showEgg (srcString) {
  const eggResult = document.getElementById('eggResult')
  if (eggResult.src === '') {
    eggResult.src = srcString
  } else {
    eggResult.src = srcString
  }
}

// Checks if eggSeries1 radio button is selected
const eggSeries1 = document.getElementById('e1')
eggSeries1.addEventListener('click', () => {
  if (eggSeries1.checked) {
    state.eggSelected = 'eggSeries1'
    console.log('radio button is checked') // remove this later
    showEgg(eggList[state.eggSelected])
  }
})
// Checks if eggSeries2 radio button is selected
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

const pickLittleLegends = {
  // fetch request to retrieve image
  fetchImg: function (openedEgg) {
    const url = 'http://localhost:3000/api/' + state.eggSelected + '/' + openedEgg + '/' + dict[openedEgg]
    console.log(url)
    fetch (url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    })
    .then(res => res.json())
    .then((json) => {
      console.log(json)
    })
    .catch((err) => console.log(err))
  },
  assignSeriesObj: function() {    
    let obj = ''
    switch (state.eggSelected) {
      case 'eggSeries1':      
        obj = littlelegends.egg_series_1.rare.skins
      case 'eggSeries2':      
        obj = littlelegends.egg_series_2.rare.skins
      case null:      
        console.log('theres an error in assignSeriesObj()')
    }
    return obj
  },
  'legendary': function () {
    const seriesObj = pickLittleLegends.assignSeriesObj()
    const rand = getRandomNum(seriesObj.length)
    const openedEgg = seriesObj[rand]
    //console.log(openedEgg) //remove this later
    if (openedEgg in dict === false) {
      dict[openedEgg] = 1 
    } else {
      dict[openedEgg] += 1
      if (dict[openedEgg] === 3) {
        dict[openedEgg] = 1
      }
    }
    pickLittleLegends.fetchImg(openedEgg)
  },
  'epic': function () {
    const seriesObj = pickLittleLegends.assignSeriesObj()
    const rand = getRandomNum(seriesObj.length)
    const openedEgg = seriesObj[rand]
    //console.log(openedEgg) //remove this later
    if (openedEgg in dict === false) {
      dict[openedEgg] = 1 
    } else {
      dict[openedEgg] += 1
      if (dict[openedEgg] === 3) {
        dict[openedEgg] = 1
      }
    }
    pickLittleLegends.fetchImg(openedEgg)
  },
  'rare': function () {
    const seriesObj = pickLittleLegends.assignSeriesObj()
    const rand = getRandomNum(seriesObj.length)
    const openedEgg = seriesObj[rand]
    //console.log(openedEgg) // remove this later
    if (openedEgg in dict === false) {
      dict[openedEgg] = 1 
    } else {
      dict[openedEgg] += 1
      if (dict[openedEgg] === 3) {
        dict[openedEgg] = 1
      }
    }
    pickLittleLegends.fetchImg(openedEgg)    
  } 
}

// Displays img of random drop
function renderLittleLegends (egg) {
  const rarity = getRandomRarity()
  if (egg === 'eggSeries1') {
    pickLittleLegends[rarity]()
  } else if (egg === 'eggSeries2') {
    pickLittleLegends[rarity]()
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
    renderLittleLegends(value)
  } else if (value === 'eggSeries2') {
    renderLittleLegends(value)
  }
})
