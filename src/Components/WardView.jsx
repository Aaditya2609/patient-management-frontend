import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Lists from './Lists';
import AddEditDetailsModal from './AddEditDetailsModal';
import { fetchWards } from '../Features/Ward/wardSlice';
import { fetchPatients } from '../Features/Patient/patientSlice';

function WardView
() {
    const [showAddEditDetailsModal, setShowAddEditDetailModal] = useState(false);
    const [actionType, setActionType] = useState([])
    const dispatch = useDispatch();
    const [newWard,setNewWard]=useState([])
    const wards = useSelector((state) => state.wards.wards);
    const patients = useSelector((state) => state.patients.patients);
    const status = useSelector((state) => state.wards.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchWards());
            dispatch(fetchPatients());
        }
    }, [status, dispatch]);

    const handleAddWard = () => {
        setActionType("add")
        setShowAddEditDetailModal(true)
    }
    const calculateOccupancy = () => {
        const updatedWards = wards.map((ward) => {
            const wardId = ward._id;
            const occupiedBeds = patients.filter((patient) => patient.wardId._id === wardId).length;
            return {
                ...ward,
                currentOccupancy: occupiedBeds,
            };
        });

        setNewWard(updatedWards);
    }

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchWards());
            dispatch(fetchPatients());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (wards.length > 0 && patients.length > 0) {
            calculateOccupancy();
        }
    }, [wards, patients]);

    return (
        <div>
            {status === "loading" ? (<div className='text-3xl my-4 font-bold fixed top-1/2 left-1/2' > Loading Data...</div>) : (
                <div className='flex flex-col w-full items-center h-[100vh] overflow-auto'>
                    <h1 className='text-3xl my-4 font-bold'>All Wards</h1>
                    <button className="m-1 flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-2 px-4 border-2 border-[#29b9f0ff] rounded whitespace-nowrap" onClick={(e)=>handleAddWard()}>Add Ward</button>
                    <Lists data={newWard} dataType="ward" />
                </div>)}
                {showAddEditDetailsModal && <AddEditDetailsModal setShowAddEditDetailModal={setShowAddEditDetailModal} data={[]} type="ward" action={actionType}/>}
        </div>
    )
}

export default WardView
