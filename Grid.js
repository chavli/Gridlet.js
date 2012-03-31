/*
 *  Grid.js
 *
 *  Cha Li
 *  31 March 2012
 *
 *  This widget is what holds and displays a group of gridlets in a MxN grid.
 *  Gridlets in the same grid will have the same style applied to all of them.
 *  A grids style can be defined through the interface provided.
 */


(function($){
  var NavGrid = function(element, r, c){
    var elem = $(element);
    
    //properties
    var rows = r;
    var cols = c;
    var titles = new Array(r*c);
    var descs = new Array(r*c);
    var urls = new Array(r*c);
    var icons = new Array(r*c);
    var gridlets = new Array(r*c);
    var gridlet_h = "150px";
    var gridlet_w = "150px";
    var title_size = "1.7em";
    var grid_color = "";
    
    //setters and getters 
    this.setTitles = function(title_array){ titles = title_array; };
    this.setTitleSize = function(size){ title_size = size; };
    this.setDescriptions = function(desc_array){ descs = desc_array; };
    this.setUrls = function(url_array){ urls = url_array; };
    this.setIcons = function(icon_array){ icons = icon_array; };
    this.setGridletSize = function(height, width){ gridlet_h = height; gridlet_w = width; };
    this.setGridColor = function(new_color){ grid_color = new_color; }

    //event listeners
    var doMouseEnter = function(){};
    var doMouseExit = function(){};
    var doMouseClick = function(){};

    this.onMouseEnter = function(callback){ doMouseEnter = callback; };
    this.onMouseExit = function(callback){ doMouseExit = callback; };
    this.onMouseClick = function(callback){ doMouseClick = callback; };


    //the "constructor". calling this function creates the html and css used 
    //to represent the grid and all the gridlets in it
    this.construct = function(){
      for(var col = 0; col < cols; col++){
        var col_div = $(document.createElement("div"));
        col_div.css({float: "left"});
        var index;
        for(var row = 0; row < rows; row++){
          index = (col * rows) + row;
          var gridlet = $(document.createElement("div")).gridlet(gridlet_h, gridlet_w);
          gridlet = gridlet.data("gridlet");
          if(index < titles.length){
            gridlet.setTitle(titles[index]);
            gridlet.setTitleSize(title_size);
            gridlet.setDescription(descs[index]);
            gridlet.setUrl(urls[index]);
            gridlet.setIconUrl(icons[index]);
            if(grid_color.length > 0)
              gridlet.setBGColor(grid_color);
          }
          col_div.append(gridlet.construct()); 
          gridlets[index] = gridlet;
        }
        elem.append(col_div);  
      }       
      return elem;
    }
  };

  //the protoype, it requires the number of rows and columns that
  //are going to be in the grid.
  $.fn.navgrid = function(rows, cols){
    return this.each(function(){
      var element = $(this);
      if(element.data("navgrid"))
        return;
      element.data("navgrid", new NavGrid(this, rows, cols));
    });
  };

})(jQuery);




