document.querySelector(".send").addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector(".name");
  const feedBack = document.querySelector(".feedback");

  let newObj = {};
  newObj["name"] = name;
  newObj["feedback"] = feedBack;
  try {
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
});
