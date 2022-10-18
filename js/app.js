'use strict';

console.log('hello')

let myContainer = document.querySelector('section');
let resultBtn = document.querySelector('section + div');
let results = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child')
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let howManyTimesUserHasVoted = 0
let maxNumberofVotes = 25;

function Toy(name, fileExtension='jpg') {
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `img/${this.name}.${this.fileExtension}`;
  this.score = 0;
  this.views = 0;
}

let bag = new Toy('bag');
let banana = new Toy('banana');
let bathroom = new Toy('bathroom');
let boots = new Toy('boots.jpg');
let breakfast = new Toy('breakfast');
let bubblegum = new Toy('bubblegum');
let chair = new Toy('chair');
let cthulhu = new Toy('cthulhu');
let dogDuck = new Toy('dogDuck');
let dragon = new Toy('dragon');
let pen = new Toy('pen');
let scissors = new Toy('scissors');
let shark = new Toy('shark');
let sweep = new Toy('sweep');
let tauntaun = new Toy('tauntaun');
let unicorn = new Toy('unicorn');
let waterCan = new Toy('waterCan');
let wineGlass = new Toy('wineGlass');

let allToys = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass];

function selectRandomToy() {
  return Math.floor(Math.random() * allToys.length);
}

function renderToys() {
  let toy1 = selectRandomToy();
  let toy2 = selectRandomToy();
  let toy3 = selectRandomToy();
  console.log(toy1, toy2, toy3)
}

while (toy1 === toy2) {
  toy2 = selectRandomToy();
  console.log(toy1, toy2);
}
while (toy2 === toy3) {
  toy3 = selectRandomToy();
  console.log(toy2, toy3);
}
while (toy1 === toy3) {
  toy1 = selectRandomToy();
  console.log(toy1, toy3)
}

image1.src = allToys[toy1].src;
image1.alt = allToys[toy1].name;
allToys[toy1].views++;

image2.src = allToys[toy2].src;
image2.alt = allToys[toy2].name;
allToys[toy2].views++;

image3.src = allToys[toy3].src;
image3.alt = allToys[toy3].name;
allToys[toy3].views++;

function renderResults() {
  for (let i=0; i < allToys.length; i++){
    let li=document.createElement('li');
    li.textContent = `${allToys[i].name} had ${allToys[i].views} and ${allToys[i].score} votes`;
    results.appendChild(li);
  }
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click an image')
  }
  console.log(event.target.alt);
  howManyTimesUserHasVoted++;
  let clickedToy = event.target.alt;

  for (let i = 0; i < allToys.length; i++){
    if (event.target.alt === allToys[i].name) {
      console.log(allToys[i]);
      allToys[i].score++;
      break;
    }
  }
  if (howManyTimesUserHasVoted === maxNumberofVote) {
    myContainer.removeEventListener('click', handleClick);
    resultBtn.className = 'clicks-allowed';
    resultBtn.addEventListener('click', renderResults)
  } else {
    renderToys();
  }
}

myContainer.addEventListener('click', handleClick);

renderToys();
