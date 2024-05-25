import './App.css';
import BathEntry from './Components/BathEntry';
import { useState } from 'react';
import BathEntryForm from './Components/BathEntryForm';

function App() {

  const [entries, setEntries] = useState({});
  const [bathEntryData, setBathEntryData] = useState({
    name: "",
    roomNumber: "1",
    roomType: "Bath"
  });
  const [entryIndex, setEntryIndex] = useState(0);
  const [isEditView, setIsEditView] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const handleDoneClick = () => {
    const updatedEntries = {...entries};
    updatedEntries[bathEntryData.entryIndex] = bathEntryData;
    // console.log(updatedEntries);
    setEntries(updatedEntries);
    setIsEditView(false);
  }

  const handleEditClick = (bathEntryData) => {
    setBathEntryData(bathEntryData);
    setIsEditView(true);
  }

  const handlePermission = async () => {
    const result = await window.Notification.requestPermission();

    // If the user rejects the permission result will be "denied"
    if (result === "granted") {
      // You must use the service worker notification to show the notification
      // Using new Notification("Hello World", { body: "My first notification on iOS"}) does not work on iOS
      // despite working on other platforms
      console.log("Access granted");
      setPermissionGranted(true);
    }
  };

  const addEntry = () => {
    console.log(entries);
    setBathEntryData({
      name: "",
      roomNumber: "1",
      roomType: "Bath" ,
      entryIndex: entryIndex
    });
    setIsEditView(true);
    setEntryIndex(entryIndex + 1);
  }

  const entryItems = Object.keys(entries).map((keyName, i) => {
    return (<li key={i}><BathEntry bathEntryData={entries[keyName]} handleParentEditClick={handleEditClick}/></li>);
  })
  const entryClassName = isEditView ? "hideDiv" : "showDiv";
  const formWrapperClassName = isEditView ? "showDiv" : "hideDiv";
  return (
    
    <div className="App">
      {!permissionGranted && 
        <button onClick={handlePermission} className ="allowNotificationsButton">Please give me permission UwU to spam you with notifications</button>
      }
      {permissionGranted &&
        <div className={entryClassName}>
            <ul className="noBullets">{entryItems}</ul>
            <button onClick={addEntry} className="addEntryButton">+</button>
        </div>
      }
      {permissionGranted &&
        <div className={formWrapperClassName}>
          <BathEntryForm bathEntryData={bathEntryData} setBathEntryData={setBathEntryData} handleAppDoneClick={handleDoneClick}/>
        </div>}
    </div>
  );
}

export default App;
