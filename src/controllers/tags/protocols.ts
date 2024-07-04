import {TitleAuthor} from "../../models/titleAuthor";
export interface IGetTitleAuthorRepository {
    getTitleAuthors(tags: string): Promise<TitleAuthor[]>;
}