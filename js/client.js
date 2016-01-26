var currentUrl = window.location.href;
var nodeJsServerUrl;

if (currentUrl == "http://localhost:8080/partymanager/")
	nodeJsServerUrl = "http://127.0.0.1:8000/";
else
	nodeJsServerUrl = "http://partymanagerserver-graphmaxer.rhcloud.com:8000";

var socket = io.connect(nodeJsServerUrl);

socket.on("errorMessage", function (errorMessage) {
	$("#errorBox").append("<div class='errorMessage'>Erreur : " + errorMessage + "</div>").removeClass("errorBoxHided");

	setTimeout(function() {
  		$("#errorBox").addClass("errorBoxHided");
	}, 5000);

	setTimeout(function() {
  		$("#errorBox").children("div:first").remove();
	}, 5500);
});

$("#loungeCreationButton").click(function() {
	var loungeName = $("#loungeName").val();
	var loungePassword = $("#loungePassword").val();
	var loungeDescription;

	if ($("#loungeDescription").val()) {
		loungeDescription = $("#loungeDescription").val();
	}
	else
	{
		loungeDescription = "Pas de description";
	}
	
	socket.emit("newLounge", { "loungeName" : loungeName, "loungePassword" : loungePassword,  "loungeDescription" : loungeDescription});
});

socket.on("retrieveLounges", function (lounges) {
	if (lounges.length === 0)
	{
    	loungeList = "Pas de salon";
	}
	else
	{
		var loungeList = "";
		for (var i = 0; i < lounges.length; i++)
		{
			loungeList += "<div class='loungeListItem'><span class='loungeListName'>" + lounges[i].loungeName + " : </span><span class='loungeListDescription'>" + lounges[i].loungeDescription + "</span></div>";
		}
	}
	$("#loungeList").html(loungeList);
});


socket.on("retrieveNewLounge", function (lounge) {
	$("#loungeList").append("<div class='loungeListItem'><span class='loungeListName'>" + lounge.loungeName + " : </span><span class='loungeListDescription'>" + lounge.loungeDescription + "</span></div>");
});