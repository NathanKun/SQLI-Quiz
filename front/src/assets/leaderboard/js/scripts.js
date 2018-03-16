const local = false;
const url = local ? "http://localhost:8000/user/getranks" : "https://sqliapi.catprogrammer.com/user/getranks";

function sortUsers(a, b){
    if (a.score < b.score){
        return 1;
    } else if (a.score > b.score){
        return -1;
    } else if (a.time > b.time){
        return 1;
    } else if (a.time < b.time){
        return -1;
    }
}

function refreshRanks() {
	$.getJSON( url, function( data ) {
		const ranks = $(data).sort(sortUsers);
		//console.log(ranks);
		
		$('#rank-table tbody').remove();
		$('#rank-table').append("<tbody></tbody>");
		
		$.each(ranks, function(i, user) {
			var badge = "";
			if(i == 0) {
				badge = "class='badge badge-danger'";
			} else if(i == 1) {
				badge = "class='badge badge-primary'";
			} else if(i == 2) {
				badge = "class='badge badge-success'";
			} 
			const rankCell = "<tr><td><span " + badge + ">" + (i + 1) + "</span></td>";
			$("#rank-table > tbody ").append(rankCell + "<td>" + user.name + "</td><td>" + user.score + "pts</td><td>" + user.time + "s</td></tr>");
		});
	});
}

$( window ).on('load', function() {
	refreshRanks();
	window.setInterval(function(){
	  refreshRanks();
	}, 30000);
});