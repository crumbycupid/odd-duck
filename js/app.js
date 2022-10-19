'use strict';
/*let indexArray=[]*/

console.log('hello')

let myContainer = document.querySelector('section');
let resultBtn = document.getElementById('resultsButton');
let results = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child')
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let howManyTimesUserHasVoted = 0
let maxNumberofVotes = 25;

function Product(name, fileExtension = 'jpeg') {
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `images/${this.name}.${this.fileExtension}`;
  this.score = 0;
  this.views = 0;
}

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-Can');
let wineGlass = new Product('wine-glass');

let allProducts = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass];

function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  let product1 = selectRandomProduct();
  let product2 = selectRandomProduct();
  let product3 = selectRandomProduct();
  console.log(product1, product2, product3)
  /*}
  
  function renderProducts(){
    let ranNum = selectRandomProduct();
  }
  /*console.log(indexArray);
  
  /*if (!indexArray.includes(ranNum);
  indexArray.push(ranNum);*/

  while (product1 === product2) {
    product2 = selectRandomProduct();
    console.log(product1, product2);
  }
  while (product2 === product3) {
    product3 = selectRandomProduct();
    console.log(product2, product3);
  }
  while (product1 === product3) {
    product1 = selectRandomProduct();
    console.log(product1, product3)
  }

  image1.src = allProducts[product1].src;
  image1.alt = allProducts[product1].name;
  allProducts[product1].views++;

  image2.src = allProducts[product2].src;
  image2.alt = allProducts[product2].name;
  allProducts[product2].views++;

  image3.src = allProducts[product3].src;
  image3.alt = allProducts[product3].name;
  allProducts[product3].views++;
}

function renderResults() {
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and ${allProducts[i].score} votes`;
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

  for (let i = 0; i < allProducts.length; i++) {
    if (event.target.alt === allProducts[i].name) {
      console.log(allProducts[i]);
      allProducts[i].score++;
      break;
    }
  }
  if (howManyTimesUserHasVoted === maxNumberofVotes) {
    myContainer.removeEventListener('click', handleClick);
    resultBtn.className = 'clicks-allowed';
    resultBtn.addEventListener('click', renderResults)
  } else {
    renderProducts();
  }
}

myContainer.addEventListener('click', handleClick);

renderProducts();
