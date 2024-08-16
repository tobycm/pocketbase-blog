import { RecordListOptions } from "pocketbase";
import pocketbase from ".";
import { PBPost } from "./models";

export async function getPosts(options?: RecordListOptions & { page?: number; perPage?: number }) {
  return await pocketbase.collection<PBPost>("posts").getList(options?.page ?? 0, options?.perPage ?? 500, options);
}

export async function getPost(id: string) {
  return await pocketbase.collection<PBPost>("posts").getOne(id);
}

const widthSizes = [128, 256, 512, 1024] as const;
function srcset(post: PBPost, filename: string) {
  return widthSizes.map((size) => `${pocketbase.getFileUrl(post, filename, { thumb: `${size}x0` })} ${size}w`).join(", ");
}

function img(post: PBPost, filename: string, size: number) {
  return `<img srcset="${srcset(post, filename)}" sizes="${size}vw" src="${pocketbase.getFileUrl(post, filename)}" style="width: ${size}vw">`;
}

export function onImageClick(event: MouseEvent) {
  const target = event.target as HTMLImageElement;

  console.log("target", target);

  const overlay = document.getElementById("overlay") as HTMLDivElement;

  overlay.innerHTML = `<img src="${target.src}" style="max-width: 100%; max-height: 100%">`;

  overlay.removeAttribute("hidden");
}

export function processPostBody(post: PBPost): string {
  let remainingBody = post.body;
  let processedBody = "";

  while (true) {
    const parts = remainingBody.split("#pb_image:");

    if (parts.length === 1) {
      processedBody += remainingBody;
      break;
    }

    processedBody += parts.shift();

    const image = parts.shift();
    if (!image) throw new Error("Post body contains malformed #pb_image tag");

    // console.log("image", image);

    const [filename, size, rest] = image.split(":");

    if (!filename || !size) throw new Error(`Post body contains malformed #pb_image tag: ${image}`);
    if (!post.images.includes(filename)) throw new Error(`Post body contains image not in images: ${filename}`);

    processedBody += img(post, filename, parseInt(size));
    remainingBody = [rest, ...parts].join("#pb_image:");
  }

  return processedBody;
}
