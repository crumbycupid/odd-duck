'use strict';

console.log('hello')

let myContainer = document.querySelector('section');
let resultBtn = document.getElementById('resultsButton');
//let results = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child')
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let howManyTimesUserHasVoted = 0
let maxNumberofVotes = 25;

let allProducts = [];
console.log(image3.src);

function Product(name, fileExtension = 'jpeg') {
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `images/${this.name}.${this.fileExtension}`;
  this.score = 0;
  this.views = 0;
  allProducts.push(this);
}

function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

//old product selector function
/*function renderProducts() {
  let product1 = selectRandomProduct(); 3
  let product2 = selectRandomProduct(); 6
  let product3 = selectRandomProduct(); 3
  console.log(product1, product2, product3)
}*/

let indexArray = [];

function renderProducts() {

  while (indexArray.length < 7) {
    let ranNum = selectRandomProduct();
    if (!indexArray.includes(ranNum)) {
      indexArray.push(ranNum);
    }
  }
  console.log(indexArray);
  let product1 = indexArray.shift();
  let product2 = indexArray.shift();
  let product3 = indexArray.shift();

  //old while loop
  /*while (product1 === product2) {
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
  */
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
  /*for (let i = 0; i < allProducts.length; i++) {
    let views = 'views';
    if (allProducts[i].views === 1) {
      views = 'view';
    }
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} ${views}, and ${allProducts[i].score} votes`;
    results.appendChild(li);
  }*/
}

function storeData() {
  let string = JSON.stringify(allProducts);
  localStorage.setItem('data', string);
  console.log(string);
}

function getData() {
  let localData = localStorage.getItem('data');
  if (localData) {
    let parsedOrders = JSON.parse(localData)
    console.log(parsedOrders);
    allProducts = parsedOrders;
  } else {
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
    let petsweep = new Product('pet-sweep')
    let scissors = new Product('scissors');
    let shark = new Product('shark');
    let sweep = new Product('sweep', 'png');
    let tauntaun = new Product('tauntaun');
    let unicorn = new Product('unicorn');
    let waterCan = new Product('water-can');
    let wineGlass = new Product('wine-glass');
  }
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click an image')
  }
  console.log(event.target.alt);
  howManyTimesUserHasVoted++;
  let clickedProduct = event.target.alt;

  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      console.log(allProducts[i]);
      allProducts[i].score++;
      break;
    }
  }
  if (howManyTimesUserHasVoted === maxNumberofVotes) {
    myContainer.removeEventListener('click', handleClick);
    resultBtn.className = 'clicks-allowed';
    resultBtn.addEventListener('click', renderChart)
  } else {
    renderProducts();
  }
}
function renderChart() {

  let products = [];
  let productViews = [];
  let productScore = [];
  for (let i = 0; i < allProducts.length; i++) {
    products.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productScore.push(allProducts[i].score);
  }
  storeData();


  const data = {
    labels: products,
    datasets: [
      {
        label: 'Views',
        data: productViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      },
      {
        label: 'Votes',
        data: productScore,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      },
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}
myContainer.addEventListener('click', handleClick);

getData();
renderProducts();
