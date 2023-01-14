const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/";

function setSlides(avatar) {
  let i = 0;
  let images = avatar;
  let time = 900;
  function changeImage() {
    if (i <= images.length - 1) {
      i++;
    } else {
      i = 0;
    }
    const image = document.querySelector(".img");
    image.src = images[i].image;
    return image;
  }
  setInterval(() => {
    "changeImage";
    changeImage();
  }, time);
}
function display_news_by_id(data) {
  const child = document.querySelector(".reporter_info_container");
  child.innerHTML = `<img src="${data.avatar}" alt="avatar" width="100px">
          <div class="reporter_detail">
            <h4>AUTHOR NAME: ${data.author}</h4>
            <h4>NEWS TITLE: ${data.title}</h4>
            <h4>WEBSITE URL:${data.url} </h4>
            <h4>UPDATED BY: ${data.author} </h4>
          </div>
          
         `;
  return;
}
async function httpGet_Images(id) {
  try {
    const res = await fetch(`${base_url}news/${id}/images`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function http_get_news_by_id(id) {
  try {
    const res = await fetch(`${base_url}news/${id}`);
    const data = await res.json();
    return display_news_by_id(data);
  } catch (error) {
    console.log(error.message);
  }
}
async function http_get_comments_id(id) {
  const comment = document.querySelector(".display_comment");
  try {
    const res = await fetch(`${base_url}news/${id}/comments`);
    const data = await res.json();
    let comments = data;
    let arr = [];
    comments.forEach((item) => {
      console.log(item);
      const child = document.querySelector(".each_comment").cloneNode(true);
      child.innerHTML = `
        <img src="${item.avatar}" alt="NO IMAGE" class="comment_avatar"/>
        <div class="comment">
        <div class="comment_inner">
        <h5 class="comment_name" id="${item.id}">${item.name}</h5>
        <p class="comment_body" >${item.comment}</p>
        </div>
        <div class="delete_comment_container">
        <button id="${item.id}" class="delete_comment">x</button>
        </div>
        </div>
        `;
      arr.push(child);
    });
    comment.append(...arr);

    document
      .querySelectorAll(".comment_name")
      .forEach((el) =>
        el.addEventListener("click", navigate_to_update_comment)
      );
    document
      .querySelectorAll(".delete_comment")
      .forEach((el) => el.addEventListener("click", delete_comment));
  } catch (error) {
    console.log(error.message);
  }
}
const setPage = async (ID) => {
  const Id = ID;
  // Get News by ID
  http_get_news_by_id(JSON.parse(Id));
  //Get Comments for News
  http_get_comments_id(JSON.parse(Id));
  //Get Images by ID
  let data = await httpGet_Images(JSON.parse(Id));
  // Show SLides

  return setSlides(data);
};
this.onload = () => {
  const page_id = this.location.href.split("=")[1];
  return setPage(page_id);
};
const delete_news = async () => {
  const id = this.location.href.split("=")[1];
  try {
    const res = await fetch(`${base_url}news/${id}`, {
      method: "delete",
    });
    const response = await res.json();
    console.log(response);
    document.querySelector(".view_inner_container").remove();
    const card = document.querySelector(".view_inner_container");
    card.innerHTML = `
    ${response}`;
  } catch (error) {
    console.log(error.message);
  }
};

const navigate_to_comment = async () => {
  const id = this.location.href.split("=")[1];
  console.log(id);
  this.history.pushState(
    {},
    "NEWSAPP",
    ` ${this.location.origin}/src/pages/comment/comment.html?id=${id}`
  );
  this.location.reload();
};
const navigate_to_update_comment = async (e) => {
  console.log("this", e.target.id);
  const id = this.location.href.split("=")[1];
  console.log(id);
  this.history.pushState(
    {},
    "NEWSAPP",
    ` ${this.location.origin}/src/pages/comment/comment.html?id=${id}&newsid=${e.target.id}`
  );
  this.location.reload();
};
const delete_comment = async (e) => {
  const comment_id = e.target.id;
  const newsId = this.location.href.split("=")[1];
  try {
    const res = await fetch(
      `${base_url}news/${newsId}/comments/${comment_id}`,
      {
        method: "delete",
      }
    );
    const data = await res.json();
    console.log(data);
    this.alert("comment successfully deleted!" || error.message);
    this.location.reload();
  } catch (error) {
    console.log(error.message);
    this.alert(error.message);
  }
};
document.querySelector(".delete").addEventListener("click", delete_news);
document
  .querySelector(".comment_button")
  .addEventListener("click", navigate_to_comment);
