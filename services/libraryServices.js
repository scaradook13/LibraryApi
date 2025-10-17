const Borrower = require("../models/Borrower.Model");
const Book = require("../models/Book.Model");
const History = require("../models/History.Model");
const Category = require("../models/Category.Model");

class libraryServices {
  async addBook(payload) {
    const newBook = new Book({
      bookTitle: payload.bookTitle,
      author: payload.author,
      subject: payload.subject,
      year: payload.year,
      quantity: payload.quantity,
    });
    await newBook.save();
    return newBook;
  }

  async addBorrower(payload) {
    const newBorrower = new Borrower({
      borrowerName: payload.borrowerName,
      date: payload.date,
      dueDate: payload.dueDate,
      bookBorrowed: payload.bookBorrowed,
      contact: payload.contact,
    });
    await newBorrower.save();

    const book = await Book.findOne({ bookTitle: payload.bookBorrowed });
    if (book) {
      book.quantity = String(Number(book.quantity) - 1);
      await book.save();
    }

    return newBorrower;
  }

  async removeBook(payload) {

    const book = await Book.findOne({
    bookTitle: payload.bookTitle,
    author: payload.author,
    year: payload.year,
  });

  if (!book) {
    throw new Error("Book not found");
  }

  // Convert both to numbers for safe subtraction
  const currentQty = Number(book.quantity);
  const removeQty = Number(payload.quantity);

  if (isNaN(removeQty) || removeQty <= 0) {
    throw new Error("Invalid quantity entered");
  }

  if (currentQty < removeQty) {
    throw new Error("Not enough stock to remove");
  }

  // Subtract and update
  book.quantity = String(currentQty - removeQty);
  await book.save(); // ✅ persist the updated quantity

  return book; // optional: return updated book
}

 async returnBook(payload) {
  // 1. Find borrower
  const borrower = await Borrower.findOne({ borrowerName: payload.borrowerName });
  if (!borrower) {
    throw new Error("Borrower not found");
  }

  // 2. Check if the book exists in the Book collection
  const book = await Book.findOne({
    bookTitle: borrower.bookBorrowed,
  });

  // 3. If book exists, increase its quantity
  if (book) {
    const currentQty = Number(book.quantity);
    book.quantity = String(currentQty + 1);
    await book.save();

    await History.create({
    borrowerName: borrower.borrowerName,
    bookTitle: borrower.bookBorrowed,
    author: payload.author || "Unknown Author",
    subject: payload.subject || "Unknown Subject",
    year: payload.year || "Unknown Year",
    quantity: payload.quantity,
    borrowedDate: borrower.date,
    returnDate: payload.returnDate,
    });
  } else {
    // If book doesn't exist (maybe deleted), recreate it with quantity = 1
    await Book.create({
      bookTitle: borrower.bookBorrowed,
      author: payload.author || "Unknown Author",
      year: payload.year || "Unknown Year",
      subject: payload.subject || "Unknown Subject",
      quantity: 1,
    });
  }

  // 4. Remove the borrower record after successful return
  await Borrower.deleteOne({ _id: borrower._id });

  return {
    message: `Book "${borrower.bookBorrowed}" returned successfully by ${borrower.borrowerName}.`,
  };
}

async addCategory(payload) {
    const newCategory = new Category({
      category: payload.category,
    });
    await newCategory.save();
    return newCategory;
  }

  async getAllCategory() {
    const categories = await Category.find();
    return await categories;
  }

  async getAllBook() {
    const book = await Book.find();
    return await book;
  }

  async updateBook(payload) {
  const updatedBook = await Book.findOneAndUpdate(
    { _id: payload.id },
    {
      bookTitle: payload.bookTitle,
      author: payload.author,
      subject: payload.subject,
      year: payload.year,
      quantity: payload.quantity,
    },
    {
      new: true,           
      runValidators: true, 
    }
  );

  if (!updatedBook) {
    throw new Error("Book not found");
  }

  return updatedBook;
}

async deleteBook(payload) {
  const deletedBook = await Book.findOneAndDelete({ _id: payload.id });

  if (!deletedBook) {
    throw new Error("Book not found");
  }

  return {
    message: `Book "${deletedBook.bookTitle}" has been deleted successfully.`,
    deletedBook,
  };
}

}
module.exports = new libraryServices();
