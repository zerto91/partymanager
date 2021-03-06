$("#goToLoungeHostingTEMP").click(function() {
	$("#home").addClass("homeHided");
	$("#loungeHosting").removeClass("loungeHostingHided");
	$("#logo").addClass("logoReduced");
	$("#tchat").animate({ scrollTop: $("#tchat").prop("scrollHeight")}, 1000);
});

$("#goToLoungeVotingTEMP").click(function() {
	$("#home").addClass("homeHided");
	$("#loungeVoting").removeClass("loungeVotingHided");
	$("#logo").addClass("logoReduced");
	$("#tchat").animate({ scrollTop: $("#tchat").prop("scrollHeight")}, 1000);
});


//////////
// HOME //
//////////

$("#createLoungeButton").click(function() {
	$("#home").addClass("homeHided");
	$("#loungeCreation").removeClass("loungeCreationHided");
});

$("#joinLoungeButton").click(function() {
	$("#home").addClass("homeHided");
	$("#joinLounge").removeClass("joinLoungeHided");
});


/////////////////////
// LOUNGE CREATION //
/////////////////////

$("#loungeCreationBack").click(function() {
	$("#home").removeClass("homeHided");
	$("#loungeCreation").addClass("loungeCreationHided");
});


/////////////////
// JOIN LOUNGE //
/////////////////

$("#joinLoungeBack").click(function() {
	$("#home").removeClass("homeHided");
	$("#joinLounge").addClass("joinLoungeHided");
});


///////////////////
// LOUNGE VOTING //
///////////////////

$("#loungeVotingRightChatImage").click(function() {
	$("#loungeVotingRightUserImage").removeClass("loungeVotingRightUserImageActive");
	$("#loungeVotingRightChatImage").addClass("loungeVotingRightChatImageActive");
	$("#loungeVotingUserListBox").addClass("loungeVotingUserListBoxHided");
	$("#loungeVotingChatBox").removeClass("loungeVotingChatBoxHided");
});

$("#loungeVotingRightUserImage").click(function() {
	$("#loungeVotingRightChatImage").removeClass("loungeVotingRightChatImageActive");
	$("#loungeVotingRightUserImage").addClass("loungeVotingRightUserImageActive");
	$("#loungeVotingChatBox").addClass("loungeVotingChatBoxHided");
	$("#loungeVotingUserListBox").removeClass("loungeVotingUserListBoxHided");
});