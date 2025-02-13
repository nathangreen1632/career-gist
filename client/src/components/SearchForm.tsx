// import React, { useState } from 'react';
// import '../App.css';

// interface Props {
//   onSearch: (query: string) => Promise<void>;
//   loading: boolean;
// }

// const SearchForm: React.FC<Props> = ({ onSearch, loading }) => {
//   const SearchForm: React.FC<Props> = ({ onSearch, loading }) => {
//     const [query, setQuery] = React.useState('');
  
//     const handleSubmit = (event: React.FormEvent) => {
//       event.preventDefault();
//       onSearch(query);
//     };

//   return (
//     <div className="search-container">
//       <input
//         className="search-input"
//         id="jobSearch"
//         name="jobSearch"
//         type="text"
//         value={query}
//         onChange={e => setQuery(e.target.value)}
//         placeholder="Search for jobs..."
//         disabled={loading}
//       />
//       <button className="search" onClick={() => onSearch(query)} disabled={loading}>
//         {loading ? 'Loading...' : 'Search'}
//       </button>
//     </div>
//   );
// };

// export default SearchForm;



import React from 'react';
import '../App.css';

interface Props {
  onSearch: (query: string) => Promise<void>;
  loading: boolean;
}

const SearchForm: React.FC<Props> = ({ onSearch, loading }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-container">
    <form onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for jobs..."
        disabled={loading}
      />
      <button className="search" type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
    </div>
  );
};

export default SearchForm;