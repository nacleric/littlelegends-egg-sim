// Holds some state of the application
const appState = {
  eggSelected: null,
  rpCounter: 0,
  usdCounter: 0,
  skinCounter: 0
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
  egg_series_1: './static/egg_series1.png',
  egg_series_2: './static/egg_series2.png'
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

// Checks if egg_series_1 radio button is selected
const egg_series_1 = document.getElementById('e1')
egg_series_1.addEventListener('click', () => {
  if (egg_series_1.checked) {
    appState.eggSelected = 'egg_series_1'
    console.log('radio button is checked') // remove this later
    showEgg(eggList[appState.eggSelected])
  }
})
// Checks if egg_series_2 radio button is selected
const egg_series_2 = document.getElementById('e2')
egg_series_2.addEventListener('click', () => {
  if (egg_series_2.checked) {
    appState.eggSelected = 'egg_series_2'
    console.log('radio button is checked') // remove this later
    showEgg(eggList[appState.eggSelected])
  }
})

/*
 *  Main Click event
 */

const pickLittleLegends = {
  // Gets the url for images in google cloud storage and inserts into the DOM
  getImg: function (eggSelected, species, skin, tier) {
    const fileName = skin + '_Tier_' + tier + '.png'
    const url = 'https://storage.googleapis.com/little_legends/static/' + eggSelected + '/' + species + '/' + fileName
    console.log(url)
    const eggResult = document.getElementById('eggResult')
    eggResult.src = url
  },

  // Keeps track of opened Eggs. If it hits 3 it gets deleted from the dictionary
  // Passes string of the proper species to getImg() to construct the url of image location
  // TODO: might change name for this method since it does more than memoization
  memoize: function (openedEgg, dict) {
    // Selects all the letters before underscore furyhorn_molten -> furyhorn
    const regx = /[^_]+/.exec(openedEgg)

    // Converts regex to a string than lowercases it
    // Passes the string to getImg to construct the url linking to img at google cloud storage
    const species = regx.toString().toLowerCase()
    if (openedEgg in dict === false) {
      // dict[openedEgg] represents the tier number
      pickLittleLegends.getImg(appState.eggSelected, species, openedEgg, 1)
      dict[openedEgg] = 1
    } else {
      if (dict[openedEgg] == 1) {
        dict[openedEgg] = 2
        pickLittleLegends.getImg(appState.eggSelected, species, openedEgg, dict[openedEgg])
      } else if (dict[openedEgg] == 2) {
        dict[openedEgg] = 3
        pickLittleLegends.getImg(appState.eggSelected, species, openedEgg, dict[openedEgg])
        delete dict[openedEgg]
      }
    }
  },

  // Picks which egg_series to retrieve from
  assignSeriesObj: function (appState) {
    let obj = ''
    switch (appState) {
      case 'egg_series_1':
        obj = littlelegends.egg_series_1
        return obj
      case 'egg_series_2':
        obj = littlelegends.egg_series_2
        return obj
      case null:
        console.log('error in assignSeriesObj()')
    }
  },

  'legendary': function () {
    const seriesobj = picklittlelegends.assignseriesobj(appState.eggselected)
    const rand = getrandomnum(seriesobj.legendary.skins.length)
    const openedegg = seriesobj.legendary.skins[rand]
    picklittlelegends.memoize(openedegg, dict)
  },

  'epic': function () {
    const seriesObj = pickLittleLegends.assignSeriesObj(appState.eggSelected)
    const rand = getRandomNum(seriesObj.epic.skins.length)
    const openedEgg = seriesObj.epic.skins[rand]
    pickLittleLegends.memoize(openedEgg, dict)
  },

  'rare': function () {
    const seriesObj = pickLittleLegends.assignSeriesObj(appState.eggSelected)
    const rand = getRandomNum(seriesObj.rare.skins.length)
    const openedEgg = seriesObj.rare.skins[rand]
    pickLittleLegends.memoize(openedEgg, dict)
  }
}

// Displays img of random drop
function renderLittleLegends (egg) {
  // picklittlelegends[]() calls either .legendary() .epic() .rare() depending on the randomly generated rarity
  const rarity = getRandomRarity()
  if (egg === 'egg_series_1') {
    pickLittleLegends[rarity]()
  } else if (egg === 'egg_series_2') {
    pickLittleLegends[rarity]()
  }
}


// Button click event for egg roll button
eggRollBtn.addEventListener('click', () => {
  let value = null
  const radioButtons = document.getElementsByName('radioButton')

  // Binds html value ID to each radio button
  // Example: <input id="e1" type="radio" value="egg_series_1" name="radioButton">
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      value = radioButtons[i].value
    }
  }

  if (value === 'egg_series_1') {
    renderLittleLegends(value)
  } else if (value === 'egg_series_2') {
    renderLittleLegends(value)
  }
  appState.rpCounter += 490
  document.getElementById('rp-counter').innerHTML = appState.rpCounter
  appState.usdCounter += 3.62
  document.getElementById('usd-counter').innerHTML = appState.usdCounter.toFixed(2)
  appState.skinCounter += 0.15
  document.getElementById('skin-counter').innerHTML = appState.skinCounter.toFixed(1)
})





