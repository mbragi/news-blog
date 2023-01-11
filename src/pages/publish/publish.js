const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/";

const showAlert = (message, className) => {
  const div = document.createElement("custom_alert");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector("#content_form_container");
  const form = document.querySelector("content_author_container");
  container.insertBefore(div, form);
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};
const previewFormData = (data) => {
  let newObj = JSON.parse(data);
  let show = "show";
  setLoading(false, "PREVIEW", "content_preview_button");
  return (document.getElementById(`${show}`).innerHTML = `
    <p id="${newObj.newsId}">AUTHOR NAME: ${newObj.author}</p>
      <p>TITLE:  ${newObj.title}</p>
      <p >WEBSITE URL:  ${newObj.url}</p>
  `);
};
function clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("url").value = "";
}
function setLoading(bool, name, className) {
  if (bool === true) {
    // replace preview button
    return (document.getElementById(`${className}`).innerHTML = `Loading...`);
  }
  return (document.getElementById(`${className}`).innerHTML = `${name}`);
}
const httpCreateNewsStepOne = async (e) => {
  e.preventDefault();
  setLoading(true, null, "content_preview_button");
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    url = document.getElementById("url").value;
  if (title === "" || author === "" || url === "") {
    return showAlert("Please fill in all fields", "error");
  }
  const get_all_news = await fetch(`${base_url}news`);
  const all_news = await get_all_news.json();
  // console.log(all_news[0].avatar);
  const data = JSON.stringify({
    title: title,
    author: author,
    url: url,
    newsId: all_news.length + 2,
    Avatar: all_news[0].avatar,
  });
  localStorage.removeItem("newsdata");
  localStorage.setItem("newsdata", data);
  const res = localStorage.getItem("newsdata");
  previewFormData(res);
  showAlert("success, upload an image to your news", "continue");
  clearFields();
};
async function Publish() {
  setLoading(true, null, "publish");

  try {
    const data = localStorage.getItem("news");
    if (data === null) {
      return showAlert("cannot publish empty news", "error");
    }
    const res = await fetch(`${base_url}news`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
    const news = await res.json();
    setLoading(false, "PUBLISH", "publish");
    showAlert(`post successfully created for ${news.author}`, "success");
    console.log(await res.json());
  } catch (error) {
    return showAlert(error.message, "error");
  }
}
async function Cancel() {
  clearFields();
  localStorage.clear();
  return (document.querySelector("#show").innerHTML = `<p>AUTHOR NAME:</p>
  <p>TITLE:</p>
  <p>WEBSITE URL:</p>`);
}
const upload = async (e) => {
  if (localStorage.getItem("newsdata") === null) {
    return showAlert("Fill news content first.", "error");
  }
  const { name } = e.target;
  let data = {};
  data[name] = e.target.value;
  const storageData = JSON.parse(localStorage.getItem("newsdata"));
  const container = document.querySelector(".content_avatar_inner_container");
  const img = document.querySelector(".preview_avatar");
  // const btn = document.querySelector(".content_avatar_button");
  img.innerHTML = `
        <img src="${
          storageData.Avatar ?? data.avatar
        }" alt="upload" class="preview_avatar">
    `;
  document.replaceChild(container, img);
  let newObj = { ...data, ...storageData };
  localStorage.removeItem("newsdata");
  delete newObj.newsId;
  delete newObj.Avatar;
  localStorage.setItem("news", JSON.stringify(newObj));
  console.log(newObj);
};

document
  .querySelector(".content_avatar_input")
  .addEventListener("change", upload);
document
  .getElementById("content_form_container")
  .addEventListener("submit", httpCreateNewsStepOne);

document.querySelector(".publish").addEventListener("click", Publish);
document.querySelector(".cancel").addEventListener("click", Cancel);
