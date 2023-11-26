import React, { useEffect, useState } from 'react';

const EmployeeFilter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');


  
  useEffect(() => {
    
    if(searchTerm || (filterOption && sortOrder)){
      onFilterChange({
        searchTerm,
        filterOption,
        sortOrder,
      });
    }
  }, [searchTerm,filterOption,sortOrder])
  
  return (
    <div className="mb-3 row align-items-center">
      <div className="col-md-6 mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search By Departments"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleFilterChange}
          >
            Search
          </button> */}
        </div>
      </div>

      <div className="col-md-6">
        <div className="d-flex align-items-center">
          <label className="me-2 mb-0">Filter By:</label>
          <select
            className="form-select mb-0"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="location">Location</option>
          </select>
        </div>

        <div className="mt-3">
          <label className="me-2">Sort Order:</label>
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${
                sortOrder === 'asc' ? 'btn-primary' : 'btn-secondary'
              }`}
              onClick={() => setSortOrder('asc')}
            >
              &uarr;
            </button>
            <button
              type="button"
              className={`btn ${
                sortOrder === 'desc' ? 'btn-primary' : 'btn-secondary'
              }`}
              onClick={() => setSortOrder('desc')}
            >
              &darr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFilter;
