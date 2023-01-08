const Form = ({ newName, 
                newNumber, 
                handleNewNames, 
                handleNewNumbers, 
                addPerson }) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: 
          <input value={newName}
                 onChange={handleNewNames}
          />
        </div>
        <div>
          number:
          <input value={newNumber}
                 onChange={handleNewNumbers}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default Form