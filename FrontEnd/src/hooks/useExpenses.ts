import axios from "axios";
import { useEffect, useState } from "react";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const selectedExpense =
    selectedCategory === ""
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  useEffect(() => {
    axios
      .get("http://localhost:8080/expenses")
      .then((res) => {
        setExpenses(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return { expenses, selectedExpense, setExpenses, setSelectedCategory };
};

export default useExpenses;
