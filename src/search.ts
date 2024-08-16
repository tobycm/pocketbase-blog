import { posts } from "./main";
import { renderPosts, tokenizer } from "./modules/utils";

export function search(input: string): string {
  // return input
  if (input === "") {
    renderPosts(posts.items);
    return "";
  }

  const searchTokens = tokenizer(input);

  const filteredPosts = posts.items.filter((post) => {
    // const postTokens = tokenizer(post.title.toLowerCase(), post.tags.toLowerCase());
    const postTokens = `${post.title.toLowerCase()} ${post.tags.toLowerCase()}`;

    return searchTokens.every((token) => postTokens.includes(token));
  });

  renderPosts(filteredPosts);

  return input;
}

(document.getElementById("search") as HTMLInputElement).addEventListener("input", (event) => {
  const input = search((event.target as HTMLInputElement).value.toLowerCase());

  const url = new URL(window.location.href);
  url.searchParams.set("q", input);
  window.history.pushState(null, "", url.toString());
});
