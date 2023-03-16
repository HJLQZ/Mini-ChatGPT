const time1 = document.getElementById('time1');
time1.innerHTML = new Date().toLocaleString();
const time2 = document.getElementById('time2');
time2.innerHTML = new Date().toLocaleString();

function updateClock() {
    const clock = document.getElementById('clock');
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric' }
    const timeString = new Date().toLocaleString('en-US', options);
    clock.textContent = timeString;
}

// 更新时钟
setInterval(updateClock, 1000);



window.onload = function () {
// Selectors
    const inputForm = document.getElementById('input-form');
    const inputField = document.getElementById('input-field');
    const chatBox = document.getElementById('chatbox');
    //const hotButton = document.getElementById('hot-button');
// Event listeners
    inputForm.addEventListener('submit', submitForm);
    //hotButton.addEventListener('click', hotQuestions);
}


function sendMessage() {
  // 获取当前时间戳
    const timestamp = new Date().getTime();
    const inputField = document.getElementById('input-field');
    const message = inputField.value;
    if (message === '') return;
    inputField.value = '';
  // 将时间戳传递给 appendMessage() 函数
    appendMessage('user', message, timestamp);
    setTimeout(function () { getResponse(message, timestamp)
        .then((response) => {
            console.log(response);
            appendMessage('chatbot', response.replace(/^<br><br>/g, ''), new Date().getTime());
        })
        .catch((error) => {
            console.log(error);
            appendMessage('chatbot', '对不起，我的数据库里没有这个问题的答案。', new Date().getTime());
        }); }, 1000);
    
}

// Submit form
function submitForm(e) {
    e.preventDefault();
    sendMessage();
}

// 追加消息
function appendMessage(sender, message, timestamp)
{
  const isUser = sender === 'user'
  const chatContainer = document.getElementById('chatbox')

  // 创建包含头像和对话内容的元素
  const messageContainer = document.createElement('div')
  messageContainer.classList.add('message-container')
  if (isUser) {
    messageContainer.classList.add('user-message')
    messageContainer.innerHTML = '<div class="avatar user-avatar"></div>'
  } else {
    messageContainer.classList.add('bot-message')
    messageContainer.innerHTML = '<div class="avatar bot-avatar"></div>'
  }

  // 添加对话内容和发送时间
  const chatMessage = document.createElement('div')
  chatMessage.classList.add('chat-message')
  chatMessage.classList.add(isUser ? 'user' : 'chatbot')
  chatMessage.innerText = message.trim()

  const messageTime = document.createElement('div')
  messageTime.classList.add('message-time')
  messageTime.innerHTML = formatTimestamp(timestamp)

  // 将对话内容和发送时间添加到messageContainer中
  messageContainer.appendChild(chatMessage)
  messageContainer.appendChild(messageTime)

  // 将messageContainer添加到chatContainer中
  chatContainer.appendChild(messageContainer)

  // 滚动到最新的消息
  chatContainer.scrollTop = chatContainer.scrollHeight
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).substr(-2)
  const day = ('0' + date.getDate()).substr(-2)
  const hours = date.getHours()
  const minutes = '0' + date.getMinutes()
  const seconds = '0' + date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
}

// Get response from API
// 返回格式： {"answer": "hello"}
async function getResponse(query)
{
    try
    {
        const response = await fetch('http://localhost:3008/minigpt/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: query,
                }),
            }).then(function (r)
            {
                console.log(r);
                return r.json();
            })
        const data = response;

        return data.value;
    } catch (error)
    {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function hotQuestions()
{
    fetch('http://localhost:3008/hotlist')
        .then(response => response.json())
        .then(data =>
        {
            for (let i = 0; i < data.length; i++)
            {
                const question = data[i].question;
                const accessCount = data[i].access_count;
                const li = document.createElement('li');
                li.textContent = `${i + 1}. ${question} (${accessCount})`;
                document.getElementById('hotlist').appendChild(li);
            }
        })
        .catch(error => console.error(error));
    /*const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);*/
}
