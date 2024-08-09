const Persons = ({ filter, handleDeletePerson }) => {
  return (
    <>
      {filter.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDeletePerson(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </>
  );
};

export default Persons;
