import "@fontsource/ubuntu";

import { ListResult } from "pocketbase";
import { PBPost } from "./modules/database/models";
import { getPost, getPosts, onImageClick, processPostBody } from "./modules/database/posts";
import { loading, renderPosts } from "./modules/utils";
import { search } from "./search";
import "./style.css";

const url = new URL(window.location.href);

if (url.pathname != "/") (document.getElementById("main") as HTMLDivElement).setAttribute("hidden", "");

export let posts: ListResult<PBPost>;

if (url.pathname == "/") {
  const postsElement = document.getElementById("posts") as HTMLUListElement;
  const loadingElement = document.createElement("p");
  loadingElement.textContent = "Loading";
  const interval = loading(loadingElement, 200);
  postsElement.appendChild(loadingElement);

  getPosts({ sort: "-created", fields: "id,title,created,tags" }).then((p) => {
    posts = p;
    clearInterval(interval);
    loadingElement.remove();
    renderPosts(p.items);

    if (url.searchParams.has("q")) {
      const searchElement = document.getElementById("search") as HTMLInputElement;
      searchElement.value = url.searchParams.get("q")!;
      search(searchElement.value);
    }
  });
} else if (url.pathname.startsWith("/post/")) {
  const id = url.pathname.split("/")[2].split("?")[0];

  if (id.length != 15) window.location.href = "/404";

  const postElement = document.getElementById("post") as HTMLDivElement;
  const loadingElement = document.createElement("p");
  loadingElement.textContent = "Loading";
  const interval = loading(loadingElement, 200);
  postElement.appendChild(loadingElement);

  getPost(id).then((post) => {
    clearInterval(interval);
    loadingElement.remove();

    postElement.innerHTML = `
        <h2 style="margin-bottom: 0">${post.title}</h2>
        <small>Posted on ${new Date(post.created).toLocaleDateString()} | Updated on ${new Date(post.updated).toLocaleDateString()}</small>
        <br>
        ${processPostBody(post)}
        <br>
        <p>Tags: ${post.tags.replaceAll(", ", ",").replaceAll(",", ", ") || "<i><small>No tags</small></i>"}</p>
    `;
    postElement.removeAttribute("hidden");

    document.title = post.title;

    postElement.querySelectorAll("img").forEach((img) => img.addEventListener("click", onImageClick));
  });
} else {
  (document.getElementById("404") as HTMLDivElement).removeAttribute("hidden");
  document.title = "404 Not Found";
}
