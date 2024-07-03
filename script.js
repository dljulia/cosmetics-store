const items = [
  {
    title: "Карандаш для бровей",
    company: "VIVIENNE SABO",
    price: 10.79,
    img: "./img/eyebrow_pencil_vs.png",
    rating: 4.4,
  },
  {
    title: "Тушь для ресниц",
    company: "VIVIENNE SABO",
    price: 17.99,
    img: "./img/mascara_vs.png",
    rating: 5.0,
  },
  {
    title: "Палетка румян",
    company: "VIVIENNE SABO",
    price: 13.99,
    img: "./img/blush_vs.png",
    rating: 3.8,
  },
  {
    title: "Тональный крем",
    company: "STELLARY",
    price: 18.52,
    img: "./img/cc_cream_stl.png",
    rating: 4.7,
  },
  {
    title: "Консилер для лица",
    company: "STELLARY",
    price: 17.63,
    img: "./img/concealer_stl.png",
    rating: 4.9,
  },
  {
    title: "Помада для губ",
    company: "STELLARY",
    price: 14.79,
    img: "./img/lipstick_stl.png",
    rating: 3.2,
  },
  {
    title: "Карандаш для бровей",
    company: "STELLARY",
    price: 22.49,
    img: "./img/eyebrow_pencil_stl.png",
    rating: 2.9,
  },
  {
    title: "Тушь для ресниц",
    company: "RELOUIS",
    price: 9.99,
    img: "./img/mascara_rl.png",
    rating: 3.4,
  },
  {
    title: "Тональный крем",
    company: "RELOUIS",
    price: 13.29,
    img: "./img/cream_rl.png",
    rating: 4.8,
  },
  {
    title: "Консилер для лица",
    company: "ESTRADE",
    price: 12.99,
    img: "./img/concealer_estr.png",
    rating: 4.2,
  },
  {
    title: "Скульптор для лица",
    company: "ESTRADE",
    price: 23.99,
    img: "./img/sculptor_estr.png",
    rating: 3.7,
  },
  {
    title: "Тональный крем",
    company: "ESTRADE",
    price: 15.99,
    img: "./img/cream_estr.png",
    rating: 4.1,
  },
];


let currentState = [...items];


const itemsContainer = document.querySelector("#store-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");


function renderItems(arr) {
  nothingFound.textContent = "";
  itemsContainer.innerHTML = "";

  arr.forEach((item) => {
    itemsContainer.append(createCard(item));
  });

  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }

  if (a.title < b.title) {
    return -1;
  }

  return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function createCard(storeItem) {
  const { title, company, img, price, rating } = storeItem;
  const item = itemTemplate.content.cloneNode(true);

  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = company;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price} BYN`;

  const ratingContainer = item.querySelector(".rating");

  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  return item;
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();

  currentState = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );

  currentState.sort((a, b) => sortByAlphabet(a, b));
  renderItems(currentState);
  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }

  renderItems(currentState);
});
