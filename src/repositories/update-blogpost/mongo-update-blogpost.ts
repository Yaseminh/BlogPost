import { ObjectId } from "mongodb";

import {
  IUpdateBlogPostRepository,
  UpdateBlogPostParams,
} from "../../controllers/update-blogpost/protocols";
import { MongoClient } from "../../database/mongo";
import { BlogPost } from "../../models/blogPost";
import { MongoUser } from "../mongo-protocols";

export class MongoUpdateBlogPostRepository implements IUpdateBlogPostRepository {
  async updateBlogPost(id: string, params: UpdateBlogPostParams): Promise<BlogPost> {
    params.updatedDate = String(Date.now());
    await MongoClient.db.collection("blogposts").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const blogPost = await MongoClient.db
      .collection<MongoUser>("blogposts")
      .findOne({ _id: new ObjectId(id) });

    if (!blogPost) {
      throw new Error("User not updated");
    }

    const { _id, ...rest } = blogPost;

    return { id: _id.toHexString(), ...rest };
  }
}