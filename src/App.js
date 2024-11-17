import React, { useState, useEffect } from 'react';
import ContactSearchForm from './components/ContactSearchForm/ContactSearchForm';
import ContactCard from './components/ContactCard/ContactCard';
import Navbar from './components/Navbar/Navbar';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [repoFilter, setRepoFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current card index

  // Hardcoded data simulating API response
  const hardcodedContacts = [
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      chatUserName: 'alice123',
      location: 'Ashville, SC',
      title: 'Security Engineer',
      productName: 'Security Scanner',
      repoName: 'security-scan-repo'
    },
    {
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bob.smith@example.com',
      chatUserName: 'bobsmith',
      location: 'Lucerne, CH',
      title: 'Backend Developer',
      productName: 'API Framework',
      repoName: 'api-framework-repo'
    },
    {
      firstName: 'Charlie',
      lastName: 'Brown',
      email: 'charlie.brown@example.com',
      chatUserName: 'charlieb',
      location: 'Berlin, DE',
      title: 'DevOps Engineer',
      productName: 'Deployment Manager',
      repoName: 'deployment-repo'
    },
    // Additional dummy contacts
  ];

  // Simulate fetching all data after search
  const fetchAllContacts = () => {
    setContacts(hardcodedContacts);
    setFilteredContacts(hardcodedContacts);
  };

  // Fetch all contacts on initial search (ContactSearchForm will call this)
  const handleSearch = () => {
    fetchAllContacts();
    setCurrentIndex(0); // Reset to the first card on new search
  };

  // useEffect to apply filters whenever any dropdown filter changes
  useEffect(() => {
    const filtered = contacts.filter(contact =>
      (!locationFilter || contact.location === locationFilter) &&
      (!repoFilter || contact.repoName === repoFilter) &&
      (!productFilter || contact.productName === productFilter)
    );
    setFilteredContacts(filtered);
    setCurrentIndex(0); // Reset to the first card when filters change
  }, [locationFilter, repoFilter, productFilter, contacts]);

  // Extract unique values for dropdowns based on loaded data
  const uniqueLocations = [...new Set(contacts.map(contact => contact.location))];
  const uniqueRepoNames = [...new Set(contacts.map(contact => contact.repoName))];
  const uniqueProductNames = [...new Set(contacts.map(contact => contact.productName))];

  // Handle next and previous navigation
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
    <div className="app">
       {/* Navbar */}
       <Navbar />
      <div className="main-content">
        <ContactSearchForm onSearch={handleSearch} />

        {contacts.length > 0 && (
          <div className="mt-4">
            {/* Dropdown Filters */}
            <div className="flex gap-4 mb-4">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="p-2 border border-gray-600 bg-gray-800 text-white rounded"
              >
                <option value="">Filter by Location</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <select
                value={repoFilter}
                onChange={(e) => setRepoFilter(e.target.value)}
                className="p-2 border border-gray-600 bg-gray-800 text-white rounded"
              >
                <option value="">Filter by Repo Name</option>
                {uniqueRepoNames.map(repo => (
                  <option key={repo} value={repo}>{repo}</option>
                ))}
              </select>

              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="p-2 border border-gray-600 bg-gray-800 text-white rounded"
              >
                <option value="">Filter by Product Name</option>
                {uniqueProductNames.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>

            {/* Carousel for Cards */}
            <div className="relative flex items-center justify-center p-4">
              {filteredContacts.length > 0 && (
                <ContactCard contact={filteredContacts[currentIndex]} />
              )}

              {/* Left Arrow */}
              {filteredContacts.length > 1 && (
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 p-2 bg-gray-800 text-white rounded-full"
                >
                  &#8592;
                </button>
              )}

              {/* Right Arrow */}
              {filteredContacts.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-2 bg-gray-800 text-white rounded-full"
                >
                  &#8594;
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
