function register(username, challenge) {
    console.log("FIDO Regisration");
    u2f.register(
        getAppID(),
        [{"challenge":challenge,"version":"U2F_V2"}], 
        [],
        response => {
            console.log("FIDO Registration Response: " + JSON.stringify(response));
            response.username = username;
            $.post("/register", response, result => {
                console.log("FIDO Registration Result: " + JSON.stringify(result));
                window.location.href = result;
            });
    });
}

function getAppID() {
	var host = document.location.host;
	var href = document.location.href;
	return href.substring(0, href.lastIndexOf(host)) + host;
}