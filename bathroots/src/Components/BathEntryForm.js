import { useState, useEffect } from 'react';

const BathEntryForm = ({bathEntryData, setBathEntryData, handleAppDoneClick}) => {

    const [name, setName] = useState(bathEntryData.name);
    const [roomType, setRoomType] = useState(bathEntryData.roomType);
    const [roomNumber, setRoomNumber] = useState(bathEntryData.roomNumber);
    const [bathroomStyle, setBathroomStyle]  = useState("selectedRoom");
    const [showerStyle, setShowerStyle]  = useState("unselectedRoom");
    
    useEffect(() => {
        setBathEntryData( {
            ...bathEntryData,
            roomType: roomType,
            roomNumber: roomNumber,
            name: name
        })
    }, [roomType, roomNumber, name]);

    const handleBathClick = () => {
        setShowerStyle("unselectedRoom");
        setBathroomStyle("selectedRoom");
        setRoomType("Bathroom");
        
    }

    const handleShowerClick = () => {
        setShowerStyle("selectedRoom");
        setBathroomStyle("unselectedRoom");
        setRoomType("Shower");
        
    }

    const handleRoomNumberClick = (e) => {
        setRoomNumber(e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDoneClick = () => {
        handleAppDoneClick();
    }

    return (
        <div className="formView">
            <div className="nameBox">
                Name:
                <input 
                    name="nameInput" 
                    onChange={handleNameChange}
                    value={name}
                />
            </div>
            <div className="roomTypesBox">
                <div onClick={handleBathClick} className={bathroomStyle}>
                    Bathroom
                </div>
                <div onClick={handleShowerClick} className={showerStyle}>
                    Shower
                </div>
            </div>
            <div className="roomNumberBox">
                Room number:
                <select defaultValue={roomNumber} onChange={handleRoomNumberClick}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        <button onClick={handleDoneClick}>Done</button>
        </div>
    );
};

export default BathEntryForm;