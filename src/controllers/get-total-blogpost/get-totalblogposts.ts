import { BlogPost } from "../../models/blogPost";
import {badRequest, ok, serverError} from "../helpers";
import {HttpRequest, HttpResponse, IController} from "../protocols";
import { IGetTotalBlogPostRepository} from "./protocols";
import {UpdateBlogPostParams} from "../update-blogpost/protocols";

export class GetTotalBlogPostsController implements IController {
    constructor(private readonly getBlogPostsRepository: IGetTotalBlogPostRepository) {}

    async handle(
        httpRequest: HttpRequest<UpdateBlogPostParams>
        ): Promise<HttpResponse<BlogPost | string>> {
        try {
            const author = httpRequest?.params?.author;
            const isAuthorExist = await this.getBlogPostsRepository.getAuthor(author);
            if(!isAuthorExist){
                console.error("Bad Request: Missing fields.");
                return badRequest("Missing fields.");
            }
            const blogPosts = await this.getBlogPostsRepository.getTotalBlogPosts(author);
             return ok<BlogPost>(blogPosts);
        } catch (error) {
            return serverError();
        }
    }
}