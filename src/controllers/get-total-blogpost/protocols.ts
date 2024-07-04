import {TotalNumberByAuthor} from "../../models/totalNumberByAuthor";
export interface IGetTotalBlogPostRepository {
    getTotalBlogPosts(author: string): Promise<TotalNumberByAuthor>;
    getAuthor(author: string): Promise<Boolean>;
}