import React, { useState, useEffect } from 'react';
import ContactSearchForm from '../components/ContactSearchForm/ContactSearchForm';
import ContactCard from '../components/ContactCard/ContactCard';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [repoFilter, setRepoFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

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
  ];

  const fetchAllContacts = () => {
    setContacts(hardcodedContacts);
    setFilteredContacts(hardcodedContacts);
  };

  const handleSearch = () => {
    fetchAllContacts();
    setCurrentIndex(0);
  };

  useEffect(() => {
    const filtered = contacts.filter(contact =>
      (!locationFilter || contact.location === locationFilter) &&
      (!repoFilter || contact.repoName === repoFilter) &&
      (!productFilter || contact.productName === productFilter)
    );
    setFilteredContacts(filtered);
    setCurrentIndex(0);
  }, [locationFilter, repoFilter, productFilter, contacts]);

  const uniqueLocations = [...new Set(contacts.map(contact => contact.location))];
  const uniqueRepoNames = [...new Set(contacts.map(contact => contact.repoName))];
  const uniqueProductNames = [...new Set(contacts.map(contact => contact.productName))];

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
