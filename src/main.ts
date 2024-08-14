import "@fontsource/ubuntu";

import { getPost, getPosts } from "./modules/database/posts";
import "./style.css";

const path = window.location.pathname;

if (path != "/") (document.getElementById("main") as HTMLDivElement).setAttribute("hidden", "");

if (path == "/") {
  const postsElement = document.getElementById("posts") as HTMLUListElement;

  const posts = await getPosts();

  for (const post of posts.items) {
    const postItem = document.createElement("li");
    postItem.innerHTML = `<a href="/post/${post.id}">${post.title}</a> - ${new Date(post.created).toLocaleDateString()}`;
    postsElement.appendChild(postItem);
  }
} else if (path.startsWith("/post/")) {
  const id = path.split("/")[2].split("?")[0];

  if (id.length != 15) window.location.href = "/404";

  const post = await getPost(id);

  const postElement = document.getElementById("post") as HTMLDivElement;

  postElement.innerHTML = `
        <h2 style="margin-bottom: 0">${post.title}</h2>
        <small>Posted on ${new Date(post.created).toLocaleDateString()} | Updated on ${new Date(post.updated).toLocaleDateString()}</small>
        <br>
        ${post.body}
        <br>
        <p>Tags: ${post.tags.replaceAll(", ", ",").replaceAll(",", ", ")}</p>
    `;
  postElement.removeAttribute("hidden");

  document.title = post.title;
} else {
  (document.getElementById("404") as HTMLDivElement).removeAttribute("hidden");
  document.title = "404 Not Found";
}
