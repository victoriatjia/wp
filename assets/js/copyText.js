function copyText(el) {
		var content = jQuery(el).siblings('div.copy-content').html()
		var temp = jQuery("<textarea>");
		jQuery("body").append(temp);
		temp.val(content.replace(/<br ?\/?>/g, "\n")).select();
		document.execCommand("copy");
		temp.remove();
		var text = jQuery(el).html()
		jQuery(el).html(jQuery(el).data('message'))
		var counter = 0;
		var interval = setInterval(function() {
			counter++;
			if (counter == 1) {
				jQuery(el).html(text)
			}
		}, 500);
	}