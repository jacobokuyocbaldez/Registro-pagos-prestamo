let totalLoan = 0;
const payments = [];

function addPayment() {
    const initialAmountInput = document.getElementById('initialAmount');
    const paymentAmountInput = document.getElementById('paymentAmount');
    const errorMessageEl = document.getElementById('errorMessage');
    
    // Validar monto inicial (solo la primera vez)
    if (totalLoan === 0) {
        const initialAmount = parseFloat(initialAmountInput.value);
        if (isNaN(initialAmount) || initialAmount <= 0) {
            errorMessageEl.textContent = 'Ingrese un monto inicial válido';
            return;
        }
        totalLoan = initialAmount;
        initialAmountInput.disabled = true;
    }

    // Validar monto del abono
    const paymentAmount = parseFloat(paymentAmountInput.value);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
        errorMessageEl.textContent = 'Ingrese un monto de abono válido';
        return;
    }

    // Verificar que el abono no sea mayor al saldo
    if (paymentAmount > totalLoan) {
        errorMessageEl.textContent = 'El abono no puede ser mayor al saldo pendiente';
        return;
    }

    // Limpiar mensaje de error
    errorMessageEl.textContent = '';

    // Actualizar saldo
    totalLoan -= paymentAmount;

    // Registrar pago
    const payment = {
        amount: paymentAmount,
        balance: totalLoan,
        date: new Date().toLocaleString()
    };
    payments.push(payment);

    // Actualizar tabla
    updatePaymentTable();

    // Limpiar input de abono
    paymentAmountInput.value = '';
}

function updatePaymentTable() {
    const tableBody = document.getElementById('paymentTableBody');
    tableBody.innerHTML = payments.map(payment => `
        <tr>
            <td>${payment.amount.toFixed(2)}</td>
            <td>${payment.balance.toFixed(2)}</td>
            <td>${payment.date}</td>
        </tr>
    `).join('');
}
