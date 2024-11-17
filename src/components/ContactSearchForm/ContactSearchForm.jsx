import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactSearchForm.css';

const BASE_URL = 'https://collabconnect-y1zi.onrender.com/search';

const ContactSearchForm = ({ onSearch }) => {
  const [searchOption, setSearchOption] = useState('product');
  const [filters, setFilters] = useState({ productName: '', repoName: '' });
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const searchText = searchOption === 'product' ? filters.productName : filters.repoName;
      if (searchText.length >= 3) {
        fetchSuggestions(searchOption, searchText);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500); // Debounce of 300ms
  
    return () => clearTimeout(debounceTimeout);
  }, [filters.productName, filters.repoName, searchOption]); 
  
  // Fetch autocomplete suggestions based on selected type
  const fetchSuggestions = async (type, query) => {
    try {
      let url = `${BASE_URL}`;
      if (type === 'product') {
        url += `/product/${query}`;
      } else if (type === 'repository') {
        url += `/repository/${query}`;
      } else {
        url += `/${query}`;
      }

      const token = localStorage.getItem('token');
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Extract relevant details for autocomplete
      const dataKey = type === 'product' ? 'Product details' : 'Repository details';
      const suggestionsData = response.data[dataKey] || [];

      const mappedSuggestions = suggestionsData.map((item) => ({
        id: item.employee_id,
        name: type === 'product' ? item.product_name : item.repository_name,
      }));
      console.log(mappedSuggestions)
      setSuggestions(mappedSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleOptionChange = (e) => {
    setSearchOption(e.target.value);
    setFilters({ productName: '', repoName: '' });
    setError('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchText = searchOption === 'product' ? filters.productName : filters.repoName;

    if (!searchText) {
      setError(`Please enter a ${searchOption === 'product' ? 'product name' : 'repository name'}.`);
      return;
    }
    
    setError('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch({ productName: filters.productName, repoName: filters.repoName });
  };

  const handleSuggestionClick = (suggestion) => {
    if (searchOption === 'product') {
      setFilters({ ...filters, productName: suggestion.name });
    } else {
      setFilters({ ...filters, repoName: suggestion.name });
    }
    setShowSuggestions(false);
    setSuggestions([]);
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
      </div>
      <form onSubmit={handleSubmit}>
        {(searchOption === 'product') && (
          <input
            type="text"
            placeholder="Enter Product Name"
            value={filters.productName}
            onChange={(e) => setFilters({ ...filters, productName: e.target.value })}
            className="search-input"
          />
        )}
        {(searchOption === 'repository') && (
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
        {error && <p className="error-message">{error}</p>}

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
        
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default ContactSearchForm;