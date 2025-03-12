document.addEventListener('DOMContentLoaded', () => {
    // Recuperar la lista de deseos desde localStorage sin sobrescribir los valores previos
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Elementos del DOM
    const wishlistSidebar = document.getElementById('wishlist-sidebar');
    const openWishlistBtn = document.getElementById('open-wishlist');
    const closeWishlistBtn = document.getElementById('close-wishlist');
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const wishlistCount = document.getElementById('wishlist-count');
    const continueBtn = document.getElementById('continue-btn');
    const finishBtn = document.getElementById('finish-btn');

    // Abrir la lista de deseos
    if (openWishlistBtn) {
        openWishlistBtn.addEventListener('click', (e) => {
            e.preventDefault();
            wishlistSidebar.style.right = '0';
            updateWishlistDisplay();
            updateWishlistCount();
        });
    }

    // Cerrar la lista de deseos
    if (closeWishlistBtn) {
        closeWishlistBtn.addEventListener('click', () => {
            setTimeout(() => {
                wishlistSidebar.style.right = '-300px';
            }, 300);
        });
    }

    // Función para agregar productos a la lista sin sobrescribir los existentes
    window.addItemToWishlist = function (productName) {
        // Asegurar que no se agregue un duplicado
        if (!wishlistItems.includes(productName)) {
            wishlistItems.push(productName);
            saveWishlist();
            updateWishlistDisplay();
            updateWishlistCount();
            alert(`${productName} ha sido agregado a tu lista de deseos!`);
        } else {
            alert(`${productName} ya está en tu lista de deseos.`);
        }
    };

    // Guardar en localStorage
    function saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }

    // Mostrar la lista de deseos
    function updateWishlistDisplay() {
        if (!wishlistItemsContainer) return;
        wishlistItemsContainer.innerHTML = '';
        wishlistItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = '✖';
            removeBtn.classList.add('remove-btn');
            removeBtn.onclick = () => removeItemFromWishlist(index);

            li.appendChild(removeBtn);
            wishlistItemsContainer.appendChild(li);
        });
    }

    // Eliminar producto de la lista
    function removeItemFromWishlist(index) {
        wishlistItems.splice(index, 1);
        saveWishlist();
        updateWishlistDisplay();
        updateWishlistCount();
    }

    // Actualizar el contador
    function updateWishlistCount() {
        if (wishlistCount) {
            wishlistCount.textContent = wishlistItems.length;
        }
    }

    // Cargar la lista de deseos al inicio sin perder datos
    updateWishlistDisplay();
    updateWishlistCount();

    // Botón de continuar
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            alert("¡Continúa comprando y agregando productos a tu lista de deseos!");
            wishlistSidebar.style.right = '-300px';
        });
    }

    // Botón de finalizar compra
    if (finishBtn) {
        finishBtn.addEventListener('click', () => {
            if (wishlistItems.length > 0) {
                alert("¡Gracias por comprar desde tu lista de deseos! Procederemos a finalizar tu compra.");
            } else {
                alert("Tu lista de deseos está vacía.");
            }
        });
    }
});
