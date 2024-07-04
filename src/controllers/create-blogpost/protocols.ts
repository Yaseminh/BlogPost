import { BlogPost } from "../../models/blogPost";

export interface CreateBlogPostParams {
  title: string;
  author: string;
  content: string;
  tags: string;
  createdDate: string;
}

export interface ICreateBlogPostRepository {
  createBlogPost(params: CreateBlogPostParams): Promise<BlogPost>;
}
