const TEN_MINUTES_IN_MILLESECONDS = 1000 * 60 * 10;
const FIVE_MINUTES_IN_MILLESECONDS = 1000 * 60 * 5;

const COUNTER_BANK = {};// aka a bad idea?
let NEXT_ROW_INDEX = 1;

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

      $(document).on('click', '.startTimeBtn', (event) => {
        handleConfirm(event, registration);

      });

      $(document).on('click', '.addRowBtn', () => {
        handleAddRow();

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
  console.log(startTimeBtn.attr('id'));
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

  function alertForCheck(guestInfo, time, checkNumber, timeoutId, counterKey) {
    const firstCheckString = `Please check on ${guestInfo.guestName} in ${guestInfo.roomType.slice(0)} ${guestInfo.showerBathNumber}`;
    const timeUpString = `Please check on ${guestInfo.guestName} in ${guestInfo.roomType.slice(0)} ${guestInfo.showerBathNumber}.`
    + ` If there is a line, ${guestInfo.guestName}'s time is up :/`;
    timeoutId = setTimeout(
      () => {
        if (checkNumber === 1) {
          registration.showNotification("Time check", {
            body: firstCheckString,
          });
          console.log('Please check');
          alertForCheck(guestInfo, FIVE_MINUTES_IN_MILLESECONDS, 2, timeoutId, counterKey);
        } else if (checkNumber === 2) {
          registration.showNotification("Time check", {
            body: timeUpString
          });
          console.log(timeUpString);
          return alertForCheck(guestInfo, FIVE_MINUTES_IN_MILLESECONDS, 3, timeoutId, counterKey);
        } else {
          registration.showNotification("Time check", {
            body: timeUpString
          });
          console.log(timeUpString);
          return alertForCheck(guestInfo, TEN_MINUTES_IN_MILLESECONDS, "other", timeoutId, counterKey);
        }
    }, time);
    COUNTER_BANK[counterKey] = timeoutId;
  }
}

function handleAddRow() {
  $('tbody').append(
    `<tr>
      <td class="guestNameCell"><input class="guestNameInput"></td>
      <td class="showerBathToggleCell">
        <select class="showerBathSelect">
          <option value="B">B</option>
          <option value="S">S</option>
        </select>
      </td>
      <td class="showerBathNumberCell">
        <select class="showerBathNumberSelect">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>  
      </td>
      <td></td>
      <td class="timeInCell"></td>
      <td class="timeOutCell"></td>
      <td><div class="startTimeBtn" id="${NEXT_ROW_INDEX}">Start</div></td>
    </tr>`
  );
  NEXT_ROW_INDEX += 1;
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
