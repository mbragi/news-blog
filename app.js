const url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/";
const httpFetchNewsData = async () => {
  const res = await fetch(`${url}news`);
  const data = await res.json();
  await displayNews(data);
};

class News {
  constructor(title, avatar, author, url, id) {
    this.title = title;
    this.avatar = avatar;
    this.author = author;
    this.url = url;
    this.id = id;
  }
}
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
      <div class="button_container">
      <a name="url" class="read"  href="${news.url}">WEBSITE</a>
      <a href="./src/pages/view.html/${news.id}" class="read">READ MORE</a>
     </div>
       </div>
    `;
    card.appendChild(newCard);
    console.log(newCard);
  }
}

const getNews = async () => {
  await httpFetchNewsData();
};
const displayNews = async (data) => {
  const ui = new UI();
  let newCollection = [...data];
  console.log(newCollection, ui);

  newCollection.map((item) => {
    ui.addNewsList(item);
  });
};

document.addEventListener("DOMContentLoaded", getNews());
