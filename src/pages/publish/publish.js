const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/";
// cloudinary upload can only work with axios

// const uploadFile = async (imageData) => {
//   const data = new FormData();
//   const cloudName = "mbrag";
//   data.append("file", imageData);
//   data.append("upload_preset", "my_preset");
//   return axios
//     .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, data, {
//       onUploadProgress: (ProgressEvent) => {
//         console.log((ProgressEvent.loaded / ProgressEvent.total) * 100);
//       },
//     })
//     .then(async (res) => {
//       console.log(res.data.secure_url);
//       return res.data.secure_url;
//     })
//     .catch((error) => console.log(error.message));
// };
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
  const container = document.querySelector(".content_avatar_container");
  console.log(container);
  const div = document.createElement("div");
  div.className = "previewed_content";
  div.innerHTML = `
    <p id="${newObj.newsId}">AUTHOR NAME: ${newObj.author}</p>
      <p>TITLE:  ${newObj.title}</p>
      <p >WEBSITE URL:  ${newObj.url}</p>
  `;
  container.appendChild(div);
};
function clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("url").value = "";
}
function setLoading(bool) {
  if (bool === true) {
    // replace preview button
  }
}
const httpCreateNewsStepOne = async (e) => {
  e.preventDefault();
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
  clearFields();
  showAlert("success, upload an image to your news", "continue");
};
async function Publish() {
  try {
    const data = localStorage.getItem("news");
    const res = await fetch(`${base_url}news`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
    const news = await res.json();
    showAlert(`post successfully created for ${news.author}`, "success");
    console.log(await res.json());
  } catch (error) {
    return showAlert(error.message, "error");
  }
}
async function Cancel() {
  clearFields();
  localStorage.clear();
}
document
  .querySelector(".content_avatar_input")
  .addEventListener("change", async (e) => {
    if (localStorage.getItem("newsdata") === null) {
      return showAlert("Fill news content first.", "error");
    }
    const { name } = e.target;
    let data = {};
    data[name] = e.target.value;
    const storageData = JSON.parse(localStorage.getItem("newsdata"));
    // const container = document.querySelector(".content_avatar_inner_container");
    // const img = document.querySelector(".preview_avatar");
    // const btn = document.querySelector(".content_avatar_button");
    // img.innerHTML = `
    //     <img src="${
    //       storageData.Avatar ?? data.avatar
    //     }" alt="upload" class="preview_avatar">
    // `;
    // container.insertBefore(img, btn);
    let newObj = { ...data, ...storageData };
    localStorage.removeItem("newsdata");
    delete newObj.newsId;
    delete newObj.Avatar;
    localStorage.setItem("news", JSON.stringify(newObj));
    console.log(newObj);
  });
document
  .getElementById("content_form_container")
  .addEventListener("submit", httpCreateNewsStepOne);
