var timeout_result;
function show_wccp_pro_message(smessage)
{
			
	timeout = 3000;
	
	if (smessage !== "" && timeout!=0)
	{
		var smessage_text = smessage;
		jquery_fadeTo();
		document.getElementById("wpcp-error-message").innerHTML = smessage_text;
		document.getElementById("wpcp-error-message").className = "msgmsg-box-wpcp warning-wpcp showme";
		clearTimeout(timeout_result);
		timeout_result = setTimeout(hide_message, timeout);
	}
	else
	{
		clearTimeout(timeout_result);
		timeout_result = setTimeout(hide_message, timeout);
	}
}
function hide_message()
{
	jquery_fadeOut();
	document.getElementById("wpcp-error-message").className = "msgmsg-box-wpcp warning-wpcp hideme";
}
function jquery_fadeTo()
{
	try {
		jQuery("#wccp_pro_mask").fadeTo("slow", 0.3);
	}
	catch(err) {
		//alert(err.message);
		}
}
function jquery_fadeOut()
{
	try {
		jQuery("#wccp_pro_mask").fadeOut( "slow" );
	}
	catch(err) {}
}