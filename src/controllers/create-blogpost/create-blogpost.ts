import {BlogPost} from "../../models/blogPost";
import {badRequest, created, serverError} from "../helpers";
import {HttpRequest, HttpResponse, IController} from "../protocols";
import {CreateBlogPostParams, ICreateBlogPostRepository} from "./protocols";

export class CreateBlogPostController implements IController {
    constructor(private readonly createBlogPostRepository: ICreateBlogPostRepository) {
    }

    async handle(
        httpRequest: HttpRequest<CreateBlogPostParams>
    ): Promise<HttpResponse<BlogPost | string>> {
        try {
            const requiredFields = ["title", "author", "content", "tags"];

            for (const [index, field] of requiredFields.entries()) {
                const specialCharactersPattern = /[^\w\s]/;
                if (!httpRequest?.body?.[field as keyof CreateBlogPostParams]?.length) {
                    const errorMessage = `Bad Request: Field ${field} is required`;
                    console.error(errorMessage);
                    return badRequest(errorMessage);
                } else if (httpRequest?.body?.[field as keyof CreateBlogPostParams]?.length && Object.values(httpRequest?.body).at(index).length > 255) {
                    const errorMessage = `Bad Request: Field  ${field}  exceeds the maximum character limit!`;
                    console.error(errorMessage);
                    return badRequest(errorMessage);
                } else if (httpRequest?.body?.[field as keyof CreateBlogPostParams]?.length && specialCharactersPattern.test(Object.values(httpRequest?.body).at(index))) {
                    const fieldName = Object.keys(httpRequest?.body).at(index);
                    const errorMessage = `Bad Request: Field  ${fieldName}  contains non-alphanumeric!`;
                    console.error(errorMessage);
                    return badRequest(errorMessage);
                }
            }

            const blogPost = await this.createBlogPostRepository.createBlogPost(
                httpRequest.body!
            );

            console.log("Blogpost created successfully:", blogPost);
            return created<BlogPost>(blogPost);
        } catch (error) {
            const errorMessage = "Server Error:";
            console.error(errorMessage, error);
            return serverError();
        }
    }
}
