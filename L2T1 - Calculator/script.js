let input = document.getElementById('result');

function appendValue(value) {
  input.value += value;
}

function calculate() {
  try {
    let result = eval(input.value);
    input.value = result;
  } catch (error) {
    input.value = 'Error';
  }
}

function clearInput() {
  input.value = '';
}

document.addEventListener('keydown', function(event) {
  const key = event.key;
  const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '=', 'Enter', 'Backspace'];

  if (validKeys.includes(key)) {
    event.preventDefault();
    if (key === '=') {
        calculate();
      } else if (key === 'Enter') {
        calculate();
      } else if (key === 'Backspace') {
        input.value = input.value.slice(0, -1);
      } else {
        appendValue(key);
      }
    }
  });
