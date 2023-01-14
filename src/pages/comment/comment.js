const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/";

const submit_comment = async (e) => {
  e.preventDefault();
  const id = this.location.href.split("=")[1];
  const avatar = document.querySelector(".avatar_input").value;
  const name = document.querySelector(".name_input").value;
  const comment = document.querySelector(".comment_input").value;
  if (avatar === "" || name === "" || comment === "") {
    this.alert("All fields required!");
    setTimeout(() => {
      this.location.reload();
    }, 1000);
    return;
  }
  const newObj = {};
  newObj["newsId"] = id;
  newObj["avatar"] = avatar;
  newObj["name"] = name;
  newObj["comment"] = comment;
  const res = await fetch(`${base_url}news/${id}/comments`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newObj),
  });
  let obj = await res.json();
  console.log(obj);
  document.querySelector(".avatar").src = `${obj.avatar}`;
  alert("comment successful");
  this.location.href = `${this.location.origin}/src/pages/view/view.html?id=${id}`;
  setTimeout(() => {
    this.location.reload();
  }, 1000);
  return;
};

document
  .querySelector(".submit_button")
  .addEventListener("click", submit_comment);
