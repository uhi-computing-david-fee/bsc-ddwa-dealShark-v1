document.addEventListener('DOMContentLoaded', loadDeals);

async function loadDeals() {
    showLoading();
    try {
        const response = await fetch("https://www.cheapshark.com/api/1.0/deals");
        const deals = await response.json();

        if (!response.ok) {
            throw new Error("API request failed");
        }

        writeDeals(deals);  
    }
    catch {
        showError(error);
    }
}

function writeDeals(deals) {

    // get my container element by classname
    const dealList = document.querySelector(".deal-list");

    // Clear any load or error states
    dealList.innerHTML = '';

    // loop through the provided deals
    deals.forEach(deal => {

        // Append to the inner HTML of the deal list
        dealList.innerHTML += `
            <div class="deal-card">
                <div class="deal-image">
                    <img src="${deal.thumb}" alt="${deal.title}">
                </div>
                <div class="deal-body">
                    <h2 class="deal-title">${deal.title}</h2>
                    <p class="deal-store text-muted text-sm">${deal.storeID}</p>
                    <div class="deal-pricing">
                        <span class="deal-sale mono">£${deal.salePrice}</span>
                        <span class="deal-was mono text-muted">£${deal.normalPrice}</span>
                        <span class="deal-badge">-${Math.round(deal.savings)}%</span>
                    </div>
                </div>
            </div>
        `;
    });
}

function showLoading() {
  const dealList = document.querySelector(".deal-list");
  dealList.innerHTML = `<p class="text-muted">Loading deals...</p>`;
}

function showError(message) {
  const dealList = document.querySelector(".deal-list");
  dealList.innerHTML = `<div class="error-box">${message}</div>
  `;
}