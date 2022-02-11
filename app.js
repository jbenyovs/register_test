let webex;

// Token Section
function initializeWebexTokenVersion() {
  // eslint-disable-next-line no-multi-assign
  webex = window.webex = Webex.init({
    config: {
      logger: {
        level: "debug"
      }
    },
    credentials: {
      access_token: document.getElementById("access-token").value
    }
  });

  document.getElementById("webex-status").innerText = "webex is initialized";
  document.getElementById("webexInit").disabled = true;
}

document.getElementById("webexInit").addEventListener("click", event => {
  event.preventDefault();
  initializeWebexTokenVersion();
  document.getElementById("register").disabled = false;
});

//   // Adding event handler for register button to register the device
document.getElementById("register").addEventListener("click", event => {
  event.preventDefault();
  if (!webex.meetings.registered) {
    let startTime, endTime, textNode, timeDiff;
    startTime = new Date();
    document.getElementById("register-status").innerText = "registering device";
    webex.meetings
      .register()
      .then(() => {
        endTime = new Date();
        timeDiff = endTime - startTime;
        const h2 = document.createElement("h2");
        textNode = document.createTextNode(`${timeDiff}ms`);
        h2.appendChild(textNode);
        document.getElementById("register-form-fieldset").appendChild(h2);
        document.getElementById("register").disabled = true;
        document.getElementById("unregister").disabled = false;
        document.getElementById("register-status").innerText =
          "device is REGISTERED";
      })
      .catch(err => {
        console.log("error in connection");
        throw err;
      });
  }
});

//  Adding event handler for unregister button to unregister the device
document.getElementById("unregister").addEventListener("click", event => {
  event.preventDefault();

  webex.meetings.unregister().then(() => {
    document.getElementById("register").disabled = false;
    document.getElementById("unregister").disabled = true;
    document.getElementById("register-status").innerText =
      "device is UNREGISTERED";
  });
  
});
