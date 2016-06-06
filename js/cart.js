"use strict";

/**
 * Корзина
 * @type {object}
 */
var cart = {
    items: [],
    totalPrice: 0
};

/**
 * Функция добавления товара в корзину
 * @param {object} item Товар
 * @param {string} item.name Название товара
 * @param {number} item.price Цена товара
 * @param {string} item.description Описание товара
 * @param {string} item.image URL изображения
 */
function addToCart(item) {
    cart.items.push(item);
    calculateTotalPrice();
    saveCartToLocalStorage();
}

/**
 * Сохранение корзины в localStorage
 */
function saveCartToLocalStorage() {
    window.localStorage.cart = JSON.stringify(cart);

}

function getCartFromLocalStorage() {
    return cart = JSON.parse(window.localStorage.cart);

}

function clearCartLocalStorage() {
    window.localStorage.cart = null;
    saveCartToLocalStorage();
    showCart();
}

/**
 * Пересчитать общую цену товаров
 */
function calculateTotalPrice() {
    var totalPrice = 0;
    cart.items.forEach(function (item) {
        totalPrice += item.price;
    });
    cart.totalPrice = totalPrice;
}

/**
 * Показать корзину
 */
function showCart() {
    // Показать модальное окно корзины
    clearItems();
    showItems();
    showTotalPrice();
}

/**
 * Очистка контейнера с товарами
 */
function clearItems() {
    // Очищаем контейнер с товарами
    $('.cart__items').text(' ');
    $('.cart__footer').text(' ');
}

/**
 * Сгенерировать html товаров в корзине
 */
function showItems() {
    if (!cart.items.length) {
        cart = getCartFromLocalStorage();
    }

    cart.items.forEach(function (item) {
        // Добавить в контейнер html-код с характеристиками товара

        $('.cart__items').append('<ul>\
            <li><img src="../images/close.png" class="item-delete" data-id="' + item.id + '"></li>\
            <li><img src="' + item.img + '" class="img"></li>\
            <li><p>' + item.name + '</p><p>$' + item.price + '</p></li>\
            </ul>');
    });
}

/**
 * Установить общую суммы товаров
 */
function showTotalPrice() {
    if (cart.totalPrice) {
        $('.cart__footer').append('<div class="total-price">Total price: $' + cart.totalPrice + '</div>\
            <div class="order button">Оформить заказ</div>');
    } else {
        $('.cart__items').append("Корзина пуста.")
    }

}

function removeFromCart(idItem) {
    cart.items.forEach(function (item, i) {
        if (idItem == item.id) {
            cart.totalPrice -= item.price;
            cart.items.splice(i, 1);
        }
    });

    clearCartLocalStorage();
}