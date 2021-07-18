var myname = "HTBibel";

var onAndroid = /Android/i.test(navigator.userAgent); // gives wrong result for non-mobile view
//var oniPad = /iPad/i.test(navigator.userAsgent);
//http://www.google.com/chrome/intl/en/webmasters-faq.html
//var onChrome = /Chrome/i.test(navigator.userAgent); // Google Chrome
//var onFirefoxMobile = /Fennec/i.test(navigator.userAgent);
var onIE5678  = /MSIE [5678].0/i.test(navigator.userAgent); // IE up to 8?
var onIE      =  /MSIE /i.test(navigator.userAgent); // IE
var onWebKit  = /WebKit/i.test(navigator.userAgent); // WebKit including Google Chrome and Safari

inbook = /\d+\.html$/.test(location.pathname) ||
        (/index\.html$/.test(location.pathname) && !/^HTBibel/.test(document.title));
importCSS(localURL('custom.css'));

//http://developer.android.com/reference/android/webkit/WebView.html
var pixelRatio = (window.devicePixelRatio ? window.devicePixelRatio : 1);
// http://stackoverflow.com/questions/5021090/screen-width-android
smallDisplay = (Math.min(screen.width, screen.height)/pixelRatio <= 600 // e.g. Android phone
								|| onAndroid); // some Android browers initially give wrong values for screen.height/width
                   // Chrome gets the coordinates wrong : too large!
if(smallDisplay) {
  // scroll the whole page
  importCSS(localURL('small.css'));
  // document.body.style.overflow = 'visible';
}
//else document.getElementById('main').style.bottom = 0; /* important for scrolling to give height, optimally relative to bottom */

var menu;
var menuL;
var menuR;
var page;
var main;
var about;

// http://stackoverflow.com/questions/3646914/how-do-i-check-if-file-exists-in-jquery-or-javascript
function existsURL(url) {
  var http = new XMLHttpRequest();
  try {
    http.open('HEAD', url, false);
    http.send(); // Firefox bug: JS console shows (uncatchable) parse error e.g. on &middot;
  }
  catch(e) {
    return false;
  }
  return http.status != 404;
}

//http://forums.devshed.com/javascript-development-115/difference-between-document-location-href-and-window-location-470304.html
function setURL(href) {
  location.href = href;
}

//http://forums.digitalpoint.com/showthread.php?t=146094
function include(url)
{
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  head.appendChild(script);
}

//http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS
function importCSS(url) {
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');
  link.type = 'text/css';
  link.href = url;
  link.rel = 'stylesheet';
  link.media = 'screen';
  head.appendChild(link);
}

function localURL(href) {
  return (inbook ? '../' : '') + href;
}

var ialerts=0;
function ialert(msg) {
  if(ialerts++ < 1)
    alert(myname+" internal error\n"+msg);
}

var dalerts=0;
function debug(msg) {
  if(dalerts++ < 5)
    alert(myname+" debug output:\n"+msg+"\n\nPlease contact the developer\nquoting the above error message.");
}

function assert(name, val) {
  if(!val)
    debug("assertion '"+name+"' failed");
}

function nodestr (n) {
  return n ?  "type: "+n.type+" name: "+n.nodeName/*.toLowerCase()*/+"\nid: "+n.id+"\nclass: "+n.className
             +(n.stlye ? "\ndisplay: "+n.style.display : "")
             +(n.innerHTML ? "\nhtml: "+n.innerHTML.substring(0,100) : "")
           : "null";
}

function debugnode (n) {
  debug(nodestr(n));
}

//unused
function inspect(obj, maxLevels, level)
{
  var str = '', type, msg;

    // Start Input Validations
    // Don't touch, we start iterating at level zero
    if(level == null)  level = 0;

    // At least you want to show the first level
    if(maxLevels == null) maxLevels = 1;
    if(maxLevels < 1)
        return '<font color="red">Error: Levels number must be > 0</font>';

    // We start with a non null object
    if(obj == null)
    return '<font color="red">Error: Object <b>NULL</b></font>';
    // End Input Validations

    // Each Iteration must be indented
    str += '<ul>';

    // Start iterations for all objects in obj
    for(property in obj)
    {
      try
      {
          // Show "property" and "type property"
          type =  typeof(obj[property]);
          str += '<li>(' + type + ') ' + property +
                 ( (obj[property]==null)?(': <b>null</b>'):('')) + '</li>';

          // We keep iterating if this property is an Object, non null
          // and we are inside the required number of levels
          if((type == 'object') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1);
      }
      catch(err)
      {
        // Is there some properties in obj we can't access? Print it red.
        if(typeof(err) == 'string') msg = err;
        else if(err.message)        msg = err.message;
        else if(err.description)    msg = err.description;
        else                        msg = 'Unknown';

        str += '<li><font color="red">(Error) ' + property + ': ' + msg +'</font></li>';
      }
    }

      // Close indent
      str += '</ul>';

    return str;
}

//////////////////////////////////////////////////////////////////////////

/*Frame problems
  http://groups.google.com/a/chromium.org/group/chromium-extensions/browse_thread/thread/00b9c72b0ac03e0d
  use window.frames[...].contentDocument ?
  http://stackoverflow.com/questions/2570718/how-to-call-a-javascript-function-from-one-frame-to-another-in-chrome-webkit-with
  http://www.google.com/support/forum/p/Chrome/thread?tid=5193bc3213e0773e&hl=en  chrome ignoring target command
*/

//adapted from http://javascript.about.com/library/bldom08.htm
function getElementsByClassName (n,cl) {
  var retnode = [];
  var myclass = new RegExp('\\b'+cl+'\\b');
  var elem = n.getElementsByTagName('*');
  for (var i = 0; i < elem.length; i++) {
    var classes = elem[i].className;
    if (myclass.test(classes)) retnode.push(elem[i]);
  }
  return retnode;
};

function createHTMLNode(id, cls, html)
{
  var n = document.createElement("span");
	if(id)
		n.setAttribute("id", id);
	if(cls)
  n.className = cls; //n.setAttribute("class","html"); // IE7 buggy
  n.innerHTML = html;
  return show(n);
}

function getDocWidth() {
  var D = document;
  return Math.max(
		  Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
		  Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
		  Math.max(D.body.clientWidth, D.documentElement.clientWidth)
		  );
}

function getDocHeight() {
  var D = document;
  return Math.max(
		  Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
		  Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
		  Math.max(D.body.clientHeight, D.documentElement.clientHeight)
		  );
}

/*http://javascript.about.com/od/browserobjectmodel/a/bom10.htm*/
function getWinWidth() {
  return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / pixelRatio;
}

function getWinHeight() {
  return (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) / pixelRatio;
}

function scrollLeft() {
  return document.documentElement.scrollLeft + document.body.scrollLeft;
}

function scrollTop() {
  return document.documentElement.scrollTop + document.body.scrollTop;
}

//inspired by http://www.quirksmode.org/js/findpos.html
function posXY(obj) {
  var left = 0;
  var top  = 0;
  do {
    left += obj.offsetLeft;
     top += obj.offsetTop;
	}
  while (obj = obj.offsetParent);
  return [left, top];
}

//http://msdn.microsoft.com/en-us/library/ms536343%28v=vs.85%29.aspx
function addListener (control, eventName, handler) {
if(control.addEventListener) //Standard W3C
  return control.addEventListener(eventName, handler, false);
 else if (control.attachEvent) //IExplore
  return control.attachEvent("on"+eventName, handler);
 else
   return false;
}

function mouseX(e) {
  if (e.pageX)
    return e.pageX;
  else if (e.clientX)
    return e.clientX + scrollLeft();
  else return null;
}

function mouseY(e) {
  if (e.pageY)
    return e.pageY;
  else if (e.clientY)
    return e.clientY + scrollTop();
  else return null;
}


//TODO clean up this function form http://stackoverflow.com/questions/2531737/javascript-incapable-of-getting-elements-max-height-via-element-style-maxheight
//See also: http://www.quirksmode.org/dom/getstyles.html
function getStyle(el, styleProp) {
  var value, defaultView = (el.ownerDocument || document).defaultView;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) { // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g,
      function(str, letter) { return letter.toUpperCase(); }
				  );
    value = el.currentStyle[styleProp];
    // convert other units to pixels on IE
    if (/^-?\d*\.?\d+(em|pt|%|ex)?$/i.test(value)) {
      return (function(value) {
        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      })(value);
    }
    return value;
  }
  return ialert ("getStyle() should not arrive here");
}

function adapt_top_left(n) { // adapt relative positioning, used for footnotes
  var tw = document.getElementById("triggerL").offsetWidth;
  var cn = document.getElementById("content");
  var leftmargin    = 1*getStyle(cn, "padding-left"  ).replace(/px/,"") + tw;
  var rightmargin   = 1*getStyle(cn, "padding-right" ).replace(/px/,"") + tw;
  var bottommargin  = 1*getStyle(cn, "padding-bottom").replace(/px/,"");
  var offsetLeftRel = 1*getStyle(n,"left").replace(/px/,""); //on IE, offsetLeft wrong for relative positioning
  var offsetTopRel  = 1*getStyle(n,"top" ).replace(/px/,""); //on IE, offsetTop  wrong for relative positioning

// absolute position of node n:
	var XY = posXY(n);
	var x = XY[0]; // n.offsetLeft/* initially = style.left */+n.offsetParent.offsetLeft;
	var y = XY[1]; // n.offsetTop /* initially = style.top  */+n.offsetParent.offsetTop;
/*http://stackoverflow.com/questions/442404/dynamically-retrieve-html-element-x-y-position-with-javascript
  <script src="http://code.jquery.com/jquery-latest.js"></script>
  var x = $(n).offset().left;
  var y = $(n).offset().top;
*/
// for issues with Chromium and Opera, skip n.offsetParent and add width of footnote reference [X]
// for IE5..8, use n.offsetParent rather than n.offsetParent.offsetParent and substract the offset below
  var parent = (onIE5678 ? n.offsetParent : n.offsetParent.offsetParent);
  var x = n.offsetLeft + parent.offsetLeft + (onIE5678 ? parent.offsetParent.offsetLeft : 1.2*getStyle(n.offsetParent,"font-size").replace(/px/,""));
	var y = n.offsetTop  + parent.offsetTop  + (onIE5678 ? parent.offsetParent.offsetTop  : 0);
//debug([x, y, n.offsetLeft ,n.offsetParent.offsetLeft ,n.offsetParent.offsetParent.offsetLeft ,n.offsetParent.offsetParent.offsetParent.offsetLeft]);

  offsetLeftRel = (offsetLeftRel - Math.max(0, x + n.offsetWidth  +  rightmargin - cn.offsetWidth )); // correct right
  n.style.left  = (offsetLeftRel - Math.min(0, x                  -   leftmargin)- 0               ) + 'px'; /* correct left also,
                          giving it precendence, such that the right hand side is clipped if the node n is too wide for the screen */
  n.style.top   = (offsetTopRel  - Math.max(0, y + n.offsetHeight + bottommargin - cn.offsetHeight)) + 'px'; // correct bottom
}

function set_top(n, y) {
  var top = Math.max(0, Math.min(y, getDocHeight() - n.offsetHeight));
  n.style.top = (top) + 'px'; //scrollTop() always 0?
}

function target(e) {
  //  return ((window.event) ? e.srcElement : e.target);
  var t;
  if (e.target)
    t = e.target;
  else if (e.srcElement)
    t = e.srcElement;
  if (t.nodeType == 3) // defeat Safari bug
    t = t.parentNode;
  return t;
}

function prependChild(n,c) {
  var first=n.firstChild;
  if(first)
    n.insertBefore(c,first);
  else
    n.appendChild(c);
}

function child(n, type, cls) {
  for(var i=0; i<n.childNodes.length; i++) {
    if((!type || n.childNodes[i].nodeName.toLowerCase() == type) &&
       (!cls  || n.childNodes[i].className              == cls )) // getAttribute("class") IE7 buggy
      break;
  }
  if (i<n.childNodes.length)
    return n.childNodes[i];
  else
    return ialert("Cannot find child node with type="+type+" and class="+cls+" of:\n"+nodestr(n));
}

function related_tonode(e) {
  return e.relatedTarget ? e.relatedTarget : e.toElement; //IE7 does not support relatedTarget
}

function currenttarget(ids,cls,e) { // event may have happened in child
  //  var n = e.currentTarget; is not supported by IE7 :-(
  for(var n = target(e); n; n = n.parentNode) {
    var found_id = false;
    for(var i=0; n.id && i<ids.length; i++)
      if(n.id == ids[i])
        found_id = true;
    if(found_id || cls && n.className && (n.className+" ").indexOf(cls+" ") !== -1)
      return n;
  }
  ialert("Cannot find actual target node of "+nodestr(target(e))+"\nwith id in "+ids+" or with class "+cls);
  return n;
}

function trigger(e) {
  return currenttarget(["triggerL","triggerR","spotL","spotR","old","new"],null,e);
}

function html_textlength(html) {
//html = html.replace(/&[a-z]+;/g, "");
  html = html.replace(/<[^>]+>/g, "");
  return html.length;
}

function fix_spots() {
  var spotL = document.getElementById('spotL');
  var spotR = document.getElementById('spotR');
	var height = Math.max(spotL.offsetHeight, spotR.offsetHeight);
  var XOffset = window.pageXOffset ? window.pageXOffset : document.documentElement.scrollLeft; // IE7 hack
  var YOffset = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop ; // IE7 hack
  var newX  = Math.max(XOffset,document.body.scrollLeft);
  var newY  = Math.max(YOffset,document.body.scrollTop);
	var spot_top = (newY+(getWinHeight())/2-height);
	if (smallDisplay) {
		var menu_top = (newY-spot_top-menu.offsetHeight);
		menuL.style.top = menu_top+"px";
		menuR.style.top = menu_top+"px";
	}
  spotL.style.top   = spot_top+"px";
  spotR.style.top   = spot_top+"px";
	var spot_side = (0*newX+5);
  spotL.style.left  = spot_side;
  spotR.style.right = spot_side;
}

// unused and buggy on Dolphin
function hrefhandler(e) { // to circumvent Firefox problem for mouseclicks in upper menu
  if (!e) e = window.event; //IE hack
  var url = target(e).getAttribute("href");
  if(/:/.test(url)) // IE7 produces absolute URLs
    location.href=url;
  else
    location.href=location.href.replace(/[^/\\]*$/,"")+url; // cannot reproduce Firefox DOM exception for this line
  return false;
};


// using style.display rather than style.visibility because Opera does not refresh the window on style.visibility changes
function isshown(n) {
/*if (n.className == "footnote_box")
		return n.style.zIndex == "1";
  else*/
		return (n.style.display != 'none'); // also covers default/unset value //n.style.visibility != 'hidden';
}

function show(n) {
/*if (n.className == "footnote_box")
		n.style.zIndex = "1";
  else*/
	n.style.display = 'inline'; //n.style.visibility = 'visible';
  return n;
}

function hide(n) {
  if(isshown(n)) { // for efficiency?
/*	if (n.className == "footnote_box")
			n.style.zIndex = "-1";
		else*/
			n.style.display = 'none'; //n.style.visibility = 'hidden';
	}
  return n;
}

function popnode(n, hint, delay, e) {
  if (!e) e = window.event; // IE hack
  if(!isshown(n)) { // not already on display
    if(hint)
      show(hint);
    var y = mouseY(e); // On IE7, cannot accesss the event after the timeout
    var timer = setTimeout(function() { popup(n, y); }, delay);
    trigger(e).onmouseout = function (e) {
      clearTimeout(timer);
      if(hint)
	hide(hint);
      if (!e) e = window.event; // IE hack
      var t = trigger(e);
      for(var tn = related_tonode(e); tn && tn != t; tn = tn.parentNode); // see if mouse went out of trigger element
      if(!tn)
	hide(n);
      return (!tn); // cancel event only if sufficiently handled
    }
    return true; // cancel event
  }
  return true; // cancel event

}

function popup(n, y) {
  show(n); // must do this before moving in order to get correct height
  if(/^(menuL|menuR)$/.test(n.id)) {
    n.style.top = (- n.offsetHeight/3) + 'px'   ;// set_top (n, 0*y + 0*posY(n) - n.offsetHeight/2);
  }
  //n.onmouseout = function () { hide(n); };
  //    n.onclick    = function () { hide(n); };
}

//////////////////////////////////////////////////////////////////////////

function popmenu(hint, delay, e) {
  //e = e || window.event; // IE hack
  if (!e) e = window.event; // IE hack
  var n = child(trigger(e), 'div', 'menu');
  return popnode(n, hint, delay, e);
}

function initpage(chapnum,lastchap,planindex) {
	assert("inbook_consistent", inbook == (lastchap != 0));

	menu = document.getElementById('menu');
	page = document.getElementById('page');
	main = document.getElementById('main');
	about = document.getElementById('about');
	header = document.getElementById('header');

	if(smallDisplay) {
		if(e=document.getElementById('index_old'))
			e.innerHTML = menu1.replace(/\.\.\//g, "");
		if(e=document.getElementById('index_new'))
			e.innerHTML = menu2.replace(/\.\.\//g, "");
		// TODO: improve the below witdh calculations
		if(document.getElementById('index_old'))
			page.style.width=(header.offsetWidth*1.7)+"px";
		else if(document.getElementById('index_new'))
			page.style.width=(header.offsetWidth*1.6)+"px";
		else if(document.getElementById('plantable'))
			page.style.width=(header.offsetWidth*1.0)+"px";
	}

  if(onIE5678) { /* workaround for upto IE8 */
    main.style.overflowY = 'hidden';
    main.style.position = 'relative';
  }
  initquick('quick1',chapnum,lastchap);
  initquick('quick2',chapnum,lastchap);
  initfootnotes(document); // there is also initfootnotes(list) in search.js
  highlight();
  initmenus();
  initplan(planindex);
  initmarkers();
  showmarkers();
  initpassage();
//initswipeactions();
  if(!smallDisplay) {
    var adapt_page_top = function () {
      page.style.top = menu.offsetHeight + 'px';
    };
    adapt_page_top();
    window.onresize = adapt_page_top;
  }
  if (onAndroid) {  // workaround for partly missing browser text re-flow on Android"
    var innerWidth = 0;
    var text_reflow = function () {
      if (window.innerWidth != innerWidth) {
	innerWidth = window.innerWidth;
	document.getElementsByTagName('body')[0].style.width = innerWidth+'px';
      }
    };
    document.body.style.zoom = "100%";
    text_reflow();
    setInterval(text_reflow, 500);
    /* would also work:
      window.onresize = text_reflow;
      addListener(window, 'touchstart', function (e) { text_reflow(); });
    */
  }
}



function torelativeURL(l) {
  return l
      .replace(/\\/g, "/") // Windows path separator nonsense: \ vs. /
      .replace(/([^/]*\/[^/\.]*\.html[^#]*)/,"\t$1\t")
      .replace(/[^\t]*\t([^\t]*)\t.*/,"$1")  // pick last part matching X/Y.html
      .replace(myname+"/","");
}

var menudelay = 500;
function initmenus() {
  function createmenu(id,menu) {
    var bookpat = torelativeURL(location.pathname).replace(/\d+\.html/,"index.html");
    if(inbook)
      menu = menu.replace(new RegExp('<a( href="\.\.\/'+bookpat+'")',""),
			  '<a class="active"$1'); // highlight sub-entry
    else
      menu = menu.replace(/\.\.\//g,"");
    var n = document.createElement("div");
    n.className = 'menu';
    n.setAttribute("id",id);
    n.innerHTML = menu;
    return hide(n);
  }
  function initmenu(side,spottext,menu)
  {
    var menu0 = function (e) { return popmenu(null, 0, e) };
    var uppertrigger = document.getElementById(side == 'L' ? 'old' : 'new');
    prependChild(uppertrigger, createmenu('uppermenu'+side,menu));
		uppertrigger.onmouseover = menu0;
//  uppertrigger.onclick = hrefhandler;

		var outertrigger = document.createElement("div");
		outertrigger.className = 'trigger';
		outertrigger.setAttribute("id", 'trigger'+side);
		/*outertrigger.innerHTML="#";*/
    /* outertrigger.style.height = main.scrollHeight+'px';
		   much better: using	display: table-cell; http://css-tricks.com/fluid-width-equal-height-columns/
    */
		if(side == 'L')
			prependChild(main, outertrigger);
		else
			main.appendChild(outertrigger);

    var spot = hide(createHTMLNode('spot'+side, 'spot', spottext));
//    if(!smallDisplay)      hide(spot);
    var menuLR = createmenu('menu'+side,menu);
    prependChild(spot,menuLR);
    outertrigger.appendChild(spot);
  //outertrigger.onmouseover = function (e) { return popnode(menuLR, spot, menudelay, e) };
    outertrigger.onmouseover = function (e) { return popnode(spot, null, 0*menudelay, e) };
    spot.onmouseover = function (e) { return popnode(menuLR, null, smallDisplay ? 0 : menudelay, e) };
    spot.onclick     = menu0;
    return menuLR;
  }
  var spottext1  = /*"M<br>e<br>n<br>ü<br> <br>"*/"A<br>T<br>";
  var spottext2  = spottext1.replace("A","N");
  menuL = initmenu('L',spottext1,menu1);
  menuR = initmenu('R',spottext2,menu2);
  if(smallDisplay) setInterval(fix_spots, 100); // avoid buggy Android browser implementation of "position=fixed"
}

var footnotedelay = 500;
function initfootnotes(node) {
  var fns = getElementsByClassName(node,'footnote');
  var f  = function (e) { footnote(footnotedelay, e) };
  var f0 = function (e) { footnote(0            , e) };
  for(var i = 0; i < fns.length; i++) {
    var fn = fns[i];
    if(!/fnexpand/.test(fn.className)) {
      fn.onmouseover = f;
      fn.onclick     = f0;
      var box = document.createElement("span");
      box.className = "footnote_box";
      var html  = fn.innerHTML;
			var l = html_textlength(html);
      if (l<36) { // 	width: 18em;
				box.style.width = (l*.5)+"em";
			}
      var m = html.match(/^\[\d+\]/);
      var id = (m ? m[0] : "");
      fn.innerHTML = id;
      var html = '<span class="footnote_close">'+id+'</span>'+html.substring(id.length,html.length);
      box.innerHTML = html;
      hide(box);

      // insert above box an empty container with relative position (rather than giving the footnote itself a relative position)
      // to circument rendering bug: any element to the right of the footnote with relative position appears in the footnote box
      var c = document.createElement("span");
      c.className = "container";
      c.appendChild(box);
      fn.appendChild(c);
    }
  }
}

function footnote(delay, e) {
  if (!e) e = window.event; //IE hack
  var fn  = currenttarget([],"footnote",e);
  var box = child(true ? child(fn, "span", "container") : fn, "span", "footnote_box");
  //if(!box) ialert("Cannot find footnote box for: "+fn.innerHTML.split(/^\[\d+\] /)[0]);
  if(!isshown(box)) {
    var close = child(box, "span", "footnote_close");
    if(close) {
      var timer=setTimeout(function() {
			     show(box);
			     adapt_top_left(box);
			     close.onmouseover = function () { hide(box);}},
			   delay);
      fn.onmouseout = function() { clearTimeout(timer); }; // buggy on Konqueror
    }
    else
      ialert("Cannot find footnote close for: "+fn.innerHTML.split(/^\[\d+\] /)[0]);
  }
  else
    if(delay == 0) // onclick
      hide(box);
}


//unused
var lasthide = 0;
function footnote0(fn) {
  //  if (window.event.fromElement == fn) return;
  if(true ) var box   = child(fn , "span", "footnote_box"  );
  if(box  ) var close = child(box, "span", "footnote_close");
  if(close) {
    if(box.style.visibility != 'visible') {
      if(new Date().getTime()-lasthide > 10) {// prevent immediate re-open
        box.style.visibility = 'visible';
        close.onmouseover = function () { hide(box); lasthide = new Date().getTime(); };
      }
    }
  }
  else
    ialert("Invalid footnote: "+fn.innerHTML.split(/^\[\d+\] /)[0]);
}



//////////////////////////////////////////////////////////////////////////


//backgroundcolors = new Array(
//'#DFAF0B','#E0AE15','#E2AE20','#E3AD2B','#E5BD36','#E7BC40','#E8BC4A','#EABB55','#EBCB60','#EDCB6A','#EFCA76','#F0DA81','#F2D98C','#F3D996','#F5E8A1','#F7E8AB','#F8E7B6','#FAF7C0','#FBF6CB','#FDF6D6','transparent');
//'#DFFF0B','#E0FE15','#E2FE20','#E3FD2B','#E5FD36','#E7FC40','#E8FC4A','#EAFB55','#EBFB60','#EDFB6A','#EFFA76','#F0FA81','#F2F98C','#F3F996','#F5F8A1','#F7F8AB','#F8F7B6','#FAF7C0','#FBF6CB','#FDF6D6','transparent'
function highlight() {
  try { locs = location.search.match(/^\?(.+)/)[1].split(/\./); }
  catch (e) { return; }
  try {
    for (l = 0; l < locs.length; l++) {
      locstr = locs[l];
      var ps = locstr.match(/^(\d+)f(f?)$/);
      if(ps) {
         locstr = ps[1]+"-";
         if(ps[2] == "")
           locstr = locstr+((1*ps[1])+1);
      }
      // IE hacks: IE implementaton of split does not return empty substrings
      if (locstr.charAt(0)=='-')
	locstr="1"+locstr;
      if (locstr.charAt(locstr.length-1)=='-')
	locstr+="IE@";
      locss = locstr.split(/-/);
      i = locss[0].length ? // must be true due to above hack
	  +locss[0].replace(/[ab]$/,"") : 1;  // TODO highlight only first/second half if a/b
      if(locss.length==1)
	j=i;
      else if (locss.length>1 && locss[1] && locss[1] != "IE@")
	j=+locss[1].replace(/[ab]$/,""); // TODO highlight only first/second half if a/b
      else {
	for(last = i; document.getElementById("v"+last) && last<1000; last++);
	j=last-1;
      }
      if(locss.length > 2) throw(0); // error

      if(j < i) { var t = i; i = j; j = t; } // be graceful if order is swapped
      while(i <= j) {
	var v = document.getElementById("v"+(i++));
	//v.style.backgroundColor = backgroundcolors[scolor];
	if(v) // be graceful if verse does not exist
	  v.className += " verse-highlight";
      }
    }
//  scolor++;
//  if( scolor < 20 )   // set to 21 for total blanking
//    setTimeout("highlight()",100);
  }
  catch(e) { ialert ("Invalid reference when highlighting verse(s): "+locs); }
}
//var scolor = 0;
//window.setTimeout("highlight();",1000,"JavaScript");



//////////////////////////////////////////////////////////////////////////

// from http://javascript.about.com/od/problemsolving/a/modulobug.htm
Number.prototype.mod = function(n) {
  return ((this%n)+n)%n;
}

// inspired by http://javascript.about.com/library/blweekyear.htm
// and http://de.wikipedia.org/wiki/Woche#Kalenderwoche
// ndays = offset, starting from 1, from Monday of first week of the current year

var today   = new Date();
//today = new Date(2012,11,31);
//today.setYear(2012);
//today.setMonth(11); //0-11
//today.setDate(31); //1-31
var year    = today.getFullYear();
var newyear = new Date(year,0,1);       // January 1st 0:00
var day     = (newyear.getDay()-1) % 7; // weekday of newyear, starting from 0 = Monday
var offset  = (day < 4 ? 0 : 7) - day;  // according to German DIN convention

function datefromweek1(ndays) {
  var date = new Date(year,0,((ndays+offset-1)%365)+1);
  return (date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear());
}

function ndaysfromweek1() {
  return ((Math.floor((today-newyear)/86400/1000)-offset).mod(365));
}

var plan = ["1Mo/1", "Jos/1", "Ps/1", "Hiob/1", "Jes/1", "Mt/1", "Roem/1", "1Mo/4", "Jos/6", "Ps/3", "Hiob/3", "Jes/7", "Mt/3", "Roem/3", "1Mo/8", "Jos/11", "Ps/6", "Hiob/5", "Jes/12", "Mt/5", "Roem/5", "1Mo/12", "Jos/16", "Ps/9", "Hiob/7", "Jes/18", "Mt/8", "Roem/7", "1Mo/16", "Jos/21", "Ps/12", "Hiob/9", "Jes/23", "Mt/11", "Roem/9", "1Mo/20", "Ri/1", "Ps/15", "Hiob/11", "Jes/29", "Mt/14", "Roem/11", "1Mo/24", "Ri/7", "Ps/18", "Hiob/13", "Jes/34", "Mt/17", "Roem/13", "1Mo/28", "Ri/12", "Ps/21", "Hiob/15", "Jes/40", "Mt/20", "Roem/15", "1Mo/32", "Ri/17", "Ps/24", "Hiob/17", "Jes/45", "Mt/23", "1Kor/1", "1Mo/36", "Ruth/1", "Ps/27", "Hiob/19", "Jes/51", "Mt/26", "1Kor/3", "1Mo/40", "1Sam/1", "Ps/30", "Hiob/21", "Jes/56", "Mk/1", "1Kor/5", "1Mo/44", "1Sam/6", "Ps/33", "Hiob/23", "Jes/62", "Mk/3", "1Kor/7", "1Mo/48", "1Sam/11", "Ps/36", "Hiob/25", "Jer/1", "Mk/5", "1Kor/9", "2Mo/1", "1Sam/16", "Ps/39", "Hiob/27", "Jer/7", "Mk/7", "1Kor/11", "2Mo/5", "1Sam/21", "Ps/42", "Hiob/29", "Jer/12", "Mk/9", "1Kor/13", "2Mo/9", "1Sam/26", "Ps/45", "Hiob/31", "Jer/17", "Mk/11", "1Kor/15", "2Mo/13", "2Sam/1", "Ps/48", "Hiob/33", "Jer/22", "Mk/13", "2Kor/1", "2Mo/17", "2Sam/5", "Ps/51", "Hiob/35", "Jer/27", "Mk/15", "2Kor/4", "2Mo/21", "2Sam/10", "Ps/54", "Hiob/37", "Jer/32", "Lk/1", "2Kor/6", "2Mo/25", "2Sam/15", "Ps/57", "Hiob/39", "Jer/37", "Lk/3", "2Kor/9", "2Mo/29", "2Sam/20", "Ps/60", "Hiob/41", "Jer/42", "Lk/5", "2Kor/11", "2Mo/33", "1Koe/1", "Ps/63", "Spr/1", "Jer/47", "Lk/7", "Gal/1", "2Mo/37", "1Koe/5", "Ps/66", "Spr/2", "Klgl/1", "Lk/9", "Gal/4", "3Mo/1", "1Koe/10", "Ps/69", "Spr/4", "Hes/1", "Lk/11", "Eph/1", "3Mo/4", "1Koe/14", "Ps/72", "Spr/5", "Hes/7", "Lk/13", "Eph/4", "3Mo/7", "1Koe/19", "Ps/75", "Spr/7", "Hes/13", "Lk/15", "Phil/1", "3Mo/10", "2Koe/1", "Ps/78", "Spr/8", "Hes/19", "Lk/17", "Phil/3", "3Mo/13", "2Koe/6", "Ps/81", "Spr/10", "Hes/25", "Lk/19", "Kol/1", "3Mo/16", "2Koe/11", "Ps/84", "Spr/11", "Hes/31", "Lk/21", "Kol/3", "3Mo/19", "2Koe/16", "Ps/87", "Spr/13", "Hes/37", "Lk/22", "1Th/1", "3Mo/22", "2Koe/21", "Ps/90", "Spr/14", "Hes/43", "Joh/1", "1Th/4", "3Mo/25", "1Chr/1", "Ps/93", "Spr/16", "Dan/1", "Joh/3", "2Th/1", "4Mo/1", "1Chr/5", "Ps/96", "Spr/17", "Dan/7", "Joh/5", "1Tim/1", "4Mo/5", "1Chr/10", "Ps/99", "Spr/19", "Hos/1", "Joh/7", "1Tim/4", "4Mo/9", "1Chr/15", "Ps/102", "Spr/20", "Hos/8", "Joh/10", "2Tim/1", "4Mo/13", "1Chr/20", "Ps/105", "Spr/22", "Joel/1", "Joh/13", "2Tim/3", "4Mo/17", "1Chr/25", "Ps/108", "Spr/23", "Am/1", "Joh/16", "Tit/1", "4Mo/21", "2Chr/1", "Ps/111", "Spr/25", "Am/5", "Joh/19", "Phlm/1", "4Mo/25", "2Chr/6", "Ps/114", "Spr/26", "Ob/1", "Apg/1", "Hebr/1", "4Mo/29", "2Chr/11", "Ps/117", "Spr/28", "Jona/1", "Apg/3", "Hebr/5", "4Mo/33", "2Chr/16", "Ps/119", "Spr/29", "Mi/1", "Apg/5", "Hebr/8", "5Mo/1", "2Chr/21", "Ps/120", "Spr/31", "Nah/1", "Apg/7", "Hebr/11", "5Mo/4", "2Chr/25", "Ps/122", "Pred/1", "Hab/1", "Apg/9", "Jak/1", "5Mo/7", "2Chr/29", "Ps/125", "Pred/3", "Zeph/1", "Apg/11", "Jak/4", "5Mo/10", "2Chr/33", "Ps/128", "Pred/5", "Hag/1", "Apg/13", "1Pt/1", "5Mo/13", "Esr/1", "Ps/131", "Pred/7", "Sach/1", "Apg/15", "1Pt/4", "5Mo/16", "Esr/6", "Ps/134", "Pred/9", "Sach/8", "Apg/17", "2Pt/1", "5Mo/20", "Neh/1", "Ps/137", "Pred/11", "Mal/1", "Apg/19", "1Joh/1", "5Mo/23", "Neh/5", "Ps/140", "Hld/1", "Offb/1", "Apg/21", "1Joh/4", "5Mo/26", "Neh/10", "Ps/143", "Hld/3", "Offb/7", "Apg/23", "2Joh/1", "5Mo/29", "Est/1", "Ps/146", "Hld/5", "Offb/12", "Apg/25", "3Joh/1", "5Mo/32", "Est/6", "Ps/149", "Hld/7", "Offb/18", "Apg/27", "Jud/1", 'plan'];

function plantoday() {
  setURL(localURL(plan[ndaysfromweek1()] +".html"));
}

function initquick(id,chapnum,lastchap) {
  if(lastchap == 0 || chapnum == 0 && id == 'quick2')
    return;
  var links = "";
  var quickchap = ' <span class="middot">Kapitel:</span> <select name="ref"'+ // 'Schnellauswahl: '+
	    'onchange="setURL(this[this.selectedIndex].value+\'.html\');"';
//    'onclick ="setURL(this[this.selectedIndex].value+\'.html\');">';
  for(var i=1; i<=lastchap; i++) {
    var selected = i == (chapnum>0 ? chapnum : 1);
    links   += '<span class="chap_link"><a href="'+i+'.html">'+i+'</a></span> ';
    quickchap += '<option value="'+i+'"'+(selected ? ' selected="selected"' : '')+'>'+i+'</option>';
  }
	links += " &nbsp;&nbsp;" // workaround for forcing line breaking for pinch-to-zoom on Android
  quickchap += '</select>\n';
  var quickverse = "";
  if(chapnum == 0) {
    var book_nav1 = getElementsByClassName(document,'book_nav')[0];
    if(book_nav1)
      book_nav1.innerHTML = '<span class="chap_links">'+links+'</span>\n' + book_nav1.innerHTML;
    else
      ialert("Cannot find book navigation node "+'book_nav');
  }
  else {
    quickverse = ' <span class="middot">Vers:</span> <select name="vref" onchange="var v = this[this.selectedIndex].value; setURL(\'?\'+v+vanchor(v));">';
    var verse = location.search.match(/^\?(\d+)/);
    verse = (verse ? verse[1] : 1);
    for(var i=1; document.getElementById("v"+i); i++) {
      var selected = i == verse;
      quickverse += '<option value="'+i+'"'+(selected ? ' selected="selected"' : '')+'>'+i+'</option>';
    }
    quickverse += '</select>';
  }
	var quick = quickchap+quickverse;
	quick = '<div style="display: inline-block;">'+quick+'</div>';	// allow line breaking for pinch-to-zoom on Android
  var q = document.getElementById(id);
  if(q) {
		q.innerHTML = quick;
    //q.onchange = quickchap;
  }
  else
    ialert("Cannot find chapter selection node "+id);
}

var menu1 =
 '<div class="menupad"><div class="menusection menusection2">\n'
+'<ul>\n'
+'	<li><a href="../old.html" title="Altes Testament">Altes&nbsp;Testament</a>\n'
+'	<table><tr><td>\n'
+'	<ul>\n'
+'		<li><span class="tree2"><a href="../1Mo/index.html" title="1.&nbsp;Mose">1.&nbsp;Mose</a></span></li>\n'
+'		<li><span class="tree2"><a href="../2Mo/index.html" title="2.&nbsp;Mose">2.&nbsp;Mose</a></span></li>\n'
+'		<li><span class="tree2"><a href="../3Mo/index.html" title="3.&nbsp;Mose">3.&nbsp;Mose</a></span></li>\n'
+'		<li><span class="tree2"><a href="../4Mo/index.html" title="4.&nbsp;Mose">4.&nbsp;Mose</a></span></li>\n'
+'		<li><span class="tree2"><a href="../5Mo/index.html" title="5.&nbsp;Mose">5.&nbsp;Mose</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Jos/index.html" title="Josua">Josua</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Ri/index.html" title="Richter">Richter</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Ruth/index.html" title="Ruth">Ruth</a></span></li>\n'
+'		<li><span class="tree2"><a href="../1Sam/index.html" title="1.&nbsp;Samuel">1.&nbsp;Samuel</a></span></li>\n'
+'		<li><span class="tree2"><a href="../2Sam/index.html" title="2.&nbsp;Samuel">2.&nbsp;Samuel</a></span></li>\n'
+'	</ul>\n'
+'	</td><td>\n'
+'	<ul>\n'
+'		<li><span class="tree2"><a href="../1Koe/index.html" title="1.&nbsp;Könige">1.&nbsp;Könige</a></span></li>\n'
+'		<li><span class="tree2"><a href="../2Koe/index.html" title="2.&nbsp;Könige">2.&nbsp;Könige</a></span></li>\n'
+'		<li><span class="tree2"><a href="../1Chr/index.html" title="1.&nbsp;Chronik">1.&nbsp;Chronik</a></span></li>\n'
+'		<li><span class="tree2"><a href="../2Chr/index.html" title="2.&nbsp;Chronik">2.&nbsp;Chronik</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Esr/index.html" title="Esra">Esra</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Neh/index.html" title="Nehemia">Nehemia</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Est/index.html" title="Esther">Esther</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Hiob/index.html" title="Hiob">Hiob</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Ps/index.html" title="Psalmen">Psalmen</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Spr/index.html" title="Sprüche">Sprüche</a></span></li>\n'
+'	</ul>\n'
+'	</td><td>\n'
+'	<ul>\n'
+'		<li><span class="tree2"><a href="../Pred/index.html" title="Prediger">Prediger</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Hld/index.html" title="Hoheslied">Hoheslied</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Jes/index.html" title="Jesaja">Jesaja</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Jer/index.html" title="Jeremia">Jeremia</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Klgl/index.html" title="Klagelieder">Klagelieder</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Hes/index.html" title="Hesekiel">Hesekiel</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Dan/index.html" title="Daniel">Daniel</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Hos/index.html" title="Hosea">Hosea</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Joel/index.html" title="Joel">Joel</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Am/index.html" title="Amos">Amos</a></span></li>\n'
+'	</ul>\n'
+'	</td><td>\n'
+'	<ul>\n'
+'		<li><span class="tree2"><a href="../Ob/index.html" title="Obadja">Obadja</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Jona/index.html" title="Jona">Jona</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Mi/index.html" title="Micha">Micha</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Nah/index.html" title="Nahum">Nahum</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Hab/index.html" title="Habakuk">Habakuk</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Zeph/index.html" title="Zephanja">Zephanja</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Hag/index.html" title="Haggai">Haggai</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Sach/index.html" title="Sacharja">Sacharja</a></span></li>\n'
+'		<li><span class="tree1"><a href="../Mal/index.html" title="Maleachi">Maleachi</a></span></li>\n'
+'		<li>&nbsp;</li>\n'
+'	</ul>\n'
+'	</td></tr></table>\n'
+'	</li>\n'
+'</ul>\n'
+'</div></div>\n';

var menu2 =
 '<div class="menupad"><div class="menusection menusection2">\n'
+'<ul>\n'
+'	<li><a href="../new.html" title="Neues Testament">Neues&nbsp;Testament</a>\n'
+'	<table><tr><td>\n'
+'	<ul>\n'
+'		<li><span class="tree2"><a href="../Mt/index.html" title="Matthäus">Matthäus</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Mk/index.html" title="Markus">Markus</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Lk/index.html" title="Lukas">Lukas</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Joh/index.html" title="Johannes">Johannes</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Apg/index.html" title="Apostelgeschichte">Apostelg.</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Roem/index.html" title="Römer">Römer</a></span></li>\n'
+'		<li><span class="tree2"><a href="../1Kor/index.html" title="1.&nbsp;Korinther">1.&nbsp;Korinther</a></span></li>\n'
+'		<li><span class="tree2"><a href="../2Kor/index.html" title="2.&nbsp;Korinther">2.&nbsp;Korinther</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Gal/index.html" title="Galater">Galater</a></span></li>\n'
+'	</ul>\n'
+'	</td><td>\n'
+'	<ul>\n'
+'		<li><span class="tree2"><a href="../Eph/index.html" title="Epheser">Epheser</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Phil/index.html" title="Philipper">Philipper</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Kol/index.html" title="Kolosser">Kolosser</a></span></li>\n'
+'		<li><span class="tree2"><a href="../1Th/index.html" title="1.&nbsp;Thessalonicher">1.&nbsp;Thessalon.</a></span></li>\n'
+'		<li><span class="tree2"><a href="../2Th/index.html" title="2.&nbsp;Thessalonicher">2.&nbsp;Thessalon.</a></span></li>\n'
+'		<li><span class="tree2"><a href="../1Tim/index.html" title="1.&nbsp;Timotheus">1.&nbsp;Timotheus</a></span></li>\n'
+'		<li><span class="tree2"><a href="../2Tim/index.html" title="2.&nbsp;Timotheus">2.&nbsp;Timotheus</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Tit/index.html" title="Titus">Titus</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Phlm/index.html" title="Philemon">Philemon</a></span></li>\n'
+'	</ul>\n'
+'	</td><td>\n'
+'	<ul>\n'
+'		<li><span class="tree2"><a href="../Hebr/index.html" title="Hebräer">Hebräer</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Jak/index.html" title="Jakobus">Jakobus</a></span></li>\n'
+'		<li><span class="tree2"><a href="../1Pt/index.html" title="1.&nbsp;Petrus">1.&nbsp;Petrus</a></span></li>\n'
+'		<li><span class="tree2"><a href="../2Pt/index.html" title="2.&nbsp;Petrus">2.&nbsp;Petrus</a></span></li>\n'
+'		<li><span class="tree2"><a href="../1Joh/index.html" title="1.&nbsp;Johannes">1.&nbsp;Johannes</a></span></li>\n'
+'		<li><span class="tree2"><a href="../2Joh/index.html" title="2.&nbsp;Johannes">2.&nbsp;Johannes</a></span></li>\n'
+'		<li><span class="tree2"><a href="../3Joh/index.html" title="3.&nbsp;Johannes">3.&nbsp;Johannes</a></span></li>\n'
+'		<li><span class="tree2"><a href="../Jud/index.html" title="Judas">Judas</a></span></li>\n'
+'		<li><span class="tree1"><a href="../Offb/index.html" title="Offenbarung">Offenbarung</a></span></li>\n'
+'	</ul>\n'
+'	</td></tr></table>\n'
+'	</li>\n'
+'</ul>\n'
+'</div></div>\n';


function initplan(planindex) {
  document.getElementById('plan').innerHTML += ' <input tabindex="-1" value="heute" onclick="plantoday(); return false;" type="button" class="button go" style="width: 4em" title="Gehe zur im Leseplan für den Tag vorgesehen Stelle">';
  if(planindex) document.getElementById('plandate').innerHTML = "("+datefromweek1(planindex)+")";
}


function initpassage() { // must be done after initmarkers()
  var path = location.pathname;
  var pos = (inbook ? passagestr(path+location.search).replace(/&nbsp;/g," ") : "");
	var passage = createHTMLNode(null, 'text important', pos); // just for getting its width
	prependChild(menu, passage);
  var width = Math.max(40,passage.offsetWidth);
	menu.removeChild(passage);
  var input = '<input id="pass" type="text" class="text important" value="'+pos+'" style="width: '+width+'px">';
  var form = '<form style="display: inline-block;" action="javascript:gopass();">'+input+'</form>';
  var passage = createHTMLNode('passage', "menutop middot", form); //  path="'+path+'" target="middle"
	menu.insertBefore(passage, about);
  if (/*smallDisplay && */inbook) {
    var html = '<a href="../index.html">'+/*myname+' '+*/pos.replace(/,.*/,"")+'</a>';
    var balloon = createHTMLNode('ballon', 'balloon', html);
    main.appendChild(balloon);
  //var XY = posXY(balloon); balloon.innerHTML+=" "+XY[0]+" "+XY[1];
	}
  if(!inbook) { // (re-)set "active" according to current page URL
    try {
      var id=path.match(/(\w+)\.html/)[1];
    } catch(e)
      { id="index"; } // root URL with implicit index.html
    var actives=getElementsByClassName(document,'active');
    for (var i=0; i<actives.length; i++)
      actives[i].className="";
    child(document.getElementById(id), 'a', null).className="active";
  }
}

function gopass() {
  var pass = tointernalname(document.getElementById("pass").value.replace(/\s/g,""));
  var ps = pass.match(/^((\d))?([a-z])([a-z]{1,3})((\d{1,3})([^\d](\d{1,3})(|a|b|f|ff)(([-\.]\d{1,3}(|a|b|f|ff))*))?)?$/);
  if (ps) {
    var verses = (ps[7] ? "?"+ps[8]+ps[9]+ps[10]+vanchor(ps[8]) : "");
    var booketc = ps[2]+ps[3].toUpperCase()+ps[4]+"/"+(ps[5] ? (ps[6]+".html"+verses) : "index.html");
    var href = localURL(booketc.replace(/undefined/g,""));
    if(onIE || true || existsURL(href)) // TODO
      setURL(href);
    else
      alert("Bibelstelle existiert nicht" + (/^file:/.test(location.protocol) ? "" : " oder keine Internetverbindung"));
  }
  else
    alert("Bibelstellen-Angabe nicht verstanden");
}

//////////////////////////////////////////////////////////////////////////

//http://stackoverflow.com/questions/335244/why-does-chrome-ignore-local-jquery-cookies
//http://www.taranfx.com/html-5-client-storage
//http://people.w3.org/mike/localstorage.html

var localStorage_supported = typeof(localStorage) != 'undefined'
                          && typeof(localStorage) != 'unknown'
                          && onWebKit; // FireFox buggy: https://bugzilla.mozilla.org/show_bug.cgi?id=507361
//http://stackoverflow.com/questions/1492942/is-localstorage-in-firefox-only-working-when-the-page-is-online

function getCookie(name)
{
  var pat = new RegExp(name+"=([^;]*)");
  if(localStorage_supported) {
    return localStorage.getItem(name);
    /*
    var memory = location.href;
    */
  }
  else
    var memory = document.cookie;
  try { return unescape(memory.match(pat)[1]); }
  catch (e) {
    //ialert("Cannot get cookie: "+name);
    return null;
  }
}

function setCookie(name,value,days)
{
  var nameval = name+"="+escape(value);
  if(localStorage_supported) {
    localStorage.setItem(name, value);
    /*
    var pat = new RegExp(name+"=([^;]*)");
    if(pat.test(location))
      location.search = location.search.replace(pat, "?"+nameval+";");
    else
      location.search = location.search + "?"+nameval+";";
    */
  }
  else {
    if (days) {
      var date = new Date();
      date.setDate(date.getDate()+days);
      var expires = "; expires="+date.toGMTString();
    }
    else
      var expires = "";
    try {
      document.cookie = nameval+expires+"; path=/";
                                    /* +"; domain="+myname; */
    } catch(e) { ialert("Cannot set cookie: "+name); } //catch(e:IOErrorEvent)
  }
}

function clearCookie(name) //remove, delete cookie
{
  setCookie(name,"",-1);
}

var markerprefix = myname+".marker.";
var lifespan = 5*365;

function tointernalname(s) {
  return s.toLowerCase().replace(/^([1-5])\./,"$1").replace(/kö/,"koe").replace(/röm/,"roem");
}

function toexternalname(s) {
  return s.replace(/^([1-5])/,"$1"+".")
          .replace(/Koe/,"Kö")
          .replace(/Roem/,"Röm")
          .replace(/\//,"&nbsp;");
}

function passagestr(l) {
  return toexternalname(torelativeURL(l).replace(/\.html/,"").replace(/\/index/,"")).replace(/\?/,",");
}

function vanchor(v) {
  var vmargin = 1;
  return "#"+(v>vmargin ? v-vmargin : "1");
}


function showmarkers() {
  var option = null;
  for(var i = 1; option = document.getElementById("marker-"+i); i++) {
    var loc = getCookie(markerprefix+i);
    if(loc)
      var pos = passagestr(loc);
    else
      pos = "(frei)";
//                        &#8227     // Triangle Bullet
      option.innerHTML = i+'&#149;  '+ // Small Bullet
      pos;
//    option.setAttribute("label", i+'&#149;  <span>'+pos+'</span>  '); // does not work
//    option.innerHTML =i+'&#149; ## <span>'+pos+'</span>'; // does not work
  }
}

function getmarker() {
  var marksel = document.getElementById("marksel");
  return (marksel ? getCookie(markerprefix+marksel.value) : null);
}

function gomarker() {
  var n = document.getElementById("marksel").value;
  var loc = getmarker();
  if (loc != null)
    setURL(loc);
  else {
 //ialert not used here!
    alert("Merker "+n+" ist nicht gesetzt");
  }
}

function changemarker(set) {
  var last = getCookie(markerprefix+'last');
  last = (last ? last : 1);
  var n = document.getElementById("marksel").value;
  var name = markerprefix+n;
  if(set) {
    setCookie(name,location.href,lifespan);
    if (n == last)
      last++;
  }
  else {
    //alert("Dieser Seite kann keine Bibelstelle zugeordnet werden");
    clearCookie(name);
    while(last > 1 && !getCookie(markerprefix+last) && !getCookie(markerprefix+(last-1)))
      last--;
  }
  setCookie(markerprefix+'last',last,lifespan);
  if(getCookie(markerprefix+'last') != last)
 //ialert not used here!
    alert("Kann Merker nicht in Cookie speichern");
  initmarkers(); // to update the list of available markers
  showmarkers();
}

function initmarkers() {
  var sel = getCookie(markerprefix+'selected');
  sel = (sel == null ? 1 : sel);
  var last = getCookie(markerprefix+'last');
  last = (last == null ? 1 : last);
  if(sel > last)
    sel = last;
  var options = '';
  for(var i=1; i<=last; i++) {
    options += '<option '+(i == sel ? 'selected="selected" ' : '')
                         +'id="marker-'+i+'" value="'+i+'">['+i+']</option>\n';
  }
  var markers = document.getElementById('markers');
  if(markers)
    menu.removeChild(markers);
  var html = ''
    +'<div style="display: inline-block;"><select id="marksel"\n'
    +'  onchange="setCookie(\''+markerprefix+'\'+\'selected\',this[this.selectedIndex].value,'+lifespan+'); initmarkerchange();">\n'
    +options+'</select></div>\n'
    +'<input tabindex="-1" value="öffnen" id="marker-go" onclick=" gomarker(); return false;"'
    +' type="button" class="button go" style="width: 4.4em" title="Gehe zur ausgewählten gemerkten Stelle">\n'
    +' &nbsp; ';                                                 // workaround for pinch-to-zoom on Android
  menu.insertBefore(document.createElement('div'), about.nextSibling); // workaround for pinch-to-zoom on Android
  menu.insertBefore(createHTMLNode('markers', "menutop middot", html), about.nextSibling);
  initmarkerchange();
}

function initmarkerchange() {
  var sibling = document.getElementById('marker-go').nextSibling;
  if(sibling.id == 'marker-change') {
    var tmp = sibling;
    sibling = tmp.nextSibling;
    tmp.parentNode.removeChild(tmp);
  }
  var loc = getmarker();
  var set = inbook && (loc == null || location.href != loc);
  html = ' '
    +'<input tabindex="-1" value="'+(set ? 'merken' : 'löschen')+'" onclick="changemarker('+set+')"; return false;"'
    +' type="button" class="button do" style="width: '+(set ? '4.8' : '5')+'em"'
    +' title="'+(set ? 'Speichere die aktuelle Stelle an der ausgewählten Position' : 'Lösche den ausgewählten Merker')+'">';
  sibling.parentNode.insertBefore(createHTMLNode('marker-change', '', html), sibling);
}

//navigation by swiping
//http://stackoverflow.com/questions/2987706/touchend-event-doesnt-work-on-android

var gnStartX = 0;
var gnStartY = 0;
var gnEndX = 0;
var gnEndY = 0;

function initswipeactions() {
  addListener(window, 'touchstart', function(event) {
    gnStartX = gnEndX = event.touches[0].pageX;
    gnStartY = gnEndY = event.touches[0].pageY;
  });
  addListener(window, 'touchmove', function(event) {
    gnEndX = event.touches[0].pageX;
    gnEndY = event.touches[0].pageY;
  });
  addListener(window, 'touchend', function(event) {
    touchhandler(event, gnStartX, gnStartY, gnEndX, gnEndY);
  });
}

function touchhandler(event, x0, y0, x1, y1) {
  absdx = Math.abs(x1-x0);
  absdy = Math.abs(y1-y0);
  if (x0>0 && x1>0 && y0>0 && y1>0 &&
      (absdx > 250 || absdy > 400)) {
    var horizontal = (absdx > absdy);
    return touchaction(event, horizontal, horizontal ? x1>x0 : y1>y0);
  }
  return false;
}

function touchaction(e, horizontal, increasing) {
  if(horizontal) {
    var n = (increasing ? menuL : menuR);
    if(isshown(n)) {
      hide(n);
      hide(n.parentNode);
    }
    else {
      show(n.parentNode);
      popup(n, 0);
    }
  }
  else {
    setURL(localURL("index.html"));
  }
//  (horizontal ? (increasing ? 'old' : 'new') : 'index') + ".html";
  return true;
}
