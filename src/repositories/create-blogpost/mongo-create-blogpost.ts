import {
    CreateBlogPostParams,
    ICreateBlogPostRepository,
  } from "../../controllers/create-blogpost/protocols";
  import { MongoClient } from "../../database/mongo";
  import { BlogPost } from "../../models/blogPost";
  import { MongoUser } from "../mongo-protocols";
  
  export class MongoCreateBlogPostRepository implements ICreateBlogPostRepository {
    async createBlogPost(params: CreateBlogPostParams): Promise<BlogPost> {
      params.createdDate = String(Date.now());
      const { insertedId } = await MongoClient.db
        .collection("blogposts")
        .insertOne(params);
  
      const blogPost = await MongoClient.db
        .collection<MongoUser>("blogposts")
        .findOne({ _id: insertedId });
  
      if (!blogPost) {
        throw new Error("blogpost not created");
      }
  
      const { _id, ...rest } = blogPost;
  
      return { id: _id.toHexString(), ...rest };
    }
  }