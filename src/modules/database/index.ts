import PocketBase from "pocketbase";
import Constants from "../constants";

const pocketbase = new PocketBase(Constants.POCKETBASE_URL);

export default pocketbase;
