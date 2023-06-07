

// export default AddContact;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Component for adding a new contact
const AddContact = () => {
    // State variables to store form input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    // Access the contacts array from the Redux store
    const contacts = useSelector(state => state);

    // Access the dispatch function to dispatch actions to the Redux store
    const dispatch = useDispatch();

    // Use the useNavigate hook from react-router-dom to navigate to different routes
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = e => {
        e.preventDefault();

        // Check if the email or number already exist in the contacts array
        const checkEmail = contacts.find(contact => contact.email === email && email);
        const checkNumber = contacts.find(contact => contact.number === parseInt(number) && number);

        // Validate form input
        if (!email || !number || !name) {
            return toast.warning("Please fill in all fields!");
        }

        // Display an error toast if the email already exists
        if (checkEmail) {
            return toast.error("This email already exists!");
        }

        // Display an error toast if the number already exists
        if (checkNumber) {
            return toast.error("This number already exists!");
        }

        // Create a new contact object with an ID, name, email, and number
        const data = {
            id: contacts[contacts.length - 1].id + 1,
            name,
            email,
            number
        }

        // Dispatch an action to add the new contact to the Redux store
        dispatch({ type: 'ADD_CONTACT', payload: data });

        // Display a success toast and navigate to the home route
        toast.success("Contact added successfully!!");
        navigate('/');
    };

    return (
        <div className='container'>
            <h1 className='display-3 text-center fw-bold'>Add Contact</h1>
            <div className='row'>
                <div className='col-md-6 shadow mx-auto p-5'>
                    <form className='text-center' onSubmit={handleSubmit}>
                        <div className='form-group mb-3'>
                            <input
                                type='text'
                                placeholder='Name'
                                className='form-control'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <input
                                type='email'
                                placeholder='Email'
                                className='form-control'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <input
                                type='number'
                                placeholder='Phone Number'
                                className='form-control'
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <input
                                type='submit'
                                value='Add Contact'
                                className='btn btn-block btn-dark'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddContact;
