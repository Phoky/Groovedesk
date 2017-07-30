
function getCookie(name) 
{
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

$(document).on('click', '.search', function () 
{
	$.ajax({
        url : "search/",
        type : "POST",
        data : { typeId : $(this).data('id') },
        dataType: 'json',
        success : function(response) 
        {
        	var obj = JSON.parse(response)
        	$('.resutlSearch').html('');
        	if (obj.length > 0)
        	{
        		$.each(obj, function(index, value)
        		{
	        		$('.resutlSearch').append(
	        			'<div>'
	        				+ '<p>' + value.fields.name +  '</p>'
	        			+ '</div>'
	        			)
        		});
        	}
    		else 
    		{
    			$('.resutlSearch').append('<p>Pas de résultat</p>')
    		}

        },
        error : function(xhr,errmsg,err) 
        {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
})

$(document).on('click', '#sendEmailNewletter', function()
{
	$.ajax({
	        url : "register/newsletter/",
	        type : "POST",
	        data : { email : $('#emailNexletter').val() },
	        dataType: 'json',
	        success : function(response) 
	        {

	        },
	        error : function(xhr,errmsg,err) 
	        {
	            console.log(xhr.status + ": " + xhr.responseText);
	        }
	    });
})
