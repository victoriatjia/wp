/* <![CDATA[ */
var WDP_WP = {"ajaxurl":"https:\/\/wekita.id\/wp-admin\/admin-ajax.php","wdpNonce":"e07a38775c","jpages":"true","jPagesNum":"5","textCounter":"true","textCounterNum":"500","widthWrap":"","autoLoad":"true","thanksComment":"Terima kasih atas ucapan & doanya!","thanksReplyComment":"Terima kasih atas balasannya!","duplicateComment":"You might have left one of the fields blank, or duplicate comments","insertImage":"Insert image","insertVideo":"Insert video","insertLink":"Insert link","checkVideo":"Check video","accept":"Accept","cancel":"Cancel","reply":"Balas","textWriteComment":"Tulis Ucapan & Doa","classPopularComment":"wdp-popular-comment","textUrlImage":"Url image","textUrlVideo":"Url video youtube or vimeo","textUrlLink":"Url link","textToDisplay":"Text to display","textCharacteresMin":"Minimal 2 karakter","textNavNext":"Selanjutnya","textNavPrev":"Sebelumnya","textMsgDeleteComment":"Do you want delete this comment?","textLoadMore":"Load more","textLikes":"Likes"};
/* ]]> */

//wdp_textCounter-js
/*
 * jQuery Textarea Characters Counter Plugin v 2.0
 * Examples and documentation at: http://roy-jin.appspot.com/jsp/textareaCounter.jsp
 * Copyright (c) 2010 Roy Jin
 * Version: 2.0 (11-JUN-2010)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.4.2 or later
 */
(function($){  
	$.fn.textareaCount = function(options, fn) {   
		var defaults = {  
			maxCharacterSize: -1,  
			originalStyle: 'originalTextareaInfo',
			warningStyle: 'warningTextareaInfo',  
			warningNumber: 20,
			displayFormat: '#input characters | #words words'
		};  
		var options = $.extend(defaults, options);
		
		var container = $(this);
		
		$("<div class='charleft'>&nbsp;</div>").insertAfter(container);
		
		//create charleft css
		var charLeftCss = {
			'width' : container.width()
		};
		
		var charLeftInfo = getNextCharLeftInformation(container);
		charLeftInfo.addClass(options.originalStyle);
		//charLeftInfo.css(charLeftCss); //lÃ­nea modificada por max lopez
		
		var numInput = 0;
		var maxCharacters = options.maxCharacterSize;
		var numLeft = 0;
		var numWords = 0;
				
		container.bind('keyup', function(event){limitTextAreaByCharacterCount();})
				 .bind('mouseover', function(event){setTimeout(function(){limitTextAreaByCharacterCount();}, 10);})
				 .bind('paste', function(event){setTimeout(function(){limitTextAreaByCharacterCount();}, 10);});
		
		
		function limitTextAreaByCharacterCount(){
			charLeftInfo.html(countByCharacters());
			//function call back
			if(typeof fn != 'undefined'){
				fn.call(this, getInfo());
			}
			return true;
		}
		
		function countByCharacters(){
			var content = container.val();
			var contentLength = content.length;
			
			//Start Cut
			if(options.maxCharacterSize > 0){
				//If copied content is already more than maxCharacterSize, chop it to maxCharacterSize.
				if(contentLength >= options.maxCharacterSize) {
					content = content.substring(0, options.maxCharacterSize); 				
				}
				
				var newlineCount = getNewlineCount(content);
				
				// newlineCount new line character. For windows, it occupies 2 characters
				var systemmaxCharacterSize = options.maxCharacterSize - newlineCount;
				if (!isWin()){
					 systemmaxCharacterSize = options.maxCharacterSize
				}
				if(contentLength > systemmaxCharacterSize){
					//avoid scroll bar moving
					var originalScrollTopPosition = this.scrollTop;
					container.val(content.substring(0, systemmaxCharacterSize));
					this.scrollTop = originalScrollTopPosition;
				}
				charLeftInfo.removeClass(options.warningStyle);
				if(systemmaxCharacterSize - contentLength <= options.warningNumber){
					charLeftInfo.addClass(options.warningStyle);
				}
				
				numInput = container.val().length + newlineCount;
				if(!isWin()){
					numInput = container.val().length;
				}
			
				numWords = countWord(getCleanedWordString(container.val()));
				
				numLeft = maxCharacters - numInput;
			} else {
				//normal count, no cut
				var newlineCount = getNewlineCount(content);
				numInput = container.val().length + newlineCount;
				if(!isWin()){
					numInput = container.val().length;
				}
				numWords = countWord(getCleanedWordString(container.val()));
			}
			
			return formatDisplayInfo();
		}
		
		function formatDisplayInfo(){
			var format = options.displayFormat;
			format = format.replace('#input', numInput);
			format = format.replace('#words', numWords);
			//When maxCharacters <= 0, #max, #left cannot be substituted.
			if(maxCharacters > 0){
				format = format.replace('#max', maxCharacters);
				format = format.replace('#left', numLeft);
			}
			return format;
		}
		
		function getInfo(){
			var info = {
				input: numInput,
				max: maxCharacters,
				left: numLeft,
				words: numWords
			};
			return info;
		}
		
		function getNextCharLeftInformation(container){
				return container.next('.charleft');
		}
		
		function isWin(){
			var strOS = navigator.appVersion;
			if (strOS.toLowerCase().indexOf('win') != -1){
				return true;
			}
			return false;
		}
		
		function getNewlineCount(content){
			var newlineCount = 0;
			for(var i=0; i<content.length;i++){
				if(content.charAt(i) == '\n'){
					newlineCount++;
				}
			}
			return newlineCount;
		}
		
		function getCleanedWordString(content){
			var fullStr = content + " ";
			var initial_whitespace_rExp = /^[^A-Za-z0-9]+/gi;
			var left_trimmedStr = fullStr.replace(initial_whitespace_rExp, "");
			var non_alphanumerics_rExp = rExp = /[^A-Za-z0-9]+/gi;
			var cleanedStr = left_trimmedStr.replace(non_alphanumerics_rExp, " ");
			var splitString = cleanedStr.split(" ");
			return splitString;
		}
		
		function countWord(cleanedWordString){
			var word_count = cleanedWordString.length-1;
			return word_count;
		}
	};  
})(jQuery); 

//wdp_placeholder-js
/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(f,h,$){var a='placeholder' in h.createElement('input'),d='placeholder' in h.createElement('textarea'),i=$.fn,c=$.valHooks,k,j;if(a&&d){j=i.placeholder=function(){return this};j.input=j.textarea=true}else{j=i.placeholder=function(){var l=this;l.filter((a?'textarea':':input')+'[placeholder]').not('.placeholder').bind({'focus.placeholder':b,'blur.placeholder':e}).data('placeholder-enabled',true).trigger('blur.placeholder');return l};j.input=a;j.textarea=d;k={get:function(m){var l=$(m);return l.data('placeholder-enabled')&&l.hasClass('placeholder')?'':m.value},set:function(m,n){var l=$(m);if(!l.data('placeholder-enabled')){return m.value=n}if(n==''){m.value=n;if(m!=h.activeElement){e.call(m)}}else{if(l.hasClass('placeholder')){b.call(m,true,n)||(m.value=n)}else{m.value=n}}return l}};a||(c.input=k);d||(c.textarea=k);$(function(){$(h).delegate('form','submit.placeholder',function(){var l=$('.placeholder',this).each(b);setTimeout(function(){l.each(e)},10)})});$(f).bind('beforeunload.placeholder',function(){$('.placeholder').each(function(){this.value=''})})}function g(m){var l={},n=/^jQuery\d+$/;$.each(m.attributes,function(p,o){if(o.specified&&!n.test(o.name)){l[o.name]=o.value}});return l}function b(m,n){var l=this,o=$(l);if(l.value==o.attr('placeholder')&&o.hasClass('placeholder')){if(o.data('placeholder-password')){o=o.hide().next().show().attr('id',o.removeAttr('id').data('placeholder-id'));if(m===true){return o[0].value=n}o.focus()}else{l.value='';o.removeClass('placeholder');l==h.activeElement&&l.select()}}}function e(){var q,l=this,p=$(l),m=p,o=this.id;if(l.value==''){if(l.type=='password'){if(!p.data('placeholder-textinput')){try{q=p.clone().attr({type:'text'})}catch(n){q=$('<input>').attr($.extend(g(this),{type:'text'}))}q.removeAttr('name').data({'placeholder-password':true,'placeholder-id':o}).bind('focus.placeholder',b);p.data({'placeholder-textinput':q,'placeholder-id':o}).before(q)}p=p.removeAttr('id').hide().prev().attr('id',o).show()}p.addClass('placeholder');p[0].value=p.attr('placeholder')}else{p.removeClass('placeholder')}}}(this,document,jQuery));

//wdp_autosize-js
/*!
	Autosize 3.0.13
	license: MIT
	http://www.jacklmoore.com/autosize
*/
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);c=t.overflowY,"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),f="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(f)&&(f=0),i()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,c=t,u&&(e.style.overflowY=t),o()}function o(){var t=window.pageYOffset,n=document.body.scrollTop,o=e.style.height;e.style.height="auto";var i=e.scrollHeight+f;return 0===e.scrollHeight?void(e.style.height=o):(e.style.height=i+"px",v=e.clientWidth,document.documentElement.scrollTop=t,void(document.body.scrollTop=n))}function i(){var t=e.style.height;o();var i=window.getComputedStyle(e,null);if(i.height!==e.style.height?"visible"!==c&&n("visible"):"hidden"!==c&&n("hidden"),t!==e.style.height){var r=document.createEvent("Event");r.initEvent("autosize:resized",!0,!1),e.dispatchEvent(r)}}var d=void 0===arguments[1]?{}:arguments[1],s=d.setOverflowX,l=void 0===s?!0:s,a=d.setOverflowY,u=void 0===a?!0:a;if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!r.has(e)){var f=null,c=null,v=e.clientWidth,p=function(){e.clientWidth!==v&&i()},h=function(t){window.removeEventListener("resize",p),e.removeEventListener("input",i),e.removeEventListener("keyup",i),e.removeEventListener("autosize:destroy",h),r["delete"](e),Object.keys(t).forEach(function(n){e.style[n]=t[n]})}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",h),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",i),window.addEventListener("resize",p),e.addEventListener("input",i),e.addEventListener("autosize:update",i),r.add(e),l&&(e.style.overflowX="hidden",e.style.wordWrap="break-word"),t()}}function o(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:destroy",!0,!1),e.dispatchEvent(t)}}function i(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:update",!0,!1),e.dispatchEvent(t)}}var r="function"==typeof Set?new Set:function(){var e=[];return{has:function(t){return Boolean(e.indexOf(t)>-1)},add:function(t){e.push(t)},"delete":function(t){e.splice(e.indexOf(t),1)}}}(),d=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(d=function(e){return e},d.destroy=function(e){return e},d.update=function(e){return e}):(d=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},d.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e},d.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],i),e}),t.exports=d});