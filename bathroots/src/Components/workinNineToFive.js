// const TEN_MINUTES_IN_MILLESECONDS = 1000 * 60 * 10;
// const FIVE_MINUTES_IN_MILLESECONDS = 1000 * 60 * 5;

// const COUNTER_BANK = {};// aka a bad idea?
// let timeoutId = [];

// const alertForCheck = (guestInfo, time, checkNumber, timeoutId, counterKey) => {
//     const firstCheckString = `Please check on ${guestInfo.guestName} in ${guestInfo.roomType.slice(0)} ${guestInfo.showerBathNumber}`;
//     const timeUpString = `Please check on ${guestInfo.guestName} in ${guestInfo.roomType.slice(0)} ${guestInfo.showerBathNumber}.`
//     + ` If there is a line, ${guestInfo.guestName}'s time is up :/`;
//     timeoutId = setTimeout(
//       () => {
//         if (checkNumber === 1) {
//           registration.showNotification("Time check", {
//             body: firstCheckString,
//           });
//           console.log('Please check');
//           alertForCheck(guestInfo, FIVE_MINUTES_IN_MILLESECONDS, 2, timeoutId, counterKey);
//         } else if (checkNumber === 2) {
//           registration.showNotification("Time check", {
//             body: timeUpString
//           });
//           console.log(timeUpString);
//           return alertForCheck(guestInfo, FIVE_MINUTES_IN_MILLESECONDS, 3, timeoutId, counterKey);
//         } else {
//           registration.showNotification("Time check", {
//             body: timeUpString
//           });
//           console.log(timeUpString);
//           return alertForCheck(guestInfo, TEN_MINUTES_IN_MILLESECONDS, "other", timeoutId, counterKey);
//         }
//     }, time);
//     COUNTER_BANK[counterKey] = timeoutId;
//   }

//   export default alertForCheck;