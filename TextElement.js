/*
 *  TextElement.js
 *
 *  Cha Li
 *  31 March 2012
 *
 *  Just a simple text element used to display some text. This is used
 *  in more complex widgets.
 *
 */


(function($){
        var TextElement = function(element, default_text, default_color){
                var elem = $(element);
                var text = default_text;
                var text_color = default_color;
                var text_size = "1.7em" 
                var tagclass = "";

                var doMouseEnter = function(){};
                var doMouseExit = function(){};
                var doMouseClick = function(){};

                this.setText = function(str){ text = str; };
                this.setClass = function(str){ tagclass = str; };
                this.setFontSize = function(str){ text_size = str; }

                this.getText = function(){
                        return text;
                };

                this.onMouseEnter = function(callback){
                        doMouseEnter = callback;
                };
                
                this.onMouseExit = function(callback){
                        doMouseExit = callback;
                };

                this.onMouseClick = function(callback){
                        doMouseClick = callback;
                };
                
                //the "constructor". creates the html elements that represents this
                this.construct = function(){
                        elem.attr("class", tagclass);
                        elem.css({
                          color: text_color,
                          fontSize: text_size,
                          cursor: "default"
                        });
                        elem.html(text);
                        return elem;
                };

        };
        
        //the protoype. the text to display and text color are required.
        $.fn.textelement = function(text, color){
                return this.each(function(){
                        var element = $(this);
                        if(element.data("textelement"))
                                return;
                        element.data("textelement", new TextElement(this, text, color));
                });
        };
        
        
        
})(jQuery);
