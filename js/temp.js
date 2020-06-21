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
    let result = parseFloat(getResult(unit1, unit2, inputNum));

    document.getElementById("result").innerHTML = result + " " + unit2;
  } else {
    // alert("Please enter number");
    showAlert();
  }
}

// Degree Celsius(°C)
//         (°F - 32) x 5 / 9
//         (K - 273.15)
// Degree Fahrenheit(°F)
//         (°C x 9 / 5) + 32
//         (1.8 x K) - 459.67
// Kelvin(K)
//         (°C + 273.15)
//         (°F + 459.67) ÷ 1.8

function getResult(u1, u2, input) {
  switch (u1) {
    case "fahrenheit":
      switch (u2) {
        case "fahrenheit":
          return input;
        case "celsius":
          return (input - 32) * (5 / 9);
        case "kelvin":
          return (input - 32) * (5 / 9) + 273.15;
      }
      break;
    case "celsius":
      switch (u2) {
        case "fahrenheit":
          return input * (9 / 5) + 32;
        case "celsius":
          return input;
        case "kelvin":
          return input - 273.15;
      }
      break;
    case "kelvin":
      switch (u2) {
        case "fahrenheit":
          return (input + 459.67) / 1.8;
        case "celsius":
          return input + 273.15;
        case "kelvin":
          return input;
      }
      break;
  }
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
