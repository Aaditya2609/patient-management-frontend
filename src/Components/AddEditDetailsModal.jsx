import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWardAsync, fetchWards, updateWardAsync } from '../Features/Ward/wardSlice';
import { addPatientAsync, fetchPatients, updatePatientAsync } from '../Features/Patient/patientSlice';

function AddEditDetailsModal({ setShowAddEditDetailModal, type, data, action }) {
    const [tempPatient, setTempPatient] = useState({
        name: "",
        age: 0,
        gender: "",
        medicalhistory: "",
        contact: {
            phone:""
        },
        wardId: ""
    });

    const [tempWard,setTempWard]=useState({
        name:"",
        capacity:0,
        specializations:"",
        daysofstay:0
    })

    const dispatch = useDispatch();
    const wards = useSelector((state) => state.wards.wards);
    const status = useSelector((state) => state.wards.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchWards());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (action === "edit" && data && type==="patient") {
            const { _id, ...tempPatientWithoutId } = data;
            setTempPatient(tempPatientWithoutId);
        }
        else  if (action === "edit" && data && type==="ward") {
            const { _id, ...tempWardWithoutId } = data;
            setTempWard(tempWardWithoutId);
        }
    }, [action, data,type]);
    

    const handleAddEdit = () => {
        if(type==="patient"){
        if (
            tempPatient.name !== "" &&
            tempPatient.age !== 0 &&
            tempPatient.gender !== "" &&
            tempPatient.medicalhistory !== "" &&
            tempPatient.contact.phone !== "" &&
            tempPatient.wardId !== ""
        ) 
        {
            if (action === "add") {
                dispatch(addPatientAsync(tempPatient));
            } else if (action === "edit") {
                dispatch(updatePatientAsync({ id: data._id, updatedPatient: tempPatient }));
            }

            dispatch(fetchPatients());
            setShowAddEditDetailModal(false);
        } else {
            alert("Please fill all the fields");
        }
    }
    else if(type==="ward")
    {
        if (
            tempWard.name !== "" &&
            tempWard.capacity !== 0 &&
            tempWard.specializations !== "" &&
            tempWard.daysofstay !== 0
        ) 
        {
            if (action === "add") {
                dispatch(addWardAsync(tempWard));
            }
            else if (action === "edit") {
                dispatch(updateWardAsync({ id: data._id, updatedWard: tempWard }));
            }
            dispatch(fetchPatients());
            setShowAddEditDetailModal(false);
        }
        else {
            alert("Please fill all the fields");
        }
    }
    };

    return (
        <div>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70 z-100">
                <div className="bg-[rgba(255,255,255,1)] p-4 rounded-xl w-[35%]">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl self-start px-4 my-4 font-bold text-black">
                            {type === "patient" ? (
                                action === "add" ? <div>Add Patient</div> : <div>Edit Patient</div>
                            ) : (
                                action === "add" ? <div>Add Ward</div> : <div>Edit Ward</div>
                            )}
                        </h1>
                        <button
                            className="m-1 flex items-center bg-[white] hover-bg-[#29b9f0ff] hover-text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-1 px-2 border-2 border-[#29b9f0ff] rounded-sm whitespace-nowrap"
                            onClick={() => setShowAddEditDetailModal(false)}
                        >
                            X
                        </button>
                    </div>
                    {type==="patient"?<div className="flex flex-col items-center">
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Name
                            <input
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempPatient({ ...tempPatient, name: e.target.value })}
                                value={tempPatient.name}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Age
                            <input
                                type='number'
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempPatient({ ...tempPatient, age: e.target.value })}
                                value={tempPatient.age}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Gender
                            <div>
                                <input type="radio" name='gender'
                                    className="border-2 border-black rounded-md px-2 py-1"
                                    onChange={(e) => setTempPatient({ ...tempPatient, gender: "Male" })}
                                    checked={tempPatient.gender === "Male"}
                                ></input>Male
                            </div>
                            <div>
                                <input type="radio" name='gender'
                                    className="border-2 border-black rounded-md px-2 py-1"
                                    onChange={(e) => setTempPatient({ ...tempPatient, gender: "Female" })}
                                    checked={tempPatient.gender === "Female"}
                                ></input>Female
                            </div>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Medical History
                            <input
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempPatient({ ...tempPatient, medicalhistory: e.target.value })}
                                value={tempPatient.medicalhistory}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Contact
                            <input
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempPatient({ ...tempPatient, contact:{...tempPatient.contact,phone: e.target.value}})}
                                value={tempPatient.contact.phone}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Ward
                            <select onChange={(e) => setTempPatient({ ...tempPatient, wardId: e.target.value })} value={tempPatient.wardId}>
                                <option className="border-2 border-black rounded-md px-2 py-1" value="">None</option>
                                {wards?.map(item => (
                                    <option key={item._id} value={item._id} className="border-2 border-black rounded-md px-2 py-1">
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>:
                    <div className="flex flex-col items-center">
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Name
                            <input
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempWard({ ...tempWard, name: e.target.value })}
                                value={tempWard.name}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Capacity
                            <input type="number"
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempWard({ ...tempWard, capacity: e.target.value })}
                                value={tempWard.capacity}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Sepcializations
                            <input
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempWard({ ...tempWard, specializations: e.target.value})}
                                value={tempWard.specializations}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Days of Stay
                            <input
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempWard({ ...tempWard, daysofstay:e.target.value})}
                                value={tempWard.daysofstay}
                            ></input>
                        </label>
                        </div>}
                    <div className='w-full flex items-center justify-center'>
                        <button
                            onClick={handleAddEdit}
                            className="m-1 flex items-center bg-[white] hover-bg-[#29b9f0ff] hover-text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-2 px-4 border-2 border-[#29b9f0ff] rounded whitespace-nowrap"
                        >
                            {type==="patient"?action === "add" ? "Add Patient" : "Edit Patient":action === "add" ? "Add Ward" : "Edit Ward"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEditDetailsModal;