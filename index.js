// JavaScript code in script.js

// Get DOM elements
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');


// Add event listener to send button
sendBtn.addEventListener('click', sendMessage);

// Add event listener to input field for pressing Enter key
userInput.addEventListener('keypress', function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    sendMessage();
  }
});

// Function to send a message
function sendMessage() {
  const userMessage = userInput.value;
  if (userMessage.trim() !== '') {
    // Create a new chat bubble element for user's message
    const chatBubble = document.createElement('div');
    chatBubble.className = 'chat-bubble user';
    chatBubble.textContent = 'User: ' + userMessage;
    chatMessages.appendChild(chatBubble);

    // Clear input field
    userInput.value = '';

    // Scroll to the bottom of the chat messages
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Call the chatbot's response function
    Reply(userMessage);
  }
}

// Function for chatbot's response
function Reply(userMessage) {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'c62bd187demsh0187f521cb4cca9p11f6bejsn544a2ed1f189',
            'X-RapidAPI-Host': 'chatgpt-api7.p.rapidapi.com'
        },
        body: JSON.stringify({"query": userMessage})
    };
    
    fetch('https://chatgpt-api7.p.rapidapi.com/ask', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    fetch('https://chatgpt-api7.p.rapidapi.com/ask', options)
        .then(response => response.json())
        .then(response => {
            if(response.cod == '404'){
                console.log('API error');
            }
            else{
                console.log(response);
                var botInput = response.response; 
                var chatBubble = document.createElement('div');
                chatBubble.className = 'chat-bubble bot-message';
                chatBubble.textContent = 'Bot: ' + botInput; 
                document.getElementById('chat-messages').appendChild(chatBubble);
            }
        })
        .catch(err => console.error(err));
}
