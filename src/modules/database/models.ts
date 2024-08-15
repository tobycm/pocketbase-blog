import { RecordModel } from "pocketbase";

type PBImage = string;
type CommasSeparatedList = string;

export interface Post {
  title: string;
  body: string;
  images: PBImage[]; // Array of PBImage

  tags: CommasSeparatedList; // Comma-separated list of tags
}

// special thing about Post
// body has these #pb_image tag
// format is #pb_image:<filename>:<size>:
// remember it ends with colon
// file name is PBImage
// size is percent of screen width

export type PBPost = Post & RecordModel;
