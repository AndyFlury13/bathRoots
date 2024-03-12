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
      $(document).on('click', '.showerBathToggle', (event) => {
        toggleShowerBath(event);

      });

      $(document).on('click', '.startTimeBtn', (event) => {
        handleConfirm(event);

      });

      $(document).on('click', '.addRowBtn', () => {
        handleAddRow();

      });
    
    }
  });
}

function toggleShowerBath(event) {
  // console.log(showerBathToggle);

  // console.log(toggleContents);
  const showerBathToggle = $(event.target);
  const toggleContents = showerBathToggle.html();
  if (toggleContents === "bath") {
    showerBathToggle.html("shower");
  } else {
    showerBathToggle.html("bath");
  }
}

function handleConfirm(event) {
  const startTimeBtn = $(event.target);
  const rowToConfirm = startTimeBtn.parent().parent();
  const guestNameCell = rowToConfirm.children('.guestNameCell');
  const guestNameInput = guestNameCell.children('.guestNameInput');
  const timeInCell = rowToConfirm.children('.timeInCell');
  const timeOutCell = rowToConfirm.children('.timeOutCell');
  if (startTimeBtn.html() === "Start") {
    startTimeBtn.html("Stop");
    // guestNameCell.html(guestNameInput.val());
    timeInCell.html(getHourMinute(new Date()));
  } else {
    startTimeBtn.html("Start");
    timeOutCell.html(getHourMinute(new Date()));
    // guestNameCell.html(`<input class="guestNameInput" value="${guestNameCell.html()}">`);

  }
}

function handleAddRow() {
  $('tbody').append(
    `<tr>
        <td class="guestNameCell"><input class="guestNameInput"></td>
        <td><div class="showerBathToggle">bath</div></td>
        <td class="timeInCell"></td>
        <td class="timeOutCell"></td>
        <td></td>
        <td><div class="startTimeBtn">Start</div></td>
    </tr>`
  )
}

function getHourMinute(dateTime) {
  const hours = dateTime.getHours();
  let minutes = dateTime.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes.toString();
  }
  return `${hours}:${minutes}`;
}


run();
