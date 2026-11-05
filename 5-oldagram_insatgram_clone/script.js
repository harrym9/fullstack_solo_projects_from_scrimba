const posts = [
  {
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatar: "images/avatar-vangogh.jpg",
    post: "images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    liked: true,
    likes: 21,
  },
  {
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatar: "images/avatar-courbet.jpg",
    post: "images/post-courbet.jpg",
    comment: "i'm feelin a bit stressed tbh",
    liked: false,
    likes: 4,
  },
  {
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatar: "images/avatar-ducreux.jpg",
    post: "images/post-ducreux.jpg",
    comment:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    liked: true,
    likes: 152,
  },
];

const mainEl = document.getElementById("main");

document.addEventListener("dblclick", function (e) {
  if (e.target.classList.contains("post")) {
    const post = posts[e.target.dataset.index];
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    render();
  }
});

function render() {
  let mainContentHtml = "";
  for (let i = 0; i < posts.length; i++) {
    mainContentHtml += `<div class="post-header">
        <img
          src="${posts[i].avatar}"
          alt="Avatar of ${posts[i].name}"
          class="avatar"
        />

        <div class="user-data">
          <h1 class="name">${posts[i].name}</h1>
          <p class="place">${posts[i].location}</p>
        </div>
      </div>

      <img class="post" data-index="${i}" src="${posts[i].post}" alt="post of ${posts[i].name}" />
      <div class="footer">
        <div>
          <img class="icons heart ${posts[i].liked ? "liked" : " "}" src="images/icon-heart.png" alt="like" />
          <img class="icons comment" src="images/icon-comment.png" alt="comment" />
          <img
            class="icons dm"
            src="images/icon-dm.png"
            alt="direct message aka dm"
          />
        </div>

        <p class="likes">${posts[i].likes} likes</p>
        <p class="comments">
          <span class="cmt-username">${posts[i].username}</span>${posts[i].comment}</p>
      </div>`;
  }

  mainEl.innerHTML = mainContentHtml;
}
render();
