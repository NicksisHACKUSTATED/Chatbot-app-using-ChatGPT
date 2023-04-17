function sendMessage() {
    // Get user input
    var userInput = document.getElementById('user-input').value;
    
    // Create a new chat bubble element
    var chatBubble = document.createElement('div');
    chatBubble.className = 'chat-bubble';
    chatBubble.textContent = 'User: ' + userInput;
    
    // Append chat bubble to chat log
    document.getElementById('chat-log').appendChild(chatBubble);
    
    // Call the Reply() function to get bot's response
    Reply(userInput);
    
    // Clear input field
    document.getElementById('user-input').value = '';
    
    // Scroll to the bottom of the chat log
    var chatLog = document.getElementById('chat-log');
    chatLog.scrollTop = chatLog.scrollHeight;
}

function Reply(userInput) {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'c62bd187demsh0187f521cb4cca9p11f6bejsn544a2ed1f189',
            'X-RapidAPI-Host': 'chatgpt-api7.p.rapidapi.com'
        },
        body: JSON.stringify({"query": userInput})
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
                var botInput = response.response; // Update this with the appropriate property from the API response
                var chatBubble = document.createElement('div');
                chatBubble.className = 'chat-bubble';
                chatBubble.textContent = 'Bot: ' + botInput;
                document.getElementById('chat-log').appendChild(chatBubble);
            }
        })
        .catch(err => console.error(err));
}
