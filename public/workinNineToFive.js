async function run() {
  const registration = await navigator.serviceWorker.register(
    "dolly.js",
    {
      scope: "./",
    }
  );

  const allowNotificationsButton = document.getElementById("allowNotificationsButton");
  allowNotificationsButton.addEventListener("click", async () => {
    // Triggers popup to request access to send notifications
    const result = await window.Notification.requestPermission();

    // If the user rejects the permission result will be "denied"
    if (result === "granted") {
      // You must use the service worker notification to show the notification
      // Using new Notification("Hello World", { body: "My first notification on iOS"}) does not work on iOS
      // despite working on other platforms

      $('.showerBathToggle').on('click', (e) => {
        toggleShowerBath(e);
      });
      

      setTimeout(
          () => {
            registration.showNotification("Hello World", {
              body: "My first notification on iOS",
            })
      }, 3000);
    
    }
  });
}

function toggleShowerBath(event) {
  const toggleContents = event.currentTarget.innerHTML;
  if (toggleContents === "bath") {
    event.currentTarget.innerHTML = "shower";
  } else {
    event.currentTarget.innerHTML = "bath";
  }
}

run();
