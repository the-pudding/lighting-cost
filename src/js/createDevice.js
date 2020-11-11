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

let needleData2020;
let needleData1800;
let needleData4000;

let currentEra = 2020

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

      d3.selectAll('.instruction-card').classed('active', false)


      const needle = needleData2020[0]
      const needleScale = needleData2020[1]
      const needleCenter = needleData2020[2]
      const valueLabel = needleData2020[3]

      needle
        .transition()
        .duration(0.35)
        .attr('transform', `rotate(${needleScale(100)} ${needleCenter} ${needleCenter})`);

      valueLabel.text('1 lumen')



      d3.select('.time-bar-foreground.time-bar-2020ad')
        .transition()
        .duration(0.35)
        .style('width', '100%')


      d3.select('.time-display.time-bar-2020ad')
        .text('0.35 sec')

      d3.select('.era1').classed('active', true)

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


  const $dialContainer = d3.select('.dial-container')

  const dialContainerHeight = +$dialContainer.style('height').replace('px', '')
  const dialContainerWidth = +$dialContainer.style('width').replace('px', '')

  const dialContainerPadding = +d3.select('.toggle').style('padding').replace('px', '')
  const dialWidth = dialContainerWidth
  const dialHeight = dialContainerHeight

  const $svgDial = d3.select('.dial-container').append('svg')

  $svgDial.attr('class', 'svg-dial')

  $svgDial.style('height', dialHeight).style('width', dialWidth)

  console.log(dialContainerHeight)
  const xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, dialWidth])

  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, dialHeight])

  $svgDial.append('circle')
    .attr('cx', xScale(50))
    .attr('cy', yScale(50))
    .attr('r', dialHeight / 3)
    .style('fill', '#281C16')


  $svgDial.append('line')
    .attr('x1', xScale(50))
    .attr('x2', xScale(30))
    .attr('y1', yScale(50))
    .attr('y2', yScale(50))
    .style('stroke', 'white')
    .style('stroke-width', '2px')



  const textLabels = [{
      'label': 'off'
    },
    {
      'label': 10,
      'rotate': 0
    },
    {
      'label': 20,
      'rotate': 45
    },
    {
      'label': 30,
      'rotate': 90
    },
    {
      'label': 40,
      'rotate': 135
    },
    {
      'label': 50,
      'rotate': 180
    },
    {
      'label': 60,
      'rotate': 225
    },
  ]

  const $dialLabelGs = $svgDial
    .selectAll('g')
    .data(textLabels)
    .join('g')
    .attr('transform', (d, i) => `rotate(${45*i} ${xScale(50)} ${yScale(50)})`)
    .attr('class', 'dial-text-label-g')


  const $dialLabels = $dialLabelGs.append('text')

  $dialLabels
    .attr('class', 'dial-text-label').text(d => d.label)


  var x = Math.cos(0.25) * (dialHeight / 3);
  var y = Math.sin(0.25) * (dialHeight / 3);

  console.log(`x is ${xScale(30) + x}`)
  console.log(`y is ${yScale(50) + y}`)

  $svgDial.on('click', function () {
    let coordinates = d3.pointer();
    var xcoord = coordinates[0];
    var ycoord = coordinates[1];

    console.log(`xcoord is ${xcoord}`)
    console.log(`ycoord is ${ycoord}`)

  })
  // .text(d => d.label)



  //   const $dial = d3.select('.svg-dial')


  //   $dial.style('height', dialHeight).style('width', dialWidth)


  //   $dial.append('circle')







  //   const dialHeight = d3.select('.dial-container').style('height')

  //   d3.selectAll('.dial-container')
  //     .style('width', dialHeight)

  //   const dialButton = parseFloat(d3.select('.dial').style('height').replace('px', '')) * 0.7
  //   const newHeight = (dialButton).toString() + 'px'

  //   d3.selectAll('.dial-section-label').style('height', newHeight)


  //   d3.selectAll('.dial-section-label').on('click', function () {
  //     const dialValueClicked = d3.select(this).text()
  //     handleDialValue(dialValueClicked)
  //   })

  //   updateNeedle()

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


function createLumensDials() {
  const gaugeChart = (o) => {
    const chart = d3.select(o.el);
    const width = chart.attr('width');
    const center = width / 2;
    const outerBezelWidth = width * 0.009;
    const outerBezelRadius = center - outerBezelWidth;
    const innerBezelWidth = width * 0.072;
    const innerBezelRadius = outerBezelRadius - (innerBezelWidth / 2);
    const tickHeight = outerBezelWidth + innerBezelWidth + (width * 0.027);
    const tickWidth = width * 0.009;
    const tickHiderRadius = width * 0.345;
    const labelY = center / 1.3;
    const valueLabelY = width * 0.75;
    const labelFontSize = width * .13;
    const needleWidth = width * 0.054;
    const needleCapRadius = width * 0.059;
    const tickSpacing = 13.5;
    const lastTickAngle = 95;
    let angle = -95;

    const needleScale = d3.scaleLinear()
      .domain([o.min || 0, o.max || 100])
      .range([angle, lastTickAngle]);

    const needleAngle = needleScale(o.value);

    const outerBezel = chart.append('circle')
      .attr('class', 'gaugeChart-bezel-outer')
      .attr('cx', center)
      .attr('cy', center)
      .attr('stroke-width', outerBezelWidth)
      .attr('r', outerBezelRadius);

    const face = chart.append('circle')
      .attr('class', 'gaugeChart-face')
      .attr('cx', center)
      .attr('cy', center)
      .attr('r', outerBezelRadius - 1);

    const innerBezel = chart.append('circle')
      .attr('class', 'gaugeChart-bezel-inner')
      .attr('cx', center)
      .attr('cy', center)
      .attr('stroke-width', innerBezelWidth)
      .attr('r', innerBezelRadius);

    while (angle <= lastTickAngle) {
      chart.append('line')
        .attr('class', 'gaugeChart-tick')
        .attr('x1', center)
        .attr('y1', center)
        .attr('x2', center)
        .attr('y2', tickHeight)
        .attr('stroke-width', tickWidth)
        .attr('transform', `rotate(${angle} ${center} ${center})`);

      angle += tickSpacing;
    }

    const tickHider = chart.append('circle')
      .attr('class', 'gaugeChart-tickHider')
      .attr('cx', center)
      .attr('cy', center)
      .attr('r', tickHiderRadius);

    const label = chart.append('text')
      .attr('class', 'gaugeChart-label')
      .attr('x', center)
      .attr('y', labelY)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('font-size', labelFontSize)
      .text(o.label);

    const valueLabel = chart.append('text')
      .attr('class', 'gaugeChart-label-value')
      .attr('x', center)
      .attr('y', valueLabelY)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('font-size', labelFontSize)
      .text(o.value);

    const needle = chart.append('path')
      .attr('class', 'gaugeChart-needle')
      .attr('stroke-width', outerBezelWidth)
      .attr('d', `M ${center - needleWidth / 2} ${center}
                      L ${center} ${tickHeight}
                      L ${center + needleWidth / 2} ${center} Z`)
      .attr('transform', `rotate(${needleAngle} ${center} ${center})`);

    const needleCap = chart.append('circle')
      .attr('class', 'gaugeChart-needle-cap')
      .attr('cx', center)
      .attr('cy', center)
      .attr('stroke-width', outerBezelWidth)
      .attr('r', needleCapRadius);

    return [needle, needleScale, center, valueLabel]
  };


  d3.select('.lumens-dial-2020ad')
    .attr('height', 95)
    .attr('width', 95)

  d3.select('.lumens-dial-1800ad')
    .attr('height', 95)
    .attr('width', 95)

  d3.select('.lumens-dial-4000bc')
    .attr('height', 95)
    .attr('width', 95)


  needleData2020 = gaugeChart({
    el: '.lumens-dial-2020ad',
    label: '2020AD',
    value: 0,
  });



  needleData1800 = gaugeChart({
    el: '.lumens-dial-1800ad',
    label: '1800AD',
    value: 0,
  });


  needleData4000 = gaugeChart({
    el: '.lumens-dial-4000bc',
    label: '4000BC',
    value: 0,
  });



}


function createTimeBars() {

}


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
  createLumensDials()

}



export default {
  createContainers
};
