/*
 Highcharts JS v7.2.2 (2020-08-24)

 Module for adding patterns and images as point fills.

 (c) 2010-2019 Highsoft AS
 Author: Torstein Hnsi, ystein Moseng

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?(c["default"]=c,module.exports=c):"function"===typeof define&&define.amd?define("highcharts/modules/pattern-fill",["highcharts"],function(f){c(f);c.Highcharts=f;return c}):c("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(c){function f(e,c,f,n){e.hasOwnProperty(c)||(e[c]=n.apply(null,f))}c=c?c._modules:{};f(c,"modules/pattern-fill.src.js",[c["parts/Globals.js"],c["parts/Utilities.js"]],function(e,c){function f(a,b){a=JSON.stringify(a);
var q=a.length||0,d=0,c=0;if(b){b=Math.max(Math.floor(q/500),1);for(var e=0;e<q;e+=b)d+=a.charCodeAt(e);d&=d}for(;c<q;++c)b=a.charCodeAt(c),d=(d<<5)-d+b,d&=d;return d.toString(16).replace("-","1")}var n=c.erase,p=c.pick;c=e.addEvent;var u=e.wrap,t=e.merge;e.Point.prototype.calculatePatternDimensions=function(a){if(!a.width||!a.height){var b=this.graphic&&(this.graphic.getBBox&&this.graphic.getBBox(!0)||this.graphic.element&&this.graphic.element.getBBox())||{},c=this.shapeArgs;c&&(b.width=c.width||
b.width,b.height=c.height||b.height,b.x=c.x||b.x,b.y=c.y||b.y);if(a.image){if(!b.width||!b.height){a._width="defer";a._height="defer";return}a.aspectRatio&&(b.aspectRatio=b.width/b.height,a.aspectRatio>b.aspectRatio?b.aspectWidth=b.height*a.aspectRatio:b.aspectHeight=b.width/a.aspectRatio);a._width=a.width||Math.ceil(b.aspectWidth||b.width);a._height=a.height||Math.ceil(b.aspectHeight||b.height)}a.width||(a._x=a.x||0,a._x+=b.x-Math.round(b.aspectWidth?Math.abs(b.aspectWidth-b.width)/2:0));a.height||
(a._y=a.y||0,a._y+=b.y-Math.round(b.aspectHeight?Math.abs(b.aspectHeight-b.height)/2:0))}};e.SVGRenderer.prototype.addPattern=function(a,b){b=p(b,!0);var c=e.animObject(b),d=a.width||a._width||32,g=a.height||a._height||32,f=a.color||"#343434",k=a.id,n=this,l=function(a){n.rect(0,0,d,g).attr({fill:a}).add(h)};k||(this.idCounter=this.idCounter||0,k="highcharts-pattern-"+(this.chartIndex||0)+"-"+this.idCounter,++this.idCounter);this.defIds=this.defIds||[];if(!(-1<this.defIds.indexOf(k))){this.defIds.push(k);
var h=this.createElement("pattern").attr({id:k,patternUnits:"userSpaceOnUse",patternContentUnits:a.patternContentUnits||"userSpaceOnUse",width:d,height:g,x:a._x||a.x||0,y:a._y||a.y||0}).add(this.defs);h.id=k;if(a.path){var m=a.path;a.backgroundColor&&l(a.backgroundColor);l={d:m.d||m};this.styledMode||(l.stroke=m.stroke||f,l["stroke-width"]=p(m.strokeWidth,2),l.fill=m.fill||"none");m.transform&&(l.transform=m.transform);this.createElement("path").attr(l).add(h);h.color=f}else a.image&&(b?this.image(a.image,
0,0,d,g,function(){this.animate({opacity:p(a.opacity,1)},c);e.removeEvent(this.element,"load")}).attr({opacity:0}).add(h):this.image(a.image,0,0,d,g).add(h));a.image&&b||void 0===a.opacity||[].forEach.call(h.element.childNodes,function(b){b.setAttribute("opacity",a.opacity)});this.patternElements=this.patternElements||{};return this.patternElements[k]=h}};u(e.Series.prototype,"getColor",function(a){var b=this.options.color;b&&b.pattern&&!b.pattern.color?(delete this.options.color,a.apply(this,Array.prototype.slice.call(arguments,
1)),b.pattern.color=this.color,this.color=this.options.color=b):a.apply(this,Array.prototype.slice.call(arguments,1))});c(e.Series,"render",function(){var a=this.chart.isResizing;(this.isDirtyData||a||!this.chart.hasRendered)&&(this.points||[]).forEach(function(b){var c=b.options&&b.options.color;c&&c.pattern&&(!a||b.shapeArgs&&b.shapeArgs.width&&b.shapeArgs.height?b.calculatePatternDimensions(c.pattern):(c.pattern._width="defer",c.pattern._height="defer"))})});c(e.Point,"afterInit",function(){var a=
this.options.color;a&&a.pattern&&("string"===typeof a.pattern.path&&(a.pattern.path={d:a.pattern.path}),this.color=this.options.color=t(this.series.options.color,a))});e.addEvent(e.SVGRenderer,"complexColor",function(a){var b=a.args[0],c=a.args[1];a=a.args[2];var d=b.pattern,g="#343434";if(!d)return!0;if(d.image||"string"===typeof d.path||d.path&&d.path.d){var r=(r=a.parentNode&&a.parentNode.getAttribute("class"))&&-1<r.indexOf("highcharts-legend");"defer"!==d._width&&"defer"!==d._height||e.Point.prototype.calculatePatternDimensions.call({graphic:{element:a}},
d);if(r||!d.id)d=t({},d),d.id="highcharts-pattern-"+(this.chartIndex||0)+"-"+f(d)+f(d,!0);this.addPattern(d,!this.forExport&&p(d.animation,this.globalAnimation,{duration:100}));g="url("+this.url+"#"+d.id+")"}else g=d.color||g;a.setAttribute(c,g);b.toString=function(){return g};return!1});e.addEvent(e.Chart,"endResize",function(){(this.renderer&&this.renderer.defIds||[]).filter(function(a){return a&&a.indexOf&&0===a.indexOf("highcharts-pattern-")}).length&&(this.series.forEach(function(a){a.points.forEach(function(a){(a=
a.options&&a.options.color)&&a.pattern&&(a.pattern._width="defer",a.pattern._height="defer")})}),this.redraw(!1))});e.addEvent(e.Chart,"redraw",function(){var a=[],b=this.renderer,c=(b.defIds||[]).filter(function(a){return a.indexOf&&0===a.indexOf("highcharts-pattern-")});c.length&&([].forEach.call(this.renderTo.querySelectorAll('[color^="url(#"], [fill^="url(#"], [stroke^="url(#"]'),function(b){(b=b.getAttribute("fill")||b.getAttribute("color")||b.getAttribute("stroke"))&&a.push(b.substring(b.indexOf("url(#")+
5).replace(")",""))}),c.forEach(function(c){-1===a.indexOf(c)&&(n(b.defIds,c),b.patternElements[c]&&(b.patternElements[c].destroy(),delete b.patternElements[c]))}))});e.Chart.prototype.callbacks.push(function(a){var b=e.getOptions().colors,c=a.index,d=a.options.chart.forExport;"M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11;M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9;M 3 0 L 3 10 M 8 0 L 8 10;M 0 3 L 10 3 M 0 8 L 10 8;M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7;M 3 3 L 8 3 L 8 8 L 3 8 Z;M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0;M 10 3 L 5 3 L 5 0 M 5 10 L 5 7 L 0 7;M 2 5 L 5 2 L 8 5 L 5 8 Z;M 0 0 L 5 10 L 10 0".split(";").forEach(function(e,
f){a.renderer.addPattern({id:"highcharts-default-pattern-"+(c&&!d?c+"-":"")+f,path:e,color:b[f],width:10,height:10})})})});f(c,"masters/modules/pattern-fill.src.js",[],function(){})});
//# sourceMappingURL=pattern-fill.js.map