const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/";

async function http_get_news_by_id(id) {
  try {
    const res = await fetch(`${base_url}news/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
this.onload = async () => {
  const id = this.location.href.split("=")[1];
  localStorage.setItem("update", id);
  let data = await http_get_news_by_id(id);
  return (document.querySelector(
    "#show"
  ).innerHTML = `<p>AUTHOR NAME:${data?.author}</p>
   <p>TITLE:${data?.title}</p>
   <p>WEBSITE URL:${data?.url}</p>`);
};
async function update_Image() {
  const id = localStorage.getItem("update");
  // console.log(this.location.href);
  const avatar = document.querySelector(".preview_avatar").value;
  if (avatar === "") {
    this.alert("Image needed to update news");
    return;
  }
  const newObj = {};
  newObj["images"] = avatar;
  newObj["newsId"] = id;
  const call = fetch(`${base_url}news/${id}/images`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newObj),
  })
    .then((call) => call.json())
    .then(alert("success" || call.message))
    .catch((err) => err.message);
  console.log(call);
  document.querySelector(".preview_avatar").src = `${call.images}`;
  return;
}
document.querySelector(".publish").addEventListener("click", update_Image);
