import { BlogPost } from "../../models/blogPost";

export interface UpdateBlogPostParams {
  title?: string;
  author?: string;
  tags?: string;
  content?: string;
  updatedDate:string;
}

export interface IUpdateBlogPostRepository {
  updateBlogPost(id: string, params: UpdateBlogPostParams): Promise<BlogPost>;
}