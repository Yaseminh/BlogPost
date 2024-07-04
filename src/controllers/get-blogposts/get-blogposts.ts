import { BlogPost } from "../../models/blogPost";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetBlogPostRepository } from "./protocols";

export class GetBlogPostsController implements IController {
  constructor(private readonly getBlogPostsRepository: IGetBlogPostRepository) {}

  async handle(): Promise<HttpResponse<BlogPost[] | string>> {
    try {
      const blogPosts = await this.getBlogPostsRepository.getBlogPosts();

      return ok<BlogPost[]>(blogPosts);
    } catch (error) {
      return serverError();
    }
  }
}