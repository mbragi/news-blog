const url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/";
const httpFetchNewsData = async () => {
  try {
    const res = await fetch(`${url}news`);
    const data = await res.json();
    const arr_of_pages_index = data.map((item, index) => index);
    return arr_of_pages_index;
  } catch (error) {
    const ui = new UI();

    ui.setLoading(false, error.message, "news_card_container");
  }
};
const get_Paginated_News = async (wasAButtonClicked, welcome_page_number) => {
  const first_page = 0;
  const page_number = welcome_page_number;
  const get_news_length = await httpFetchNewsData();
  const arr_of_news_page = get_news_length.length / 10;
  const news_pages = Math.floor(arr_of_news_page);
  const number = news_pages + 1;
  const arr_of_news_pages = get_news_length.filter(
    (item) => item <= news_pages + 1
  );
  if (wasAButtonClicked === true) {
    let current_page = first_page + page_number;
    let page = current_page;
    const data = await fetch(`${url}news?page=${page}&limit=10`);
    console.log(data, number, arr_of_news_pages);
    let card = await data.json();

    return displayNews(card, number, arr_of_news_pages);
  }
  let page = page_number;
  const data = await fetch(`${url}news?page=${page}&limit=10`);
  let card = await data.json();
  return displayNews(card, number, arr_of_news_pages);
};

class UI {
  addNewsList(news) {
    console.log(news);
    const card = document.querySelector("card");
    const newCard = document.createElement("div");
    newCard.className = "news_card";
    newCard.innerHTML = `
      
     <img src="${news.avatar}" alt="image" name="avatar" width="150">
      <div class="card_inner_container">
      <div class="author_name_container">
      <h4>AUTHOR NAME:</h4>
       <p class="author_name" name="author">${news.author}</p>
      </div>
     <div class="news_title_container">
      <h4>NEWS TITLE:</h4>
      <p class="title_name" name="title">${news.title}</p>
      </div>
      <div class="news_title_container">
      <h4>WEBSITE URL:</h4>
      <p class="title_name" name="title">${news.url}</p>
      </div>
      <div class="button_container">
      <a name="url" class="web"  id="${news.id}">UPDATE</a>
      <a class="read" id="${news.id}">READ MORE</a>
     </div>
       </div>
       
    `;
    console.log(newCard, card);
    card.appendChild(newCard);
  }
  setLoading(bool, message, className) {
    if (bool === true) {
      return (document.getElementById(`${className}`).innerHTML = `Loading...`);
    } else if (bool === false) {
      return (document.getElementById(`${className}`).innerHTML = `
      ${message}`);
    } else if (bool === null || message === null) {
      return document.getElementById(`${className}`);
    }
  }

  setPagination(number_of_paginated_page) {
    let data = number_of_paginated_page;
    const container = document.querySelector(".page_number_container");
    const child = document.createElement("div");
    child.className = "page_number";
    child.innerHTML = `
     <div class="page_number" id="${data}">${data}</div>

    `;
    container.appendChild(child);
  }
}
const getNews = () => {
  get_Paginated_News(false, 1);
  const ui = new UI();
  ui.setLoading(true, null, "news_card_container");
};
const displayNews = async (data, page, arr_of_pages_number) => {
  const ui = new UI();
  let item = arr_of_pages_number.splice(1, page);
  item.map((item) => {
    ui.setPagination(item);
  });
  ui.setLoading(null, null, "news_card_container");
  let newCollection = data;
  newCollection.map((item) => {
    ui.addNewsList(item);
    // console.log(item);/
  });
  return;
};
const read = () => {
  const get_id = document.querySelector(".read");
  const value = get_id.getAttribute("id");
  JSON.stringify(localStorage.setItem("viewID", value));
};
document.addEventListener("DOMContentLoaded", getNews());
// document.querySelector(".read").addEventListener("click", read());
