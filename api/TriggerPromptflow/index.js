import fetch from 'node-fetch';


export default async function (context, req) {
    const url = "https://tek-copilot1-pdtar.eastus.inference.ml.azure.com/score";

    const bearerToken ="a7JKX2H72ivds0OHVulvstQtOWkfdVFE"; // Replace with your actual bearer token

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${bearerToken}`
};

    try {

const {topic} =  context.req.body;
debugger
// var body = JSON.stringify({ "topic": topic });  
        const response = await fetch(url, {
            method: "POST",
            headers:headers,
            body  : JSON.stringify({    "topic": topic }),    
        });

        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
debugger
const data = await response.json();
const joke = data.joke;
console.log(joke);
 


               context.res = {
            status: 200,
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: `Error: ${error.message}`,
        };
    }
};

