const url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/";
const httpFetchNewsData = async () => {
  try {
    const res = await fetch(`${url}news`);
    const data = await res.json();
    const pageNumbers = [];
    for (
      let pageNumber = 1;
      pageNumber <= Math.ceil(data.length / 10);
      pageNumber++
    ) {
      pageNumbers.push(pageNumber);
    }
    return pageNumbers;
  } catch (error) {
    const ui = new UI();
    ui.setLoading(false, error.message, "news_card_container");
    setTimeout(() => {
      this.location.reload();
    }, 5000);
  }
};
const get_Paginated_News = async (wasAButtonClicked, page_number) => {
  try {
    const totalPages = await httpFetchNewsData();
    if (wasAButtonClicked === false) {
      let page = page_number;
      const res = await fetch(`${url}/news?page=${page}&limit=10`);
      const data = await res.json();
      localStorage.setItem("current_page", page);
      return { data: data, page: page, totalPages: totalPages };
    }
    let page = page_number;
    const res = await fetch(`${url}/news?page=${page}&limit=10`);
    const data = await res.json();
    console.log(totalPages, page, data);
    localStorage.removeItem("current_page");
    localStorage.setItem("current_page", page);
    return { data: data, page: page, totalPages: totalPages };
  } catch (error) {
    const ui = new UI();
    ui.setLoading(false, error.message, "news_card_container");
    setTimeout(() => {
      this.location.reload();
    }, 5000);
  }
};

class UI {
  addNewsList(news, idx) {
    const read_page = `./src/pages/view/view.html?id=${news.id}`;
    const update_page = `./src/pages/update/update.html?id=${news.id}`;
    const card = document.querySelector("card");

    const newCard = document.createElement("div");
    newCard.className = "news_card";
    newCard.setAttribute("key", idx);
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
      <a class="web" href="${update_page}">UPDATE</a>
      <a class="read" href="${read_page}" >READ MORE</a>
      </div>
      </div>
      
      `;
    card.appendChild(newCard);

    return;
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
  setPagination(number_of_paginated_pages) {
    let data = number_of_paginated_pages;
    const container = document.querySelector(".page_number_container");
    const child = document.createElement("div");
    child.className = "page_number_inner";
    child.innerHTML = `
     <a class="page_number" id="${data}">${data}</a>
    `;
    container.append(child);
    document.querySelectorAll(".page_number").forEach((el) =>
      el.addEventListener("click", (e) => {
        const id = e.target.id;
        if (localStorage.getItem("current_page") === id) {
          // Update Color for Each button
          //function to update news items according to Button id
          console.log(anchor);
        }
        return;
      })
    );
  }
}
const getNews = async (bool, number) => {
  let data = await get_Paginated_News(bool, number);
  const ui = new UI();
  displayNews(data?.data, data?.page, data?.totalPages);
  // ui.setLoading(true, null, "news_card_container");
};
const displayNews = async (data, page, arr_of_pages_number) => {
  const ui = new UI();
  arr_of_pages_number.map((item) => {
    return ui.setPagination(item);
  });
  let newCollection = data;
  newCollection.map((item, index) => {
    return ui.addNewsList(item, index);
  });
};
const back = async () => {
  const current_page = localStorage.getItem("current_page");
  if (current_page === "1" || null) {
    const min_page = current_page;
    localStorage.setItem("current_page", min_page);
    console.log(min_page);
    return;
  }
  const page = JSON.parse(current_page) - 1;
  const data = await get_Paginated_News(true, page);
  localStorage.setItem("current_page", data?.page);
  let newCollection = data?.data;
  newCollection.map((item, index) => {
    const card = document.querySelector(".news_card");
    card.remove();
    // console.log(card);
    const read_page = `./src/pages/view/view.html?id=${item.id}`;
    const update_page = `./src/pages/update/update.html?id=${item.id}`;
    const container = document.querySelector("card");

    const newCard = document.createElement("div");
    newCard.className = "news_card";
    newCard.setAttribute("key", index);
    newCard.innerHTML = `
      <img src="${item.avatar}" alt="image" name="avatar" width="150">
      <div class="card_inner_container">
      <div class="author_name_container">
      <h4>AUTHOR NAME:</h4>
      <p class="author_name" name="author">${item.author}</p>
      </div>
      <div class="news_title_container">
      <h4>NEWS TITLE:</h4>
      <p class="title_name" name="title">${item.title}</p>
      </div>
      <div class="news_title_container">
      <h4>WEBSITE URL:</h4>
      <p class="title_name" name="title">${item.url}</p>
      </div>
      <div class="button_container">
      <a class="web" href="${update_page}">UPDATE</a>
      <a class="read" href="${read_page}" >READ MORE</a>
      </div>
      </div>
      `;
    container.appendChild(newCard);
  });
  return;
};
const next = async () => {
  const current_page = localStorage.getItem("current_page");
  const next = JSON.parse(current_page) + 1;
  let data = await get_Paginated_News(true, next);
  if (next > data?.totalPages.length) {
    let max_page = data?.page - 1;
    localStorage.setItem("current_page", max_page);
    console.log(max_page);
    return;
  }
  let newCollection = data?.data;
  newCollection.map((item, index) => {
    const card = document.querySelector(".news_card");
    card.remove();
    console.log(card);
    const read_page = `./src/pages/view/view.html?id=${item.id}`;
    const update_page = `./src/pages/update/update.html?id=${item.id}`;
    const container = document.querySelector("card");

    const newCard = document.createElement("div");
    newCard.className = "news_card";
    newCard.setAttribute("key", index);
    newCard.innerHTML = `
      <img src="${item.avatar}" alt="image" name="avatar" width="150">
      <div class="card_inner_container">
      <div class="author_name_container">
      <h4>AUTHOR NAME:</h4>
      <p class="author_name" name="author">${item.author}</p>
      </div>
      <div class="news_title_container">
      <h4>NEWS TITLE:</h4>
      <p class="title_name" name="title">${item.title}</p>
      </div>
      <div class="news_title_container">
      <h4>WEBSITE URL:</h4>
      <p class="title_name" name="title">${item.url}</p>
      </div>
      <div class="button_container">
      <a class="web" href="${update_page}">UPDATE</a>
      <a class="read" href="${read_page}" >READ MORE</a>
      </div>
      </div>
      
      `;
    container.appendChild(newCard);
  });
  return;
};

document.addEventListener("DOMContentLoaded", getNews(false, 1));
document.querySelector(".back").addEventListener("click", back);
document.querySelector(".next").addEventListener("click", next);
