//     this.title = title;
//     this.avatar = avatar;
//     this.author = author;
//     this.url = url;

document
  .getElementById("content_form_container")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value,
      author = document.getElementById("author").value,
      url = document.getElementById("url").value;
    console.log(title, author, url);
    0;
  });
