import React from 'react';
import { useRouteError } from 'react-router-dom';
import '../index.css';

// Define a type for the expected error structure
// This can be adjusted based on what kind of errors you expect
interface ErrorType {
  statusText?: string;
  message?: string;
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as ErrorType;  // Cast the error to the defined type
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
