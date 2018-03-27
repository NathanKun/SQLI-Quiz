const local = false;
const url = local ? "http://localhost:8000/user/adduser" : "https://sqliapi.catprogrammer.com/user/adduser";

function addUser() {
	const name = $('#name').val();
	if(name.length != 0) {
		$.ajax({
			url: url,
			method:"POST",

			data:{
				name: name,
			},
			success: function(res) {
				console.log(res);
				if(res.valid) {
					console.log("addUser valid");
					alert("success");
					$('#name').val("");
				} else {
					console.log("addUser not valid");
					alert(res.error);
				}
			},
			error: function(){
				alert("error");
			}
      });
	} else {
		alert("Please enter the name");
	}
}