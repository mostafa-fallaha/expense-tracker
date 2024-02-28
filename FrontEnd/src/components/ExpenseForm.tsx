import { useState } from "react";
import categories from "./categories";

interface Props {
  onSubmit: (entity: any) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const [desc, setDesc] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [formError, setFormError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (desc === "" || amount === "" || category === "") {
      setFormError(true);
    } else {
      setFormError(false);
      const newExpense = {
        description: desc,
        amount: parseInt(amount),
        category: category,
      };
      onSubmit(newExpense);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/*-------------------Description----------------------------------*/}

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          id="description"
          type="text"
          className="form-control"
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      {/*-------------------Amount----------------------------------*/}

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          className="form-control"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/*-------------------Category----------------------------------*/}

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          className="form-select"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/*-------------------Button----------------------------------*/}

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {formError && <p style={{ color: "red" }}>please fill up the form</p>}
    </form>
  );
};

export default ExpenseForm;
