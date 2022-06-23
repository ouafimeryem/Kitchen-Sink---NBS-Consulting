({
	handleClick : function(component, event, helper) {
		let clickedButtonName = event.getSource().get("v.name");
        console.log("clickedButtonName" + clickedButtonName);
        let action = "";
        
        if(clickedButtonName === "Previous") {
            action = "BACK";
        } else {
            action = "NEXT"
        }
     
        component.set("v.clickedButton", clickedButtonName);
        
        console.log("clickedButton" + component.get("v.clickedButton"));

        var navigate = component.get('v.navigateFlow');  
        navigate(action);
	}
})