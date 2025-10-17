const libraryServices = require('../services/libraryServices');
const asyncTryCatch = require('../utils/asyncTryAndCatch');

class libraryController {

  addBook = asyncTryCatch(async (req, res) => {
    const response = await libraryServices.addBook(req.body);
    res.status(200).json(response);
  });

  addBorrower = asyncTryCatch(async (req, res) => {
    const response = await libraryServices.addBorrower(req.body);
    res.status(200).json(response);
  });
  
  removeBook = asyncTryCatch(async (req, res) => {
    const response = await libraryServices.removeBook(req.body);
    res.status(200).json(response);
  });

  returnBook = asyncTryCatch(async (req, res) => {
    const response = await libraryServices.returnBook(req.body);
    res.status(200).json(response);
  });

  addCetegory = asyncTryCatch(async (req, res) => {
    const response = await libraryServices.addCategory(req.body);
    res.status(200).json(response);
  });

  getAllCetegory = asyncTryCatch(async (req, res) => {
    const response = await libraryServices.getAllCategory();
    res.status(200).json(response);
  });

  getAllBook = asyncTryCatch(async (req, res) => {
    const response = await libraryServices.getAllBook();
    res.status(200).json(response);
  });

  updateBook = asyncTryCatch(async (req, res) => {
    const response = await libraryServices.updateBook(req.body);
    res.status(200).json(response);
  });

  deleteBook = asyncTryCatch(async (req, res) => {
    const response = await libraryServices.deleteBook(req.body);
    res.status(200).json(response);
  });
  
}

module.exports = new libraryController();