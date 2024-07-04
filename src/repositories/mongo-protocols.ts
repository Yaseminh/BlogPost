import { BlogPost } from "../models/blogPost";

export type MongoUser = Omit<BlogPost, "id">;