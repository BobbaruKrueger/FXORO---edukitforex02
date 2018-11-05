$(function (){

    var APP = {};

    // Инициализируем все функции
    APP.init = function ()
    {
		// Для страницы RAUFR
		APP.raufr();
		
		// Для выпадающего меню
		APP.open_breadcrumbs();
		
        // Табы
        APP.tabs_advantates();
        
        // Поиск как на Apple
        APP.animate_search();
        
        // Анимируем типы счетов
        APP.animate_acc_types();
		
		// Языковое меню
        APP.open_drop_down(500);
		
		// Зебра для таблиц
		APP.table_lines();
		
		// Общий JS для торговых инструментов: CFD, Currency, Metals, Oils
		APP.trading_instruments(500);
		
		APP.contests_sliders();
		
		// Презентация для главной
		APP.main_presentation();

		APP.bonuses_slide();

		APP.awards_slide();

		APP.contests_slide();

    }
	
	APP.raufr = function()
	{
		/*$('img').each(function (){
			if ($(this).attr('src') == 'undefined')
			{
				return false;
			}
			else
			{
				var raufr_arr = ['raufr_cert_new_thumb.jpg', 'raufr_cert_new_thumb_en.jpg'],
					thumb_image = $(this).attr('src').split('/'),
					full_image  = thumb_image[2].replace('_thumb', '');
					
				if($.inArray(thumb_image[2], raufr_arr) > -1)
				{
					$('.main-content img').wrap('<a class="mg" href="/images/'+full_image+'"></a>');
				}
			}
		});*/
	}
	
	APP.open_breadcrumbs = function()
	{
		$('.page-nav li').hover(function (){
			$('span.sub', $(this)).hide();
			
			if($('.sub-menu', $(this)).length > 0)
			{
				$(this).addClass('hover');
				
				if ($('.sub-menu', $(this)).width() < $(this).width())
				{
					$('.sub-menu', $(this)).width($(this).width() - 2);
				}
			}
		}, function (){
			$(this).removeClass('hover');
			$('span.sub', $(this)).show();
		});
	}
    
    APP.tabs_advantates = function ()
    {
        /**
         * Табы для преимуществ
         */
        
        var tab_container   = $('.monitoring-accounts.tabs'),
            advantage_first = $('.advantages .column:first'),
            advantages      = $('.advantages .column'),
            li              = $('li', advantages),
            a               = $('a', li),
            speed           = 400;
         
        // Прячем все табы кроме 1
        $('.tab:not(:first)', tab_container).hide();
        
        // Выделяем 1 активный
        // $('ul li:first', advantage_first).addClass('selected');
        
        a.click(function (){
            
            var self = $(this),
                id   = self.attr('id');
            
            open_tab(id, self);
            
        });
        
        // Функция для табов
        function open_tab(tab, self)
        {
            // Выделяем активным, текущий
            li.removeClass('selected');
            self.parent().addClass('selected');
            
            // Открываем нужный таб
            $('.tab.' + tab, tab_container).fadeIn(speed).siblings().hide();
        }
    }
    
    APP.animate_search = function()
    {
        /**
         * Анимируем поиск как на Apple
         */
        
        var menu_ul          = $('.menu-in > ul'),
            menu_li          = $('li:not(home)', menu_ul),
            search           = $('.menu-in .search'),
            input_srch       = $('#txt', search),
            speed            = 300,
            def_ul_w         = menu_ul.width(),
            def_search_w     = search.width();
            
        input_srch.focus(function (){
            
            menu_ul.animate({width: '796px'}, speed);
            menu_li.animate({width: '95px'}, speed);
            search.animate({width: '176px'}, speed);
            
        });
        
        input_srch.blur(function (){
            
            menu_ul.animate({width: def_ul_w}, speed);
            menu_li.animate({width: '100px'}, speed);
            search.animate({width: def_search_w}, speed);
            
        });
    }
    
    APP.animate_acc_types = function()
    {
        /**
         * Анимация для типов счетов
         */
         
        var account_types = $('.account-types'),
            acc_types_li  = $('li', account_types);
            
        acc_types_li.hover(function (){
        
            $(this).addClass('hover');
            
        }, function (){
            
            $(this).removeClass('hover');
            
        });
    }
	
	APP.open_drop_down = function(speed)
	{
		/**
		 * Языковое меню
		*/
		
		var langs = $('.languages'),
			lang  = $('span.lang', langs),
			arrow = $('span.arrow', langs),
			drop_down = $('ul', langs);
			
		lang.click(open_langs);
		arrow.click(open_langs);
		
		function open_langs()
		{
			if (drop_down.css('display') == 'none')
			{
				langs.addClass('open');
				drop_down.slideDown(speed);
			}
			else
			{
				drop_down.slideUp(speed, function (){
					langs.removeClass('open');
				});
			}
			
			$('li a', drop_down).click(function (){
				drop_down.slideUp(speed, function (){
					langs.removeClass('open');
				});
			});
		}
	}
	
	APP.table_lines = function()
	{
		$('table:not(.othertable)').each(function (){
			var table = $(this),
				th = $('tr:first', table).html();
				
			if(table.hasClass('no-zebra')) return;
			$('tbody tr:even', table).addClass('odd');
			$('tr:first', table).remove();
			
			$('thead', table).remove();
			table.prepend('<thead></thead>');
			$('thead', table).html('<tr>'+th+'</tr>');
		});
		
		$('table:not(.othertable) tbody tr').each(function (){
			var tr = $(this);
			
			$('td:first', tr).addClass('first');
			$('td:last', tr).addClass('last');
		});
		
		$('table:not(.othertable)').removeAttr('style');
	}
	
	APP.trading_instruments = function(speed)
	{
		var pos_cfd      = [16, 46, 77, 116, 153, 185],
			pos_currency = [16, 45, 77, 107, 138, 167, 199];
		
		// Скроллер для инструментов
		var cfd_scroller      = $('.cfd-scroller'),
			currency_scroller = $('.currency-scroller'),
			oil_scroller      = $('.oil-scroller');
			
		// Контейнер с li
		var cfd_li      = $('.cfd-tabs li'),
			currency_li = $('.currency-tabs li'),
			oil_li      = $('.oil-tabs li');
			
		// Контейнер с контентом
		var cfd_tab = $('.cfd-tab'),
			currency_tab = $('.currency-tab'),
			oil_tab      = $('.oil-tab');
				
		// ----------------------------- CFD ----------------------------
		cfd_tab.filter(':not(:first)').removeAttr('style').addClass('dn');
		
		cfd_li.click(function (){
			$(this).addClass('active')
				.siblings().removeClass('active');
				
			cfd_scroller.animate({top: pos_cfd[$(this).index()]}, speed);
			cfd_tab.eq($(this).index()).removeClass('dn')
				.siblings().addClass('dn');
		});
		
		$('.page.cfd table').wrap('<div class="table-ins"></div>');
		
		// Metals 
		$('.page.metals table').wrap('<div class="table-ins"></div>');
		
		// -------------------------- Currency --------------------------
		function scrollElement(element)
		{
			var speed = 900,
				pos = element.offset().top;
				
				$('html, body').animate({scrollTop: pos + 'px'}, speed);
		}
		
		$('.block-currecy-pairs li a').click(function (){
			var name = $(this).attr('class');
			
			scrollElement($('#' + name));
		});
		
		$('.page.currency table').wrap('<div class="table-ins"></div>');
		$('.currency-main').wrapInner('<p></p>');
		$('.currency-main').eq(2).remove();
		
		currency_tab.filter(':not(:first)').removeAttr('style').addClass('dn');
		
		currency_li.click(function (){
			$(this).addClass('active')
				.siblings().removeClass('active');
				
			currency_scroller.animate({top: pos_currency[$(this).index()]}, speed);
			currency_tab.eq($(this).index()).removeClass('dn')
				.siblings().addClass('dn');
		});
		
		// -------------------------- Oil --------------------------
		$('.page.oil table').wrap('<div class="table-ins"></div>');
	}
	
	APP.contests_sliders = function()
	{
		if ($('.page').hasClass('contests'))
		{
			$('.contest-slider').each(function (){
				var slider   = $(this),
				nav      = $('.contest-nav', slider),
				li       = $('li', nav),
				li_t     = '',
				content  = $('.contest-content', slider),
				tab      = $('.contest-tab', content);
				
				content.prepend('<div class="scroller"></div>');
				
				var pos_regional_contest = [10, 70, 130, 185];
				
				li.each(function (){
					li_t = $(this).text().length;
				});
				
				if(li_t > 12)
				{
					var pos_partners_contest = [15, 62, 98, 136, 175];
				}
				else
				{
					var pos_partners_contest = [5, 43, 80, 120, 158];
				}
				
				li.click(function (){
					var self     = $(this),
						index    = self.index(),
						scroller = self.parents('.contest-slider').find('.contest-content .scroller');
						
					li.removeClass('active');
					self.addClass('active');
					
					// Если региональный конкурс
					if (slider.hasClass('regional') || slider.hasClass('traders'))
					{
						content.removeClass('st');
						content.removeClass('nd');
						content.removeClass('rd');
						content.removeClass('other');
						
						switch(index)
						{
							case 0:
								content.addClass('st');
								break;
								
							case 1:
								content.addClass('nd');
								break;
								
							case 2:
								content.addClass('rd');
								break;
								
							default:
								content.addClass('other');
								break;
						}		
					}
					
					if (slider.hasClass('regional') || slider.hasClass('traders'))
					{
						scroller.animate({top: pos_regional_contest[index] + 'px'}, 500);
					}
					else
					{
						scroller.animate({top: pos_partners_contest[index] + 'px'}, 500);
					}
					
					tab.addClass('dn').eq(index).removeClass('dn');
				});
			});
		}
	}
	
	APP.main_presentation = function()
	{
		$('.video').click(function (){
			
			$('body').prepend('<div class="presentation-window"></div>');
			$('.presentation-window').after(
				'<div class="presentation">' +
					'<div class="presentation-head">' +
						'<span class="close"></span>' + 
					'</div>' +
					'<div class="presentation-main"></div>' +
				'</div>'
			);
			
			$('.presentation-main').html('<img src="/images/ajax/ajax-loader_big.gif" alt="" style="height: 32px; left: 50%; margin: -16px 0 0 -16px; position: absolute; top: 50%; width: 32px;" />');
			
			$('.presentation-main').load('/presentation/index/', function(){
				$('.presentation-main img').remove();
			});
			
		});
		
		$(document).on('click', '.close', function(){
			$('.presentation-window, .presentation').remove();
		});
	}

	/**
	 * Листалка для бонусов на главной
	 *
	 * @param int bonus_limit (max[5] - min[3])
	 */
	APP.bonuses_slide = function()
	{
		var limit = 5;

		if (typeof bonus_limit != 'undefined')
        {
            limit = bonus_limit;
        }

		if(limit > 5 && limit < 3)
		{
			return;
		}

		var block = $('.bonuses > ul');

		if(limit == 4)
		{
			block.addClass('four-elem');
		}
		else if(limit == 3)
		{
			block.addClass('three-elem');
		}

		var elem  = $('li', block),
			count = elem.length,
			width = elem.width(),
			index = 1;

		block.width(parseInt(count * width));

		if(count > limit)
		{
			$('.container > .bonuses').prepend('<a class="bonus-btn-left"></a><a class="bonus-btn-right"></a>');
		}

		$('.bonus-btn-left').addClass('dn');

		$(document).on('click', '.bonus-btn-left', function (){
			
			$('.bonus-btn-right').removeClass('dn');

			if(index <= 2)
			{
				$('.bonus-btn-left').addClass('dn');
			}

			block.stop(true, true).animate({left: '+=' +parseInt(width) + 'px'}, 500);

			index--;
		});

		$(document).on('click', '.bonus-btn-right', function (){
			
			$('.bonus-btn-left').removeClass('dn');

			if(index > count - limit - 1)
			{
				$('.bonus-btn-right').addClass('dn');
			}

			block.stop(true, true).animate({left: '-=' + parseInt(width) + 'px'}, 500);
			
			index++;
		});
	}

	/**
	 * Листалка для наград на главной
	 *
	 * @param int award_limit (max[10] - min[6])
	 */
	APP.awards_slide = function()
	{
		var limit = 9;

		if(limit > 10 && limit < 6)
		{
			return;
		}

		if (typeof award_limit != 'undefined')
        {
            limit = award_limit;
        }

		var block = $('.awards ul');

		if(limit == 9)
		{
			block.addClass('nine-elem');
		}
		else if(limit == 8)
		{
			block.addClass('eit-elem');
		}
		else if(limit == 7)
		{
			block.addClass('seven-elem');
		}
		else if(limit == 6)
		{
			block.addClass('six-elem');
		}

		var elem  = $('li', block),
			count = elem.length,
			width = elem.width(),
			index = 1;

		block.width(parseInt(count * width));

		if(count > limit)
		{
			$('.container > .awards').prepend('<a class="award-btn-left"></a><a class="award-btn-right"></a>');
		}

		$('.award-btn-left').addClass('dn');

		$(document).on('click', '.award-btn-left', function (){

			$('.award-btn-right').removeClass('dn');

			if(index <= 2)
			{
				$('.award-btn-left').addClass('dn');
			}

			block.stop(true, true).animate({left: '+=' +parseInt(width) + 'px'}, 500);

			index--;
		});

		$(document).on('click', '.award-btn-right', function (){

			$('.award-btn-left').removeClass('dn');

			if(index > count - limit - 1)
			{
				$('.award-btn-right').addClass('dn');
			}

			block.stop(true, true).animate({left: '-=' + parseInt(width) + 'px'}, 500);

			index++;
		});

		$('.container > .awards ul li a').hover(function (){
			var self  = $(this),
				title = self.data('tooltip'),
				p_l   = self.offset().left - 15,
				p_t   = self.offset().top - 20,
				w     = self.width() + 100;

			var award_block = '<div class="award-tooltip" style="left: ' + p_l + 'px; top: ' + p_t + 'px; ">' +
				'<div class="inner">' +
					'<ins class="aw-l"></ins>' +
					'<ins class="aw-r"></ins>' +
					'<div class="aw-m">' +
						'<span>' + title + '</span>' +
					'</div>' +
				'</div>' +
			'</div>';

		$('body').append(award_block);
		$('.award-tooltip').removeClass('dn').stop(true, true).animate({marginTop: '+=5px'}, 250);
		}, function (){
			$('.award-tooltip').removeClass('dn').stop(true, true).animate({marginTop: '-=5px', opacity: 1}, 250, function (){
				$(this).remove();
			});
		});
	}

	APP.contests_slide = function()
	{
		var block  = $('.contest-block ul'),
			elem   = $('li', block),
			count  = elem.length,
			index  = 1,
			width  = elem.width();

		block.width(parseInt(width * count));

		$('.contest-left-arrow').addClass('vh');

		$('.contest-left-arrow').click(function (){

			$('.contest-right-arrow').removeClass('vh');

			if(index <= 2)
			{
				$('.contest-left-arrow').addClass('vh');
			}

			block.stop(true, true).animate({left: '+=' + parseInt(width) + 'px'}, 200);

			index--;

			$('.contest-block .nav .index').text(index);
		});

		$('.contest-right-arrow').click(function (){
			$('.contest-left-arrow').removeClass('vh');

			if(index >= count - 1)
			{
				$('.contest-right-arrow').addClass('vh');
			}

			block.stop(true, true).animate({left: '-=' + parseInt(width) + 'px'}, 200);
			
			index++;

			$('.contest-block .nav .index').text(index);
		});
	}
    
    // Вызываем APP.init();
    APP.init();


    var URI = window.location.pathname;

    /*if(URI.substr(1, 2) == current_lang)
    {
        URI = URI.substr(3);
    }*/


    // Для ID языка меняю ссылку
    /*if(current_lang == 'id')
    {
        if(URI == '/beginners/')
        {
            $('.page-nav li:last a').attr({
                'href': 'https://secure.liteforex.com/id/profile/register/?type=demo',
                'target':'_blank'
            });
        }
    }*/
	
    if(URI.indexOf('contests/demo') + 1)
    {
        $('.conditions-in ul').each(function(){
            $(this).find('li:first').css('margin-bottom','10px');
        });
    }

    /*if(URI == '/contests/' && (_user.ip == '109.237.3.130' || _user.ip == '127.0.0.1'))
    {
        var html = '' +
            '<li>' +
                '<a href="' + (current_lang ? '/' + current_lang : '') + '/contests/partners/"><span style="display: block;" class="sub"></span>Partner\'s contests</a>' +
                '<ul class="sub-menu-1">' +
                    '<li><a href="' + (current_lang ? '/' + current_lang : '') + '/contests/partners/successful-partner/">Successful patner</a></li>' +
                    '<li><a href="' + (current_lang ? '/' + current_lang : '') + '/contests/partners/weekly-sprint/">Weekly sprint</a></li>' +
                '</ul>' +
            '</lI>';

        $('.page-nav > menu > ul').append(html);
    }*/

    /*
    append - в конец
    prepend - в начало
    after - после
    before - до
    */


    /*if(current_lang == 'es' && URI.indexOf('support/community') + 1)
    {
        $('.page-nav').find('a[href="http://www.forexpeoples.ru"]').attr('href', 'http://www.forexpeoples.es');
    }*/

    /*if(_user.ip == '127.0.0.1' || _user.ip == '109.237.3.130' || _user.ip == '80.254.28.54' || _user.ip == '46.251.115.65')
    {
        if(URI.indexOf('asset-investment') + 1)
        {
            $('.page-nav li:last').after('<li><a href="/asset-investment/advantages/">Преимущества</a></li>');
        }
    }*/

    if(URI.indexOf('promo/bonuses/15-25') + 1)
    {
        var img = new Image();
        img.src = '/images/bonuses/finish.png';
        img.alt = '';
        img.className = 'bonuses-finished-img';

        $('.bonus-info').append(img);
        $('.but-terminal a').attr('href', '');
    }
	
});

// Profiler
(function(){

    'use strict';

    $(function(){

        var codeigniter_profiler = $('#codeigniter_profiler');

        if(codeigniter_profiler.length)
        {
            $('body').append('<div class="open-profiler">Открыть профайлер</div>');

            $(document).on('click', '.open-profiler', function(){
                if(codeigniter_profiler.is(':hidden'))
                {
                    codeigniter_profiler.show();
                    var scrollTo = function(el)
                    {
                        try{
                            var duration = 500;
                            var element = $(el).offset();
                            var pos = element.top;
                            $('html, body').animate({scrollTop: pos}, duration);
                        }catch(e){}
                    }
                    scrollTo(codeigniter_profiler);
                }
                else
                {
                    codeigniter_profiler.hide();
                }
            });
        }

    });

})();

function get_random(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


$(document).ready(function(){
	var label 		= $('header nav div.label, .arrow'),
		form_height = $('header nav form').outerHeight();

	label.css('top' , form_height + 30 + 'px');
});
