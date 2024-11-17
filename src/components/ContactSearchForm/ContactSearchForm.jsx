import React, { useState } from 'react';
import './ContactSearchForm.css';

const ContactSearchForm = ({ onSearch }) => {
  const [searchOption, setSearchOption] = useState('product');
  const [filters, setFilters] = useState({ productName: '', repoName: '' });
  const [error, setError] = useState(''); // State to hold error message

  const handleOptionChange = (e) => {
    setSearchOption(e.target.value);
    setFilters({ productName: '', repoName: '' }); // Reset filters when option changes
    setError(''); // Clear any error message when changing option
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic
    if (searchOption === 'product' && !filters.productName) {
      setError('Please enter a product name.');
      return;
    }
    if (searchOption === 'repository' && !filters.repoName) {
      setError('Please enter a repository name.');
      return;
    }
    if (searchOption === 'both' && (!filters.repoName)) {
      setError('Please enter product name or repository name.');
      return;
    }
    
    setError(''); // Clear error if validation passes
    onSearch(filters); // Proceed with search if validation passes
  };

  return (
    <div className="search-form">
      <h2>CollabConnect</h2>
      <h3>Find Point Of Contact For Any Project</h3>
      <div className="search-options">
        <label>
          <input
            type="radio"
            name="searchOption"
            value="product"
            checked={searchOption === 'product'}
            onChange={handleOptionChange}
          />
          Product Name
        </label>
        <label>
          <input
            type="radio"
            name="searchOption"
            value="repository"
            checked={searchOption === 'repository'}
            onChange={handleOptionChange}
          />
          Repository Name
        </label>
        <label>
          <input
            type="radio"
            name="searchOption"
            value="both"
            checked={searchOption === 'both'}
            onChange={handleOptionChange}
          />
          Both
        </label>
      </div>
      <form onSubmit={handleSubmit}>
        {(searchOption === 'product' ) && (
          <input
            type="text"
            placeholder="Enter Product Name"
            value={filters.productName}
            onChange={(e) => setFilters({ ...filters, productName: e.target.value })}
            className="search-input"
          />
        )}
        {(searchOption === 'repository' ) && (
          <input
            type="text"
            placeholder="Enter Repository Name"
            value={filters.repoName}
            onChange={(e) => setFilters({ ...filters, repoName: e.target.value })}
            className="search-input"
          />
        )}
        {(searchOption === 'both') && (
          <input
            type="text"
            placeholder="Enter Product or Repository Name"
            value={filters.repoName}
            onChange={(e) => setFilters({ ...filters, repoName: e.target.value })}
            className="search-input"
          />
        )}
        {error && <p className="error-message">{error}</p>} {/* Error message display */}
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default ContactSearchForm;