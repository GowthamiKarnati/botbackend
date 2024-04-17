// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config(); 

// const app = express();
// const port = 3001;

// app.use(bodyParser.json());
// app.use(cors());
// app.use(express.json());
// app.get('/', (req, res) => {
//     res.send('<h1>Hello, Express.js Server!</h1>');
// });



// // app.post('/send-message', (req, res) => {
// //     const currentMessage = req.body.currentMessage;
// //     const recentMessage = req.body.recentMessage; 
// //     console.log('Received current message:', currentMessage);
// //     console.log('Received recent message:', recentMessage);

// //     let messages = [];
// //     if (recentMessage) {
// //         messages.push({
// //             "role": "user",
// //             "content": recentMessage
// //         });
// //     }

// //     messages.push({
// //         "role": "user",
// //         "content": currentMessage
// //     });

// //     let data = JSON.stringify({
// //         "model": "gpt-3.5-turbo",
// //         "messages": messages
// //     });

// //     let config = {
// //         method: 'post',
// //         url: 'https://api.openai.com/v1/chat/completions',
// //         headers: {
// //             'Content-Type': 'application/json',
// //             'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` 
// //         },
// //         data: data
// //     };

// //     axios.request(config)
// //         .then((response) => {
// //             console.log('OpenAI response:', response.data);
// //             console.log('ChatGPT content:', response.data.choices[0].message.content);
// //             const content = response.data.choices[0].message.content;
// //             res.json({ success: true, message: content });
// //         })
// //         .catch((error) => {
// //             console.error('Error sending message to OpenAI:', error);
// //             res.status(500).json({ success: false, message: 'Error sending message to OpenAI' });
// //         });
// // });

// // // app.post('/completions', async(req, res)=>{
// // //     const options = {
// // //         method:"POST",
// // //         headers:{
// // //             'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,
// // //             'Content-Type': 'application/json',

// // //         },
// // //         body: JSON.stringify({
// // //             "model": "gpt-3.5-turbo",
// // //             messages:[{"role": "user", "content": req.body.message}],
// // //             max_tokens:100,

// // //         })
// // //     }
// // //     try{
// // //        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
// // //        const data = await response.json();
// // //        res.send(data);
// // //     }catch(err){
// // //      console.log("error", err);
// // //     }
// // // })
// app.post('/completions', async (req, res) => {
//     // Ensure the request body contains the expected structure
//     if (!req.body || typeof req.body.message !== 'string') {
//         return res.status(400).json({ error: 'Invalid request data' });
//     }

//     // Set up the request payload
//     // const data = {
//     //     model: 'gpt-3.5-turbo',
//     //     messages: [
//     //         {
//     //             role: 'user',
//     //             content: req.body.message,
//     //         },
//     //     ],
//     //     max_tokens: 100,
//     // };
//     const currentMessage = req.body.message;

//     // Retrieve the previous messages from the request body, if available
//     const previousMessages = req.body.previousMessages || [];

//     // Construct the messages array including both the previous messages and the current message
//     const messages = [...previousMessages, { role: 'user', content: currentMessage }];

//     const data = {
//         model: 'gpt-3.5-turbo',
//         messages: messages,
//         max_tokens: 3000,
//     };
//     // Define the Axios request options
//     const axiosOptions = {
//         method: 'post',
//         url: 'https://api.openai.com/v1/chat/completions',
//         headers: {
//             'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//             'Content-Type': 'application/json',
//         },
//         data: data,
//     };

//     // Make the request to the OpenAI API using Axios
//     try {
//         const response = await axios(axiosOptions);
//         res.send(response.data);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: error });
//     }
// });





// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// const port = 3001;

// // Middleware setup
// app.use(bodyParser.json());
// app.use(cors());

// // Function to calculate monthly loan installments
// function calculateLoanInstallment(loanAmount, annualInterestRate, loanTermYears) {
//     const monthlyInterestRate = (annualInterestRate / 100) / 12;
//     const totalPayments = loanTermYears * 12;
//     const monthlyInstallment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
//     return monthlyInstallment.toFixed(2);
// }

// // Define the function call configuration for OpenAI
// const loanCalculationFunction = {
//     name: 'calculate_loan_installment',
//     description: 'Calculate the monthly installment for a loan.',
//     parameters: {
//         type: 'object',
//         properties: {
//             loan_amount: {
//                 type: 'number',
//                 description: 'The loan amount in dollars.',
//             },
//             annual_interest_rate: {
//                 type: 'number',
//                 description: 'The annual interest rate in percentage.',
//             },
//             loan_term_years: {
//                 type: 'integer',
//                 description: 'The loan term in years.',
//             },
//         },
//         required: ['loan_amount', 'annual_interest_rate', 'loan_term_years'],
//     },
// };

// // Route handler for `/completions` endpoint
// app.post('/completions', async (req, res) => {
//     const { message, previousMessages } = req.body;
//      console.log(message,":Message");
//      console.log(previousMessages,":Previous mEssages")
//          // Validate request data
//     if (!message || !Array.isArray(previousMessages)) {
//         return res.status(400).json({ error: 'Invalid request data' });
//     }

//     // Determine if the user message is asking for a loan calculation
//     const isLoanCalculationRequest = /calculate.*loan.*installment/i.test(message) ||
//         /calculate.*monthly.*installment/i.test(message) ||
//         /monthly.*installment/i.test(message);

//     console.log("function or not",isLoanCalculationRequest);
//     const data = {
//         model: 'gpt-3.5-turbo-0613',
//         messages: [
//             ...previousMessages,
//             { role: 'user', content: message },
//         ],
//         max_tokens: 3000,
//     };

//     // Add functions and function_call fields only if necessary
//     if (isLoanCalculationRequest) {
//         data.functions = [loanCalculationFunction];
        
//     }
    
//     try {
//         // Send request to OpenAI API
//         const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//                 'Content-Type': 'application/json',
//             }
//         });

//         const responseData = response.data;
//         console.log(responseData);
//         const choice = responseData.choices[0];
//         const resultMessage = choice.message;
//        console.log("Result message",resultMessage);
//         // If there's a function call in the response
//         if (resultMessage.function_call) {
//             const functionCall = resultMessage.function_call;

//             // If the function call name matches 'calculate_loan_installment'
//             if (resultMessage.function_call) {
//                 const functionCall = resultMessage.function_call;
//                 if (functionCall.name === 'calculate_loan_installment') {
//                     const params = JSON.parse(functionCall.arguments);
//                     // Your function calculation logic here
//                     const monthlyInstallment = calculateLoanInstallment(params.loan_amount, params.annual_interest_rate, params.loan_term_years);
                    
//                     // Create the function response with the required 'name' parameter
//                     const functionResponse = {
//                         role: 'function',
                       
//                         content: `The monthly installment for a loan of $${params.loan_amount} with an annual interest rate of ${params.annual_interest_rate}% over ${params.loan_term_years} years is $${monthlyInstallment} per month.`,
//                     };
                    
//                     // Return the function response
//                     return res.json(functionResponse);
//                 }
//             }
//         }

//         // Return the assistant's response for a non-function call
//         return res.json({
//             role: resultMessage.role,
//             content: resultMessage.content,
//         });

//     } catch (error) {
//         console.error('Error:', error.response?.data || error.message);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// const port = 3001;

// app.use(bodyParser.json());
// app.use(cors());

// // Function to square a number
// function squareNumber(number) {
//     return number * number;
// }

// // Define the function call configuration for OpenAI
// const squareFunction = {
//     name: 'square_number',
//     description: 'Calculate the square of a given number.',
//     parameters: {
//         type: 'object',
//         properties: {
//             number: {
//                 type: 'number',
//                 description: 'The number to square.',
//             },
//         },
//         required: ['number'],
//     },
// };

// // Endpoint for handling requests
// app.post('/completions', async (req, res) => {
//     const { message, previousMessages } = req.body;

//     if (!message || typeof message !== 'string') {
//         return res.status(400).json({ error: 'Invalid request data' });
//     }

//     // Combine previous messages with the current message
//     const messages = [
//         ...(previousMessages || []),
//         { role: 'user', content: message },
//     ];

//     const data = {
//         model: 'gpt-3.5-turbo',
//         messages: messages,
//         max_tokens: 1000,
//         functions: [squareFunction],
//         function_call: 'auto',
//     };

//     try {
//         const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//                 'Content-Type': 'application/json',
//             },
//         });

//         const choice = response.data.choices[0];
//         const resultMessage = choice.message;

//         // Check if there is a function call in the response
//         if (resultMessage.function_call) {
//             const functionCall = resultMessage.function_call;

//             if (functionCall.name === 'square_number') {
//                 // Parse the function call arguments and calculate the square of the number
//                 const params = JSON.parse(functionCall.arguments);
//                 const number = params.number;
//                 const squaredNumber = squareNumber(number);

//                 // Create a function call response message
//                 const functionResponse = {
//                     role: 'function',
//                     name: functionCall.name,
//                     content: `The square of the number ${number} is ${squaredNumber}.`,
//                 };

//                 // Send the function response back to the client
//                 return res.json({ role: 'assistant', content: functionResponse.content });
//             }
//         }

//         // If there is no function call, simply send the response message content
//         return res.json({
//             role: resultMessage.role,
//             content: resultMessage.content,
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         if (error.response && error.response.data) {
//             console.error('OpenAI API Error:', error.response.data);
//         }
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Function to square a number
function squareNumber(number) {
    return number * number;
}

// Function to calculate monthly installment for a loan
function calculateLoanInstallment(loanAmount, annualInterestRate, loanTermYears) {
    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    const totalPayments = loanTermYears * 12;
    const monthlyInstallment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
    return monthlyInstallment.toFixed(2);
}

// Define the function call configurations for OpenAI
const squareFunction = {
    name: 'square_number',
    description: 'Calculate the square of a given number.',
    parameters: {
        type: 'object',
        properties: {
            number: {
                type: 'number',
                description: 'The number to square.',
            },
        },
        required: ['number'],
    },
};

const loanCalculationFunction = {
    name: 'calculate_loan_installment',
    description: 'Calculate the monthly installment for a loan.',
    parameters: {
        type: 'object',
        properties: {
            loan_amount: {
                type: 'number',
                description: 'The loan amount in dollars.',
            },
            annual_interest_rate: {
                type: 'number',
                description: 'The annual interest rate in percentage.',
            },
            loan_term_years: {
                type: 'integer',
                description: 'The loan term in years.',
            },
        },
        required: ['loan_amount', 'annual_interest_rate', 'loan_term_years'],
    },
};

// Endpoint for handling requests
app.post('/completions', async (req, res) => {
    const { message, previousMessages } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    // Combine previous messages with the current message
    const messages = [
        ...(previousMessages || []),
        { role: 'user', content: message },
    ];

    const data = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 2000,
        functions: [squareFunction, loanCalculationFunction],
        function_call: 'auto',
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const choice = response.data.choices[0];
        const resultMessage = choice.message;

        // Check if there is a function call in the response
        if (resultMessage.function_call) {
            const functionCall = resultMessage.function_call;

            if (functionCall.name === 'square_number') {
                // Parse the function call arguments and calculate the square of the number
                const params = JSON.parse(functionCall.arguments);
                const number = params.number;
                const squaredNumber = squareNumber(number);

                // Create a function call response message
                const functionResponse = {
                    role: 'function',
                    name: functionCall.name,
                    content: `The square of the number ${number} is ${squaredNumber}.`,
                };

                // Send the function response back to the client
                return res.json({ role: 'assistant', content: functionResponse.content });
            } else if (functionCall.name === 'calculate_loan_installment') {
                // Parse the function call arguments and calculate the monthly installment for the loan
                const params = JSON.parse(functionCall.arguments);
                const loanAmount = params.loan_amount;
                const annualInterestRate = params.annual_interest_rate;
                const loanTermYears = params.loan_term_years;
                
                const monthlyInstallment = calculateLoanInstallment(loanAmount, annualInterestRate, loanTermYears);

                // Create a function call response message
                const functionResponse = {
                    role: 'function',
                    name: functionCall.name,
                    content: `The monthly installment for a loan of Rs ${loanAmount} at ${annualInterestRate}% interest for ${loanTermYears} years is Rs ${monthlyInstallment}.`,
                };

                // Send the function response back to the client
                return res.json({ role: 'assistant', content: functionResponse.content });
            }
        }

        // If there is no function call, simply send the response message content
        return res.json({
            role: resultMessage.role,
            content: resultMessage.content,
        });
    } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.data) {
            console.error('OpenAI API Error:', error.response.data);
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
