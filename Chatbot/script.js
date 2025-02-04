const ticketPrice = 20.0;
let selectedSlot = null;
let selectedTicketCount = 0;
let language = 'en';

const slots = {
    "09:00": 50,
    "09:30": 50,
    "10:00": 50,
    "10:30": 50,
    "11:00": 50,
    "11:30": 50,
    "12:00": 50,
    "12:30": 50,
    "13:00": 50,
    "13:30": 50,
    "14:00": 50,
    "14:30": 50,
    "15:00": 50,
    "15:30": 50,
    "16:00": 50,
    "16:30": 50,
    "17:00": 50,
    "17:30": 50
};

const busRoutes = {
    "Route 1": "City Center - Museum - Downtown 🏙️",
    "Route 2": "Main Station - Museum - Central Park 🌳",
    "Route 3": "Airport - Museum - Old Town ✈️",
    "Route 4": "Suburbia - Museum - Shopping Mall 🛍️"
};

const busRoutesHi = {
    "रूट 1": "सिटी सेंटर - म्यूज़ियम - डाउनटाउन 🏙️",
    "रूट 2": "मुख्य स्टेशन - म्यूज़ियम - सेंट्रल पार्क 🌳",
    "रूट 3": "एयरपोर्ट - म्यूज़ियम - ओल्ड टाउन ✈️",
    "रूट 4": "सबर्बिया - म्यूज़ियम - शॉपिंग मॉल 🛍️"
};

const messages = {
    en: {
        start: "Welcome to the Museum Ticket Booking System! 🎟️",
        showSlots: "Available slots: ⏰",
        selectSlot: "You selected slot",
        selectTickets: "Select number of tickets 🎫:",
        bookingConfirmed: "Booking confirmed ✅. A QR code for your entry ticket is generated above.",
        notEnoughTickets: "Not enough tickets available ❗",
        showBusRoutes: "Available bus routes 🚌:",
        paymentPrompt: "Total amount to be paid 💰: ₹",
        ticketBooked: " tickets booked for slot ",
        understood: "Sorry, I didn't understand that 🤔.",
        greeting: "Hello! I'm your museum ticket booking assistant.✨",
        paymentConfirmation: "Confirm payment of ₹",
        paymentSuccess: "Payment successful! 🎉 Booking complete.",
        paymentCancelled: "Payment cancelled. ❌",
        remainingTickets: "Remaining tickets for slot ",
    },
    hi: {
        start: "म्यूज़ियम टिकट बुकिंग सिस्टम में आपका स्वागत है! 🎟️",
        showSlots: "उपलब्ध स्लॉट्स: ⏰",
        selectSlot: "आपने चयन किया है स्लॉट",
        selectTickets: "टिकटों की संख्या चुनें 🎫:",
        bookingConfirmed: "बुकिंग की पुष्टि हो गई है ✅। आपके प्रवेश टिकट के लिए एक QR कोड ऊपर जनरेट किया गया है।",
        notEnoughTickets: "पर्याप्त टिकटें उपलब्ध नहीं हैं ❗",
        showBusRoutes: "उपलब्ध बस रूट्स 🚌:",
        paymentPrompt: "कुल भुगतान राशि 💰: ₹",
        ticketBooked: " टिकटें बुक की गईं स्लॉट ",
        understood: "मुझे समझ में नहीं आया 🤔।",
        greeting: "नमस्ते! मैं आपका म्यूज़ियम टिकट बुकिंग सहायक हूँ| ✨",
        paymentConfirmation: "₹ की भुगतान की पुष्टि करें",
        paymentSuccess: "भुगतान सफल! 🎉 बुकिंग पूरी हुई।",
        paymentCancelled: "भुगतान रद्द किया गया। ❌",
        remainingTickets: "स्लॉट के लिए शेष टिकटें ",
    }
};

function changeLanguage() {
    const langSelect = document.getElementById('language');
    language = langSelect.value;
    startChat();
}

function startChat() {
    displayMessage(messages[language].greeting, 'bot');
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('option-buttons').style.display = 'block';

    document.getElementById('show-slots').textContent = language === 'en' ? "Show Slots ⏰" : "स्लॉट्स दिखाएं ⏰";
    document.getElementById('show-bus-routes').textContent = language === 'en' ? "Show Bus Routes 🚌" : "बस रूट्स दिखाएं 🚌";
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.innerHTML = `<div class="message-content">${message}</div>`;
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

function showSlots() {
    displayMessage(messages[language].showSlots, 'bot');
    const slotButtonsContainer = document.getElementById('slot-buttons');
    slotButtonsContainer.innerHTML = ''; 
    slotButtonsContainer.style.display = 'block'; 

    for (let time in slots) {
        if (slots[time] > 0) {
            const slotButton = document.createElement('button');
            slotButton.textContent = `${time} (${slots[time]} tickets)`;
            slotButton.onclick = function() {
                selectSlot(time);
            };
            slotButtonsContainer.appendChild(slotButton);
        }
    }
}

function selectSlot(time) {
    selectedSlot = time;
    displayMessage(`${messages[language].selectSlot}: ${time}`, 'bot');
    document.getElementById('slot-buttons').style.display = 'none';
    showTicketOptions();
}

function showTicketOptions() {
    const ticketButtonsContainer = document.getElementById('ticket-buttons');
    ticketButtonsContainer.innerHTML = ''; 
    ticketButtonsContainer.style.display = 'block';

    for (let i = 1; i <= 10; i++) {
        const ticketButton = document.createElement('button');
        ticketButton.textContent = `${i} 🎟️`;
        ticketButton.onclick = function() {
            selectedTicketCount = i;
            confirmPayment(i);
        };
        ticketButtonsContainer.appendChild(ticketButton);
    }
}

function showBusRoutes() {
    const routes = language === 'hi' ? busRoutesHi : busRoutes;
    let routesMessage = `${messages[language].showBusRoutes}<ul>`;
    for (let route in routes) {
        routesMessage += `<li>${route}: ${routes[route]}</li>`;
    }
    routesMessage += '</ul>';
    displayMessage(routesMessage, 'bot');
}

function confirmPayment(ticketCount) {
    const totalAmount = ticketCount * ticketPrice;
    displayMessage(`${messages[language].paymentConfirmation} ₹${totalAmount}?`, 'bot');

    const paymentButtonsContainer = document.getElementById('payment-buttons');
    paymentButtonsContainer.innerHTML = `
        <button onclick="processPayment()">${language === 'en' ? "Confirm Payment 💳" : "भुगतान की पुष्टि करें 💳"}</button>
        <button onclick="cancelPayment()">Cancel ❌</button>
    `;
    paymentButtonsContainer.style.display = 'block';
}

function processPayment() {
    if (selectedSlot && selectedTicketCount <= slots[selectedSlot]) {
        slots[selectedSlot] -= selectedTicketCount;
        displayMessage(`${selectedTicketCount} ${messages[language].ticketBooked} ${selectedSlot}. ${messages[language].remainingTickets}${slots[selectedSlot]}`, 'bot');
        generateQRCode();
        displayMessage(messages[language].paymentSuccess, 'bot');
    } else {
        displayMessage(messages[language].notEnoughTickets, 'bot');
    }
    document.getElementById('payment-buttons').style.display = 'none';
}

function cancelPayment() {
    displayMessage(messages[language].paymentCancelled, 'bot');
    document.getElementById('payment-buttons').style.display = 'none';
}

function generateQRCode() {
    const qrCodeContainer = document.createElement('div');
    qrCodeContainer.classList.add('qr-code');
    document.getElementById('chat-box').appendChild(qrCodeContainer);

    const qr = new QRCode(qrCodeContainer, {
        text: `Museum Ticket\nSlot: ${selectedSlot}\nTickets: ${selectedTicketCount}`,
        width: 128,
        height: 128
    });
}
