function showSlides(avatar) {
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
async function httpGet_Images() {
  try {
    const res = await fetch();
  } catch (error) {
    console.log(error.message);
  }
}
const setPage = () => {
  // Get News by ID

  //Get Comments for News
  //Get Images by ID
  let data = httpGet_Images();
  // Show SLides
  data.map((item) => {
    console.log(item);
    return showSlides(item);
  });
};
document.addEventListener("DOMContentLoaded", setPage);
