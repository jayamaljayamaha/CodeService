import {
  Authentication,
  AuthModeratorPermissions,
  CheckAuth,
} from "@randomn/drescode-common";
import express from "express";
import {
  addNewCodes,
  getAllCodes,
  searchCodes,
} from "../Controllers/CodesController";

const router = express.Router();

router.get("/", getAllCodes);
router.post(
  "/",
  Authentication,
  CheckAuth,
  AuthModeratorPermissions,
  addNewCodes
);
router.get("/search", searchCodes);

export default router;
