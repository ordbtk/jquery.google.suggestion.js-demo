/*
 * jquery.google.suggestion.js
 * @snowy0118, https://twitter.com/snowy0118
 * Copyright © 2012 @snowy0118
 * MIT Licensed
 * @version 0.1
 */

(function($) {
    $.fn.extend({
        getGoogleSuggestion: function(options) { /* 引数の初期値を設定 */
            var defaults = {
                keyword: ""
            };

            var option = $.extend(defaults, options);

            return this.each(function() {

                var
                o = option,
                    obj = $(this),
                    target,
                    statement = "select * from xml where url='http://google.com/complete/search?q=" + encodeURI(o.keyword) + "&output=toolbar'";

                $(obj).empty();
                $.getJSON("http://query.yahooapis.com/v1/public/yql?callback=?", {
                    q: statement,
                    format: "json"
                }, function(data) {
					
                    var items = data.query.results.toplevel;
                    	console.log(items);
                        if(items !== null){
                            var item = items.CompleteSuggestion,
                                html ="";
                            for (var i = 0; i < item.length; i++) {
                                html += "<li><a href='http://www.google.co.jp/search?&q=" + item[i].suggestion.data + "' target='_blank'>" + item[i].suggestion.data + "</a></li>";
                            }
                        $(obj).append("<ul>" + html + "</ul>");
                        }

                   }
                );

            });
        }
    });
})
(jQuery);