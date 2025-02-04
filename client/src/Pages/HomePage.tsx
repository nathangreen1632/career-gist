import React from 'react';
import '../index.css';
interface HomePageProps {
}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div>
      <h1>
        Career Gist
      </h1>
      <h2>
        Because Job Searching Should Be Easy.
      </h2>
    </div>
  );
};

export default HomePage;
