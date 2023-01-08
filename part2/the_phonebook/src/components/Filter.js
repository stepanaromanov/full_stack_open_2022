const Filter = ({newFilter, handleFilters}) => {
  return (
    <div>
      <p>filter shown with</p>
        <input value={newFilter}
               onChange={handleFilters}
        />
    </div>
  )
}

export default Filter