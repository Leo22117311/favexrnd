document.addEventListener("DOMContentLoaded", function() {
    var selectedOption = localStorage.getItem('selectedShippingOption');

    if (selectedOption) {
        document.getElementById(selectedOption).checked = true;
    } else {
        document.getElementById('regular').checked = true;
        selectedOption = 'regular';
        localStorage.setItem('selectedShippingOption', 'regular');
    }

    var shipPrices = {
        instant: 20000,
        regular: 10000
    };

    var shipPrice = shipPrices[selectedOption];
    var formattedShipPrice = "Rp " + shipPrice.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    document.querySelector('.shipping-price-detail').innerText = formattedShipPrice;

    document.querySelectorAll('input[name="shipping"]').forEach(function(option) {
        option.addEventListener('change', function() {
            var selectedOption = this.value;
            var shipPrice = shipPrices[selectedOption];
            var formattedShipPrice = "Rp " + shipPrice.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
            document.querySelector('.shipping-price-detail').innerText = formattedShipPrice;
            localStorage.setItem('selectedShippingOption', selectedOption);
            
            var totalTotalPrice = totalPrice + shipPrice;
            var formattedTTPrice = "Rp " + totalTotalPrice.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
            document.querySelector('.total-price-detail').innerText = formattedTTPrice;

            var errorText = (totalTotalPrice <= money) ? "(enough balance)" : "(not enough balance)";
            document.querySelector('.error-text').textContent = errorText;

        });
    });

    var totalQuantity = parseInt(localStorage.getItem('totalQuantity')) || 0;
    document.querySelector('.item-count').textContent = totalQuantity;
    
    var pricePerProduct = 899000;
    var totalPrice = totalQuantity * pricePerProduct;
    var formattedTotalPrice = "Rp " + totalPrice.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    document.querySelector('.product-price-detail').textContent = formattedTotalPrice;
    document.querySelector('.total-price').innerText = formattedTotalPrice;

    function calculateTTPrice() {
        var selectedOption = localStorage.getItem('selectedShippingOption');
        var shipPrice = shipPrices[selectedOption];
        var totalPrice = totalQuantity * pricePerProduct;
        return totalPrice + shipPrice;
    }

    var totalTotalPrice = calculateTTPrice();
    var formattedTTPrice = "Rp " + totalTotalPrice.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    document.querySelector('.total-price-detail').innerText = formattedTTPrice;

    var money = 1808000;
    var formattedMoney = "Rp " + money.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    document.querySelector('.e-money').textContent = formattedMoney;
    
    var errorText = (totalTotalPrice <= money) ? "(enough balance)" : "(not enough balance)";
    document.querySelector('.error-text').textContent = errorText;

    var orderButton = document.querySelector('.order-button');
    orderButton.addEventListener('click', function() {
        var totalTotalPrice = calculateTTPrice();
        if (totalTotalPrice > money) {
            var errorMessage = document.querySelector('.error-message');
            errorMessage.style.display = 'block';
            event.preventDefault();
        }
    });
});
