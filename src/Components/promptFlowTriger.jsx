import React, { useState, useEffect } from 'react';

export const PromptFlow = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/TriggerPromptflow');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        debugger
        console.log("this is result"+ result)
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will run once, similar to componentDidMount

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <div>
      <h1>API Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

const LoadingSpinner = () => <p>Loading...</p>;

const ErrorComponent = ({ error }) => (
  <div>
    <p>Error: {error.message}</p>
    <p>Please try again later.</p>
  </div>
);


