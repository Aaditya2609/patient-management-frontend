import React, { useState } from 'react'
import ViewDetailsModal from './ViewDetailsModal';
import { useDispatch } from 'react-redux';
import AddEditDetailsModal from './AddEditDetailsModal';
import { deletePatientAsync } from '../Features/Patient/patientSlice';
import { deleteWardAsync } from '../Features/Ward/wardSlice';

function Lists({ data, dataType }) {
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [modalData, setModalData] = useState([]);
    const [modalDataType, setModalDataType] = useState([]);
    const [actionType, setActionType] = useState("")
    const [showAddEditDetailsModal, setShowAddEditDetailModal] = useState(false);
    const dispatch=useDispatch();
    const handleDetails = (item) => {
        setModalData(item);
        setModalDataType(dataType);
        setShowDetailsModal(true);

    }
    const handleDelete=(id)=>{
        if(dataType==="patient")
        {
            dispatch(deletePatientAsync(id))
        }
        else
        dispatch(deleteWardAsync(id))
    }
    const handleEdit=(item)=>{
        if(dataType==="patient")
        {
        setModalDataType("patient")
        setModalData(item)
        setActionType("edit")
        setShowAddEditDetailModal(true)
        }
        else{
        setModalDataType("ward")
        setModalData(item)
        setActionType("edit")
        setShowAddEditDetailModal(true)

        }
    }
    return (

        <div className='flex flex-wrap items-center justify-center gap-4'>
            {data.map(item => <div key={item._id} className='border-2 p-2 border-[#29b9f0ff] flex flex-col items-start rounded-xl w-80 text-lg'>
                {dataType === "patient" ? (<div className='flex w-full flex-col justify-between'>
                    <p className='flex justify-between'>
                        Name: <span>{item.name}</span>
                    </p>
                    <p className='flex justify-between'>
                        Age: <span>{item.age}</span>
                    </p>
                    <p className='flex justify-between'>
                        Gender: <span>{item.gender}</span>
                    </p>
                    <p className='flex justify-between'>
                        Medical History: <span>{item.medicalhistory}</span>
                    </p>
                </div>) : <div className='flex w-full flex-col justify-between text-xl font-semibold py-2'>
                    <p className='flex justify-between'>
                        Name: <span>{item.name}</span>
                    </p>
                    <p className='flex justify-between'>
                        Capacity: <span>{item.capacity}</span>
                    </p>
                    <p className='flex justify-between'>
                        Current Occupancy: <span>{item.currentOccupancy}</span>
                    </p>
                </div>}
                <div className='flex w-full  flex-col items-center gap-2  justify-center my-2'>
                    <button className="flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-lg text-[#29b9f0ff] font-semibold p-1 border-2 border-[#29b9f0ff] rounded whitespace-nowrap" onClick={() => handleDetails(item)}>View Details</button>
                    <div className='flex gap-4'>
                    <button onClick={()=>handleEdit(item)} className="flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-lg text-[#29b9f0ff] font-semibold p-1 border-2 border-[#29b9f0ff] rounded whitespace-nowrap">{dataType === "patient" ? (<div>Edit Patient</div>) : (<div>Edit Ward</div>)}</button>
                    <button onClick={()=>handleDelete(item._id)} className="flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-lg text-[#29b9f0ff] font-semibold p-1 border-2 border-[#29b9f0ff] rounded whitespace-nowrap">{dataType === "patient" ? (<div>Delete Patient</div>) : (<div>Delete Ward</div>)}</button>
                    </div>
                </div>
            </div>)}
            {showDetailsModal && <ViewDetailsModal setShowDetailsModal={setShowDetailsModal} data={modalData} type={modalDataType}/>}
            {showAddEditDetailsModal && <AddEditDetailsModal setShowAddEditDetailModal={setShowAddEditDetailModal} data={modalData} type={modalDataType} action={actionType}/>}
        </div>
    )
}

export default Lists