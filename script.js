document.getElementById("calcForm").addEventListener("input", function () {
    // Get form values
    const lotValue = parseFloat(document.getElementById("lot_value").value);
    const entryPrice = parseFloat(document.getElementById("entry_price").value);
    const stopLoss = parseFloat(document.getElementById("sl").value);
    const target = parseFloat(document.getElementById("tp").value);
    const method = document.getElementById("method").value;
    const accountSize = parseFloat(document.getElementById("account_size").value);
    const toleranceRatio = parseFloat(document.getElementById("tolerance_ratio").value);

    // Input validation
    if (isNaN(lotValue) || isNaN(entryPrice) || isNaN(stopLoss) || isNaN(target) || isNaN(accountSize) || isNaN(toleranceRatio)) {
        document.getElementById("resultContainer").innerHTML = "";
        return;
    }

    // Calculate Stop Loss in percentage
    const stopLossPercent = -100 * ((stopLoss - entryPrice) / entryPrice);
    // Calculate Target in percentage
    const targetPercent = 100 * ((target - entryPrice) / entryPrice);

    // Validate that stop loss and target aren't the same as entry price
    if (stopLossPercent === 0 || targetPercent === 0) {
        document.getElementById("resultContainer").innerHTML = "<div class='result'><h2>Error</h2><p>Stop Loss or Target cannot be the same as Entry Price.</p></div>";
        return;
    }

    let entrySize;
    if (method === "Fixed Stop") {
        if (stopLossPercent === 0) {
            document.getElementById("resultContainer").innerHTML = "<div class='result'><h2>Error</h2><p>Stop Loss percentage is zero (no risk).</p></div>";
            return;
        }
        entrySize = (toleranceRatio * accountSize) / (stopLossPercent * lotValue);
    } else if (method === "Fixed Target") {
        if (targetPercent === 0) {
            document.getElementById("resultContainer").innerHTML = "<div class='result'><h2>Error</h2><p>Target percentage is zero (no reward).</p></div>";
            return;
        }
        entrySize = (toleranceRatio * accountSize) / (targetPercent * lotValue);
    }

    // Round the result to 3 decimal places
    entrySize = entrySize.toFixed(3);

    // Display the result
    document.getElementById("resultContainer").innerHTML = `
        <div class="result">
            <h2>نتیجه محاسبات:</h2>
            <p>حجم معامله: ${entrySize}</p>
        </div>
    `;
});
