import React from 'react'

function ViewDetailsModal({ setShowDetailsModal, data, type }) {
    return (
        <div>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70 z-100">
                <div className="bg-[rgba(255,255,255,1)] p-4 rounded-xl w-[35%]">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl self-start px-4 my-4 font-bold text-black">
                            {data.name}'s Details
                        </h1>
                        <button
                            className="m-1 flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-1 px-2 border-2 border-[#29b9f0ff] rounded-sm whitespace-nowrap"
                            onClick={() => setShowDetailsModal(false)}
                        >
                            X
                        </button>
                    </div>
                    <div className='flex items-center justify-center'>
                        {type === "patient" ? (<div className='flex w-[28rem] font-semibold text-xl flex-col justify-between my-8'>
                            <p className='flex justify-between'>
                                Name: <span>{data.name}</span>
                            </p>
                            <p className='flex justify-between'>
                                Age: <span>{data.age}</span>
                            </p>
                            <p className='flex justify-between'>
                                Genfer: <span>{data.gender}</span>
                            </p>
                            <p className='flex justify-between'>
                                Medical History: <span>{data.medicalhistory}</span>
                            </p>
                            <p className='flex justify-between'>
                                Contact: <span>{data.contact.phone}</span>
                            </p>
                            <p className='flex justify-between'>
                                Ward: <span>{data.wardId.name}</span>
                            </p>
                        </div>) : <div className='flex w-96 font-semibold text-xl flex-col justify-between my-8'>
                            <p className='flex justify-between'>
                                Name: <span>{data.name}</span>
                            </p>
                            <p className='flex justify-between'>
                                Capacity: <span>{data.capacity}</span>
                            </p>
                            <p className='flex justify-between'>
                               Current Occupancy: <span>{data.currentOccupancy}</span>
                            </p>
                            <p className='flex justify-between'>
                                Specializations: <span>{data.specializations}</span>
                            </p>
                            <p className='flex justify-between'>
                                Days Of Stay: <span>{data.daysofstay}</span>
                            </p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDetailsModal