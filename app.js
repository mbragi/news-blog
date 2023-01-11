const url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/";
const httpFetchNewsData = async () => {
  try {
    const res = await fetch(`${url}news`);
    const data = await res.json();
    await displayNews(data);
  } catch (error) {
    const ui = new UI();
    ui.setLoading(false, error.message, "news_card_container");
  }
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
      <div class="button_container">
      <a name="url" class="web"  href="${news.url}">WEBSITE</a>
      <a class="read" id="${news.id}">READ MORE</a>
     </div>
       </div>
    `;
    card.appendChild(newCard);
    console.log(newCard);
  }
  setLoading(bool, name, className) {
    if (bool === true) {
      return (document.getElementById(`${className}`).innerHTML = `Loading...`);
    } else if (bool === null && name === null && className === null) {
      return console.log("you gerrit");
    }
    return (document.getElementById(`${className}`).innerHTML = `${name}`);
  }
}

const getNews = async () => {
  const ui = new UI();
  ui.setLoading(true, null, "news_card_container");
  await httpFetchNewsData();
};
const displayNews = async (data) => {
  const ui = new UI();
  ui.setLoading(null, null, null);
  let newCollection = [...data];
  newCollection.map((item) => {
    ui.addNewsList(item);
  });
};
const read = () => {
  const get_id = document.querySelector(".read");
  const value = get_id.getAttribute("id");
  JSON.stringify(localStorage.setItem("viewID", value));
};
document.addEventListener("DOMContentLoaded", getNews());
document.querySelector(".read").addEventListener("click", read());
