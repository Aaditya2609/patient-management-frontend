import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatients } from "../Features/Patient/patientSlice";
import { fetchWards } from "../Features/Ward/wardSlice";
import { setTopPerformingWard, updateHospitalStats } from "../Features/Hospital/hospitalSlice";

const HospitalView = () => {
    const hospitalStats = useSelector((state) => state.hospital);
    const patients = useSelector((state) => state.patients.patients);
    const wards = useSelector((state) => state.wards.wards);
    const dispatch = useDispatch();
    const status = useSelector((state) => state.patients.status);
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPatients());
            dispatch(fetchWards())
        }
    }, [status, dispatch]);


    useEffect(() => {
        const totalPatients = patients.length;
        const totalCapacity = wards.reduce(
            (sum, ward) => sum + ward.capacity,
            0
        );
        const totalWards=wards.length;
        const averageLengthOfStay = wards.reduce((acc,cv)=>acc+cv.daysofstay,0) / totalWards;

        const topPerformingWard = wards.reduce((prev, current) => {
            return current.daysofstay < prev.daysofstay
                ? current
                : prev;
        }, { daysofstay: 99999 });

        dispatch(
            updateHospitalStats({
                totalPatients,
                totalCapacity,
                totalWards,
                averageLengthOfStay,
                topPerformingWard
            })
        );
        dispatch(setTopPerformingWard(topPerformingWard));
    }, [patients, dispatch]);

    return (
        <div className="flex flex-col justify-center">
            <h1 className='text-3xl my-4 font-bold'>Hospital View</h1>
            <div className="flex w-full justify-center">
                <div className="border-2 p-2 border-[#29b9f0ff] flex flex-col items-start justify-center rounded-xl w-[25rem] text-xl font-semibold">
                    <p className='w-full flex justify-between'>
                        Total Patients: <span>{hospitalStats.totalPatients}</span>
                    </p>
                    <p className='w-full flex justify-between'>
                        Total Wards: <span>{hospitalStats.totalWards}</span>
                    </p>
                    <p className='w-full flex justify-between'>
                        Aviailable Beds: <span>{hospitalStats.totalCapacity-hospitalStats.totalPatients}</span>
                    </p>
                    <p className='w-full flex justify-between'>Total Capacity: <span>{hospitalStats.totalCapacity}</span></p>
                    <p className='w-full flex justify-between'>Average Length Of Stay: <span>{hospitalStats.averageLengthOfStay.toFixed(2)}</span></p>
                    <p className='w-full flex justify-between'>
                        Top Performing Ward:{" "}
                        <span>{hospitalStats.topPerformingWard ? hospitalStats.topPerformingWard.name : "-"}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HospitalView;