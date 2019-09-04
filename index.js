// Holds some state of the application
const appState = {
  eggSelected: null,
  rpCounter: 0,
  usdCounter: 0,
  skinCounter: 0,
  // Holds keyvalue pairs of opened eggs
  dict: {},
  // Keeps track of rarities opened for the DOM
  rarityTracker: {
    'legendary': 0,
    'epic': 0,
    'rare': 0
  }
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

function logRarity (rar, rt) {
  if (rar === 'legendary') {
    rt['legendary'] += 1
    document.getElementById('legendaryCounter').innerHTML = rt['legendary']
  } else if (rar === 'epic') {
    rt['epic'] += 1
    document.getElementById('epicCounter').innerHTML = rt['epic']
  } else {
    rt['rare'] += 1
    document.getElementById('rareCounter').innerHTML = rt['rare']
  }
}

/*
 *  Renders img of the selected radio Button
 */

// Holds key-value pairs for eggSeries image s
const eggList = {
  egg_series_1: 'https://nacleric.github.io/littlelegends-egg-sim/static/egg_series1.png',
  egg_series_2: 'https://nacleric.github.io/littlelegends-egg-sim/static/egg_series2.png',
  egg_series_3: 'https://nacleric.github.io/littlelegends-egg-sim/static/egg_series3.png'
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

// Defaults to the first radio button being set to checked
// Note to self: Did this because when a different radio button is selected and then reselected, the if statement wont run again
const egg_series_1 = document.getElementById('e1')
egg_series_1.checked = true
if (egg_series_1.checked === true) {
  appState.eggSelected = 'egg_series_1'
  showEgg(eggList[appState.eggSelected])
}
// Checks if egg_series_1 radio button is selected
egg_series_1.addEventListener('click', () => {
  if (egg_series_1.checked === true) {
    appState.eggSelected = 'egg_series_1'
    console.log('radio button is checked eggseries1') // remove this later
    showEgg(eggList[appState.eggSelected])
  }
})

// Checks if egg_series_2 radio button is selected
const egg_series_2 = document.getElementById('e2')
egg_series_2.addEventListener('click', () => {
  if (egg_series_2.checked === true) {
    appState.eggSelected = 'egg_series_2'
    console.log('radio button is checked eggseries2') // remove this later
    showEgg(eggList[appState.eggSelected])
  }
})

// Checks if egg_series_2 radio button is selected
const egg_series_3 = document.getElementById('e3')
egg_series_3.addEventListener('click', () => {
  if (egg_series_3.checked === true) {
    appState.eggSelected = 'egg_series_3'
    console.log('radio button is checked eggseries3') // remove this later
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

  // Keeps track of opened Eggs. If it hits 3 it gets deleted from the appState.dictionary
  // Passes string of the proper species to getImg() to construct the url of image location
  // TODO: might change name for this method since it does more than memoization
  memoize: function (openedEgg, dict) {
    // Selects all the letters before underscore furyhorn_molten -> furyhorn
    const species = /[^_]+/.exec(openedEgg)

    if (openedEgg in dict === false) {
      // appState.dict[openedEgg] represents the tier number
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
      case 'egg_series_3':
        obj = littlelegends.egg_series_3
        return obj
      case null:
        console.log('error in assignSeriesObj()')
    }
  },

  'legendary': function () {
    const seriesObj = pickLittleLegends.assignSeriesObj(appState.eggSelected)
    const rand = getRandomNum(seriesObj.legendary.skins.length)
    const openedEgg = seriesObj.legendary.skins[rand]
    pickLittleLegends.memoize(openedEgg, appState.dict)
  },

  'epic': function () {
    const seriesObj = pickLittleLegends.assignSeriesObj(appState.eggSelected)
    const rand = getRandomNum(seriesObj.epic.skins.length)
    const openedEgg = seriesObj.epic.skins[rand]
    pickLittleLegends.memoize(openedEgg, appState.dict)
  },

  'rare': function () {
    const seriesObj = pickLittleLegends.assignSeriesObj(appState.eggSelected)
    const rand = getRandomNum(seriesObj.rare.skins.length)
    const openedEgg = seriesObj.rare.skins[rand]
    pickLittleLegends.memoize(openedEgg, appState.dict)
  }
}

// Displays img of random drop
function renderLittleLegends (egg) {
  // picklittlelegends[]() calls either .legendary() .epic() .rare() depending on the randomly generated rarity
  const rarity = getRandomRarity()
  logRarity(rarity, appState.rarityTracker)
  if (egg === 'egg_series_1') {
    pickLittleLegends[rarity]()
  } else if (egg === 'egg_series_2') {
    pickLittleLegends[rarity]()
  } else if (egg === 'egg_series_3') {
    pickLittleLegends[rarity]()
  }
}


// Button click event for egg roll button
eggRollBtn.addEventListener('click', () => {
  let value = null
  const radioButtons = document.getElementsByName('radioButton')

  if (appState.eggSelected === 'egg_series_1') {
    renderLittleLegends(appState.eggSelected)
  } else if (appState.eggSelected === 'egg_series_2') {
    renderLittleLegends(appState.eggSelected)
  } else if (appState.eggSelected === 'egg_series_3') {
    renderLittleLegends(appState.eggSelected)
  }

  appState.rpCounter += 490
  document.getElementById('rp-counter').innerHTML = appState.rpCounter
  appState.usdCounter += 3.62
  document.getElementById('usd-counter').innerHTML = appState.usdCounter.toFixed(2)
  appState.skinCounter += 0.15
  document.getElementById('skin-counter').innerHTML = appState.skinCounter.toFixed(1)
})





