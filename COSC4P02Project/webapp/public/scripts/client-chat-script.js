const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const chatbox = document.getElementById('chatboxBody');

const urlPrefix = "http://localhost:3000"

const sendMessage = async function (message) {
    const response = await fetch((urlPrefix+"/chat"), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    }).then((result) => {
        // check that the message was sent successfully
        if (result.status !== 200) {
            alert("There was an error sending your message to our server.  Please try again.")
        }
        // then, get the response from the result (result is a promise)
        result.text().then(responseData => {
            appendMessages(responseData, true)
        });
    })
    .catch((err) => {
        console.warn('error');
    });
}

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(message, false);
    sendMessage(message);
    messageInput.value = '';
})

function appendMessage(message, incoming) {
    const msg = document.createElement('div');
    msg.className = (incoming ? 'msg msg-in' : 'msg msg-out');
    msg.innerHTML = `
    <span>${message}</span>
    `;
    chatbox.appendChild(msg);
}

function appendImage(image) {
    const msg = document.createElement('div');
    msg.className = ('msg msg-in msg-img');
    msg.innerHTML = `
    <img src=${image} class="img-thumbnail">
    `;
    chatbox.appendChild(msg);
}

function appendMessages(messages, incoming) {
    messages = JSON.parse(messages);
    console.log(messages);
    for (let message of messages){
        if (message["text"]) {
            appendMessage(message["text"], true);
        } else if (message["image"]) {
            appendImage(message["image"], true);
        }
        
    }
    
}