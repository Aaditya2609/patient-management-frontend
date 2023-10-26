import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Lists from './Lists';
import AddEditDetailsModal from './AddEditDetailsModal';
import { fetchPatients } from '../Features/Patient/patientSlice';

function PatientView() {
    const [showAddEditDetailsModal, setShowAddEditDetailModal] = useState(false);
    const [actionType, setActionType] = useState([])
    const dispatch = useDispatch();
    const patients = useSelector((state) => state.patients.patients);
    const status = useSelector((state) => state.patients.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPatients());
        }
    }, [status, dispatch]);
   

    const handleAddPatient = () => {
        setActionType("add")
        setShowAddEditDetailModal(true)
    }
    return (
        <div>
            {status === "loading" ? (<div className='text-3xl my-4 font-bold fixed top-1/2 left-1/2' > Loading Data...</div>) : (
                <div className='flex flex-col w-full items-center h-[100vh] overflow-auto'>
                    <h1 className='text-3xl my-4 font-bold'>All Patients</h1>
                    <button onClick={() => handleAddPatient()} className="m-1 flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-2 px-4 border-2 border-[#29b9f0ff] rounded whitespace-nowrap">Add Patient</button>
                    <Lists data={patients} dataType="patient" />
                </div>)}
            {showAddEditDetailsModal && <AddEditDetailsModal setShowAddEditDetailModal={setShowAddEditDetailModal} data={[]} type="patient" action={actionType}/>}
            </div>
    )
}

            export default PatientView