const gridDimension = 12, grid = document.querySelector('.grid'), numberOfWords = 5;
let wordList = [], gridCellsArr = [], selectedGridCells = [], lastSelectedCell = null;

wordBank = {
  "animals": ["lion", "tiger", "bear", "monkey", "elephant", "giraffe", "zebra", "hippopotamus", "rhinoceros", "crocodile", "kangaroo", "platypus", "penguin", "gazelle", "puma", "ostrich", "lynx", "seagull", "pelican"],
  "colors": ["red", "orange", "yellow", "green", "blue", "purple", "pink", "black", "white", "gray", "brown", "gold", "silver", "violet", "indigo", "cyan", "magenta", "chartreuse", "crimson"],
  "fruits": ["apple", "banana", "orange", "strawberry", "grape", "pineapple", "mango", "kiwi", "peach", "plum", "avocado", "blackberry", "coconut", "date", "fig", "grapefruit", "guava", "lemon", "lime"],
  "vegetables": ["carrot", "celery", "lettuce", "spinach", "broccoli", "cauliflower", "cucumber", "onion", "garlic", "potato", "artichoke", "asparagus", "beet", "brussels", "cabbage", "caper", "cactus", "collard", "dandelion"],
  "vehicles": ["car", "truck", "bus", "motorcycle", "bicycle", "train", "airplane", "boat", "submarine", "helicopter", "sailboat", "canoe", "kayak", "catamaran", "hovercraft", "jetski", "moped", "scooter"],
  "countries": ["USA", "Canada", "Mexico", "Brazil", "Argentina", "Colombia", "Chile", "Ecuador", "Peru", "Venezuela", "Germany", "France", "Spain", "Italy", "Greece"],
  "science": ["Physics", "Chemistry", "Biology", "Astronomy", "Geology", "Ecology", "Meteorology", "Oceanography", "Botany", "Zoology"],
  "sports": ["Basketball", "Soccer", "Tennis", "Golf", "Volleyball", "Baseball", "Hockey", "Rugby", "Cricket", "Swimming"]
}

function getRandomCategory(){
  var categories = Object.keys(wordBank);
  return categories[Math.floor(Math.random() * categories.length)];
}

category = getRandomCategory()
console.log('The category is: ' + category)

tempBank = wordBank[category]
for(let i = 0; i < numberOfWords; i++){
  if(tempBank.length > 0){
  let t = [Math.floor(Math.random() * tempBank.length)]
  wordList.push(tempBank[t])
  tempBank.splice(t, 1)
  }
}


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
    wordInGrid(word.toUpperCase());
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

// Places a word in the grid, takes in arguement of 'word'

function wordInGrid(word) {
  // Sets coordinate and direction

  let coordinate = getCoordinate();
  // Sets coordinate to random coordinate in the grid

  let direction = getDirection();
  // Sets direction to one of the 8 cardinal directions

  let startCoordinate = [0, 0];
  let sharedLetter = false;
  // Originally sharedLetter is false.

  // Keeps adding word if boolWordInGrid is true
  // Loops through gridCellArr row and its cells
  // Checks if word can share letters and sets sharedLetter to true if possible
    // Checks if text content of current cell has same letter as the first letter of the word being placed (word[0])
  
  for (let i = 0; i < gridCellsArr.length; i++) {
    for (let j = 0; j < gridCellsArr[i].length; j++) {
      if (gridCellsArr[i][j].textContent === word[0]) {
        startCoordinate = [i, j];
        sharedLetter = true;
        break;
      }
    }
  }

  // Checks if word shares letters with words already placed in the grid
  // Else, it attempts to keep finding a random coordinate and direction until it can fit
  if (sharedLetter) {
    while (!boolWordInGrid(word, startCoordinate, direction)) {
      startCoordinate = getCoordinate();
      direction = getDirection();
    }
  } else {
    while (!boolWordInGrid(word, coordinate, direction)) {
      coordinate = getCoordinate();
      direction = getDirection();
    }
  }
}

// Checks whether word can be placed in the grid without passing grid dimensions
// and overlapping any letters with any other word.
function boolWordInGrid(word, coordinate, direction) {
  let [x, y] = coordinate;
  let intersect = false;
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (x < 0 || x >= gridDimension || y < 0 || y >= gridDimension) {
      // Checks if word is placed outside grid dimensions
      return false;
    }

    // Checks if word can fit at the coordinate without overlapping over letters from another word.
    // Sets intersect to true and breaks out of loop.
    // Variable intersect = false means word can fit in grid
    if (
      gridCellsArr[x][y].textContent &&
      gridCellsArr[x][y].textContent !== letter
    ) {
      intersect = true;
      break;
    }

    x += direction[0];
    y += direction[1];
  }

  if (intersect) {
    return false;
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
