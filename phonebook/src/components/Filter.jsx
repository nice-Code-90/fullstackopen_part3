const Filter = ({ searchName, setSearchName }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      ></input>
    </div>
  );
};

export default Filter;
