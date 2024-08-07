import express from "express";
import { check } from "express-validator";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controller/postController.js";
import postValidation from "../middlewares/postValidation.js";

const router = express.Router();

router.get("/get", getPosts);
router.get("/getById:id", getPostById);
router.post(
  "/create",
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("body").notEmpty().withMessage("Body is required"),
    check("published_date")
      .isDate()
      .withMessage("Published date is required and should be a date"),
    check("status")
      .isIn(["published", "unpublished"])
      .withMessage("Status should be published or unpublished"),
  ],
  postValidation,
  createPost
);
router.put(
  "/update:id",
  [
    check("title").optional().notEmpty().withMessage("Title cannot be empty"),
    check("body").optional().notEmpty().withMessage("Body cannot be empty"),
    check("published_date")
      .optional()
      .isDate()
      .withMessage("Published date should be a date"),
    check("status")
      .optional()
      .isIn(["published", "unpublished"])
      .withMessage("Status should be published or unpublished"),
  ],
  postValidation,
  updatePost
);
router.delete("/delete:id", deletePost);

export default router;
