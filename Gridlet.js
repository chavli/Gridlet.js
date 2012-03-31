/*
*
* Gridlet.js
*
* Cha Li
* 31 March 2012
* 
* This widget is the basic piece of the Gridlet jquery plugin. It represents
* a single box which can be used to display text, photos, etc or it can be 
* used as a button to redirect to something else.
*
*/

(function($){
  var Gridlet = function(element, h, w){
    var elem = $(element);
    
    //properties
    var title = "";
    var description = "";
    var url = ".";
    var icon_url = "";
    var class_type = "shadowed";
    var height = h;
    var width = w;
    var title_size = "1em";
    //var bg_color = "#033F6A";
    var bg_color = "#1921B1";

    //setters
    this.setClass = function(class_string){ class_type = class_string; };
    this.setTitle = function(new_title){ title = new_title; };
    this.setTitleSize = function(size){title_size = size; };
    this.setDescription = function(new_desc){ description = new_desc; };
    this.setUrl = function(new_url){ url = new_url; };
    this.setIconUrl = function(new_icon_url){ icon_url = new_icon_url; };
    this.setBGColor = function(new_color){ bg_color = new_color; };

    //default event listeners
    var doMouseEnter = function(){ elem.animate({ opacity: 1.0 }, 500); };
    var doMouseExit = function(){ elem.animate({ opacity: 0.6 }, 500); };
    var doMouseClick = function(){ window.location = url; };
    
    //event callback setters
    this.onMouseEnter = function(callback){ doMouseEnter = callback; };
    this.onMouseExit = function(callback){ doMouseExit = callback; };
    this.onMouseClick = function(callback){ doMouseClick = callback; };
    

    //this function is what creates the html representation of the gridlet
    this.construct = function(){
      elem.remove();

      var title_div = $(document.createElement("div")).textelement(title, "#FFF");
      title_div = title_div.data("textelement");
      title_div.setClass("normalText");
      title_div.setFontSize(title_size);

      var desc_div = $(document.createElement("div")).textelement(description, "#FFF");
      desc_div = desc_div.data("textelement");
      desc_div.setClass("normalText");
      desc_div.setFontSize(".9em");
      
      

      if( icon_url != undefined && icon_url.length > 0 ){
        var thumbnail = $(document.createElement("img"));
        thumbnail.attr("src", icon_url);
        thumbnail.css({
          display: "block",
          width: width
        });
        elem.append(thumbnail);
      }

      
      //construct the subelements
      elem.append(title_div.construct());
      elem.append(desc_div.construct());

      //define css attrubutes
      elem.attr("class", class_type);
      elem.css({
        color: "#000",
        backgroundColor: bg_color,
        height: height, 
        width: width,
        opacity: "0.6",
        margin: "15px",
        padding: "5px"
      });

      //attach event listeners
      elem.mouseenter(doMouseEnter);
      elem.mouseleave(doMouseExit);
      elem.click(doMouseClick);
      return elem;
    };
  };
  
  /*
   * the constructor/prototype
   *
   * takes a height and width value, as a string (ex. "35px"), and creates
   * a gridlet with those dimensions
   */
  $.fn.gridlet = function(height, width){
    return this.each(function(){
      var element = $(this);
      if(element.data("gridlet"))
        return;

      element.data("gridlet", new Gridlet(this, height, width));
    });
  };

})(jQuery);







