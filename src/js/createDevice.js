import * as nouislider from 'nouislider';


let $slider;

let boolSwitchOn;

let soundBigButton2;
let soundButton1;
let soundSwitch1;
let soundDial1;

let lightCool = false
let lightBoost = false
let lightTest = false
let lightState = false
let lightLamp = false
let lightPower = false

let lightChargePlus = false
let lightChargeMinus = false

let dialValue = 'off';

let sliderValue = 0;

let buttonRedValue = false
let buttonWhiteValue = false

// function createDisplay() {

// }

function createSlider() {

  $slider = document.getElementById('slider');

  nouislider.create($slider, {

    range: {
      'min': 0,
      'max': 100
    },

    step: 20,

    // Handles start at ...
    start: [100],

    // ... must be at least 300 apart
    margin: 20,

    // Display colored bars between handles
    connect: true,

    // Put '0' at the bottom of the slider
    // direction: 'rtl',
    orientation: 'vertical',

    // Move handle on tap, bars are draggable
    behaviour: 'drag',
    tooltips: false,

    // Show a scale with the slider
    pips: {
      mode: 'steps',
      stepped: true,
      density: 4
    }
  });

  $slider.style.height = d3.select('#slider').height
  //   $slider.style.margin = '0 auto 10px';

  $slider.noUiSlider.on('change', () => {
    soundButton1.play();
  })

}

function createSwitch() {
  d3.select('.toggle-middle').on('click', () => {

    function turnSwitchOn() {
      d3.select('.toggle-switch-top')
        .transition()
        .style('right', null)
        .style('left', '1%')


      d3.select('.toggle-switch-top')
        .classed('switch-on', true)

      boolSwitchOn = d3.select('.toggle-switch-top').classed('switch-on')
    }

    function turnSwitchOff() {
      d3.select('.toggle-switch-top')
        .transition()
        .style('left', null)
        .style('right', '1%')


      d3.select('.toggle-switch-top')
        .classed('switch-on', false)

      boolSwitchOn = d3.select('.toggle-switch-top').classed('switch-on')
    }

    boolSwitchOn ? turnSwitchOff() : turnSwitchOn()
    updateNeedle()
    soundSwitch1.play()
  })
}

function setupSounds() {
  soundButton1 = new Audio('assets/sounds/button1.wav');
  soundBigButton2 = new Audio('assets/sounds/button2.wav');
  soundSwitch1 = new Audio('assets/sounds/switch1.wav');
  soundDial1 = new Audio('assets/sounds/dial1.wav');
}


function createBigButtons() {
  const bigButtonHeight = d3.select('.big-button-container').style('height')

  d3.selectAll('.big-button-container')
    .style('width', bigButtonHeight)

  d3.selectAll('.button-inner')
    .on('click', function () {

      function pushButtonDown(btn) {
        d3.select(btn).classed('button-up-shadow', false)
        console.log(btn)
      }

      function pushButtonUp(btn) {
        d3.select(btn).classed('button-up-shadow', true)
        console.log(btn)
      }

      const buttonIsUp = d3.select(this).classed('button-up-shadow') //todo add to "annoying things I wish they'd taught about js" blog post

      buttonIsUp ? pushButtonDown(this) : pushButtonUp(this);

      soundBigButton2.play()

      // buttonIsUp = d3.select(this).classed('button-up-shadow')
      //   console.log(buttonIsUp)
      updateNeedle()

    })
}

function handleDialValue(dialValueClicked) {
  if (dialValueClicked == 'OFF') {
    d3.select('.dial')
      .transition()
      .style('transform', 'rotate(-135deg)')
  }
  if (dialValueClicked == '10') {
    d3.select('.dial')
      .transition()
      .style('transform', 'rotate(-95deg)')
  }
  if (dialValueClicked == '20') {
    d3.select('.dial')
      .transition()
      .style('transform', 'rotate(-50deg)')
  }
  if (dialValueClicked == '30') {
    d3.select('.dial')
      .transition()
      .style('transform', 'rotate(-5deg)')
  }
  if (dialValueClicked == '40') {
    d3.select('.dial')
      .transition()
      .style('transform', 'rotate(40deg)')
  }
  if (dialValueClicked == '50') {
    d3.select('.dial')
      .transition()
      .style('transform', 'rotate(85deg)')
  }
  if (dialValueClicked == '60') {
    d3.select('.dial')
      .transition()
      .style('transform', 'rotate(145deg)')
  }
  soundDial1.play()

  updateNeedle()

}


function createDial() {
  const dialHeight = d3.select('.dial-container').style('height')

  d3.selectAll('.dial-container')
    .style('width', dialHeight)

  const dialButton = parseFloat(d3.select('.dial').style('height').replace('px', '')) * 0.7
  const newHeight = (dialButton).toString() + 'px'

  d3.selectAll('.dial-section-label').style('height', newHeight)


  d3.selectAll('.dial-section-label').on('click', function () {
    const dialValueClicked = d3.select(this).text()
    handleDialValue(dialValueClicked)
  })

  updateNeedle()

}


function updateNeedle() {
  console.log(lightCool)
  console.log(lightBoost)
  console.log(lightTest)
  console.log(lightState)
  console.log(lightLamp)
  console.log(lightPower)
  console.log(dialValue)
  console.log(sliderValue)
  console.log(buttonRedValue)
  console.log(buttonWhiteValue)
  console.log(lightChargePlus)
  console.log(lightChargeMinus)
}


// function createToggle() {

// }



// functino createBigButtons() {

// }

function createFlashingLights() {
  function updateLight(light) {
    if (light === 'light-cool') {
      lightCool = lightCool ? false : true
    }
    if (light === 'light-boost') {
      lightBoost = lightBoost ? false : true
    }
    if (light === 'light-test') {
      lightTest = lightTest ? false : true
    }
    if (light === 'light-state') {
      lightState = lightState ? false : true
    }
    if (light === 'light-lamp') {
      lightLamp = lightLamp ? false : true
    }
    if (light === 'light-power') {
      lightPower = lightPower ? false : true
    }
    if (light === 'light-charge-minus') {
      lightChargeMinus = lightChargeMinus ? false : true
    }
    if (light === 'light-charge-plus') {
      lightChargePlus = lightChargePlus ? false : true
    }
  }









  d3.selectAll('.light-box-light').on('click', function () {

    const $thisLight = d3.select(this)
    const pushedLight = $thisLight.attr('data-attribute')
    updateLight(pushedLight)

    soundButton1.play();
    updateNeedle()
  })
}

// function createDropDowns() {

// }

function createContainers() {
  setupSounds()
  createSwitch()
  createSlider()
  createBigButtons()
  createDial()
  createFlashingLights()

}



export default {
  createContainers
};
