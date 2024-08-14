import { getPosts } from "./modules/database/posts";

const postsElement = document.getElementById("posts") as HTMLUListElement;

const posts = await getPosts();

for (const post of posts.items) {
  const postElement = document.createElement("div");
  postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <br>
        <p>Tags: ${post.tags.join(", ")}</p>
    `;
  postsElement.appendChild(postElement);
}
