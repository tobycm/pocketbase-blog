import { PBPost } from "./database/models";

export function tokenizer(...input: string[]): string[] {
  return input.join(" ").split(" ");
}

export function renderPosts(posts: PBPost[]) {
  const postsElement = document.getElementById("posts") as HTMLUListElement;

  postsElement.innerHTML = "";

  posts.forEach((post) => {
    const postItem = document.createElement("li");
    postItem.innerHTML = `<a href="/post/${post.id}">${post.title}</a> - ${new Date(post.created).toLocaleDateString()}`;
    postsElement.appendChild(postItem);
  });
}
