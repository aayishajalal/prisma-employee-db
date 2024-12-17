import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for toastify

// Create departments list[]
const departments = ["HR", "Training", "Marketing", "Engineering"];

// Zod Schema for validation
const employeeSchema = z.object({
    employeeId: z.string().min(7, "Minimum 7 characters").max(10, "Maximum 10 characters").regex(/^\d{2}[A-Z]{2}\d{3,6}$/, "EmployeeId Format : YYDEPTSNO eg. 22CS001"),
    name: z.string().min(1, "Employee Name is required"),
    email: z.string().email("Invalid Email Id"),
    phone: z.string().regex(/^\d{10}$/, "Phone number is required and must be 10 digits"),
    department: z.string().min(1, "Department is required"),
    dateOfJoining: z.string().refine(
        (date) => new Date(date) <= new Date(),
        "cannot be future date"
    ),
    role: z.string().min(1, "Role is required"),
});

const Form = () => {
    // useForm with resolver
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({ resolver: zodResolver(employeeSchema) });

    // State for date and setDate
    const [date, setDate] = useState(new Date());

    // OnSubmit function to make API call
    const onSubmit = async (formData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/employee/create-employee', formData);
            console.log(response);
            toast.success("Employee created successfully!"); // Success Toast
        } catch (error) {
            console.error("Error during API call", error);
            toast.error("Error creating employee! Please try again."); // Error Toast

            if (error.response && error.response.data) {
                const errors = error.response.data.errors;
                if (errors) {
                    console.log('Errors', errors);
                } else {
                    console.log("No specific error");
                }
            } else {
                console.log("Error response or data not available");
            }
        }
    };

    // handleDateChange function for DatePicker
    const handleDateChange = (date) => {
        setDate(date);
        setValue("dateOfJoining", date.toISOString().split("T")[0]);
    };

    return (
        <div className='2xl:container mx-auto'>
            <div className='w-[90%] mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 items-center justify-center bg-white shadow-md rounded-md ">
                    <div className="mb-4">
                        <input
                            {...register("employeeId")}
                            placeholder="Employee ID"
                            className={`border p-2 w-full rounded ${errors.employeeId ? 'border-red-500' : ''}`}
                        />
                        {errors.employeeId && <p className='text-red-500 text-sm'>{errors.employeeId.message}</p>}
                    </div>

                    <div className="mb-4">
                        <input
                            {...register("name")}
                            placeholder="Name"
                            className={`border p-2 w-full rounded ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <input
                            {...register("email")}
                            placeholder="Email"
                            className={`border p-2 w-full rounded ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <input
                            {...register("phone")}
                            placeholder="Phone"
                            className={`border p-2 w-full rounded ${errors.phone ? 'border-red-500' : ''}`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <DatePicker
                            selected={date}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            maxDate={new Date()} // Disable future dates
                            placeholderText="Select Date"
                            className={`border p-2 w-full rounded ${errors.dateOfJoining ? 'border-red-500' : ''}`}
                        />
                        {errors.dateOfJoining && <p className="text-red-500 text-sm">{errors.dateOfJoining.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <select {...register("department")} className={`border p-2 w-full ${errors.department ? 'border-red-500' : ''}`}>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>))}
                        </select>
                        {errors.department && <p className='text-red-500 text-sm'>{errors.department.message}</p>}
                    </div>

                    <div className="mb-4">
                        <input
                            {...register("role")}
                            placeholder="Role"
                            className={`border p-2 w-full rounded ${errors.role ? 'border-red-500' : ''}`}
                        />
                        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                    </div>

                    <div className="mb-4 flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Submit</button>
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setDate(new Date()); // Reset date picker
                            }}
                            className="bg-gray-500 text-white p-2 rounded w-full"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
