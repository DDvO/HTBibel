////window.onload = loadIndex; //better at end of search.html

var useXML = false;
useXML = useXML && onChrome;
if(!useXML)
  document.write('<script src="index.js"><\/script>');

function transform (s) { //for transcoded characters in XML file
  return s.replace(/\{/g,'<').replace(/\}/g,'>').replace(/\^/g,"'").replace(/@/g,'&');
}

function getchapter (item) { return !useXML ? item.c :           item.getAttribute("c") ; }
function getnumber  (item) { return !useXML ? item.n :           item.getAttribute("n") ; }
function getmeta    (item) { return !useXML ? item.m :           item.getAttribute("m") ; }
function getMeta    (item) { return !useXML ? item.M : transform(item.getAttribute("M")); }
function getverse   (item) { return !useXML ? item.v :           item.getAttribute("v") ; }
function getVerse   (item) { return !useXML ? item.V : transform(item.getAttribute("V")); }
function getfootnote(item) { return !useXML ? item.f :           item.getAttribute("f") ; }
/*
function getchapter (item) { return item.className.split(":")[0]; }
function getnumber  (item) { return item.className.split(":")[1]; }
function getmeta    (item) { return item.className.split(":")[2]; }
function getMeta    (item) { return item.id       .split("@")[0]; }
function getverse   (item) { return item.className.split(":")[3]; }
function getVerse   (item) { return item.id       .split("@")[1] }
function getfootnote(item) { return item.className.split(":")[4]; }
*/

//unused
function toObject (e) { // http://www.dyn-web.com/tutorials/obj_lit.php
  var o =
    { c:e.getAttribute("c"),
      n:e.getAttribute("n"),
      m:e.getAttribute("m"),
      M:transform(e.getAttribute("M")),
      v:e.getAttribute("v"),
      V:transform(e.getAttribute("V")),
      f:e.getAttribute("f")
    };
  return o;
}

var XMLindex;
var items;
function loadIndex() {

  if(typeof(items) == "undefined" || items.length==0) { //gets reloaded too often?
    if(useXML) {
      //debug("Loading XML encoding");
      XMLindex = loadXML("index.xml");
      if(!XMLindex)
	ialert("Cannot load search index file index.xml");

      //loading seems to be done asynchronously/delayed, so get the items later
      //items=XMLindex.getElementsByTagName("i");

      //      items = new Array;
      //      for (var i=0; i<elems.length; i++)
      //	items[i] = toObject(elems[i]);
    }
    else { // at least for Google Chrome
      //debug("Loading JavaScript object literals");
      getitems();
    }
  }
}

function loadXML(url) {
  try {
    // most current browsers support document.implementation
    if (document.implementation && document.implementation.createDocument) {
      xmlDoc = document.implementation.createDocument("", "", null);
    }
    // MSIE uses ActiveX
    else if (window.ActiveXObject) {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = "false";
    }
    else
      return null;
    xmlDoc.load(url);
    return xmlDoc;
  }
  catch(e) {
    try {
      if (window.XMLHttpRequest)
	xmlhttp=new XMLHttpRequest(); // code for IE7+, Firefox, online Chrome, Opera, Safari
      else
	xmlhttp=new ActiveXObject('Microsoft.XMLHTTP'); // code for IE6, IE5
      xmlhttp.open('GET',url,false);
      xmlhttp.send(null);
      xmlDoc = xmlhttp.responseXML.documentElement;
      return xmlDoc;
    }
    catch(e) {
      return null;
    }
  }
}

//unused
function readTextFile (url) {
  if ('undefined' == typeof(url)) return "";
  var p,rnd;
  if (document.all){
    // For IE, create an ActiveX Object instance
    p = new ActiveXObject("Microsoft.XMLHTTP");
  }
  else {
    // For mozilla, create an instance of XMLHttpRequest.
    p = new XMLHttpRequest();
  }
  // Prevent browsers from caching the included page
  // by appending a random  number (optional)
  //rnd = Math.random().toString().substring(2);
  //url = url.indexOf('?')>-1 ? url+'&rnd='+rnd : url+'?rnd='+rnd;
  try {
    p.open("GET",url,false);
    p.send(null);
    return p.responseText;
  }
  catch (e) {
    return null;
  }
}

function clearR()
{
  var resultelem = document.getElementById("results");
// for strange reasons, at least with Firefox the outer loop is needed to catch all child nodes
  while (resultelem.childNodes.length) {
    var ns = resultelem.childNodes;
    for (var i=0; i<ns.length; i++)
      resultelem.removeChild(ns[i]);
  }
}

function enclosespace(s,pattern) {
  if (/^\^? /.test(pattern))
    s = ' '+s;          // allow matching ' ' at start for pattern starting with ' '
  if (/ \$?$/.test(pattern))
    s = s+' ';          // allow matching ' ' at end   for pattern   ending with ' '
  return s;
}

function concatwords(s,t) {
  if (s.length)
    if (t.length)
      return s+' '+t;
    else
      return s;
  else
    return t;
}

function showResults(queryP, queryA, queryN, from, to, imeta, icase, results, nfound, nmatch) {

  function item2html (item) {
    function highlight(queryP, file, html) {

      var coffset = '\ue000'.charCodeAt(0);
      var clast   = '\uf8ff'.charCodeAt(0);

      function protect (s) {
	var r = "";
	var inmatch = false;
	for(var i=0; i<s.length; i++) {
	  if(s.charAt(i)=='{' && inmatch || s.charAt(i)=='}' && !inmatch)
	    ialert("Unbalanced or nested { or } when protecting HTML tags in: "+s);
	  else if(s.charAt(i)=='{')
	    inmatch = true;
	  else if(s.charAt(i)=='}')
	    inmatch = false;
	  else if(inmatch) {
	    if(coffset <= s.charCodeAt(i) && s.charCodeAt(i) <= clast)
	      ialert("Unexpected unicode character with code "+(+s.charCodeAt(i))+" in: "+s);
	    r+=String.fromCharCode (s.charCodeAt(i) + coffset); // transform to Unicode private area
	  }
	  else
	    r+=s.charAt(i);
	}
	return r;
      }

      function unprotect (s) {
	var r = "";
	for(var i=0; i<s.length; i++) {
	  var c=s.charCodeAt(i);
	  r+=String.fromCharCode (c > coffset ? c - coffset : c);
	}
	return r;
      }

      // transform references into book/chapter context
      //html=html.replace(/(a href=\")([^\?#]|#[^\"])/ig,"$1"+file.split(/\//)[0]+"/$2");
      html=html.replace(/(a href=\")([^\?])/ig,"$1"+file.split(/\//)[0]+"/$2");
      html=html.replace(/(a href=\")[A-Za-z0-9]+\/\.\.\//ig,"$1");
      html=html.replace(/(a href=\")(\?)/ig   ,"$1"+file.replace(/(\?.*)/,"")+"$2");

      // Protect hyperlinked text, HTML tags, and special codes from being matched for highlighting
      // (Protection of HTML tags and special codes is ineffective for wildcard matches like "." - so what.)
      // Not using split here because IE implementaton does not return empty substrings.
      // Moreover, IE does not return empty substrings matched betweeen ( ) in patterns :-(
      // Cannot use e.g. 'ß' as special tag because IE does not match it :-(
      html=html.replace(/(<a href=\"[^\"]*\">.*?<\/a>)/ig,"{$1}"); // hyperlinked text
      html=protect(html);
      // protect HTML tags <...> or special codes &...; from being machted for highlighting:
      html=html.replace(/(<[a-zA-Z0-9]+[^>]*>|<\/[a-zA-Z0-9]+>|&[a-zA-Z0-9]+;)/g,"{$1}");
      html=protect(html);
      // adapt pattern for skipping any non-alphanumeric characters and protected parts
      // adaptation string must be consistent with coffset and clast
      // var pattern = queryP.replace(/ /g,"([^0-9A-Za-zƒ÷‹ﬂ‰ˆ¸])+"); // too specific to German alphabet
      var pattern = queryP.replace(/ /g,"([\ue000-\uf8ff\x20-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f])+");
      //"(&[a-zA-Z0-9]+;|<[a-zA-Z0-9]+[^>]*>|<\/[a-zA-Z0-9]+>|[\x20-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f])+");
      var matches=enclosespace(html,queryP).match(new RegExp(pattern,icase+"g"));
      var splits =enclosespace(html,queryP).split(new RegExp(pattern,icase    ));

      if(matches) { // otherwise not found anymore because, for the original search, footnote words had been moved to end of verse
	// avoid all trouble and inefficiencies of degenerate wildcard patterns
	if (   matches.length == html.length+1               // due to ""
	       || matches.length == html.length                 // due to "."
	       || matches.length == 2 && matches[1].length == 0 // due to ".*"
	       || matches.length == html.length-1 && splits.length==1 && splits[0].length==1 // workaround for IE7 bug for "."?
	       ) {
	  html='<span class="result-highlight">'+unprotect(html)+'</span>';
	  // background color is not (properly) inherited to headings, so propagate manually into them:
	  // TODO also for other non-wildcard patterns, if headings are surrounded by highlighting
	  html=html.replace(/(<h\d[^>]*>)(.*?)<\/h\d>/g,
			    "</span>$1<span class=\"result-highlight\">$2</span></h1><span class=\"result-highlight\">");
	}
	else {
	  //((http://www.webreference.com/js/column5/methods.html writes on splits:
	  //if the pattern contains parentheses, then the substring matched by each pair of parentheses
	  //is included in the resulting array, interspersed with the fields that are ordinarily returned
	  // but: IE does not properly handle ( ) in patterns :-(
	  var patternparenshift = (splits.length-1)/matches.length;
	  if (patternparenshift < 1 || (splits.length-1) % matches.length) {
	    //if (matches.length != splits.length+1) // not: matched "" (the empty string) or ".*"
	    ialert("Cannot highlight found text in "+file+" because of unexpected split result: "+
		   matches.length+" matches vs. "+splits.length+" splits, "+
		   "which is probably due to incorrect implementation of the JavaScript function 'split' in this browser.\n\n"+
		   //"which is probably due to wrong implementation by Mickeysoft in their Internet Exploder.\n\n"+
		   "HTML: "   +unprotect(html)   +"\n\n" +
		   "Matches: "+matches+"\n\n" +
		   "Splits: " +splits);
	    html=unprotect(html);
	  }
	  else {
	    html=unprotect(splits[0]); // translate back protected tags/codes
	    for(var j=0; j < matches.length; j++) {
	      var match = unprotect(matches[j]); // translate back protected tags/codes
	      var after = unprotect(splits[(j+1)*patternparenshift]); // translate back protected tags/codes
	      //debug(html + '\n' + match + '\n' + after);

	      if(match.length > 1 || match == matches[j]) { // needed for wildcard matches like ".":
		// ignore matched protected single tag characters, but bug: should show all special code characters!
		// distribute highlighting tags over any opening or closing (and thus potentially unbalanced) inner tags.
		// For simplicity, this is done also for self-closing tags and balanced pairs of opening and closing tags.
		match = match.replace(/(<[a-zA-Z0-9]+[^>]*>|<\/[a-zA-Z0-9]+>)/g,"<\/span>"+"$1"+"<span class=\"result-highlight\">");
		match = '<span class="result-highlight">'+match+'</span>';
		//debug(html + '\n' + match + '\n' + after);
	      }
	      html+=match+after;
	    }
	  }
	}
      }
      else
	html=unprotect(html); // translate back protected tags/codes
      //html=html.replace(/<div id="header">(.*)<\/div>/, "$1"); // strip style (including background color!) of book intros
      //hide titles not containing search results
      html=html.replace(/<\/h2>/g,'}');
      html=html.replace(/(<h2 class="[sc]t)("[^\}]*<span class="result-highlight">[^\}]*\})/g, "$1 $2");
      html=html.replace(/(<h2 class="[sc]t")/g, "$1 style=\"display: none\"");
      html=html.replace(/\}/g,'</h2>');
			if(imeta) {
				//extend footnote highlighting to footnote reference; direct implementation in next line does not match - why?
				//  html=html.replace(/(<span class="footnote">.*?<span class="result-highlight">.*?<\/spaN>)/g, "<span class=\"result-highlight\">$1</span>");
				//expand footnotes containing search results
				html=html.replace(/><\/span>/g,'}'); // end of footnote marked with <br id="fn\d+"></span>
				html=html.replace(/(<span class="footnote)(">\[\d+\])([^\}]*<span class="result-highlight">[^\}]*\})/g, "$1_mark$2</span><span class=\"footnote_expand\">$3");
				html=html.replace(/\}/g,'></span>');
			}
      return html;
    }

    var bookchap=getchapter(item);
    var versenum=getnumber(item);
    var vn=+versenum;
    var metahtml=getMeta(item);
    var file = bookchap+".html";
    var meta = "";
    if(imeta && metahtml) //HTML encoding of chapter/heading metatext
      meta = metahtml;
    var verse = getVerse(item);
    /* not needed anymore:
       var verse = "";
       if(vn>0) {
       verse = readTextFile(file);
       if(verse) {
       var splits = verse.split(/<SPAN ID="v\d+">/);
       if(splits.length<vn+1) {
       ialert("Cannot find verse "+versenum+" in "+file);
       verse = "";
       }
       verse = splits[vn].split(/<\/SPAN>/)[0];
       }
       else {
       ialert("Cannot open file: "+file);
       verse = "";
       }
       }
    */

    var vmargin = 1;
    var name = passagestr(file);
    if(vn>0) {
      file += '?'+versenum+(vn > vmargin ? '#'+(vn-vmargin) : '');
      name +=',<span class="versenum">'+versenum+'</span>';
    }
    var a = '<a href="'+file.split(/\//)[1]+'">'+name+'</a>';
    if(vn>0)
      var html = meta+a+'&nbsp;'+verse;
    else
      html = a+'&nbsp;'+meta;
    return (highlight(queryP, file, html));
  }
  function quote_escape(text) {
    return " &rsaquo;<b>"+
           text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+
           "</b>&lsaquo; ";
  }

  var para = document.createElement("div");
  para.className = "results"; //para.setAttribute("class","results"); // IE7 buggy
  var header = document.createElement("h2");
  header.className = "results";
  var query = " f√ºr "+ quote_escape(queryP)
    + (queryA ? "nur mit"   + quote_escape(queryA) : "")
    + (queryN ? "aber ohne" + quote_escape(queryN) : "");
  var scope = " in "     + '<a href="'+from+'/index.html">'+toexternalname(from)+'</a>'
    + (to == from ? "" : "-" + '<a href="'+to  +'/index.html">'+toexternalname(to)  +'</a>')
    + (imeta ? " inklusive Metatext" : "");
  para.appendChild(header);
  header.innerHTML=
           nfound+" Fundstelle"+(nfound==1 ? "" : "n")+query +
    "mit "+nmatch+" Vorkommen" +(nmatch==1 ? "" : "" )+scope;
  if (results.length == 0) {
    if(nfound>0)
      header.innerHTML+=" verworfen.";
    else
      header.innerHTML="Nichts gefunden"+query+scope+".<br>\n" +
      "<span class=\"nonselect\">Eine Alternative: <a href='https://google.de/?#num=100&hl=de&q="+
			"Bibel " +  "\""+queryP+"\""      +
			(queryA ?  " \""+queryA+"\"" : "")+
			(queryN ? " -\""+queryN+"\"" : "")+
      "'>Online-Suche bei Google</a></span>";
  } else {
    if (nfound>results.length)
      header.innerHTML+="; davon die erste"+(results.length==1 ? "" : "n "+results.length);
    header.innerHTML+=":";
    var table = document.createElement("table");
    table.className = "results";
    var list = document.createElement("tbody");
    for (var i=0; i<results.length; i++) {
      var tr = document.createElement("tr");
      list.appendChild(tr);
      var th = document.createElement("th");
      th.innerHTML = (i+1)+".";
      tr.appendChild(th);
      var td = document.createElement("td");
      td.innerHTML = item2html(results[i]);
      tr.appendChild(td);
    }
    initfootnotes(list);
    table.appendChild(list);
    para.appendChild(table);
  }
  prependChild(document.getElementById("results"), para);
}

function search() {

  var queryP = document.getElementById("queryP").value;
  var queryA = document.getElementById("queryA").value;
  var queryN = document.getElementById("queryN").value;
  var limit  = document.getElementById("limit" ).value;
  var from   = document.getElementById("from"  ).value;
  var to     = document.getElementById("to"    ).value;
  var imeta  = document.getElementById("meta"  ).checked;
  var icase  = document.getElementById("case"  ).checked ? "" : "i";
  if(items.length==0 && useXML)
    items = XMLindex.getElementsByTagName("i"); //loading seems to be done asynchronously/delayed, so get the items here
  if(items.length==0) {
    ialert("Could not load search index. Search is not possible - sorry!");
    return;
  }
  var results = new Array;
  //  queryP=queryP.replace(/^(\.\*)+(.)/,"$1"); // would cause bad hangs
  if (false && !/[0-9a-z√§√∂√ü√º]{3}/i.test(queryP)) {
    alert("Bitte mindestens drei Buchstaben oder Ziffern eingeben");
    return;
  }
  else try {
    var queryP_ig = new RegExp(queryP, icase+"g");
    var queryA_ig = new RegExp(queryA, icase+"g");
    var queryN_ig = new RegExp(queryN, icase+"g");
  }
  catch(e) {
    alert("Der Sucheingabe ist kein g√ºltiger Regul√§rer Ausdruck:\n"+e);
    return;
  }
  if (!(/^\s*[0-9]+\s*$/.test(limit) && limit>0)) {
    alert("Bitte als Anzeigelimit eine nat√ºrliche Zahl eingeben");
    return;
  }
  if (from == "" && to == "") {
    from = "1Mo";
    to   = "Offb";
  }
  else if (from == "")
    from = to;
  else if (to == "")
    to = from;
  var nfound=0;
  var nmatch=0;
  var inselect=false;
  var from_p=new RegExp(from,"");
  var to_p=new RegExp(to,"");
  for (var i=0; i<items.length; i++) {
    var item = items[i];
    var chap = getchapter(item);
    if(!inselect) {
      if(from_p.test(chap) || to_p.test(chap)) {
				inselect=true;
				if(from != to && to_p.test(chap)) { // user gave wrong order of from and to, interpreting as to-from
					var tmp_p = to_p;  to_p = from_p;  from_p = tmp_p;
					var tmp   = to  ;  to   = from  ;  from   = tmp  ;
					alert ("Verkehrte Suchbereichseinschr√§nkung - suche nun in "+toexternalname(from)+"-"+toexternalname(to));
				}
      }
    }
    if(inselect) {
      ////var text = elem.lastChild ? elem.lastChild.nodeValue : "";
      //while(text.length && text.charCodeAt(text.length-1) < 0x20)
      //  text = text.slice(0,-1);
      var meta = getmeta(item);
      var text = getverse(item);
      var foot = getfootnote(item);
      if(!imeta) {
				meta = "";
				foot = "";
      }
      text = concatwords(meta,text);
      text = concatwords(text,foot);
      var match;
      if (text.length &&
					(     match = enclosespace(text,queryP).match(queryP_ig))
					&& (queryA ?  enclosespace(text,queryA).match(queryA_ig) : true)
					&& (queryN ? !enclosespace(text,queryN).match(queryN_ig) : true)
				 ) {
				nmatch += match.length;
				if (++nfound <= limit)
					results.push(item);
      }
      if(i == items.length-1 ||
				 (to_p.test(chap) && !to_p.test(getchapter(items[i+1])))) //getAttribute("c")
				inselect=false;
    }
  }
  if (false && nfound > limit) {
    var msg = "Es "+(limit > 1 ? "werden nur die ersten "+limit
		                 : "wird nur die erste") +
          " von "+nfound+" Fundstellen angezeigt.";
    setTimeout(function() {alert(msg);},1); // do the alert asynchronously
  }
  showResults(queryP, queryA, queryN, from, to, imeta, icase, results, nfound, nmatch);
}
