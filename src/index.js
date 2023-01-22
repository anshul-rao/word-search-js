const gridDimension = 12, grid = document.querySelector('.grid');
let wordList = [], gridCellsArr = [], selectedGridCells = [];


wordList = ['hello', 'hihihihihihi']
const numberOfWords = 5;

// fetch('../wordbank.json')
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);

//     })
//     .catch(error => console.error(error));



function generateWordSearch() {
  // clear the grid and arrays
  grid.innerHTML = '';
  gridCellsArr.splice(0, gridCellsArr.length);
  selectedGridCells = [];
  // Create the grid cells
  for (let i = 0; i < gridDimension; i++) {
    const gridRow = [];
    for (let j = 0; j < gridDimension; j++) {
      const cell = document.createElement('div');
      grid.appendChild(cell);
      gridRow.push(cell);
    }
    gridCellsArr.push(gridRow);
  }

  // Implements word into grid
  for (const word of wordList) {
    wordInGrid(word);
    console.log(word)
  }

  for (const gridRow of gridCellsArr) {
    for (const cell of gridRow) {
      if (!cell.textContent) {
        cell.textContent = getRandomLetter();
      }
      cell.selected = false;
      cell.addEventListener('click', function (event) {
        if (cell.selected) {
          selectedGridCells.splice(selectedGridCells.indexOf(cell.textContent), 1);
          cell.selected = false;
          console.log(selectedGridCells);
        } else {
          selectedGridCells.push(cell.textContent);
          cell.selected = true;
          console.log(selectedGridCells);
        }
      })
    }
  }
}

function wordInGrid(word) {
  // Sets coordinate and direction
  let coordinate = getCoordinate();
  let direction = getDirection();

  // Keeps adding word if boolWordInGrid is true
  while (!boolWordInGrid(word, coordinate, direction)) {
    coordinate = getCoordinate();
    direction = getDirection();
  }
}

function boolWordInGrid(word, coordinate, direction) {
  let [x, y] = coordinate;
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (x < 0 || x >= gridDimension || y < 0 || y >= gridDimension) {
      return false;
    }

    if (gridCellsArr[x][y].textContent && gridCellsArr[x][y].textContent !== letter) {
      return false;
    }

    x += direction[0];
    y += direction[1];
  }

  x = coordinate[0];
  y = coordinate[1];
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    gridCellsArr[x][y].textContent = letter;
    x += direction[0];
    y += direction[1];
  }
  return true;
}

function getRandomLetter() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[Math.floor(Math.random() * letters.length)];
}

function getCoordinate() {
  return [Math.floor(Math.random() * gridDimension), Math.floor(Math.random() * gridDimension)];
}

function getDirection() {
  // Gets direction in one of the 8 cardinal directions
  const directionCoords = [[1, 0], [1, 1], [0, 1], [-1, 1],
  [-1, 0], [-1, -1], [0, -1], [1, -1]];
  return directionCoords[Math.floor(Math.random() * directionCoords.length)];
}

generateWordSearch();
