const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); 

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});



// app.post('/send-message', (req, res) => {
//     const currentMessage = req.body.currentMessage;
//     const recentMessage = req.body.recentMessage; 
//     console.log('Received current message:', currentMessage);
//     console.log('Received recent message:', recentMessage);

//     let messages = [];
//     if (recentMessage) {
//         messages.push({
//             "role": "user",
//             "content": recentMessage
//         });
//     }

//     messages.push({
//         "role": "user",
//         "content": currentMessage
//     });

//     let data = JSON.stringify({
//         "model": "gpt-3.5-turbo",
//         "messages": messages
//     });

//     let config = {
//         method: 'post',
//         url: 'https://api.openai.com/v1/chat/completions',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` 
//         },
//         data: data
//     };

//     axios.request(config)
//         .then((response) => {
//             console.log('OpenAI response:', response.data);
//             console.log('ChatGPT content:', response.data.choices[0].message.content);
//             const content = response.data.choices[0].message.content;
//             res.json({ success: true, message: content });
//         })
//         .catch((error) => {
//             console.error('Error sending message to OpenAI:', error);
//             res.status(500).json({ success: false, message: 'Error sending message to OpenAI' });
//         });
// });

// // app.post('/completions', async(req, res)=>{
// //     const options = {
// //         method:"POST",
// //         headers:{
// //             'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,
// //             'Content-Type': 'application/json',

// //         },
// //         body: JSON.stringify({
// //             "model": "gpt-3.5-turbo",
// //             messages:[{"role": "user", "content": req.body.message}],
// //             max_tokens:100,

// //         })
// //     }
// //     try{
// //        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
// //        const data = await response.json();
// //        res.send(data);
// //     }catch(err){
// //      console.log("error", err);
// //     }
// // })
app.post('/completions', async (req, res) => {
    // Ensure the request body contains the expected structure
    if (!req.body || typeof req.body.message !== 'string') {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    // Set up the request payload
    // const data = {
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //         {
    //             role: 'user',
    //             content: req.body.message,
    //         },
    //     ],
    //     max_tokens: 100,
    // };
    const currentMessage = req.body.message;

    // Retrieve the previous messages from the request body, if available
    const previousMessages = req.body.previousMessages || [];

    // Construct the messages array including both the previous messages and the current message
    const messages = [...previousMessages, { role: 'user', content: currentMessage }];

    const data = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 4096,
    };
    // Define the Axios request options
    const axiosOptions = {
        method: 'post',
        url: 'https://api.openai.com/v1/chat/completions',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    // Make the request to the OpenAI API using Axios
    try {
        const response = await axios(axiosOptions);
        res.send(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error });
    }
});





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });