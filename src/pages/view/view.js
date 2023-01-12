const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/";

function showSlides() {
  // let array = [...arr];
  let slideIndex = 0;
  let i;
  let slides = document.getElementsByClassName("mySlides");
  console.log(slides);
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000);
}

function setSlides(avatar) {
  // const slides = document.getElementsByClassName("mySlides");
  const child = (document.querySelector(
    ".img"
  ).innerHTML = `<img src="${avatar.image}" style="width:100% ; height: 200px; display="block" class="img">`);
  console.log(child);
  return child;
  // showSlides();
}
function display_news_by_id(data) {
  console.log("image ---", data);
  const container = document.querySelector(".view_inner_container");
  const child = (document.createElement("div").className =
    "reporter_info_container");
  child.innerHTML = `<img src="${data.avatar}" alt="avatar" width="100px">
          <div class="reporter_detail">
            <h4>AUTHOR NAME: ${data.author}</h4>
            <h4>NEWS TITLE: ${data.title}</h4>
            <h4>WEBSITE URL:${data.url} </h4>
            <h4>UPDATED BY: ${data.avatar || data.author} </h4>
          </div>
          
         `;
  console.log(container, child);
  container.appendChild(child);
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
    console.log("news ---", data);
    return display_news_by_id(data);
  } catch (error) {
    console.log(error.message);
  }
}
async function http_get_comments_id(id) {
  try {
    const res = await fetch(`${base_url}news/${id}/comments`);
    const data = await res.json();
    console.log(data);
    //manipulate UI
    // return data;
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
  data.map((item) => {
    return setSlides(item);
  });
};
this.onload = () => {
  const page_id = this.location.href.split("=")[1];
  return setPage(page_id);
};
