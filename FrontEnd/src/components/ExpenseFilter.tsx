interface Props {
  onSelectedCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectedCategory }: Props) => {
  return (
    <>
      <select
        onChange={(event) => onSelectedCategory(event.target.value)}
        className="form-select"
      >
        <option value="">All Categories</option>
        <option value="Groceries">Groceries</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
      </select>
    </>
  );
};

export default ExpenseFilter;
