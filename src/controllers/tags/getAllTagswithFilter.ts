import { BlogPost } from "../../models/blogPost";
import {badRequest, ok, serverError} from "../helpers";
import {HttpRequest, HttpResponse, IController} from "../protocols";
import {IGetTitleAuthorRepository } from "./protocols";
import {UpdateBlogPostParams} from "../update-blogpost/protocols";
import {TitleAuthor} from "../../models/titleAuthor";

export class GetTitleAuthorController implements IController {
    constructor(private readonly getTitleAuthorRepository: IGetTitleAuthorRepository) {}

    async handle(httpRequest: HttpRequest<{ tags: string  }>): Promise<HttpResponse<TitleAuthor[] | string>> {
        try {
            const { tags } = httpRequest.params;
            if (!tags || tags.length === 0) {
                console.error("Bad Request: Missing fields.");
                return badRequest("Missing fields.");
            }
            const blogPosts = await this.getTitleAuthorRepository.getTitleAuthors(tags);
            if(!blogPosts){
                console.error("Bad Request: Missing fields.");
                return badRequest("Missing fields.");
            }

            return ok<TitleAuthor[]>(blogPosts);
        } catch (error) {
            return serverError();
        }

    }
}