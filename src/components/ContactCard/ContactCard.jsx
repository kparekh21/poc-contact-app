import React from 'react';

const ContactCard = ({ contact }) => {
    console.log("Contact data:", contact);
  return (
    <div className="bg-gray-700 p-6 rounded-lg w-64 shadow-lg text-white flex-shrink-0 transition-transform transform hover:scale-105">
      <h3 className="font-semibold text-lg mb-1">
        {contact.firstName} {contact.lastName}
      </h3>
      <p className="text-sm text-gray-300">{contact.title}</p>
      <p className="text-sm text-gray-400">{contact.location}</p>
      
      {/* New fields for Project Name, Repository Name, and Chat Username */}
      <p className="text-sm text-gray-300 mt-2"><strong>Project:</strong> {contact.productName}</p>
      <p className="text-sm text-gray-300"><strong>Repo:</strong> {contact.repoName}</p>
      
      {/* Display Chat Username */}
      <p className="text-sm text-gray-300"><strong>Chat:</strong> {contact.chat_username}</p>
      
      <p className="text-sm mt-4">{contact.email}</p>
    </div>
  );
};

export default ContactCard;
