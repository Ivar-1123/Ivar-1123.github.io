document.getElementById("convert").addEventListener("click", convert);

document.getElementById("openButton").addEventListener("click", menuOpen);
document.getElementById("closeButton").addEventListener("click", menuOpen);

function menuOpen() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("nav-open");
}

function convert() {
  let unit1 = document.getElementById("inputUnit").value;
  let unit2 = document.getElementById("outputUnit").value;
  let n = document.getElementById("input").value;
  let inputNum = parseFloat(n);

  if (!isNaN(inputNum)) {
    let result = parseFloat(inputNum * getFactor(unit1, unit2));

    const fact = genFacts(result, unit2);

    document.getElementById("result").innerHTML = result + " " + unit2;
    document.getElementById("facts").innerHTML = fact;
  } else {
    // alert("Please enter number");
    showAlert();
  }
}

function getFactor(unit1, unit2) {
  // map units to numbers so we can use them to access array of factors
  let units = {
    sqcm: 0,
    sqm: 1,
    hectare: 2,
    sqkm: 3,
    sqinch: 4,
    sqfoot: 5,
    sqyard: 6,
    sqmile: 7,
    acre: 8,
  };

  let factors = [
    [
      1,
      0.0001,
      0.00000001,
      0.0000000001,
      0.15500031000062,
      0.001076391041671,
      0.00011959900463011,
      0.000000000038610215854781,
      0.000000024710538146717,
    ],
    [
      10000,
      1,
      0.0001,
      0.000001,
      1550.0031000062,
      10.76391041671,
      1.1959900463011,
      0.00000038610215854781,
      0.00024710538146717,
    ],
    [
      100000000,
      10000,
      1,
      0.01,
      15500031.000062,
      107639.1041671,
      11959.900463011,
      0.0038610215854781,
      2.4710538146717,
    ],
    [
      10000000000,
      1000000,
      100,
      1,
      1550003100.0062,
      10763910.41671,
      1195990.0463011,
      0.38610215854781,
      247.10538146717,
    ],
    [
      6.4516,
      0.00064516,
      0.000000064516,
      0.00000000064516,
      1,
      0.0069444444444444,
      0.0007716049382716,
      0.00000000024909766860871,
      0.00000015942250790736,
    ],
    [
      929.0304,
      0.09290304,
      0.000009290304,
      0.00000009290304,
      144,
      1,
      0.11111111111111,
      0.000000035870064279654,
      0.000022956841138659,
    ],
    [
      8361.2736,
      0.83612736,
      0.000083612736,
      0.00000083612736,
      1296,
      9,
      1,
      0.00000032283057851688,
      0.00020661157024793,
    ],
    [
      25899881103,
      2589988.1103,
      258.99881103,
      2.5899881103,
      4014489599.9442,
      27878399.999612,
      3097599.9999569,
      1,
      639.9999999911,
    ],
    [
      40468564.224,
      4046.8564224,
      0.40468564224,
      0.0040468564224,
      6272640,
      43560,
      4840,
      0.0015625000000217,
      1,
    ],
  ];

  return factors[units[unit1]][units[unit2]];
}

function genFacts(result, unit2) {
  // Fact data
  // 1 hand = 125 sq cm
  // 1 paper sheet 605 sq cm
  // 1 soccer field = 10900 sq m
  // 1 castle =  100000 sq m

  let hand = parseFloat((result * getFactor(unit2, "sqcm")) / 125);
  let paperSheet = parseFloat((result * getFactor(unit2, "sqcm")) / 605);
  let soccerField = parseFloat((result * getFactor(unit2, "sqm")) / 10900);
  let castle = parseFloat((result * getFactor(unit2, "sqm")) / 100000);

  const fact = [];

  if (hand < 3) {
    fact.push("Thats about: " + hand.toFixed(1) + " hands<br>");
    // 3 hands are close to half of a sheet of paper, and so on...
  } else if (paperSheet < 115702) {
    fact.push("Thats about: " + paperSheet.toFixed(1) + " sheets of paper<br>");
  } else if (soccerField < 6) {
    fact.push("Thats about: " + soccerField.toFixed(1) + " soccer fields<br>");
  } else {
    fact.push("Thats about: " + castle.toFixed(1) + " castles<br>");
  }

  return fact;
}

function showAlert() {
  var x = document.getElementById("snackbar");
  // Add the "show" class to DIV
  x.className = "show";
  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 2500);
}
