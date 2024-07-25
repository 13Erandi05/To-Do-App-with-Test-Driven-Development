import { Router } from "express";
import { TodoController } from "../controller/TodoController";

const router = Router();

router.get("/", TodoController.getAll);
router.get("/:id", TodoController.getOne);
router.post("/", TodoController.create);
router.put("/:id", TodoController.update);
router.delete("/:id", TodoController.delete);

export default router;
