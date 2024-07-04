import { IGetBlogPostRepository } from "../../controllers/get-blogposts/protocols";
import { MongoClient } from "../../database/mongo";
import { BlogPost } from "../../models/blogPost";
import { MongoUser } from "../mongo-protocols";
import {TitleAuthor} from "../../models/titleAuthor";
import {IGetTitleAuthorRepository} from "../../controllers/tags/protocols";

export class MongoGetBlogTitleandAuthorRepository implements IGetTitleAuthorRepository {
    async getTitleAuthors(tags: string): Promise<TitleAuthor[]> {

        const tagsArray = tags.split(',').map(tag => tag.trim());

        const query = { tags: { $in: tagsArray } };

        const blogPosts = await MongoClient.db
            .collection<MongoUser>("blogposts")
            .find(query).toArray();

        const titleAuthors: TitleAuthor[] = blogPosts.map((post: { title: string; author: string }) => ({
            title: post.title,
            author: post.author
        }));

        return titleAuthors;
    }
}