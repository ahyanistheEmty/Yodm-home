document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const sendButton = document.getElementById("send-button");
    const promptInput = document.getElementById("prompt");
    const newChatButton = document.getElementById("new-chat-button");

    sendButton.addEventListener("click", sendMessage);

    promptInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    newChatButton.addEventListener("click", resetChat);

    async function sendMessage() {
        const userMessage = promptInput.value.trim();
        if (!userMessage) return;

        appendMessage(userMessage, "user");
        promptInput.value = "";
        addTypingIndicator();

        try {
            const response = await fetch('https://r86t08gd-3000.inc1.devtunnels.ms/generate', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: userMessage }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch response from server");
            }

            const data = await response.json();

            removeTypingIndicator();

            let formattedResponse = formatText(data.response);
            appendMessage(formattedResponse, "bot");
        } catch (error) {
            removeTypingIndicator();
            appendMessage(`Error: ${error.message}`, "bot");
        }
    }

    function appendMessage(message, type) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", type);
        if (type === "bot") {
            messageDiv.innerHTML = message; // Allow formatted text for bot responses
        } else {
            messageDiv.innerText = message;
        }
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function addTypingIndicator() {
        const typingDiv = document.createElement("div");
        typingDiv.classList.add("message", "bot", "typing-indicator");
        typingDiv.innerHTML = `
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        `;
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingIndicator = document.querySelector(".typing-indicator");
        if (typingIndicator) typingIndicator.remove();
    }

    function formatText(text) {
        // Format bullet points and bold text
        let formattedText = text.replace(/^-\s/gm, "<li>");
        formattedText = formattedText.replace(/(\*{2})(.*?)\1/g, "<b>$2</b>"); // Bold text
        formattedText = formattedText.replace(/(\|.*?\|)/g, (match) => formatTable(match)); // Format tables

        return formattedText;
    }

    function formatTable(text) {
        const rows = text.trim().split("\n");
        let tableHTML = "<table style='width:100%; border-collapse:collapse;'>";
        rows.forEach((row, index) => {
            const cells = row.split("|").filter((cell) => cell.trim() !== "");
            tableHTML += "<tr>";
            cells.forEach((cell) => {
                tableHTML += index === 0 ? `<th>${cell.trim()}</th>` : `<td>${cell.trim()}</td>`;
            });
            tableHTML += "</tr>";
        });
        tableHTML += "</table>";
        return tableHTML;
    }

    function resetChat() {
        chatBox.innerHTML = ""; // Clear chat messages
        promptInput.value = ""; // Clear input field

        // Optionally, reset the server-side session
        fetch('https://r86t08gd-3000.inc1.devtunnels.ms/reset', { method: "POST" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to reset chat session");
                }
            })
            .catch((error) => {
                console.error("Error resetting chat session:", error);
            });
    }
});
// JavaScript for Menu Button
const menuBtn = document.getElementById('menu-btn');
const menuList = document.getElementById('menu-list');

menuBtn.addEventListener('click', () => {
    const isOpen = menuList.style.left === '0px';
    menuList.style.left = isOpen ? '-990px' : '0px';
});