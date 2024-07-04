import { BlogPost } from "../../models/blogPost";

export interface IDeleteBlogPostRepository {
  deleteBlogPost(id: string): Promise<BlogPost>;
}