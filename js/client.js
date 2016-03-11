var currentUrl = window.location.href;
var nodeJsServerUrl;

var localhostRegex = new RegExp("^(http|https)(:\/\/)(localhost)(:[0-9]*)?(\/partymanager)(.*)$");
var cloud9Regex = new RegExp("^(http|https)(:\/\/)(partymanager)(-|\.)(graphmaxer\.c9users\.io)(.*)$");
var openShiftRegex = new RegExp("^(http|https)(:\/\/)(partymanager-graphmaxer\.rhcloud\.com)(.*)$");

if (localhostRegex.test(currentUrl))
	nodeJsServerUrl = "http://127.0.0.1:8000/";
else if (cloud9Regex.test(currentUrl))
	nodeJsServerUrl = "http://partymanager-server-graphmaxer.c9users.io:8080";
else if (openShiftRegex.test(currentUrl))
	nodeJsServerUrl = "http://partymanagerserver-graphmaxer.rhcloud.com:8000";

var socket = io.connect(nodeJsServerUrl);

///////////////////
// ERROR HANDLER //
///////////////////

socket.on("errorMessage", function (errorMessage) {
	$("#errorBox").append("<div class='errorMessage'>Erreur : " + errorMessage + "</div>").removeClass("errorBoxHided");

	setTimeout(function() {
		$("#errorBox").addClass("errorBoxHided");
	}, 4000);

	setTimeout(function() {
		$("#errorBox").children("div:first").remove();
	}, 4500);
});


/////////////////////
// LOUNGE CREATION //
/////////////////////

$("#loungeCreationButton").click(function() {
	var loungeName = $("#loungeCreationName").val();
	var loungePassword = $("#loungeCreationPassword").val();
	var loungeDescription = $("#loungeCreationDescription").val();
	
	socket.emit("newLounge", {"loungeName" : loungeName, "loungePassword" : loungePassword,  "loungeDescription" : loungeDescription});
});

////////////////////
// LOUNGE LISTING //
////////////////////

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


/////////////////
// OPEN LOUNGE //
/////////////////


$("#loungeList").on("click", ".loungeListItem", function() {
	$("#passwordPopup").removeClass("passwordPopupHided");
});

$("#loungeList").click(function() {
	socket.emit("openLoungeRequest", {"loungeName" : $(this).find(":first-child").text().slice(0, -2)} );

	socket.on("loungeOpened", function (loungeInfo) {
		$("#joinLounge").addClass("joinLoungeHided");
		$("#loungeVoting").removeClass("loungeVotingHided");
		$("#logo").addClass("logoReduced");
		$("#tchat").animate({ scrollTop: $("#tchat").prop("scrollHeight")}, 1000);
	});
});


///////////
// TCHAT //
///////////

$(".tchatSendButton").click(function() {
	var messageAuthor = $(".tchatInputAuthor").val();
	var messageContent = $(".tchatInputMessage").val();
	
	socket.emit("newMessage", { "messageAuthor" : messageAuthor, "messageContent" : messageContent});
	$(".tchat").animate({ scrollTop: $(".tchat").prop("scrollHeight")}, 300);
	$(".tchatInputMessage").val("");
});

socket.on("retrieveMessages", function (messages) {
	var messageList = "";
	for (var i = 0; i < messages.length; i++)
	{
		messageList += "<div class='message'><span class='messageAuthor'>" + messages[i].messageAuthor + " : </span><span class='messageContent'>" + messages[i].messageContent + "</span></div>";
	}

	$(".tchat").html(messageList);
});

socket.on("retrieveNewMessage", function (message) {
	$(".tchat").append("<div class='message'><span class='messageAuthor'>" + message.messageAuthor + " : </span><span class='messageContent'>" + message.messageContent + "</span></div>");
	$(".tchat").animate({ scrollTop: $(".tchat").prop("scrollHeight")}, 300);
});