import * as nouislider from 'nouislider';


let $slider;

let boolSwitchOn;

let soundButton1;
let soundSwitch1;

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
    soundSwitch1.play()
  })
}

function setupSounds() {
  soundButton1 = new Audio('assets/sounds/button1.wav');
  soundSwitch1 = new Audio('assets/sounds/switch1.wav');
}

// function createToggle() {

// }

// function createDial() {

// }

// functino createBigButtons() {

// }

// function createFlashingButtons() {

// }

// function createDropDowns() {

// }

function createContainers() {
  setupSounds()
  console.log('nice')
  createSwitch()
  createSlider()

}



export default {
  createContainers
};
