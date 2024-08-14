import { RecordModel } from "pocketbase";

export interface Post {
  title: string;
  body: string;

  tags: string; // Comma-separated list of tags
}

export type PBPost = Post & RecordModel;
