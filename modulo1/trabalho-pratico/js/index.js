'use strict';
window.addEventListener("load", start);

function start() {
  var rangeRed = document.querySelector("#rangeRed");
  var rangeGreen = document.querySelector("#rangeGreen");
  var rangeBlue = document.querySelector("#rangeBlue");
  var valueRed = document.querySelector("#valueRed");
  var valueGreen = document.querySelector("#valueGreen");
  var valueBlue = document.querySelector("#valueBlue");
  var targetColor = document.getElementById("targetColor");
  
  activeRanges();
}

function activeRanges() {
    function colorPalette() {
        valueRed.value = rangeRed.value;
        valueGreen.value = rangeGreen.value;
        valueBlue.value = rangeBlue.value;

        let rgbColor = `rgb(${rangeRed.value},${rangeGreen.value},${rangeBlue.value})`;
        targetColor.style.backgroundColor = rgbColor;
    }

    rangeRed.addEventListener("input", colorPalette);
    rangeGreen.addEventListener("input", colorPalette);
    rangeBlue.addEventListener("input", colorPalette);
}