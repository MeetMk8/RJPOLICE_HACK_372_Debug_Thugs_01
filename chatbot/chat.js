const chatInput = document.querySelector(".chat-input textarea");
const sendChatbtn=document.querySelector(".chat-input span");
const chatbox=document.querySelector(".chatbox")

let userMessage;

const createChatLi=(message,className)=>{
    const chatLi=document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent=className==="outgoing"?`<p>${message}</p>` :`<span class="material -symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML=chatContent;
    return chatLi;
}
const generateRespnos=()=>{
    const API_URL="";
}
const handleChat=()=>{
    console.log(chatInput.Value)
    userMessage= chatInput.Value.trim();
    if(!userMessage)return;


    chatbox.appendChild(createChatLi(userMessage,"outgoing"));

    setTimeout(()=>{
        chatbox.appendChild(createChatLi("Thinking...","incoming"));
        generateRespnos();
    },600)

}
sendChatbtn.addEventListener("click",handleChat);

