import { ObjectId } from "mongodb";

import { IDeleteBlogPostRepository } from "../../controllers/delete-blogpost/protocols";
import { MongoClient } from "../../database/mongo";
import { BlogPost } from "../../models/blogPost";
import { MongoUser } from "../mongo-protocols";

export class MongoDeleteBlogPostRepository implements IDeleteBlogPostRepository {
  async deleteBlogPost(id: string): Promise<BlogPost> {
    const blogPost = await MongoClient.db
      .collection<MongoUser>("blogposts")
      .findOne({ _id: new ObjectId(id) });

    if (!blogPost) {
      throw new Error("blogpost not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("blogposts")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("blogpost not deleted");
    }

    const { _id, ...rest } = blogPost;

    return { id: _id.toHexString(), ...rest };
  }
}