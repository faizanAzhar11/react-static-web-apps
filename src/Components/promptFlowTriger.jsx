/* eslint-disable */
import React, { useState, useEffect } from 'react';

export const PromptFlow = () => {
  const [Joke, callJoke] = useState(false);
  const [firstRender, callFirstRender] = useState(false);
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };



  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const blob = new Blob([reader.result], { type: file.type });
      // Now you have the file stored as a Blob
      console.log(blob);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    callFirstRender(true)
    callJoke(!Joke);
 
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
      
        if (firstRender) {
       
       debugger
        const response = await fetch('api/TriggerPromptflow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "topic": inputValue }) // inputValue is the state variable holding the topic
        });
     //   debugger
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        debugger;
        const result = await response.json();
        
        console.log("this is result"+ result);
        // callJoke(result);
        setTextAreaValue(result.joke)
        callFirstRender(true);
      }
      } catch (error) {
      //  debugger
      //  setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [Joke]); // Empty dependency array means this effect will run once, similar to componentDidMount

  if (loading) {
    return <LoadingSpinner />;
  }

  // if (error) {
  //   return <ErrorComponent error={error} />;
  // }

  return (

<>
<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
  <h5>Get The Joke :</h5>
  <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
    <input
      type="text"
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      placeholder="Enter topic to get joke"
      style={{ marginRight: '10px' }}
    />
    <button type="submit">Submit</button>
  </div>
  <textarea
    value={textAreaValue}
    onChange={e => setTextAreaValue(e.target.value)}
    rows="10"
    cols="50"
  />
</form>
<div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center', justifyContent: 'center', }}>
  <h1>Code for file upload</h1>
  <div style={{ display: 'flex', paddingLeft: '10px' , marginBottom: '10px', }}>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUpload}>Upload</button>
  </div>
  <textarea
    value={""}
   // onChange={e => setTextAreaValue(e.target.value)}
    rows="10"
    cols="50"
  />
</div>
</>
  );
};

const LoadingSpinner = () => <p>Loading...</p>;

const ErrorComponent = ({ error }) => (
  <div>
    <p>Error: {error.message}</p>
    <p>Please try again later.</p>
  </div>
);


