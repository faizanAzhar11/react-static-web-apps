// module.exports = async function TestFun(context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };
// }




// Request data goes here
// The example below assumes JSON formatting which may be updated
// depending on the format your endpoint expects.
// More information can be found here:
// https://docs.microsoft.com/azure/machine-learning/how-to-deploy-advanced-entry-script
// const requestBody = {
//     "topic": "atom"
//   };

// const requestHeaders = new Headers({"Content-Type" : "application/json"});

// // Replace this with the primary/secondary key or AMLToken for the endpoint
// const apiKey = "a7JKX2H72ivds0OHVulvstQtOWkfdVFE";
// if (!apiKey)
// {
// 	throw new Exception("A key should be provided to invoke the endpoint");
// }
// requestHeaders.append("Authorization", "Bearer " + apiKey)

// // This header will force the request to go to a specific deployment.
// // Remove this line to have the request observe the endpoint traffic rules
// requestHeaders.append("azureml-model-deployment", "tek-copilot1-pdtar-1");

// const url = "https://tek-copilot1-pdtar.eastus.inference.ml.azure.com/score";

//  fetch(url, {
//   method: "POST",
//   body: JSON.stringify(requestBody),
//   headers: requestHeaders
// })
// 	.then((response) => {
//         debugger
// 	if (response.ok) {
// 		return response.json();
// 	} else {
// 		// Print the headers - they include the request ID and the timestamp, which are useful for debugging the failure
// 		console.debug(...response.headers);
// 		console.debug(response.body)
// 		throw new Error("Request failed with status code" + response.status);
// 	}
// 	})
// 	.then((json) => console.log(json))
// 	.catch((error) => {
//         debugger
// 		console.error(error)
// 	});


module.exports = async function (context, req) {
    const url = "https://tek-copilot1-pdtar.eastus.inference.ml.azure.com/score";

    const bearerToken ="a7JKX2H72ivds0OHVulvstQtOWkfdVFE"; // Replace with your actual bearer token

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${bearerToken}`
};

    try {

// ADD CHECK IF req.query.name is null or not
// if null then throw error
// else continue
//const topic = (req.query.name || (req.body && req.body.name));
const {topic} =  context.req.body;
debugger
        const response = await fetch(url, {
            method: "POST",
            headers:headers,
            body  : JSON.stringify({    "topic": topic  }),    
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

// module.exports = async function (context, req) {

// const jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/posts/1';

// return fetch(jsonPlaceholderUrl, {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',

//   },

// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     context.res.json({
//         text: "FROM AZURE FUNCTION  "+JSON.stringify(response.json()) 
//     });
//   })
//   .catch(error => {
//     console.error('Error during fetch:', error);
//     context.res.json({
//         text: "THIS IS ERROR "
//     });
//     throw error; // Propagate the error to the caller
//   });

// };