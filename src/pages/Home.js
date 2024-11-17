import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactSearchForm from '../components/ContactSearchForm/ContactSearchForm';
import ContactCard from '../components/ContactCard/ContactCard';

const BASE_URL = 'https://collabconnect-y1zi.onrender.com/search';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [repoFilter, setRepoFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch contacts from API based on search text and type
  const fetchContacts = async (searchOption, searchText) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');

      // Determine the URL based on the search option
      let url = `${BASE_URL}`;
      if (searchOption === 'product') {
        url += `/product/${searchText}`;
      } else if (searchOption === 'repository') {
        url += `/repository/${searchText}`;
      } else {
        url += `/${searchText}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check the data based on the search type and map it accordingly
      let data;
      console.log(response)
      if (searchOption === 'product') {
        data = response.data['Product details'];
      } else if (searchOption === 'repository') {
        data = response.data['Repository details'];
      } else {
        data = response.data['Repository details'];
      }

      // Map API response to frontend required fields
      const mappedData = data.map(contact => ({
        firstName: contact.first_name,
        lastName: contact.last_name,
        email: contact.email_id,
        location: `${contact.city}, ${contact.state}`,
        title: contact.title,
        productName: contact.product_name,
        repoName: contact.repository_name,
      }));

      setContacts(mappedData);
      setFilteredContacts(mappedData);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Handle search from ContactSearchForm
  const handleSearch = (filters) => {
    const { productName, repoName } = filters;
    if (productName) {
      fetchContacts('product', productName);
    } else if (repoName) {
      fetchContacts('repository', repoName);
    }
  };

  // Filter contacts based on dropdown selections
  useEffect(() => {
    const filtered = contacts.filter(contact =>
      (!locationFilter || contact.location === locationFilter) &&
      (!repoFilter || contact.repoName === repoFilter) &&
      (!productFilter || contact.productName === productFilter)
    );
    setFilteredContacts(filtered);
    setCurrentIndex(0);
  }, [locationFilter, repoFilter, productFilter, contacts]);

  // Extract unique values for dropdown filters
  const uniqueLocations = [...new Set(contacts.map(contact => contact.location))];
  const uniqueRepoNames = [...new Set(contacts.map(contact => contact.repoName))];
  const uniqueProductNames = [...new Set(contacts.map(contact => contact.productName))];

  // Navigation for the carousel
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < filteredContacts.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : filteredContacts.length - 1
    );
  };

  return (
    <div className="main-content px-4 sm:px-8 lg:px-16 pt-20">
      <ContactSearchForm onSearch={handleSearch} />

      {contacts.length > 0 && (
        <div className="mt-4 w-full max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="p-2 border border-gray-600 bg-gray-800 text-white rounded w-full sm:w-auto"
            >
              <option value="">Filter by Location</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <select
              value={repoFilter}
              onChange={(e) => setRepoFilter(e.target.value)}
              className="p-2 border border-gray-600 bg-gray-800 text-white rounded w-full sm:w-auto"
            >
              <option value="">Filter by Repo Name</option>
              {uniqueRepoNames.map(repo => (
                <option key={repo} value={repo}>{repo}</option>
              ))}
            </select>

            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="p-2 border border-gray-600 bg-gray-800 text-white rounded w-full sm:w-auto"
            >
              <option value="">Filter by Product Name</option>
              {uniqueProductNames.map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>

          <div className="relative flex items-center justify-center p-4">
            {filteredContacts.length > 0 && (
              <ContactCard contact={filteredContacts[currentIndex]} />
            )}

            {filteredContacts.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 p-2 bg-gray-800 text-white rounded-full text-xl"
                >
                  &#8592;
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-2 bg-gray-800 text-white rounded-full text-xl"
                >
                  &#8594;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
