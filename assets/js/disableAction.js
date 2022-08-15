//For contenteditable tags
function wccp_pro_iscontenteditable(e)
{
	var e = e || window.event; // also there is no e.target property in IE. instead IE uses window.event.srcElement

	var target = e.target || e.srcElement;

	var elemtype = e.target.nodeName;

	elemtype = elemtype.toUpperCase();

	var iscontenteditable = "false";
		
	if(typeof target.getAttribute!="undefined" ) iscontenteditable = target.getAttribute("contenteditable"); // Return true or false as string

	var iscontenteditable2 = false;

	if(typeof target.isContentEditable!="undefined" ) iscontenteditable2 = target.isContentEditable; // Return true or false as boolean

	if(target.parentElement !=null) iscontenteditable2 = target.parentElement.isContentEditable;

	if (iscontenteditable == "true" || iscontenteditable2 == true)
	{
		if(typeof target.style!="undefined" ) target.style.cursor = "text";
		
		return true;
	}
}

//Hot keys function
function disable_hot_keys(e)
{
	var key_number;

	if(window.event)
		  key_number = window.event.keyCode;     //IE
	else
		key_number = e.which;     //firefox (97)


		
	if (key_number == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) )//F12 chrome developer key disable
	{
		show_wccp_pro_message('You are not allowed to print or save this page!!');
		return false;
	}
	var elemtype = e.target.tagName;

	elemtype = elemtype.toUpperCase();

	if (elemtype == "TEXT" || elemtype == "TEXTAREA" || elemtype == "INPUT" || elemtype == "PASSWORD" || elemtype == "SELECT")
	{
		elemtype = 'TEXT';
	}

	if(wccp_pro_iscontenteditable(e)) elemtype = 'TEXT';

	if (e.ctrlKey || e.metaKey)
	{
		var key = key_number;

		if (elemtype!= 'TEXT' && (key == 97 || key == 99 || key == 120 || key == 26 || key == 43))
		{
			 show_wccp_pro_message('<b>Alert:</b> You are not allowed to copy content or view source');
			 return false;
		}
		if (elemtype!= 'TEXT')
		{
						
			if (key == 65)
			{
				show_wccp_pro_message('You are not allowed to print or save this page!!');
				return false;
			}			
						
			if (key == 67)
			{
				show_wccp_pro_message('You are not allowed to print or save this page!!');
				return false;
			}			
						
			if (key == 88)
			{
				show_wccp_pro_message('You are not allowed to print or save this page!!');
				return false;
			}			
						
			if (key == 86)
			{
				show_wccp_pro_message('You are not allowed to print or save this page!!');
				return false;
			}			
						
			if (key == 85)
			{
				show_wccp_pro_message('You are not allowed to print or save this page!!');
				return false;
			}		}
		
				if (key == 80 || key == 44)
		{
			show_wccp_pro_message('You are not allowed to print or save this page!!');
			return false;
		}		
					if (key == 73)//F12 chrome developer key disable
			{
				show_wccp_pro_message('You are not allowed to print or save this page!!');
				return false;
			}
				
				
		if (key == 83)
		{
			show_wccp_pro_message('You are not allowed to print or save this page!!');
			return false;
		}    
	}
	return true;
}

function nocontext(e)
{
	e = e || window.event; // also there is no e.target property in IE. instead IE uses window.event.srcElement
	
	if (apply_class_exclusion(e) == 'Yes') return true;
	
	var exception_tags = 'NOTAG,';
	
	var clickedTag = (e==null) ? event.srcElement.tagName : e.target.tagName;
	
	var target = e.target || e.srcElement;
	
	var parent_tag = ""; var parent_of_parent_tag = "";
	
	if(target.parentElement != null) parent_tag = target.parentElement.tagName;
	
	if(target.parentElement != null) parent_of_parent_tag = target.parentElement.parentElement.tagName;
	
	var checker = 'checked';
	if ((clickedTag == "IMG" || clickedTag == "PROTECTEDIMGDIV") && checker == 'checked') {
		if (alertMsg_IMG != "")show_wccp_pro_message(alertMsg_IMG);
		return false;
	}else {exception_tags = exception_tags + 'IMG,';}
	
	checker = '';
	if ((clickedTag == "VIDEO" || clickedTag == "PROTECTEDWCCPVIDEO" || clickedTag == "EMBED") && checker == 'checked') {
		if (alertMsg_VIDEO != "")show_wccp_pro_message(alertMsg_VIDEO);
		return false;
	}else {exception_tags = exception_tags + 'VIDEO,PROTECTEDWCCPVIDEO,EMBED,';}
	
	checker = 'checked';
	if ((clickedTag == "A" || clickedTag == "TIME" || parent_tag == "A" || parent_of_parent_tag == "A") && checker == 'checked') {
		if (alertMsg_A != "")show_wccp_pro_message(alertMsg_A);
		return false;
	}else {exception_tags = exception_tags + 'A,';if(parent_tag == "A" || parent_of_parent_tag == "A") clickedTag = "A";}

	checker = 'checked';
	if ((clickedTag == "P" || clickedTag == "B" || clickedTag == "FONT" ||  clickedTag == "LI" || clickedTag == "UL" || clickedTag == "STRONG" || clickedTag == "OL" || clickedTag == "BLOCKQUOTE" || clickedTag == "TH" || clickedTag == "TR" || clickedTag == "TD" || clickedTag == "SPAN" || clickedTag == "EM" || clickedTag == "SMALL" || clickedTag == "I" || clickedTag == "BUTTON") && checker == 'checked') {
		if (alertMsg_PB != "")show_wccp_pro_message(alertMsg_PB);
		return false;
	}else {exception_tags = exception_tags + 'P,B,FONT,LI,UL,STRONG,OL,BLOCKQUOTE,TD,SPAN,EM,SMALL,I,BUTTON,';}
	
	checker = 'checked';
	if ((clickedTag == "INPUT" || clickedTag == "PASSWORD") && checker == 'checked') {
		if (alertMsg_INPUT != "")show_wccp_pro_message(alertMsg_INPUT);
		return false;
	}else {exception_tags = exception_tags + 'INPUT,PASSWORD,';}
	
	checker = 'checked';
	if ((clickedTag == "H1" || clickedTag == "H2" || clickedTag == "H3" || clickedTag == "H4" || clickedTag == "H5" || clickedTag == "H6" || clickedTag == "ASIDE" || clickedTag == "NAV") && checker == 'checked') {
		if (alertMsg_H != "")show_wccp_pro_message(alertMsg_H);
		return false;
	}else {exception_tags = exception_tags + 'H1,H2,H3,H4,H5,H6,';}
	
	checker = 'checked';
	if (clickedTag == "TEXTAREA" && checker == 'checked') {
		if (alertMsg_TEXTAREA != "")show_wccp_pro_message(alertMsg_TEXTAREA);
		return false;
	}else {exception_tags = exception_tags + 'TEXTAREA,';}
	
	checker = 'checked';
	if ((clickedTag == "DIV" || clickedTag == "BODY" || clickedTag == "HTML" || clickedTag == "ARTICLE" || clickedTag == "SECTION" || clickedTag == "NAV" || clickedTag == "HEADER" || clickedTag == "FOOTER") && checker == 'checked') {
		if (alertMsg_EmptySpaces != "")show_wccp_pro_message(alertMsg_EmptySpaces);
		return false;
	}
	else
	{
		if (exception_tags.indexOf(clickedTag)!=-1)
		{
			return true;
		}
		else
		return false;
	}
}

function disable_drag_images(e)
{
	var e = e || window.event; // also there is no e.target property in IE. instead IE uses window.event.srcElement
	
	var target = e.target || e.srcElement;
	
	//For contenteditable tags
	if (apply_class_exclusion(e) == "Yes") return true;

	var elemtype = e.target.nodeName;
	
	if (elemtype != "IMG") {return;}
	
	elemtype = elemtype.toUpperCase();
	
	var disable_drag_drop_images = 'checked';
	
	if (disable_drag_drop_images != "checked")  return true;
	
	if (window.location.href.indexOf("/user/") > -1) {
	  return true; //To allow users to drag & drop images when editing thier profiles
	}
	
	show_wccp_pro_message(alertMsg_IMG);
	
	return false;
}

var alertMsg_IMG = "<b>Alert:</b> Protected image";
var alertMsg_A = "<b>Alert:</b> This link is protected";
var alertMsg_PB = "<b>Alert:</b> Right click on text is disabled";
var alertMsg_INPUT = "<b>Alert:</b> Right click is disabled";
var alertMsg_H = "<b>Alert:</b> Right click on headlines is disabled";
var alertMsg_TEXTAREA = "<b>Alert:</b> Right click is disabled";
var alertMsg_EmptySpaces = "<b>Alert:</b> Right click on empty spaces is disabled";
var alertMsg_VIDEO = "<b>Alert:</b> Right click on videos is disabled";
document.oncontextmenu=null;
//document.oncontextmenu = nocontext;
//document.addEventListener("contextmenu",nocontext);
//window.addEventListener("contextmenu",nocontext);

//wccp_pro_css_disable_selection
function wccp_pro_msieversion() 
	{
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE");
		var msie2 = ua.indexOf("Edge");
		var msie3 = ua.indexOf("Trident");

	if (msie > -1 || msie2 > -1 || msie3 > -1) // If Internet Explorer, return version number
	{
		return "IE";
	}
	else  // If another browser, return 0
	{
		return "otherbrowser";
	}
}

var e = document.getElementsByTagName('H1')[0];
if(e && wccp_pro_msieversion() == "IE")
{
	e.setAttribute('unselectable',"on");
}

//wccp_pro_disable_drag_images
document.ondragstart = disable_drag_images;
jQuery(document).ready(function(){
	jQuery('img').each(function() {
		jQuery(this).attr('draggable', false);
	});
});

//wccp_pro_disable_selection
var image_save_msg = 'You are not allowed to save images!';
var no_menu_msg = 'Context menu disabled!';
var smessage = "<b>Alert:</b> Content is protected !!";

"use strict";
/* This because search property "includes" does not supported by IE*/
if (!String.prototype.includes) {
	String.prototype.includes = function(search, start) {
	  if (typeof start !== 'number') {
		start = 0;
	  }

	  if (start + search.length > this.length) {
		return false;
	  } else {
		return this.indexOf(search, start) !== -1;
	  }
	};
}

function disable_copy(e)
{
	var e = e || window.event; // also there is no e.target property in IE. instead IE uses window.event.srcElement
	
	var target = e.target || e.srcElement;

	var elemtype = e.target.nodeName;
	
	elemtype = elemtype.toUpperCase();
	
	if(wccp_pro_iscontenteditable(e)) return true;
	
	if (apply_class_exclusion(e) == "Yes") return true;
	
	/*disable context menu when shift + right click is pressed*/
	var shiftPressed = 0;
	
	var evt = e?e:window.event;
	
	if (parseInt(navigator.appVersion)>3) {
		
		if (document.layers && navigator.appName=="Netscape")
			
			shiftPressed = (e.modifiers-0>3);
			
		else
			
			shiftPressed = e.shiftKey;
			
		if (shiftPressed) {
			
			if (smessage !== "") show_wccp_pro_message(smessage);
			
			var isFirefox = typeof InstallTrigger !== 'undefined';   /* Firefox 1.0+ */
			
			if (isFirefox) {
			evt.cancelBubble = true;
			if (evt.stopPropagation) evt.stopPropagation();
			if (evt.preventDefault()) evt.preventDefault();
			//console.log(evt);
			show_wccp_pro_message (smessage);
			return false;
			}
			
			return false;
		}
	}
	
	if(e.which === 2 ){
	var clickedTag_a = (e==null) ? event.srcElement.tagName : e.target.tagName;
	   show_wccp_pro_message(smessage);
	   return false;
	}
	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	var checker_IMG = 'checked';
	if (elemtype == "IMG" && checker_IMG == 'checked' && e.detail == 2) {show_wccp_pro_message(alertMsg_IMG);return false;}

	if (elemtype != "TEXT" && elemtype != "TEXTAREA" && elemtype != "INPUT" && elemtype != "PASSWORD" && elemtype != "SELECT" && elemtype != "OPTION" && elemtype != "EMBED")
	{
		if (smessage !== "" && e.detail == 2)
			show_wccp_pro_message(smessage);
		
		if (isSafari)
			return true;
		else
			return false;
	}	
}

function disable_copy_ie()
{
	var e = e || window.event;
	/*also there is no e.target property in IE.*/
	/*instead IE uses window.event.srcElement*/
	var target = e.target || e.srcElement;
	
	var elemtype = window.event.srcElement.nodeName;
	
	elemtype = elemtype.toUpperCase();

	if(wccp_pro_iscontenteditable(e)) return true;
	
	if (apply_class_exclusion(e) == "Yes") return true;
	
	if (elemtype == "IMG") {show_wccp_pro_message(alertMsg_IMG);return false;}
	
	if (elemtype != "TEXT" && elemtype != "TEXTAREA" && elemtype != "INPUT" && elemtype != "PASSWORD" && elemtype != "SELECT" && elemtype != "EMBED" && elemtype != "OPTION")	
	{
		return false;
	}
}

function disable_drag_text(e)
{
	/*var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);*/
	/*if (isSafari) {show_wccp_pro_message(alertMsg_IMG);return false;}*/
	
	var e = e || window.event; // also there is no e.target property in IE. instead IE uses window.event.srcElement*/
	
	var target = e.target || e.srcElement;
	
	/*For contenteditable tags*/
	
	if (apply_class_exclusion(e) == "Yes") return true;

	var elemtype = e.target.nodeName;
	
	elemtype = elemtype.toUpperCase();
	
	var disable_drag_text_drop = 'checked';
	
	if (disable_drag_text_drop != "checked")  return true;
	
	if (window.location.href.indexOf("/user/") > -1) {
	  return true; /*To allow users to drag & drop images when editing thier profiles*/
	}
	
	return false;
}

//special for safari Start
var onlongtouch; 
var timer;
var touchduration = 1000; /*length of time we want the user to touch before we do something*/

var elemtype = "";
function touchstart(e) {
	var e = e || window.event;
	/*also there is no e.target property in IE.*/
	/*instead IE uses window.event.srcElement*/
	var target = e.target || e.srcElement;
	
	elemtype = window.event.srcElement.nodeName;
	
	elemtype = elemtype.toUpperCase();
	
	if(!wccp_pro_is_passive()) e.preventDefault();
	if (!timer) {
		timer = setTimeout(onlongtouch, touchduration);
	}
}

function touchend() {
	/*stops short touches from firing the event*/
	if (timer) {
		clearTimeout(timer);
		timer = null;
	}
	
	onlongtouch();
}

onlongtouch = function(e) { /*this will clear the current selection if anything selected*/
	if (elemtype != "TEXT" && elemtype != "TEXTAREA" && elemtype != "INPUT" && elemtype != "PASSWORD" && elemtype != "SELECT" && elemtype != "EMBED" && elemtype != "OPTION")	
	{
		if (window.getSelection) {
			if (window.getSelection().empty) { /*Chrome*/
			window.getSelection().empty();
			} else if (window.getSelection().removeAllRanges) {  /*Firefox*/
			window.getSelection().removeAllRanges();
			}
		} else if (document.selection) {  /*IE?*/
			var textRange = document.body.createTextRange();
			textRange.moveToElementText(element);
			textRange.select();

			document.selection.empty();
		}
		
		return false;
	}
};

document.addEventListener("DOMContentLoaded", function(event)
{ 
	window.addEventListener("touchstart", touchstart, false);
	window.addEventListener("touchend", touchend, false);
});

function wccp_pro_is_passive() {

  var cold = false,
  hike = function() {};

  try {
  var aid = Object.defineProperty({}, 'passive', {
  get() {cold = true}
  });
  window.addEventListener('test', hike, aid);
  window.removeEventListener('test', hike, aid);
  } catch (e) {}

  return cold;
}

function reEnable()
{
	return true;
}

if(navigator.userAgent.indexOf('MSIE')==-1) //If not IE
{
	document.ondragstart = disable_drag_text;
	document.onselectstart = disable_copy;
	document.onclick = reEnable;
}
else
{
	document.onselectstart = disable_copy_ie;
}

//wccp_pro_disable_prntscr_key
jQuery(document).bind("keyup keydown", function(e){
	e = e || window.event; // also there is no e.target property in IE. instead IE uses window.event.srcElement
	//console.log (e.keyCode);
	dealWithPrintScrKey(e);
});
	
//window.addEventListener("keyup", dealWithPrintScrKey, false);
document.onkeyup = dealWithPrintScrKey;
function dealWithPrintScrKey(e)
{
	e = e || window.event; // also there is no e.target property in IE. instead IE uses window.event.srcElement
	
	// gets called when any of the keyboard events are overheard
	var prtsc = e.keyCode||e.charCode;

	if (prtsc == 44)
	{
		e.cancelBubble = true;
		e.preventDefault();
		e.stopImmediatePropagation();
		show_wccp_pro_message('You are not allowed to print or save this page!!');
		copyToClipboard(document.getElementsByTagName('span')[0]);
	}
}