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
    atmosphere: 0,
    bars: 1,
    kilopascals: 2,
    "mm mercury": 3,
    pascals: 4,
    ppsqinch: 5,
  };

  let factors = [
    [1, 1.01325, 101.325, 760.1275, 101325, 14.69595],
    [0.986923, 1, 100, 750.1875, 100000, 14.50377],
    [0.00986923, 0.01, 1, 7.501875, 1000, 0.145038],
    [0.00131557, 0.001333, 0.1333, 1, 133.3, 0.0193335],
    [0.00000986923, 0.00001, 0.001, 0.007501888, 1, 0.000145038],
    [0.068046, 0.0689476, 6.894757, 51.72361, 6894.757, 1],
  ];

  return factors[units[unit1]][units[unit2]];
}

function genFacts(result, unit2) {
  // Fact data
  // atmospheric pressure = 1 atm
  // bike tire = 90 psqinch
  // water cutter= 40000 psi

  let atmospericPressure = parseFloat(
    (result * getFactor(unit2, "atmosphere")) / 1
  );
  let bicycleTyre = parseFloat((result * getFactor(unit2, "ppsqinch")) / 90);
  let waterCutter = parseFloat((result * getFactor(unit2, "ppsqinch")) / 40000);

  const fact = [];

  if (atmospericPressure < 4) {
    fact.push(
      "Thats about: " +
        atmospericPressure.toFixed(1) +
        " times atmosperic pressure<br>"
    );
    // 5 atms are close to half a bike tire, and so on.....
  } else if (bicycleTyre < 30) {
    fact.push(
      "Thats about: " +
        bicycleTyre.toFixed(1) +
        " times bicycle tyre pressure<br>"
    );
  } else {
    fact.push(
      "Thats about: " +
        waterCutter.toFixed(1) +
        " times pressure of water cutting jet<br>"
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
