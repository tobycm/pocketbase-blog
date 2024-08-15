import { RecordListOptions } from "pocketbase";
import pocketbase from ".";
import Constants from "../constants";
import { PBPost } from "./models";

export async function getPosts(options?: RecordListOptions & { page?: number; perPage?: number }) {
  return await pocketbase.collection<PBPost>("posts").getList(options?.page ?? 0, options?.perPage ?? 500, options);
}

export async function getPost(id: string) {
  return await pocketbase.collection<PBPost>("posts").getOne(id);
}

const widthSizes = [128, 256, 512, 1024] as const;
function getClosestWidthSize(width: number) {
  // get one bigger than width
  for (const size of widthSizes) if (size > width) return size;
  return undefined;
}

export function processPostBody(post: PBPost, window: Window): string {
  let remainingBody = post.body;
  let processedBody = "";

  while (true) {
    const parts = remainingBody.split("#pb_image:");

    if (parts.length === 1) {
      processedBody += remainingBody;
      break;
    }

    const front = parts.shift(); // Text before the first #pb_image tag
    processedBody += front;

    const image = parts.shift();
    if (!image) throw new Error("Post body contains malformed #pb_image tag");

    console.log("image", image);

    const [filename, size, rest] = image.split(":");

    if (!filename || !size) throw new Error(`Post body contains malformed #pb_image tag: ${image}`);

    const imageWidth = getClosestWidthSize(window.innerWidth * (parseInt(size) / 100));
    let imageUrl = `${Constants.POCKETBASE_URL}/api/files/${post.collectionId}/${post.id}/${filename}`;
    if (imageWidth) imageUrl += `?thumb=${imageWidth}x0`;

    const imageElement = `<img src="${imageUrl}" width="${imageWidth}">`;

    processedBody += imageElement;
    remainingBody = [rest, ...parts].join("#pb_image:");
  }

  return processedBody;
}
