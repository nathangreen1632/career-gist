import React, { useState } from 'react';
import SearchBar from '../Components/SearchBar';  // Adjust this path to where your SearchBar component is located
import '../index.css';

interface HomePageProps {
  // Additional props can be defined here if needed in the future
}

const HomePage: React.FC<HomePageProps> = () => {
  // Handler for search submissions
//   const [isLoading, setIsLoading] =useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [results, setResults] = useState<any>(null);  // Adjust type according to your data structure
  
const handleSearch = (searchTerm: string, location: string) => {
    console.log(`Search Term: ${searchTerm}, Location: ${location}`);

    // Here you might add logic to process the search, such as querying an API
    // setIsLoading(true);
    // setError(null);
  };

//   try {
// Security: protect your API key by storing it in a secure location. This is a template for when we start calling your API.
// I am commenting these out for now so I don't get an error and I won't accidentally call your API.
//     const response = await fetch(`https://yourapi.com/search?query=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(location)}`);
//     if (!response.ok) throw new Error('Network response was not ok.');

//     const data = await response.json();
//     setResults(data);  // Assuming your API returns the relevant search results
//     setIsLoading(false);
//   } catch (error) {
//     console.error('Failed to fetch:', error);
//     setError('Failed to load data');
//     setIsLoading(false);
//   }
// };

  return (
    <div>
      <h1>Career Gist</h1>
      <h2>Because Job Searching Should Be Easy.</h2>
      <SearchBar onSearch={handleSearch} />
      {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {results && <div>{}</div>} */}
    </div>
  );
};

export default HomePage;
