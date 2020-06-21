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
    gram: 0,
    kilogram: 1,
    pound: 2,
    ounce: 3,
    carat: 4,
    "short on": 5,
    "long ton": 6,
    "metric ton": 7,
    grain: 8,
  };

  let factors = [
    [
      1,
      0.001,
      0.0022046226218488,
      0.03527396194958,
      5,
      0.0000011023113109244,
      0.00000098420652761106,
      0.000001,
      15.432358352941,
    ],
    [
      1000,
      1,
      2.2046226218488,
      35.27396194958,
      5000,
      0.0011023113109244,
      0.00098420652761106,
      0.001,
      15432.358352941,
    ],
    [
      453.59237,
      0.45359237,
      1,
      16,
      2267.96185,
      0.0005,
      0.00044642857142857,
      0.00045359237,
      7000,
    ],
    [
      28.349523125,
      0.028349523125,
      0.0625,
      1,
      141.747615625,
      0.00003125,
      0.000027901785714286,
      0.000028349523125,
      437.5,
    ],
    [
      0.2,
      0.0002,
      0.00044092452436976,
      0.0070547923899161,
      1,
      0.00000022046226218488,
      0.00000019684130552221,
      0.0000002,
      3.0864716705883,
    ],
    [
      907184.74,
      907.18474,
      2000,
      32000,
      4535923.7,
      1,
      0.89285714285714,
      0.90718474,
      14000000,
    ],
    [
      1016046.9088,
      1016.0469088,
      2240,
      35840,
      5080234.544,
      1.12,
      1,
      1.0160469088,
      15680000,
    ],
    [
      1000000,
      1000,
      2204.6226218488,
      35273.96194958,
      5000000,
      1.1023113109244,
      0.984206527611061106,
      1,
      15432358.352941,
    ],
    [
      0.06479891,
      0.00006479891,
      0.00014285714285714,
      0.0022857142857143,
      0.32399455,
      0.000000071428571428571,
      0.000000063775510204082,
      0.00000006479891,
      1,
    ],
  ];

  return factors[units[unit1]][units[unit2]];
}

function genFacts(result, unit2) {
  // Fact data
  // snow flake = 2 mg
  // soccer ball  = 434 grams
  // elephant  = 4000 kg
  //  whale = 90 metric tons

  let snowFlake = parseFloat((result * getFactor(unit2, "gram")) / 0.002);
  let soccerBall = parseFloat((result * getFactor(unit2, "gram")) / 434);
  let elephant = parseFloat((result * getFactor(unit2, "kilogram")) / 4000);
  let whale = parseFloat((result * getFactor(unit2, "metric ton")) / 90);

  const fact = [];

  if (snowFlake < 50001) {
    fact.push("Thats about: " + snowFlake.toFixed(1) + " snow flakes<br>");
    // 50001 snow flakes are close to 100gms and so on.....
  } else if (soccerBall < 2300) {
    fact.push("Thats about: " + soccerBall.toFixed(1) + " soccer balls<br>");
    //2300 balls are close to 1000 kg
  } else if (elephant < 12) {
    fact.push("Thats about: " + elephant.toFixed(1) + " elephants<br>");
  } else {
    fact.push("Thats about: " + whale.toFixed(1) + " whales<br>");
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
