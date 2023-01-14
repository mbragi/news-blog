document.querySelector(".send").addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.querySelector(".name");
  const feedBack = document.querySelector(".feedback");

  let newObj = {};
  newObj["Name"] = name;
  newObj["feedback"] = feedBack;
  const res = await fetch(`https://news-bits.herokuapp.com/feedback`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newObj),
  });
  const response = await res.json();
  if (response.status === "failed") {
    alert(response.message);
    console.log(response.message);
  } else {
    alert(response.message);
    console.log(response);
  }
  try {
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
});
