const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fetch = require('node-fetch');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('calculate', (data) => {
        // Send the calculation request to OpenAI's API
        fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
            },
            body: JSON.stringify({
                prompt: data.expression,
                max_tokens: 60
            })
        })
        .then(response => response.json())
        .then(data => {
            socket.emit('result', data.choices[0].text);
        })
        .catch(error => {
            console.error('Error:', error);
            socket.emit('error', 'Error processing your request');
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Listening on port 3000');
});
