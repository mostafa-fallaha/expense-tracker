import axios from "axios";
import useExpenses from "../hooks/useExpenses";
import ExpenseForm from "./ExpenseForm";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseList from "./ExpenseList";

function ContainerAll() {
  const { expenses, selectedExpense, setExpenses, setSelectedCategory } =
    useExpenses();

  const deleteExpense = (id: number) => {
    const original = [...expenses];
    axios
      .delete("http://localhost:8080/expenses/" + id)
      .then(() => setExpenses(expenses.filter((u) => u.id !== id)))
      .catch((err) => {
        console.log(err.message);
        setExpenses(original);
      });
  };

  const addExpense = (entity: any) => {
    axios
      .post("http://localhost:8080/expenses", entity)
      .then((res) => {
        console.log([...expenses, res.data]);
        setExpenses([...expenses, res.data]);
      })
      .catch((err) => {
        console.log(err.message);
        setExpenses(expenses);
      });
  };

  return (
    <>
      <div className="mb-5">
        <ExpenseForm onSubmit={(entity) => addExpense(entity)} />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectedCategory={(category) => setSelectedCategory(category)}
        />
      </div>

      <div className="mb-3">
        <ExpenseList
          expenses={selectedExpense}
          onDelete={(id) => deleteExpense(id)}
        />
      </div>
    </>
  );
}

export default ContainerAll;
