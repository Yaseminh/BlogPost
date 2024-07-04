import { Router, Request, Response } from "express";
import { GetBlogPostsController } from "../controllers/get-blogposts/get-blogposts";
import { MongoGetBlogPostsRepository } from "../repositories/get-blogposts/mongo-get-blogposts";
import { MongoCreateBlogPostRepository } from "../repositories/create-blogpost/mongo-create-blogpost";
import { CreateBlogPostController } from "../controllers/create-blogpost/create-blogpost";
import { MongoUpdateBlogPostRepository } from "../repositories/update-blogpost/mongo-update-blogpost";
import { UpdateBlogPostController } from "../controllers/update-blogpost/update-blogpost";
import { MongoDeleteBlogPostRepository } from "../repositories/delete-blogpost/mongo-delete-blogpost";
import { DeleteBlogPostController } from "../controllers/delete-blogpost/delete-blogpost";
import {MongoGetTotalBlogPostsRepository} from "../repositories/get-totalblogposts/mongo-get-totalblogposts";
import {GetTotalBlogPostsController} from "../controllers/get-total-blogpost/get-totalblogposts";
import {GetTitleAuthorController} from "../controllers/tags/getAllTagswithFilter";
import {MongoGetBlogTitleandAuthorRepository} from "../repositories/get-titleauthor/mongo-get-titleandauthor";

const router = Router();

router.get("/", (request: Request, response: Response) => {
    return response.json({ mensagem: "Bem vindo!" });
  });

router.get("/totalblogposts/:author", async (req: Request, res: Response) => {
    const mongoGetBlogPostsRepository = new MongoGetTotalBlogPostsRepository();

    const getBlogPostsController = new GetTotalBlogPostsController(mongoGetBlogPostsRepository);

    const { body, statusCode } = await getBlogPostsController.handle({
        params: req.params,
    });

    res.status(statusCode).send(body);
});
router.get("/blogposts", async (req: Request, res: Response) => {
    const mongoGetBlogPostsRepository = new MongoGetBlogPostsRepository();

    const getBlogPostsController = new GetBlogPostsController(mongoGetBlogPostsRepository);

    const { body, statusCode } = await getBlogPostsController.handle();

    res.status(statusCode).send(body);
});

router.post("/blogposts", async (req: Request, res: Response) => {
    const mongoCreateBlogPostRepository = new MongoCreateBlogPostRepository();

    const createBlogPostController = new CreateBlogPostController(
        mongoCreateBlogPostRepository
    );

    const { body, statusCode } = await createBlogPostController.handle({
        body: req.body,
    });

    res.status(statusCode).send(body);
});

router.get("/alltagwithquery", async (req: Request, res: Response) => {
    const mongoGetBlogTitleandAuthorRepository = new MongoGetBlogTitleandAuthorRepository();
    const gettitleAuthorController = new GetTitleAuthorController(mongoGetBlogTitleandAuthorRepository);

    const tagsQuery = req.query.tags;
    const tags: string = typeof tagsQuery === 'string' ? tagsQuery : '';

    const { body, statusCode } = await gettitleAuthorController.handle({
        params: { tags }
    });

    res.status(statusCode).send(body);
});

router.patch("/blogposts/:id", async (req: Request, res: Response) => {
    const mongoUpdateBlogPostRepository = new MongoUpdateBlogPostRepository();

    const updateBlogPostController = new UpdateBlogPostController(
        mongoUpdateBlogPostRepository
    );

    const { body, statusCode } = await updateBlogPostController.handle({
        body: req.body,
        params: req.params,
    });

    res.status(statusCode).send(body);
});

router.delete("/blogposts/:id", async (req: Request, res: Response) => {
    const mongoDeleteBlogPostRepository = new MongoDeleteBlogPostRepository();

    const deleteBlogPostController = new DeleteBlogPostController(
        mongoDeleteBlogPostRepository
    );

    const { body, statusCode } = await deleteBlogPostController.handle({
        params: req.params,
    });

    res.status(statusCode).send(body);
});

export { router };
