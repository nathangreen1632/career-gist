import React, { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string, location: string) => void; // Callback when a search is submitted
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // Prevent the default form submit action
    onSearch(searchTerm, location); // Call the onSearch function passed as a prop
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for jobs, titles, companies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input" // You can define some CSS classes for styling
      />
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="location-input" // Additional CSS classes
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchBar;
