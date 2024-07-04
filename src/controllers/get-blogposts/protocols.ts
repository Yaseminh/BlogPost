import { BlogPost } from "../../models/blogPost";

export interface IGetBlogPostRepository {
  getBlogPosts(): Promise<BlogPost[]>;
}