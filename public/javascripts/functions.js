
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
var totalreservationDetails;
function reservationSubmit(){
	totalreservationDetails =[];
	for(var i=0; i<seatRange; i++){
	  totalreservationDetails.push([$('#name'+i).val(),$('#age'+i).val(),$('#gender'+i).val()]);
	}
	console.log(totalreservationDetails);
	// var tableDetails = '<table style="width:100%;color:black"><tr><th>Name</th><th>Age</th><th>Gender</th></tr>';
    // for(var i=0; i< totalreservationDetails; i++){
    //   tableDetails += '<tr><td>'+[i][0]+'</td><td>'+[i][1]+'</td><td>'+[i][2]+'</td></tr>';
    // }
	location.href = "/passengerdetails";
	fillTable(totalreservationDetails);
  }