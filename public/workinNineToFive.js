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

      $(document).on('click', '.confirmBtn', (event) => {
        handleConfirm(event);

      });

      $(document).on('click', '.addRowBtn', () => {
        handleAddRow();

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
  const confirmBtn = $(event.target);
  const rowToConfirm = confirmBtn.parent().parent();
  const guestNameCell = rowToConfirm.children('.guestNameCell');
  const guestNameInput = guestNameCell.children('.guestNameInput');

  if (confirmBtn.html() === "confirm") {
    confirmBtn.html("edit");
    guestNameCell.html(guestNameInput.val());
  } else {
    confirmBtn.html("confirm");
    guestNameCell.html(`<input class="guestNameInput" value="${guestNameCell.html()}">`);
  }
}

function handleAddRow() {
  $('tbody').append(
    `<tr>
        <td class="guestNameCell"><input class="guestNameInput"></td>
        <td><div class="showerBathToggle">bath</div></td>
        <td></td>
        <td></td>
        <td></td>
        <td><div class="confirmBtn">confirm</div></td>
    </tr>`
  )
}


run();
