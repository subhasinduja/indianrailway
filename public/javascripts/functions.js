function loginSubmit(){
	console.log('comes here');
if($('#userName').val() != null && $('#password').val() != null){
	var values;
		values = {
			"userName": $('#userName').val()
		};
	$.ajax({
    type: "POST",
    url: '/userLogin',
    data: JSON.stringify(values),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
		console.log("data recieved--------"+data);

		//location.href = "/category";

	}
});
}
}