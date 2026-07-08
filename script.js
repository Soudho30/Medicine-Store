// Local Medicine Inventory Data Matrix in BDT (৳)
const medicines = [
    // === Pain Relief Category ===
    { id: 1, name: "Napa Extend 665mg (Paracetamol)", category: "Painkillers", price: 35.00, available: true, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300" },
    { id: 2, name: "Ace Plus Strip", category: "Painkillers", price: 40.00, available: true, image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=300" },
    
    // === Antibiotics Category ===
    { id: 3, name: "Zimax 500mg (Azithromycin)", category: "Antibiotics", price: 210.00, available: true, image: "https://images.unsplash.com/photo-1628771065518-0d82f1113871?auto=format&fit=crop&q=80&w=300" },
    { id: 6, name: "Seclo 20mg Capsules", category: "Antibiotics", price: 140.00, available: false, image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=300" },
    
    // === Vitamins Category ===
    { id: 4, name: "Bextram Gold Tablets", category: "Vitamins", price: 270.00, available: true, image: "https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?auto=format&fit=crop&q=80&w=300" },
    { id: 5, name: "Ceevit Chewable 250mg", category: "Vitamins", price: 50.00, available: true, image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=300" },
    
    // === Blood Pressure (BP) Control Category ===
    { id: 7, name: "Camlodin 5mg (Amlodipine)", category: "BP", price: 120.00, available: true, image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=300" },
    { id: 8, name: "Angilock 50mg (Losartan)", category: "BP", price: 180.00, available: true, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=300" },
    
    // === Skin Care Category ===
    { id: 9, name: "Cerave Hydrating Cleanser", category: "Skin Care", price: 1450.00, available: true, image: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=300" },
    { id: 10, name: "Cetaphil Moisturizing Cream", category: "Skin Care", price: 1280.00, available: true, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=300" },
    
    // === Baby Care Category ===
    { id: 11, name: "Johnson's Baby Lotion 200ml", category: "Baby Care", price: 420.00, available: true, image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300" },
    { id: 12, name: "Meril Baby Wipes Pack", category: "Baby Care", price: 185.00, available: true, image: "https://images.unsplash.com/photo-1595231712426-63e26b52c002?auto=format&fit=crop&q=80&w=300" }
];

let cart = [];
let currentCategoryFilter = 'all';

document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById("medicine-grid")) {
        renderCatalogGrid(medicines);
    }
});

// Dynamic Product Card Rendering Engine
function renderCatalogGrid(productsList) {
    const grid = document.getElementById("medicine-grid");
    grid.innerHTML = "";
    
    if (productsList.length === 0) {
        grid.innerHTML = `
            <div class="col-12 text-center my-5 py-4">
                <i class="fas fa-box-open text-muted fs-1 mb-3"></i>
                <h5 class="text-secondary fw-medium">No medical items match your search.</h5>
            </div>`;
        return;
    }
    
    productsList.forEach(item => {
        const outOfStockAction = !item.available ? 'disabled' : '';
        const actionButtonStyle = item.available ? 'btn-primary' : 'btn-danger opacity-75';
        const buttonText = item.available ? '<i class="fas fa-cart-plus me-2"></i>Add to Cart' : '<i class="fas fa-ban me-2"></i>Out of Stock';
        
        grid.innerHTML += `
            <div class="col-xl-3 col-lg-4 col-sm-6">
                <div class="card card-medicine h-100 position-relative overflow-hidden border-0">
                    <span class="badge medicine-badge rounded-pill px-3 py-2 text-white font-monospace">${item.category}</span>
                    <img src="${item.image}" class="card-img-top w-100" style="height: 190px; object-fit: cover;" alt="${item.name}">
                    <div class="card-body d-flex flex-column justify-content-between p-3">
                        <div class="mb-2">
                            <h6 class="card-title text-dark fw-bold mb-1 small">${item.name}</h6>
                            <p class="text-primary fw-bold fs-5 mb-0">৳ ${item.price.toFixed(2)}</p>
                        </div>
                        <button onclick="addItemToBasket(${item.id})" class="btn w-100 btn-custom py-2 ${actionButtonStyle}" ${outOfStockAction}>
                            ${buttonText}
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Category Filtering Engine
function filterMedicines(categorySelection, elementTarget) {
    currentCategoryFilter = categorySelection;
    const actionButtons = document.querySelectorAll(".filter-btn");
    actionButtons.forEach(btn => btn.classList.remove("active"));
    if(elementTarget) elementTarget.classList.add("active");

    executeCombinedFilters();
}

// Real-Time Search Handler Engine
function searchInventory() {
    executeCombinedFilters();
}

function executeCombinedFilters() {
    const searchString = document.getElementById("catalogSearch").value.toLowerCase().trim();
    
    const operationalResult = medicines.filter(item => {
        const matchesCategory = (currentCategoryFilter === 'all' || item.category === currentCategoryFilter);
        const matchesSearch = item.name.toLowerCase().includes(searchString) || item.category.toLowerCase().includes(searchString);
        return matchesCategory && matchesSearch;
    });
    
    renderCatalogGrid(operationalResult);
}

// Basket Array Lifecycle Operations
function addItemToBasket(id) {
    const targetProduct = medicines.find(m => m.id === id);
    if (!targetProduct || !targetProduct.available) return;

    const existingCartEntry = cart.find(item => item.id === id);
    if (existingCartEntry) {
        existingCartEntry.quantity += 1;
    } else {
        cart.push({ ...targetProduct, quantity: 1 });
    }
    synchronizeCartUI();
}

// Update Cart Sidebar/Modal Interface Module
function synchronizeCartUI() {
    const badgeCount = document.getElementById("cart-count");
    const itemWrapper = document.getElementById("cart-items");
    const totalAmountSpan = document.getElementById("cart-total");

    const calculatedSumItems = cart.reduce((accum, obj) => accum + obj.quantity, 0);
    badgeCount.innerText = calculatedSumItems;

    itemWrapper.innerHTML = "";
    let financialInvoiceTotal = 0;

    if (cart.length === 0) {
        itemWrapper.innerHTML = `
            <div class="text-center py-4 my-2">
                <i class="fas fa-shopping-bag text-muted opacity-50 fs-2 mb-2"></i>
                <p class="text-muted small mb-0">Your medical supply cart is empty.</p>
            </div>`;
    } else {
        cart.forEach(entry => {
            const rowValueSum = entry.price * entry.quantity;
            financialInvoiceTotal += rowValueSum;
            
            itemWrapper.innerHTML += `
                <div class="list-group-item d-flex justify-content-between align-items-center rounded-3 mb-2 p-3 border-0 bg-light shadow-sm">
                    <div class="pe-2">
                        <h6 class="mb-1 text-dark fw-bold small">${entry.name}</h6>
                        <span class="text-muted font-monospace small">৳ ${entry.price.toFixed(2)} &times; ${entry.quantity}</span>
                    </div>
                    <div class="d-flex align-items-center gap-3">
                        <span class="badge bg-primary rounded-pill px-3 py-2 fw-semibold">৳ ${rowValueSum.toFixed(2)}</span>
                        <button class="btn btn-sm text-danger p-1 border-0" onclick="removeItemFromBasket(${entry.id})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
        });
    }
    totalAmountSpan.innerText = `৳ ${financialInvoiceTotal.toFixed(2)}`;
}

function removeItemFromBasket(id) {
    cart = cart.filter(item => item.id !== id);
    synchronizeCartUI();
}

// Secure Checkout Simulated Event Flow
function executeCheckoutSequence() {
    if (cart.length === 0) {
        alert("Action rejected: Your shopping basket is empty.");
        return;
    }
    
    let orderReceiptSummary = "=== MEDIZONE SECURE CHECKOUT OUTLINE ===\n\n";
    cart.forEach(item => {
        orderReceiptSummary += `- ${item.name} [Qty: ${item.quantity}] : ৳ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    orderReceiptSummary += `\nTotal Invoiced Charge: ${document.getElementById("cart-total").innerText}\n\nProceed to payment?`;

    alert(orderReceiptSummary);
    
    cart = [];
    synchronizeCartUI();
    
    const cartModalElement = document.getElementById('cartModal');
    const runningModalInstance = bootstrap.Modal.getInstance(cartModalElement);
    if(runningModalInstance) runningModalInstance.hide();
}