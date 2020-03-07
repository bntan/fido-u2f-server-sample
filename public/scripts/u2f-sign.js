function sign(keyHandle, publicKey, challenge) {
    console.log("FIDO Signature");
    u2f.sign(
        getAppID(),
        challenge,
        [{"keyHandle":keyHandle,"version":"U2F_V2"}],
        response => {
            console.log("FIDO Signature Response: " + JSON.stringify(response)); 
            response.publicKey = publicKey;
            $.post("/sign", response, result => {
                console.log("FIDO Signature Result: " + JSON.stringify(result));
                window.location.href = result;
            });
    });
}

function getAppID() {
	var host = document.location.host;
	var href = document.location.href;
	return href.substring(0, href.lastIndexOf(host)) + host;
}