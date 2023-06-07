

// export default EditContact
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Component for editing a contact
const EditContact = () => {
    // State variables to store form input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    // Access the 'id' parameter from the URL
    const { id } = useParams();

    // Access the contacts array from the Redux store
    const contacts = useSelector(state => state);

    // Access the dispatch function to dispatch actions to the Redux store
    const dispatch = useDispatch();

    // Use the useNavigate hook from react-router-dom to navigate to different routes
    const navigate = useNavigate();

    // Find the current contact object based on the 'id' parameter
    const currentContact = contacts.find(contact => contact.id === parseInt(id));

    // Set the form input values to the current contact details when the component mounts or the currentContact value changes
    useEffect(() => {
        if (currentContact) {
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }
    }, [currentContact]);

    // Function to handle form submission
    const handleSubmit = e => {
        e.preventDefault();

        // Check if the email or number already exist in other contacts (excluding the current contact being edited)
        const checkEmail = contacts.find(contact => contact.id !== parseInt(id) && contact.email === email);
        const checkNumber = contacts.find(contact => contact.id !== parseInt(id) && contact.number === parseInt(number));

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

        // Create a new contact object with the updated details
        const data = {
            id: parseInt(id),
            name,
            email,
            number
        }

        // Dispatch an action to update the contact in the Redux store
        dispatch({ type: 'UPDATE_CONTACT', payload: data });

        // Display a success toast and navigate to the home route
        toast.success("Contact updated successfully!!");
        navigate('/');
    };

    return (
        <div className='container'>
            {currentContact ? (
                <>
                    <h1 className='display-3 text-center fw-bold'>Edit Contact {id}</h1>
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
                                        value='Update Contact'
                                        className='btn btn-dark'
                                    />
                                    <Link to='/' className='btn btn-danger ms-3'>Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <h1 className='display-3 my-5 text-center fw-bold'>Contact with id {id} does not exist!!</h1>
            )}
        </div>
    );
}

export default EditContact;
