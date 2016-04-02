/*!
 * Image that the user want to work on
 * \class ProcessingImage
 */
function ProcessingImage(src) {
    this.img = new Image();
    this.img.src = src;
}

/*!
 * Draw the image on the context
 * \memberof ProcessingImage
 * \param ctx the context to draw on
 */
ProcessingImage.prototype.draw = function(ctx) {
    var locx = this.x;
    var locy = this.y;
    ctx.drawImage(this.img,locx,locy);
}

/*!
 * Check if a point is in the image
 * \memberof ProcessingImage
 * \param mx x coordonate
 * \param my y coordonate
 * \return bool if the point is in the image or not
 */
ProcessingImage.prototype.contains = function(mx, my) {
  return  (this.x <= mx) && (this.x + (this.w) >= mx) &&
          (this.y <= my) && (this.y + (this.h) >= my);
}

/*!
 * Single baseline
 * \class Line
 */
function Line(lineId, startx, y, finishx){
    this.id = lineId;
    this.startx = startx;
    this.y = y;
    this.finishx = finishx;
    this.selected = false;
}

/*!
 * Draw the line on the context
 * \memberof Line
 * \param ctx the context to draw on
 * \param image the image to ajust the coordonate
 */
Line.prototype.draw = function(ctx, image){
    ctx.beginPath();
    ctx.moveTo(image.x+ this.startx, image.y + this.y);
    ctx.lineTo(image.x + this.finishx, image.y + this.y);
    if(this.selected)
        ctx.strokeStyle = COLOR_BASELINE_SELECTED;
    else
        ctx.strokeStyle = COLOR_BASELINE;

    ctx.lineWidth = LINE_WIDTH_BASELINE;
    ctx.stroke();
}

/*!
 * Container of all baselines
 * \class Baseline
 */
function Baseline(lines) {
    this.lines = lines;
    this.visible = false;
    this.clickMargin = 0.4; //in percent of the image height
}

/*!
 * Draw all baseline on the context
 * \memberof Baseline
 * \param ctx the context to draw on
 * \param image the image to ajust the coordonate
 */
Baseline.prototype.draw = function(ctx, image){  
    if(this.visible)
        for (index = 0; index < this.lines.length; index++)
            this.lines[index].draw(ctx, image);
}

/*!
 * Check if a point is on a baseline
 * \memberof Baseline
 * \param mx x coordonate
 * \param my y coordonate
 * \param image the image to ajust the coordonate
 * \return the id of the baseline where the point is on, false otherwise 
 */
Baseline.prototype.contains = function(mx, my, image){
    if(this.visible == false)
        return "false";
    for (index = 0; index < this.lines.length; index++) {
        if((this.lines[index].startx + image.x <= mx)
            && (this.lines[index].finishx + image.x >= mx)
            && (this.lines[index].y + image.y - (this.clickMargin * image.h / 100) <= my)
            && (this.lines[index].y + image.y + (this.clickMargin * image.h / 100) >= my))
            return index;
    }
    return 'false';
}

/*!
 * Select a baseline
 * \memberof Baseline
 * \param id of the line to select
 */
Baseline.prototype.select = function (id){
    // Reset all selected lines
    for (index = 0; index < this.lines.length; index++) {
        this.lines[index].selected = false;
    }
    // Select the line
    if(id != 'false')
        this.lines[id].selected = true;
}

/*!
 * Rectangle of a BoundingBox
 * \class Rectangle
 */
function Rectangle(rect, idCC, idLine){
    this.rect = rect;
    this.idCC = idCC;
    this.idLine = idLine;
    this.visible = true;
    this.selected = false;
    this.labeled = false;
    this.hover = false;
}

/*!
 * Draw the rectangle
 * \memberof Rectangle
 * \param ctx context to draw on
 * \param image the image to ajust the coordonate
 */
Rectangle.prototype.draw = function(ctx, image){
    if(this.visible)
    {
        // Color according to the state
        ctx.fillStyle = COLOR_BOUNDINGBOX;
        if(this.labeled != false)
            ctx.fillStyle = COLOR_BOUNDINGBOX_LABELED;
        if(this.selected)
            ctx.fillStyle = COLOR_BOUNDINGBOX_SELECTED;
        if(this.hover)
            ctx.fillStyle = COLOR_BOUNDINGBOX_HOVER;

        ctx.globalAlpha = ALPHA_BOUNDINGBOX;
        ctx.fillRect(image.x + this.rect.x,image.y + this.rect.y, this.rect.w, this.rect.h);
    }
}

/*!
 * Container of all BoundingBox
 * \class BoundingBox
 */
function BoundingBox(rects) {
    this.rects = rects;
}

/*!
 * Draw all bounding box
 * \memberof BoundingBox
 * \param ctx context to draw on
 * \param image the image to ajust the coordonate
 */
BoundingBox.prototype.draw = function(ctx, image){
    for (index = 0; index < this.rects.length; index++) {
        this.rects[index].draw(ctx, image);
    }
}

/*!
 * Check if a point is on a bounding box
 * \memberof BoundingBox
 * \param mx x coordonate
 * \param my y coordonate
 * \param image the image to ajust the coordonate
 * \return the id of the boundingbox where the point is on, false otherwise 
 */
BoundingBox.prototype.contains = function(mx, my, image){
    for (index = 0; index < this.rects.length; index++) {
        if((this.rects[index].rect.x + image.x <= mx) 
            && (this.rects[index].rect.x + image.x + this.rects[index].rect.w >=mx)
            && (this.rects[index].rect.y + image.y <= my) 
            && (this.rects[index].rect.y + image.y + this.rects[index].rect.h >= my))
            return index;
    }
    return 'false';
}

/*!
 * Select a boundingbox
 * \memberof BoundingBox
 * \param id of the boundingbox to select
 */
BoundingBox.prototype.select = function (id){
    // Reset all selected bounding box
    for (index = 0; index < this.rects.length; index++) {
        this.rects[index].selected = false;
    }
    // Select the boundingbox
    if(id != 'false')
        this.rects[id].selected = true;
}

/*!
 * add a boundingbox to the selection
 * \memberof BoundingBox
 * \param id of the boundingbox to add
 */
BoundingBox.prototype.addToSelection = function (id){
    if(id != 'false')
        this.rects[id].selected = true;
}

/*!
 * remove a boundingbox to the selection
 * \memberof BoundingBox
 * \param id of the boundingbox to remove
 */
BoundingBox.prototype.removeToSelection = function (id){
    if(id != 'false')
        this.rects[id].selected = false;
}

/*!
 * principal canvas 
 * \class CanvasState
 * \param canvas canvas element
 * \param image image draw on the canvas
 * \param baseline list of baselines
 * \param boundingBox list of boundingBox
 */
function CanvasState(canvas, image, baseline, boundingBox) {
    var myState = this;

    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');

    this.image = image;

    this.baseline = baseline;
    this.boundingBox = boundingBox;

    this.dragging = false;

    this.scale = 1.0;

    this.panX = 0;
    this.panY = 0;

    this.selectedCC = [];

    this.dragoffx = 0;
    this.dragoffy = 0;

    this.image.img.onload = function(){
        myState.image.w = this.width;
        myState.image.h = this.height;


        myState.image.initialx = myState.width/2 - this.width/2;
        myState.image.initialy = myState.height/2 - this.height/2;

        myState.image.x = myState.image.initialx;
        myState.image.y = myState.image.initialy;


        if(this.width > this.height)
            myState.scale = myState.width /this.width;
        else
            myState.scale = myState.height /this.height;
    }

}
/*!
 * When the mouse down (Dectection for moving the image)
 * \memberof CanvasState
 * \param e event
 */
CanvasState.prototype.onMouseDown= function(e){
    var mouse = this.getMouse(e);
    var mx = mouse.x;
    var my = mouse.y;

    var image = this.image;

    if (image.contains(mx, my)) {
        this.dragoffx = mx - image.x;
        this.dragoffy = my - image.y;             
        this.dragging = true;
        return;
      }
}

/*!
 * When the mouse move (Dectection for moving the image)
 * \memberof CanvasState
 * \param e event
 */
CanvasState.prototype.onMouseMove = function(e){
    if (this.dragging){
        var mouse = this.getMouse(e);
        this.image.x = (mouse.x) - this.dragoffx;
        this.image.y = (mouse.y) - this.dragoffy; 
    }
}

/*!
 * When the mouse up (Dectection for moving the image)
 * \memberof CanvasState
 * \param e event
 */
CanvasState.prototype.onMouseUp = function(e){
    this.dragging = false;
}

/*!
 * Zoom in
 * \memberof CanvasState
 */
CanvasState.prototype.zoomIn = function(){
    this.scale += 0.1;
}

/*!
 * Zoom out
 * \memberof CanvasState
 */
CanvasState.prototype.zoomOut = function(){
    this.scale -= 0.1;
}

/*!
 * Reset the zoom value
 * \memberof CanvasState
 */
CanvasState.prototype.zoomReset = function(){
    if(this.width > this.height)
        this.scale = this.width /this.image.w;
    else
        this.scale = this.height /this.image.h;

    this.image.x = this.image.initialx;
    this.image.y = this.image.initialy;
}

/*!
 * Clear the canvas context to redraw on it
 * \memberof CanvasState
 */
CanvasState.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
}

/*!
 * Draw all element on the canvas
 * \memberof CanvasState
 */
CanvasState.prototype.draw = function() {
  if (!this.valid) {
    var ctx = this.ctx;

    // get the translation to apply to center the image
    var newWidth = this.width * this.scale;
    var newHeight = this.height * this.scale;
    this.panX = -((newWidth-this.width)/2);
    this.panY = -((newHeight-this.height)/2);

    this.clear();

    // Save the current context
    ctx.save();

    // Apply modifications (zoom, translation) all elements drawing after this will have the modifications
    ctx.translate(this.panX, this.panY);
    ctx.scale(this.scale, this.scale);
    
    // Draw all elements
    this.image.draw(ctx);
    this.baseline.draw(ctx, this.image);
    this.boundingBox.draw(ctx, this.image);

    // Restore the context
    ctx.restore();

  }
}

/*!
 * Get the mouse coordonate
 * \memberof CanvasState
 * \param e event
 * \return coordonate of the mouse
 */
CanvasState.prototype.getMouse = function(e) {
    var rect = this.canvas.getBoundingClientRect();
    // Get mouse coordonate relative to the canvas
    var mx = Math.floor((e.clientX-rect.left)/(rect.right-rect.left)*this.canvas.width);
    var my = Math.floor((e.clientY-rect.top)/(rect.bottom-rect.top)*this.canvas.height);

    // Get real mouse coordonate, eliminate scale and translations
    var mouseXT = parseInt((mx - this.panX) / this.scale);
    var mouseYT = parseInt((my - this.panY) / this.scale);

    return {x: mouseXT, y: mouseYT};
}

/*!
 * preview canvas 
 * \class PreviewCanvas
 * \param canvas canvas element
 * \param image image draw on the canvas
 */
function PreviewCanvas(canvas, image)
{
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');

    this.image = image;

    this.visible = false;
    this.scaleX = 1;
    this.scaleY = 1;

    this.isBaseline = false;

    this.position_up_line = 0;
    this.position_down_line = 0;
    this.position_left_line = 0;
    this.position_right_line = 0;
    this.position_baseline = 0;
    this.idElementSelected = 0;
    var myPreviewCanvas = this;  
}

/*!
 * Clear the context to redraw on it
 * \memberof PreviewCanvas
 */
PreviewCanvas.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}

/*!
 * Draw all element on the canvas
 * \memberof CanvasState
 */
PreviewCanvas.prototype.draw = function() {
    if(this.visible)
    {
        var ctx = this.ctx;
        this.clear();
        
        // Save the current context
        ctx.save();

        // get the translation to apply to center the image
        var newWidth = this.width * this.scaleX;
        var newHeight = this.height * this.scaleY;
        var panX = -((newWidth-this.width)/2);
        var panY = -((newHeight-this.height)/2);

        // Apply modifications (zoom, translation) all elements drawing after this will have the modifications
        ctx.translate(panX, panY);
        ctx.scale(this.scaleX,this.scaleY);

        // Draw all elements
        this.image.draw(ctx);
        
        if(this.isBaseline)
        {
            var rect = this.canvas.getBoundingClientRect();
            var mx = Math.floor((0-rect.left)/(rect.right-rect.left)*this.canvas.width);
            var startX = parseInt((mx - panX) / this.scaleX);

            //Baseline
            ctx.beginPath();
            ctx.moveTo(startX, this.image.y + this.position_baseline);
            ctx.lineTo(this.width*2, this.image.y + this.position_baseline);
            ctx.lineWidth = 1;
            ctx.strokeStyle = COLOR_PREVIEW_BASELINE;
            ctx.stroke();
        }
        else
        {
            //UpLine
            ctx.beginPath();
            ctx.moveTo(0, this.image.y + this.position_up_line);
            ctx.lineTo(this.width, this.image.y + this.position_up_line);
            ctx.lineWidth = 1 / this.scaleY;
            ctx.strokeStyle = COLOR_PREVIEW_LINES;
            ctx.stroke();

            //DownLine
            ctx.beginPath();
            ctx.moveTo(0, this.image.y + this.position_down_line);
            ctx.lineTo(this.width, this.image.y + this.position_down_line);
            ctx.lineWidth = 1 / this.scaleY;
            ctx.strokeStyle = COLOR_PREVIEW_LINES;
            ctx.stroke();

            //LeftLine
            ctx.beginPath();
            ctx.moveTo(this.image.x + this.position_left_line, 0);
            ctx.lineTo(this.image.x + this.position_left_line, this.height);
            ctx.lineWidth = 1 / this.scaleX;
            ctx.strokeStyle = COLOR_PREVIEW_LINES;
            ctx.stroke();

            //RightLine
            ctx.beginPath();
            ctx.moveTo(this.image.x + this.position_right_line, 0);
            ctx.lineTo(this.image.x + this.position_right_line, this.height);
            ctx.lineWidth = 1 / this.scaleX;
            ctx.strokeStyle = COLOR_PREVIEW_LINES;
            ctx.stroke();

            //Baseline
            ctx.beginPath();
            ctx.setLineDash([5,2]);
            ctx.moveTo(0, this.image.y + this.position_baseline);
            ctx.lineTo(this.width , this.image.y + this.position_baseline);
            ctx.lineWidth = 1 / this.scaleX;
            ctx.strokeStyle = COLOR_PREVIEW_BASELINE;
            ctx.stroke();
        }
        // Restore the context
        ctx.restore();
    }
}

/*!
 * Zoom the image on a object
 * \memberof CanvasState
 * \param obj object to zoom on
 * \param id of the selected object
 */
PreviewCanvas.prototype.zoomTo = function(obj, id){

    if(obj instanceof Rectangle)
    {
        this.idElementSelected = id;
        var rect = obj;
        this.image.x = (this.width/2) - rect.rect.x - rect.rect.w/2;
        this.image.y = (this.height/2) - rect.rect.y - rect.rect.h/2;
        
        this.scaleX = (this.height /rect.rect.h) - (this.height /rect.rect.h)/2;
        this.scaleY = this.scaleX;
        
        var actualRect = rect.rect;
        this.isBaseline = false; 
    }
    else if (obj instanceof Line)
    {
        var line = obj;
        this.image.x = (this.width/2) - ((line.finishx - line.startx)/2 + line.startx);
        this.image.y = (this.height/2) - line.y;

        this.scaleX = this.width /(line.finishx - line.startx);
        this.scaleY = this.height / (this.image.img.height / 20);

        this.isBaseline = true;
        this.position_baseline = line.y;
        this.idElementSelected = id;
    }
    
}

/*!
 * List of character from labelised Component
 * \class ListCharacter
 */
function ListCharacter(){
    this.list = new Map();
}

/*!
 * Add character to the list
 * \memberof ListCharacter
 * \param character character to add
 */
ListCharacter.prototype.addToCharacter = function(character){
    var number = 0;
    if(this.list.has(character))
        number = this.list.get(character);
    this.list.set(character, number+1);
}

/*!
 * Remove character to the list
 * \memberof ListCharacter
 * \param character character to remove
 */
ListCharacter.prototype.removeToCharacter = function(character){
    if(this.list.has(character))
    {
        var number = this.list.get(character);
        number--;
        if(number > 0)
            this.list.set(character, number);
        else
            this.list.delete(character);
    }
}

/*!
 * Draw the list of character
 * \memberof ListCharacter
 */
ListCharacter.prototype.draw = function(){
    var listHTMl = $("#letter-list");
    listHTMl.empty();
    for (var [key, value] of this.list)
      listHTMl.append( "<li class=\"col-sm-15 listItem\" data-character=\"" + key + "\">" + key + "<span class=\"pull-right letter-number\">" + value + "</span></li>");
}

/*!
 * Init all element to usage
 * \param src source of the image
 * \param boundingBox list of boundingBox from the server
 * \param baselines list of baselines from the server
 */
function init(src, boundingBox, baseline) {
    var image = new ProcessingImage(src);
    var imagePreview = new ProcessingImage(src);
    

    var listRect = new Array();
    for (var rect in boundingBox) {
        listRect.push(new Rectangle({x:boundingBox[rect].x, y:boundingBox[rect].y, w:boundingBox[rect].width, h: boundingBox[rect].height},boundingBox[rect].idCC, boundingBox[rect].idLine));
    } 
    var boundingBox = new BoundingBox(listRect);
    
    var listBaseline = new Array();
    for (var line in baseline) {
        listBaseline.push(new Line(baseline[line].idLine, baseline[line].x_begin,baseline[line].y_baseline,baseline[line].x_end));
    }
    var baseline = new Baseline(listBaseline);

    var previewCanvas = new PreviewCanvas(document.getElementById('small_canvas'), imagePreview);
    var normalCanvas = new CanvasState(document.getElementById('canvas'), image, baseline, boundingBox);


    var listCharacter = new ListCharacter();
    var controller = new Controller(normalCanvas, previewCanvas, listCharacter);
}







