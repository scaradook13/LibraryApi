const express = require("express");
const router = express.Router();
const libraryController = require("../controllers/libraryController");

router.post(
  "/addBook",libraryController.addBook
)

router.post(
  "/addBorrower",libraryController.addBorrower
)

router.patch(
  "/removeBook",libraryController.removeBook
)

router.patch(
  "/returnBook",libraryController.returnBook
)

router.post(
  "/addCategory",libraryController.addCetegory
)

router.get(
  "/getAllCategory",libraryController.getAllCetegory
)

router.get(
  "/getAllBook",libraryController.getAllBook
)

router.patch(
  "/updateBook",libraryController.updateBook
)

router.delete(
  "/deleteBook",libraryController.deleteBook
)
module.exports = router;
