var db;
var jQT = $.jQTouch({
	icon: 'kilo.png',
	statusBar: 'black'
});

$(document).ready(function() {
    $('#dates li a').click(function(){
        var dayOffset = this.id;
        var date = new Date();
        date.setDate(date.getDate() - dayOffset);
		//Data em formato Inglês
        //sessionStorage.currentDate = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
		sessionStorage.currentDate = date.getDate() + '/' +  (date.getMonth() + 1) + '/' + date.getFullYear();
		
        refreshEntries();
    });
});

function refreshEntries() {
    var currentDate1 = sessionStorage.currentDate;
	var currentDate = currentDate1.substring(5,9) + "-0" + currentDate1.substring(3,4) + "-" + currentDate1.substring(0,2);
    $('#date h1').text(currentDate1);
}
