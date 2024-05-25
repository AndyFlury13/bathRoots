import React from 'react';
import { useState, useEffect } from 'react';
import pencil from '../Assets/pencil.png';
import trashCan from '../Assets/trashCan.png';
import playBtn from '../Assets/playBtn.png';
import stopBtn from '../Assets/stopBtn.png';

const TEN_MINUTES_IN_MILLESECONDS = 1000 * 60 * 10;
const FIVE_MINUTES_IN_MILLESECONDS = 1000 * 60 * 5;
const registration = await navigator.serviceWorker.register(
    "./dolly.js"
  );

const BathEntry = ({ bathEntryData, handleParentEditClick}) => {
    
    const [startTime, setStartTime] = useState("");
    const [timerStatus, setTimerStatus] = useState("notStarted");
    const [endTime, setEndTime] = useState("");
    const {name, roomType, roomNumber} = bathEntryData;
    const [timeoutId, setTimeoutId] = useState(13);


    useEffect(() => {
      console.log(startTime);
    }, [startTime, timerStatus])

    const handleEditClick = () => {
        handleParentEditClick(bathEntryData);
    }

    const handleStartClick = () => {
        const guestInfo = {
            guestName: name,
            roomType: roomType,
            showerBathNumber: roomNumber,
            entryIndex: bathEntryData.entryIndex
          }
        const startTime = getHourMinute(new Date());
        setStartTime(startTime);
        setTimerStatus("started");
        alertForCheck(guestInfo, TEN_MINUTES_IN_MILLESECONDS, 1);

    }

    const handleEndClick = () => {
        const endTime = getHourMinute(new Date());
        setEndTime(endTime);
        setTimerStatus("finished");
        clearTimeout(timeoutId);
    }

    function getHourMinute(dateTime) {
      const hours = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      if (minutes < 10) {
        minutes = '0' + minutes.toString();
      }
      return `${hours}:${minutes}`;
    }

    const alertForCheck = (guestInfo, time, checkNumber) => {
        const firstCheckString = `Please check on ${guestInfo.guestName} in ${guestInfo.roomType.slice(0)} ${guestInfo.showerBathNumber}`;
        const timeUpString = `Please check on ${guestInfo.guestName} in ${guestInfo.roomType.slice(0)} ${guestInfo.showerBathNumber}.`
        + ` If there is a line, ${guestInfo.guestName}'s time is up :/`;
        const alertId = setTimeout(
          () => {
            if (checkNumber === 1) {
              registration.showNotification("Time check", {
                body: firstCheckString,
              });
              console.log('Please check');
              alertForCheck(guestInfo, FIVE_MINUTES_IN_MILLESECONDS, 2, guestInfo.entryIndex);
            } else if (checkNumber === 2) {
              registration.showNotification("Time check", {
                body: timeUpString
              });
              console.log(timeUpString);
              return alertForCheck(guestInfo, FIVE_MINUTES_IN_MILLESECONDS, 3, guestInfo.entryIndex);
            } else {
              registration.showNotification("Time check", {
                body: timeUpString
              });
              console.log(timeUpString);
              return alertForCheck(guestInfo, TEN_MINUTES_IN_MILLESECONDS, "other", guestInfo.entryIndex);
            }
        }, time);
        setTimeoutId(alertId);
      }
    
    return (
        <div className="displayView">
            <div className="time">{startTime} - {endTime}</div>
            <div className="guestName">{name}</div>
            <div className="roomInfo">{roomType} {roomNumber}</div>
            {timerStatus === "notStarted" && <div className="timerButton" onClick={handleStartClick}><img src={playBtn}/></div>}
            {timerStatus === "started" && <div className="timerButton" onClick={handleEndClick}><img src={stopBtn}/></div>}
            <div className="editButton" onClick={handleEditClick}><img src={pencil}/></div>
        </div>
    );
}

export default BathEntry;