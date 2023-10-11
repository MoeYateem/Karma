document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('payment-form');
    const messageDiv = document.getElementById('feedback-message');

    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const cardNumber = document.getElementById('card-number').value;
        const cvv = document.getElementById('cvv').value;
        const cardHolderName = document.getElementById('card-holder').value;
        const expirationMonth = document.getElementById('expiration-month').value;
        const expirationYear = document.getElementById('expiration-year').value;

        try {
            const response = await fetch('/payments/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cardNumber,
                    cvv,
                    cardHolderName,
                    expirationMonth,
                    expirationYear,
                }),
            });

            if (response.status === 201) {
                messageDiv.textContent = 'Payment successful';
                showFeedbackMessage('Payment successful', 'success');
            } else if (response.status === 400) {
                const result = await response.json();
                messageDiv.textContent = result.error;
                showFeedbackMessage('Payment failed', 'error');
            } else {
                messageDiv.textContent = 'Error submitting payment information.';
                showFeedbackMessage('Payment failed', 'error');
            }
        } catch (error) {
            console.error(error);
            messageDiv.textContent = 'Error processing the request.';
            showFeedbackMessage('Payment failed', 'error');
        }
    });
});

function showFeedbackMessage(message, type) {
    const feedbackMessageDiv = document.getElementById('feedback-message');
    const messageElement = document.createElement('div');
    messageElement.className = `feedback-${type}`;
    messageElement.textContent = message;
    feedbackMessageDiv.appendChild(messageElement);

    setTimeout(() => {
        feedbackMessageDiv.removeChild(messageElement);
    }, 5000);
}
