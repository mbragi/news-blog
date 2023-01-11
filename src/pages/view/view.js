const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/";

function showSlides() {
  // let array = [...arr];
  let slideIndex = 0;
  let i;
  let slides = document.getElementsByClassName("mySlides");
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
  console.log(avatar.image);
  document.querySelector(
    ".img"
  ).innerHTML = `  <img src="${avatar.image}" style="width:100% ; height: 200px;" class="img">`;
  showSlides();
}

async function httpGet_Images(id) {
  try {
    const res = await fetch(`${base_url}news/${4}/images`);
    const data = await res.json();
    console.log("image ---", data);
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
const setPage = async () => {
  const ID = 4 ?? localStorage.getItem("viewID");
  // Get News by ID
  // http_get_news_by_id(JSON.parse(ID));
  //Get Comments for News
  // get_comments_id(JSON.parse(ID));
  //Get Images by ID
  let data = await httpGet_Images(JSON.parse(ID));
  // Show SLides
  data.map((item) => {
    return setSlides(item);
  });
};
document.addEventListener("DOMContentLoaded", setPage);
