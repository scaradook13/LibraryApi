const mongoose = require("mongoose");

function getDateValue() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

const transactionSchema = new mongoose.Schema({
  borrowerId: {
    type: String,
    required: true,
  },
  borrowerName: {
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
  },
  dateBorrowed: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  dateReturned: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["Borrowed", "Returned", "Overdue"],
    default: "Borrowed",
  },
  createdAt: {
    type: String,
    default: getDateValue,
  },
  updatedAt: {
    type: String,
    default: getDateValue,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
