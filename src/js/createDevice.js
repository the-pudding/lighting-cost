import * as nouislider from 'nouislider';


let $slider;

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
  $slider.style.margin = '0 auto 10px';

  $slider.noUiSlider.on('slide', () => {
    console.log('nice')
  })

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
  console.log('nice')
  createSlider()
}



export default {
  createContainers
};
