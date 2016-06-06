$(document).ready(function () {

    $('.burger-menu').click(function () {
        $('.menu').toggleClass('menu-slide');
        $('.logo').toggleClass('logo__none');
        return false;
    });


    $('.basket_button').click(function (event) {
        event.preventDefault();
        $('#overlay').fadeIn(400,
            function () {
                $('.message')
                    .css('display', 'block')
                    .animate({opacity: 1, top: '10%'}, 200)
                    .animate({opacity: 0, display: 'none'}, 1000);
                $('#overlay').fadeOut(1500);
            });
    });

    $('.show-basket').click(function (event) {
        event.preventDefault();
        $('#overlay').fadeIn(400,
            function () {
                $('.cart')
                    .css('display', 'block')
                    .animate({opacity: 1, top: '10%'}, 200);
            });

        showCart();
    });

    $('#cart_close, #overlay').click(function () {
        $('.cart')
            .animate({opacity: 0, top: '45%'}, 200,
            function () { // после анимации
                $(this).css('display', 'none');
                $('#overlay').fadeOut(400);
            }
        );
    });

    $('.add-goods-in-basket').click(function () {
        var id = $(this).attr('data-id-product');

        $.get('../products.json', function (data) {
            data.forEach(function (item) {
                if (id == item.id) {
                    addToCart(item);
                }
            });
        });
    });


    $('.cart__items').on('click', '.item-delete', function () {
        var idItem = $(this).attr('data-id');

        removeFromCart(idItem);
    });
});