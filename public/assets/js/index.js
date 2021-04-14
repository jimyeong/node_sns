

$(document).ready(function () {
    app.init();
})

let app = {
    init: () => {
        ui.init();

    }
}



let ui = {
    init: () => {
        ui.activateSelectedLink();
        ui.initMasonry()
        ui.showDropDownMenu();
    },
    activateSelectedLink: () => {
        $('.nav-item').on('click', function(){
            $('.nav-link').removeClass('active');
            $(this).find('.nav-link').addClass('active');

        })
    },
    initMasonry: () => {
        $('#masonry-container').masonry({
            itemSelector: '#masonry-container > .card',
            columnWidth: 100
        });
    },
    showDropDownMenu: ()=>{
        $('.card__menu').on('click', function(){
            $(this).toggleClass('active');
        })
    }
}
