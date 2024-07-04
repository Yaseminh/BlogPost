import { IGetBlogPostRepository } from "../../controllers/get-blogposts/protocols";
import { MongoClient } from "../../database/mongo";
import { BlogPost } from "../../models/blogPost";
import { MongoUser } from "../mongo-protocols";

export class MongoGetBlogPostsRepository implements IGetBlogPostRepository {
  async getBlogPosts(): Promise<BlogPost[]> {
    const blogPosts = await MongoClient.db
      .collection<MongoUser>("blogposts")
      .find({})
      .toArray();

    return blogPosts.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}