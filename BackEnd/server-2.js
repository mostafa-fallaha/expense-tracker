const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

// const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post("/save_expense", (req, res) => {
  const expenseData = req.body;

  let expenses = [];

  try {
    const data = fs.readFileSync(
      "C:\\Users\\MYCOM\\Documents\\your_expenses\\expenses.json",
      "utf8"
    );
    expenses = JSON.parse(data);
  } catch (err) {
    console.error(err);
  }

  // add the new expense
  expenses.push(expenseData);

  // Write updated data back to JSON file
  fs.writeFile(
    "C:\\Users\\MYCOM\\Documents\\your_expenses\\expenses.json",
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).json({ message: "Error saving expense" });
      } else {
        res.json({ message: "Expense saved successfully" });
      }
    }
  );
});

app.get("/expenses", (req, res) => {
  try {
    const data = fs.readFileSync("expenses.json", "utf8");
    const expenses = JSON.parse(data);
    res.json(expenses);
  } catch (err) {
    console.error("Error reading file:", err);
    res.status(500).json({ message: "Error fetching expenses" });
  }
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
