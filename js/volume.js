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
    milliter: 0,
    liter: 1,
    "cubic meter": 2,
    "cubic inch": 3,
    "cubic foot": 4,
    pint: 5,
    quart: 6,
    gallon: 7,
    barrel: 8,
  };

  let factors = [
    [
      1,
      0.001,
      0.000001,
      0.061023744094732,
      0.000035314666721489,
      0.0021133764188652,
      0.0010566882094326,
      0.00026417205235815,
      0.0000083864143605761,
    ],
    [
      1000,
      1,
      0.001,
      61.023744094732,
      0.035314666721489,
      2.1133764188652,
      1.0566882094326,
      0.26417205235815,
      0.0083864143605761,
    ],
    [
      1000000,
      1000,
      1,
      61023.744094732,
      35.314666721489,
      2113.3764188652,
      1056.6882094326,
      264.17205235815,
      8.3864143605761,
    ],
    [
      16.387064,
      0.016387064,
      0.000016387064,
      1,
      0.0005787037037037,
      0.034632034632035,
      0.017316017316017,
      0.0043290043290043,
      0.00013742870885728,
    ],
    [
      28316.846592,
      28.316846592,
      0.028316846592,
      1728,
      1,
      59.844155844156,
      29.922077922078,
      7.4805194805195,
      0.23747680890538,
    ],
    [
      473.176473,
      0.473176473,
      0.000473176473,
      28.875,
      0.016710069444444,
      1,
      0.5,
      0.125,
      0.003968253968254,
    ],
    [
      946.352946,
      0.946352946,
      0.000946352946,
      57.75,
      0.033420138888889,
      2,
      1,
      0.25,
      0.0079365079365079,
    ],
    [
      3785.411784,
      3.785411784,
      0.003785411784,
      231,
      0.13368055555556,
      8,
      4,
      1,
      0.031746031746032,
    ],
    [
      119240.471196,
      119.240471196,
      0.119240471196,
      7276.5,
      4.2109375,
      252,
      126,
      31.5,
      1,
    ],
  ];

  return factors[units[unit1]][units[unit2]];
}

function genFacts(result, unit2) {
  // Fact data
  // coffeee cup = 230ml
  // bah tub = 0.38 cubic meters
  // swimming pool = 3750 cubic meters

  let coffeeCup = parseFloat((result * getFactor(unit2, "milliter")) / 230);
  let bathtub = parseFloat((result * getFactor(unit2, "cubic meter")) / 0.38);
  let swimmingPool = parseFloat(
    (result * getFactor(unit2, "cubic meter")) / 3750
  );

  const fact = [];

  if (coffeeCup < 869) {
    fact.push("Thats about: " + coffeeCup.toFixed(1) + " cups of coffee<br>");
    // 869 cups of coffee are close to half a bathtub, and so on.....
  } else if (bathtub < 4800) {
    fact.push("Thats about: " + bathtub.toFixed(1) + " bath tubs<br>");
  } else {
    fact.push(
      "Thats about: " + swimmingPool.toFixed(1) + " swimming pools<br>"
    );
  }

  return fact;
}

function showAlert() {
  var x = document.getElementById("snackbar");
  // Add the "show" class to DIV
  x.className = "show";
  // After 2.5 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 2500);
}
