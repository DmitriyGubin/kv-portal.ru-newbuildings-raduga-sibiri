
window.addEventListener("load",function(){

	new Swiper('.swiper-container-under-banner', {
		  // loop: true,
		  
		  // Optional parameters
		  direction: 'horizontal',
		  // Navigation arrows
		  navigation: {
		  	nextEl: '.swiper-button-nextt',
		  	prevEl: '.swiper-button-prevv',
		  },

		  slidesPerView: 'auto',
		});


	$(".polzunok-1").slider({
		min: 2900000,
		max: 30000000,
        step: 1000,
		value: 18000000,
		range: "min",
		animate: "fast",
		slide : function(event, ui) 
		{  
			var a = new Intl.NumberFormat("ru").format(ui.value);
			$(".polzunok-1 span").html("<b>&lt;</b>" + a + "<b>&gt;</b>");     
		}    
	});
	var b = new Intl.NumberFormat("ru").format($(".polzunok-1").slider("value"));
	$(".polzunok-1 span").html("<b>&lt;</b>" + b + "<b>&gt;</b>");

	$(".polzunok-2").slider({
		min: 300000,
		max: 24000000,
        step: 1000,
		value: 12000000,
		range: "min",
		animate: "fast",
		slide : function(event, ui) 
		{  
			var a = new Intl.NumberFormat("ru").format(ui.value);
			$(".polzunok-2 span").html("<b>&lt;</b>" + a + "<b>&gt;</b>");     
		}    
	});
	var b = new Intl.NumberFormat("ru").format($(".polzunok-2").slider("value"));
	$(".polzunok-2 span").html("<b>&lt;</b>" + b + "<b>&gt;</b>");

	$(".polzunok-3").slider({
		min: 1,
		max: 30,
		value: 20,
		range: "min",
		animate: "fast",
		slide : function(event, ui) 
		{  
			var a = new Intl.NumberFormat("ru").format(ui.value);
			$(".polzunok-3 span").html("<b>&lt;</b>" + a + "<b>&gt;</b>");     
		}    
	});
	var b = new Intl.NumberFormat("ru").format($(".polzunok-3").slider("value"));
	$(".polzunok-3 span").html("<b>&lt;</b>" + b + "<b>&gt;</b>");
	
	let parents = document.querySelectorAll('.polzunok-container .ui-slider .ui-slider-range');
	for (let item of parents)
	{
		let div = document.createElement('div');
		div.classList.add('figures-box');
		item.appendChild(div);

		let round = document.createElement('div');
		round.classList.add('round');

		let triangle = document.createElement('div');
		triangle.classList.add('triangle');

		div.appendChild(triangle);
		div.appendChild(round);
	}
       $("#head-phone").mask("+7(999) 999-9999");
       $("#footer-phone").mask("+7(999) 999-9999");
       $("#pop-up-phone").mask("+7(999) 999-9999");



/************************* Попап ************************/

/**Навешивание попапа на разные кнопки**********/
var elements = document.querySelectorAll('.pop-up-excurs');
for (let item of elements)
{
	item.addEventListener("click", () => Show_PopUp_Order('Записаться на экскурсию'));
}

document.querySelector('.pop-up-online').addEventListener("click", () => Show_PopUp_Order('Записаться на онлайн-просмотр'));

Newbild_Plan();

function Newbild_Plan()
{
    var elements = document.querySelectorAll('.plan-item');
    for (let item of elements)
    {
        let url = item.querySelector('.plan-url').innerHTML;
        item.querySelector('.pop-up-price').addEventListener("click", function(){
            Show_PopUp_Order('Узнать цену');
            document.querySelector('#plan-href').value = url;
        });
    }
}

document.querySelector('.pop-up-taxi').addEventListener("click", () => Show_PopUp_Order('Заказать такси'));
document.querySelector('.pop-up-ipoteka').addEventListener("click", () => Show_PopUp_Order('Оставить заявку на ипотеку'));
document.querySelector('.pop-up-present').addEventListener("click", () => Show_PopUp_Order('Скачать презентацию'));
document.querySelector('.pop-up-plan').addEventListener("click", () => Show_PopUp_Order('Скачать планировки'));

/**Навешивание попапа на разные кнопки**********/

document.querySelector('#close').addEventListener("click", Hide_PopUp_Order);
document.querySelector('#for_close').addEventListener("click", Hide_PopUp_Order);

function Show_PopUp_Order(popup_title)
{
	document.querySelector('#main-popup-title').innerHTML = popup_title;
	var close = document.querySelector('#close');
	var form = document.querySelector('#form-content');
	var succes = document.querySelector('#succes_order');

	if(close.classList.contains('hide'))
	{
		close.classList.remove('hide');
	}

	if(form.classList.contains('hide'))
	{
		form.classList.remove('hide');
	}

	if(succes.classList.contains('show'))
	{
		succes.classList.remove('show');
	}

	document.querySelector('.send_order').classList.add('show_pop_up_order');
}

function Hide_PopUp_Order()
{
	document.querySelector('.send_order').classList.remove('show_pop_up_order');
}

/****************ajax*********************/
function Validate(arr,phone_id)
{
	var err=0;

    for (let item of arr)
    {
       let inp = item + ' input';
       let error = item + ' .error_var';

       var bool;

	    if($(inp).attr("id") == phone_id)
	    {
	        bool = (($(inp).val()).length != 16);
	    }
	    else 
	    {
	        bool = ($(inp).val() == '');
	    }

        if (bool)
        {
            err++;
            $(inp).addClass("hasError");
            $(error).addClass("show");
        } 
        else 
        {
            $(inp).removeClass("hasError");
            $(error).removeClass("show");
        }
    }

    return err;
}


$("#for_send").on("click",function(){

    var arr = ['.name-inp-box',
    	'.phone-inp-box'
    ];

    var err = Validate(arr,'pop-up-phone');

    if (err == 0)
    {
    	var popup_titlee = $("#main-popup-title").html();

    	if( popup_titlee == 'Оставить заявку на ипотеку')
    	{
    		var flat_price = ($(".polzunok-1 span").html()).replace(/&nbsp;/g, ' ');
    		var first_money = ($(".polzunok-2 span").html()).replace(/&nbsp;/g, ' ');
    		var ipoteka_years = ($(".polzunok-3 span").html()).replace(/&nbsp;/g, ' ');
    	}
    	else
    	{
    		var flat_price = '';
    		var first_money = '';
    		var ipoteka_years = '';
    	}

    	if (popup_titlee == 'Узнать цену')
    	{
            var plan_href = $('#plan-href').val();
    	}
        else
        {
            var plan_href = '';
        }

        $.ajax({
            type: "POST",
            url: 'send-order-newbild-detail.php',
            data: {
                'name': $("#pop-up-name").val(),
                'phone': $("#pop-up-phone").val(),
                'flat_price': flat_price,
                'first_money': first_money,
                'ipoteka_years': ipoteka_years,
                'plan_href': plan_href,
                'title': popup_titlee
            },
            dataType: "json",
            success: function(data){

                if (data.status == true)
                {
                    $("#pop-up-name").val('');
                    $("#pop-up-phone").val('');
                    
                    $("#close").addClass("hide");
                    $("#form-content").addClass("hide");
                    $("#succes_order").addClass("show");

                    var elements = document.querySelectorAll('.send_order .succes_var');
                    for (let item of elements)
                    {
                        if(item.classList.contains('show'))
                        {
                            item.classList.remove('show');
                        }
                    }
                }
            }
        });
    }

});

$("#top-form-excurs").on("click",function(){

	var arr = ['.name-inp-box-head',
    	'.phone-inp-box-head'
    ];

    var err = Validate(arr, 'head-phone');

    if (err == 0)
    {

        $.ajax({
            type: "POST",
            url: 'send-order-newbild-detail.php',
            data: {
                'name': $("#head-name").val(),
                'phone': $("#head-phone").val(),
                'title': 'Записаться на экскурсию'
            },
            dataType: "json",
            success: function(data){

                if (data.status == true)
                {
                    $("#head-name").val('');
                    $("#head-phone").val('');
                    
                    Show_PopUp_Order();
                    $("#close").addClass("hide");
                    $("#form-content").addClass("hide");
                    $("#succes_order").addClass("show");

                    var elements = document.querySelectorAll('.top-banner .succes_var');
                    for (let item of elements)
                    {
                        if(item.classList.contains('show'))
                        {
                            item.classList.remove('show');
                        }
                    }
                }
            }
        });
    }

});

$(".pop-up-call-order").on("click",function(){

	var arr = ['.phone-inp-box-footer'];
    var err = Validate(arr, 'footer-phone');
    
    if (err == 0)
    {
        $.ajax({
            type: "POST",
            url: 'send-order-newbild-detail.php',
            data: {
                'phone': $("#footer-phone").val(),
                'title': 'Заказ на звонок'
            },
            dataType: "json",
            success: function(data){

                if (data.status == true)
                {
                    $("#footer-phone").val('');
                   
                    Show_PopUp_Order();
                    $("#close").addClass("hide");
                    $("#form-content").addClass("hide");
                    $("#succes_order").addClass("show");

                    var item = document.querySelector('.phone-inp-box-footer .succes_var');
                   
                    if(item.classList.contains('show'))
                        {
                            item.classList.remove('show');
                        }
                 
                }
            }
        });
    }

});

document.querySelector('#pop-up-name').addEventListener("input", () => Listen_Input('.name-inp-box','#pop-up-name'));
document.querySelector('#pop-up-phone').addEventListener("input", () => Listen_Input('.phone-inp-box','#pop-up-phone'));

document.querySelector('#head-name').addEventListener("input", () => Listen_Input('.name-inp-box-head','#head-name'));
document.querySelector('#head-phone').addEventListener("input", () => Listen_Input('.phone-inp-box-head','#head-phone'));

document.querySelector('#footer-phone').addEventListener("input", () => Listen_Input('.phone-inp-box-footer','#footer-phone'));

function Listen_Input(box_name,inp_name)
{
    var succes = document.querySelector(box_name + ' .succes_var');
    var error = document.querySelector(box_name + ' .error_var');
    var inp = document.querySelector(inp_name);

    var bool;
    if((inp_name == '#pop-up-phone') || (inp_name == '#head-phone') || (inp_name == '#footer-phone'))
    {
        bool = ((inp.value).length != 16);
    }
    else 
    {
        bool = (inp.value == '');
    }

    if(bool)
    {
        if(!error.classList.contains('show'))
        {
            error.classList.add('show');
        }

        if(succes.classList.contains('show'))
        {
            succes.classList.remove('show');
        }

        if(!inp.classList.contains('hasError'))
        {
            inp.classList.add('hasError');
        }
    }
    else
    {
        if(error.classList.contains('show'))
        {
            error.classList.remove('show');
        }

        if(!succes.classList.contains('show'))
        {
            succes.classList.add('show');
        }

        if(inp.classList.contains('hasError'))
        {
            inp.classList.remove('hasError');
        }
    }
}

/************************* Попап ************************/

var elements = document.querySelectorAll('.plan-icon');
for(let item of elements)
{
   item.addEventListener("click", function(){

        for(let itemm of elements)
        {
            if(itemm.classList.contains('opacity-this'))
            {
                itemm.classList.remove('opacity-this');
            }
        }

        item.classList.add('opacity-this');

   });
}

/*****слайдер в слайдере**********/
function Show_all()
{
    var elements = document.querySelectorAll('.block_apart');
    if(elements.length != 0)
    {
        for (let item of elements)
        {
            /*******стрелки***********/
            item.querySelector('.swiper-container').addEventListener('mouseover',function(){
                item.querySelector('.swiper-button-next-photo').classList.add('show');
                item.querySelector('.swiper-button-prev-photo').classList.add('show');
            });

            item.querySelector('.swiper-container').addEventListener('mouseout',function(){
                item.querySelector('.swiper-button-next-photo').classList.remove('show');
                item.querySelector('.swiper-button-prev-photo').classList.remove('show');   
            });
            /*******стрелки***********/

            /**********Просмотренные блоки*********/
            item.addEventListener('click',function(){
                item.querySelector('.overlook').classList.add('show');
                item.querySelector('.main_text').classList.add('overlook_this');
            });
            /**********Просмотренные блоки*********/

            /*******Продавцы************/
            item.querySelector('.show_phone').addEventListener('click',function(event){
                event.stopPropagation();
                event.preventDefault();
                item.querySelector('.show_phone').classList.add('hide');
                item.querySelector('.seller').classList.add('show-this-flex');
            });
            /*******Продавцы************/

            /***Остановка всплытия событий***/
            item.querySelector('.swiper-button-next-photo').addEventListener('click',function(event){
                event.stopPropagation();
            });

            item.querySelector('.swiper-button-prev-photo').addEventListener('click',function(event){
                event.stopPropagation();
            });

            item.querySelector('.phone_ref').addEventListener('click',function(event){
                event.stopPropagation();
            });
            /***Остановка всплытия событий***/


        }
    }
}

Show_all();

new Swiper('.swiper-container', {
    loop: true,

          // Optional parameters
          direction: 'horizontal',
          // Navigation arrows
          navigation: {
            nextEl: '.swiper-button-next-photo',
            prevEl: '.swiper-button-prev-photo',
          },

          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
          },
        });

new Swiper('.list_apart', {
    
          // Optional parameters
          direction: 'horizontal',
          // Navigation arrows
          navigation: {
            nextEl: '.swiper-button-next-block',
            prevEl: '.swiper-button-prev-block',
          },

          slidesPerView: 'auto',
        });
/*****слайдер в слайдере**********/
   
});






