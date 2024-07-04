import {BlogPost} from "../../models/blogPost";
import {badRequest, ok, serverError} from "../helpers";
import {HttpRequest, HttpResponse, IController} from "../protocols";
import {IUpdateBlogPostRepository, UpdateBlogPostParams} from "./protocols";

export class UpdateBlogPostController implements IController {
    constructor(private readonly updateBlogPostRepository: IUpdateBlogPostRepository) {
    }

    async handle(
        httpRequest: HttpRequest<UpdateBlogPostParams>
    ): Promise<HttpResponse<BlogPost | string>> {
        try {
            const id = httpRequest?.params?.id;
            const body = httpRequest?.body;

            if (!body) {
                console.error("Bad Request: Missing fields.");
                return badRequest("Missing fields.");
            }

            if (!id) {
                console.error("Bad Request: Missing blogpost id");
                return badRequest("Missing user id");
            }

            const allowedFieldsToUpdate: (keyof UpdateBlogPostParams)[] = [
                "title",
                "author",
                "tags",
                "content"
            ];

            const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
                (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateBlogPostParams)
            );

            if (someFieldIsNotAllowedToUpdate) {
                console.error("Bad Request: Some received field is not allowed");
                console.error("Received fields:", body);
                console.error("Allowed fields:", allowedFieldsToUpdate);
                return badRequest("Some received field is not allowed");
            }

            for (const [index, field] of Object.values(body).entries()) {
                // Regex pattern with special characters
                const specialCharactersPattern = /[^\w\s]/;
                if (field.length > 255) {
                    const fieldName = Object.keys(body).at(index);
                    const errorMessage = `Bad Request: Field  ${fieldName}  exceeds the maximum character limit!`;
                    console.error(errorMessage);
                    return badRequest(errorMessage);
                }
                if (field.length == 0) {
                    const fieldName = Object.keys(body).at(index);
                    const errorMessage = `Bad Request: Field  ${fieldName}  cannot be empty!`;
                    console.error(errorMessage);
                    return badRequest(errorMessage);
                }
                if (specialCharactersPattern.test(field)) {
                    const fieldName = Object.keys(body).at(index);
                    const errorMessage = `Bad Request: Field  ${fieldName}  contains non-alphanumeric!`;
                    console.error(errorMessage);
                    return badRequest(errorMessage);
                }
            }
            const blogPost = await this.updateBlogPostRepository.updateBlogPost(id, body);

            console.log("User updated successfully:", blogPost);
            return ok<BlogPost>(blogPost);
        } catch (error) {
            console.error("Server Error:", error);
            return serverError();
        }
    }
}
