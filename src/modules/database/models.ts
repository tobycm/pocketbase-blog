import { RecordModel } from "pocketbase";

export interface Post {
  title: string;
  body: string;

  tags: string[];
}

export type PBPost = Post & RecordModel;
