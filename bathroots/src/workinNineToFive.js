
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
      console.log("Access granted");
      $('#allowNotificationsButton').fadeOut("fast", () => {
        $('.container').fadeIn("fast");
      });
    
    }
  });
}

function handleConfirm(event, registration) {
  const startTimeBtn = $(event.target);
  const rowToConfirm = startTimeBtn.parent().parent();
  const guestNameCell = rowToConfirm.children('.guestNameCell');
  const guestNameInput = guestNameCell.children('.guestNameInput');
  const showerBathNumberCell = rowToConfirm.children('.showerBathNumberCell').children('.showerBathNumberSelect');
  const showerBathCell = rowToConfirm.children('.showerBathToggleCell').children('.showerBathSelect');
  
  const timeInCell = rowToConfirm.children('.timeInCell');
  const timeOutCell = rowToConfirm.children('.timeOutCell');
  let timeoutId = [];
  const counterKey = startTimeBtn.attr('id');
  if (startTimeBtn.html() === "Start") {
    startTimeBtn.html("Stop");
    const startTime = new Date()
    timeInCell.html(getHourMinute(startTime));
    const guestName = guestNameInput.val();
    const roomType = showerBathCell.find(":selected").val();
    const showerBathNumber = showerBathNumberCell.find(":selected").val();
    const guestInfo = {
      guestName: guestName,
      roomType: roomType,
      showerBathNumber: showerBathNumber
    }
    alertForCheck(guestInfo, TEN_MINUTES_IN_MILLESECONDS, 1, timeoutId, counterKey);
  } else {
    startTimeBtn.html("please don't click this again");
    console.log('In stop click event ' + timeoutId);
    clearTimeout(COUNTER_BANK[counterKey]);
    timeOutCell.html(getHourMinute(new Date()));
  }
}



export {alertForCheck};



// run();
