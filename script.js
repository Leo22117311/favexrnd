document.addEventListener('DOMContentLoaded', function() {
    var plusButtons = document.querySelectorAll('.plus');
    plusButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var input = button.parentElement.querySelector('.product-quantity');
            input.value = parseInt(input.value) + 1;
            updateItemCount();
        });
    });
    
    var minusButtons = document.querySelectorAll('.min');
    minusButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var input = button.parentElement.querySelector('.product-quantity');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
            updateItemCount();
        });
    });
    
    var selectAllCheckbox = document.querySelector('.select-all');
    var itemCheckboxes = document.querySelectorAll('.item-checkbox');
    
    selectAllCheckbox.addEventListener('change', function() {
        itemCheckboxes.forEach(function(checkbox) {
            checkbox.checked = selectAllCheckbox.checked;
        });
        updateItemCount();
    });
    
    itemCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            var allChecked = Array.from(itemCheckboxes).every(function(cb) {
                return cb.checked;
            });
            selectAllCheckbox.checked = allChecked;
            updateItemCount();
        });
    });

    function updateItemCount() {
        var checkedItems = document.querySelectorAll('.item-checkbox:checked');
        var totalQuantity = 0;
        
        checkedItems.forEach(function(item) {
            var quantity = item.closest('.box').querySelector('.product-quantity');
            totalQuantity += parseInt(quantity.value);
        });
    
        document.querySelector('.item-count').textContent = totalQuantity;
        localStorage.setItem('totalQuantity', totalQuantity);
    }
    
    var checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', function() {
        updateItemCount();
    });

    checkoutButton.addEventListener('click', function() {
        if (document.querySelectorAll('.item-checkbox:checked').length === 0) {
            var errorMessage = document.querySelector('.error-message');
            errorMessage.style.display = 'block';
            event.preventDefault();
        }
        updateItemCount();
    });
    
});
