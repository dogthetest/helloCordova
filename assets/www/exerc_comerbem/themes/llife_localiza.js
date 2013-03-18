var db;
var jQT = $.jQTouch({
	icon: 'img/jqtouch.png',
	startupScreen: 'img/jqt_startup.png',
	statusBar: 'black'
});

$(document).ready(function() {
    $('#createEntry form').submit(createEntry);
    $('#settings form').submit(saveSettings);
    $('#settings').bind('pageAnimationStart', loadSettings);
    $('#dates li a').click(function(){
        var dayOffset = this.id;
        var date = "2013-03-14"
        //var date = new Date();
        //date.setDate(date.getDate() - dayOffset);
		//sessionStorage.currentDate = date.getDate() + '/' +  (date.getMonth() + 1) + '/' + date.getFullYear();
        refreshEntries();
    });
    var shortName = 'lightlife1';
    var version = '1.0';
    var displayName = 'lightlife1';
    var maxSize = 65536;
    db = openDatabase(shortName, version, displayName, maxSize);
    db.transaction(
        function(transaction) {
            transaction.executeSql(
                'CREATE TABLE IF NOT EXISTS entries ' +
                ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                ' date text NOT NULL, food TEXT NOT NULL, ' +
                ' calories INTEGER NOT NULL );'
            );
        }
    );
});

function saveSettings() {
    localStorage.age = $('#age').val();
    localStorage.budget = $('#budget').val();
    localStorage.weight = $('#weight').val();
    jQT.goBack();
    return false;
}

function loadSettings() {
    $('#age').val(localStorage.age);
    $('#budget').val(localStorage.budget);
    $('#weight').val(localStorage.weight);
}

function refreshEntries() {
    var currentDate = sessionStorage.currentDate;
	//var currentDate = currentDate1.substring(5,9) + "-0" + currentDate1.substring(3,4) + "-" + currentDate1.substring(0,2);
	//alert(currenteDate);
    $('#date h1').text(currentDate);
    $('#date ul li:gt(0)').remove();
    db.transaction(
        function(transaction) {
            transaction.executeSql(
                'SELECT * FROM entries WHERE date = ? ORDER BY food;',
                [currentDate],
                function (transaction, result) {
                    for (var i=0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        var newEntryRow = $('#entryTemplate').clone();
                        newEntryRow.removeAttr('id');
                        newEntryRow.removeAttr('style');
                        newEntryRow.data('entryId', row.id);
                        newEntryRow.appendTo('#date ul');
                        newEntryRow.find('.label').text(row.food);
                        newEntryRow.find('.calories').text(row.calories);
                        newEntryRow.find('.delete').click(function(){
                            var clickedEntry = $(this).parent();
                            var clickedEntryId = clickedEntry.data('entryId');
                            deleteEntryById(clickedEntryId);
                            clickedEntry.slideUp();
                        });
                    }
                },
                errorHandler
            );
        }
    );
}

function createEntry() {
    var date = sessionStorage.currentDate;
	//var date = date1.substring(5,9) + "-0" + date1.substring(3,4) + "-" + date1.substring(0,2) 
    var calories = $('#calories').val();
    var food = $('#food').val();
    db.transaction(
        function(transaction) {
            transaction.executeSql(
                'INSERT INTO entries (date, calories, food) VALUES (?, ?, ?);',
                [date, calories, food],
                function(){
                    refreshEntries();
                    jQT.goBack();
                },
                errorHandler
            );
        }
    );
    return false;
}

function errorHandler(transaction, error) {
    alert('Oops. Error was '+error.message+' (Code '+error.code+')');
    return true;
}

function deleteEntryById(id) {
    db.transaction(
        function (transaction) {
            transaction.executeSql('DELETE FROM entries WHERE id=?;', [id], null, errorHandler);
        }
    );
}

        var initialLocation;
        var map;

        function initGeoLocalizacao() {
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(locSucesso, erro);
            } else {
                $('#status').text('Seu browser não suporta geolocalização!');
            }
        }

        function locSucesso(position) {
            var htmlText = 'Latidude: ' + position.coords.latitude + '<br>Logintude: ' + position.coords.longitude;
            $('#status').html(htmlText);
        }

        function erro(error) {
            $('#status').text(error == typeof msg == 'string' ? msg : "falha ao localizar");
            $('#status').css('background-color','#F00').css('padding','5px');
        }