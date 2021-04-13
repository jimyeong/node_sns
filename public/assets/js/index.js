$(document).ready(function (){
    app.init();
})

let app ={
    init : ()=>{
        sidebar.init();

    }
}

let sidebar = {
    init: ()=>{
        sidebar.activateSelectedLink();
    },
    activateSelectedLink:()=>{
        $('.nav-item').on('click', ()=>{
            $('.nav-link').removeClass('active');
            $(this).find('.nav-link').addClass('active');

        })


    }
}