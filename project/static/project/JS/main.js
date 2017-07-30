
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
        	$('.resultPushFoward').html('');
        	if (obj.length > 0)
        	{
        		$.each(obj, function(index, value)
        		{
        			if (value.fields.pushFowardBoolean == true)
        			{
			        		$('.resultPushFoward').append(
			        			'<div class="tool col-md-12">'
			        				+ '<p class="title">pushFowardBoolean</p>'
			        				+ '<p class="title">' + value.fields.name +  '</p>'
			        				+ '<p class="shorText">' + value.fields.shorText +  '</p>'
			        				+ '<p class="cannonical">' + value.fields.cannonical +  '</p>'
			        			+ '</div>'
		        			)
        			}
        			else
        			{
		        		$('.resutlSearch').append(
		        			'<div class="tool col-md-4">'
		        				+ '<p class="title">' + value.fields.name +  '</p>'
		        				+ '<p class="shorText">' + value.fields.shorText +  '</p>'
		        				+ '<p class="cannonical">' + value.fields.cannonical +  '</p>'
		        			+ '</div>'
		        			)
        			}
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
	        	if (response.status == 'success')
	        	{
			        $('.errorNewletter').addClass('hide');
	        		$('.successNewletter').html('Merci pour votre inscription');
	        		$('.successNewletter').removeClass('hide');
	        	}
	        	else if(response.status == 'wrong')
	        	{
					$('.successNewletter').addClass('hide');

	        		if (response.message == 'User register')
	        		{
						$('.errorNewletter').html('Vous etes deja inscrit a notre newsletter');
			        	$('.errorNewletter').removeClass('hide');
	        		}
	        		else
	        		{
						$('.errorNewletter').html('Merci de renseigner votre email');
			        	$('.errorNewletter').removeClass('hide');
	        		}
	        	}
	        },
	        error : function(xhr,errmsg,err) 
	        {
	            console.log(xhr.status + ": " + xhr.responseText);
	        }
	    });
});

$(".alert").show("slow").delay(4000).hide("slow");
