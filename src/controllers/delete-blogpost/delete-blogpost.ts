import { BlogPost } from "../../models/blogPost";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteBlogPostRepository } from "./protocols";

export class DeleteBlogPostController implements IController {
  constructor(private readonly deleteBlogPostRepository: IDeleteBlogPostRepository) {}

  async handle(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<BlogPost | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        console.error("Bad Request: Missing blogpost id");
        return badRequest("Missing blogpost id");
      }

      const blogPost = await this.deleteBlogPostRepository.deleteBlogPost(id);

      console.log("Blogpost deleted successfully:", blogPost);
      return ok<BlogPost>(blogPost);
    } catch (error) {
      console.error("Server Error:", error);
      return serverError();
    }
  }
}
