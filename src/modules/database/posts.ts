import { RecordListOptions } from "pocketbase";
import pocketbase from ".";
import { PBPost } from "./models";

export async function getPosts(options?: RecordListOptions & { page?: number; perPage?: number }) {
  return await pocketbase.collection<PBPost>("posts").getList(options?.page ?? 0, options?.perPage ?? 500, options);
}

export async function getPost(id: string) {
  return await pocketbase.collection<PBPost>("posts").getOne(id);
}
