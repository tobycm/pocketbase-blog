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

export function loading(element: HTMLElement, interval: number = 1000, length: number = 3): ReturnType<typeof setInterval> {
  let i = 0;

  return setInterval(() => {
    element.textContent += ".";
    i++;
    if (i > length) {
      element.textContent = element.textContent!.slice(0, -length);
      i = 0;
    }
  }, interval);
}
