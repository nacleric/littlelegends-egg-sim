// holds general state of the application
state = {
  eggSelected: null
}

/*
 *  Helper functions that display images
 */

// displays image of selected egg
function showEgg(srcString) {
  let eggResult = document.getElementById("eggResult")
  if (eggResult.src === "") {
    eggResult.src = srcString
  } else {
    eggResult.src = srcString
  }
}

// Shows a random image of the selected eggSeries
function showLittleLegends(egg) {
  if (egg === "eggSeries1") {
    console.log(eggSrc1[Object.keys(eggSrc1)[Math.floor(Math.random()*Object.keys(eggSrc1).length)]])
  }
  else if (egg === "eggSeries2") {
    console.log(eggSrc2[Object.keys(eggSrc2)[Math.floor(Math.random()*Object.keys(eggSrc2).length)]])
  }
}

/* some animations
function bobbingAnim() {

}
*/

/* All onClick() button events */

// checks if eggSeries1 radio button is selected
const eggSeries1 = document.getElementById("e1")
eggSeries1.addEventListener("click", () => {
  if (eggSeries1.checked) {
    state.eggSelected = "eggSeries1"
    console.log("radio button is checked")
    showEgg(eggList[state.eggSelected])
  }
});

// checks if eggSeries2 radio button is selected
const eggSeries2 = document.getElementById("e2")
eggSeries2.addEventListener("click", () => {
  if (eggSeries2.checked) {
    state.eggSelected = "eggSeries2"
    console.log("radio button is checked")
    showEgg(eggList[state.eggSelected])
  }
});

// onClick() event for egg roll button
eggRollBtn.addEventListener("click", () => {
  let value = null
  const radioButtons = document.getElementsByName("radioButton")

  // binds a value to each radio button
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      value = radioButtons[i].value
    }
  }

  if (value === "eggSeries1") {
    console.log("eggSeries1")
    showLittleLegends(value)
  }

  else if (value === "eggSeries2") {
    console.log("eggSeries2")
    showLittleLegends(value)
  }
});

