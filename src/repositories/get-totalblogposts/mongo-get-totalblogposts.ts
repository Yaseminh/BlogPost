import {MongoClient} from "../../database/mongo";
import {MongoUser} from "../mongo-protocols";
import {IGetTotalBlogPostRepository} from "../../controllers/get-total-blogpost/protocols";
import {TotalNumberByAuthor} from "../../models/totalNumberByAuthor";
import {TitleAuthor} from "../../models/titleAuthor";

export class MongoGetTotalBlogPostsRepository implements IGetTotalBlogPostRepository {
    async getTotalBlogPosts(author : string): Promise<TotalNumberByAuthor> {
        const blogPosts = await MongoClient.db
            .collection<MongoUser>("blogposts")
            .find({"author":author})
            .toArray();
        return { totalNumber : blogPosts.length , author:author };
    }

  async  getAuthor(author: string): Promise<Boolean> {
        const authorExists = await MongoClient.db
            .collection<MongoUser>("blogposts")
            .findOne({ "author": author });
        return authorExists !== null;
    }

}