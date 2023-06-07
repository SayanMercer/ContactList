

// export default Home;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Component for displaying the home page with contact list
const Home = () => {
    // Access the contacts array from the Redux store
    const contacts = useSelector(state => state);

    // Access the dispatch function to dispatch actions to the Redux store
    const dispatch = useDispatch();

    // Function to delete a contact
    const deleteContact = (id) => {
        // Dispatch an action to delete the contact from the Redux store
        dispatch({ type: 'DELETE_CONTACT', payload: id });
        // Display a success toast message
        toast.success('Contact deleted successfully!');
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12 my-5 text-end'>
                    {/* Link to the add contact page */}
                    <Link to='/add' className='btn btn-outline-dark'>Add Contact</Link>
                </div>
                <div className='col-md-10 mx-auto'>
                    <table className='table table-hover'>
                        <thead className='text-white bg-dark text-center'>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Number</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // Loop through the contacts array and render a table row for each contact
                                contacts.map((contact, id) => (
                                    <tr key={id}>
                                        <td>{id + 1}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.number}</td>
                                        <td>
                                            {/* Link to the edit contact page */}
                                            <Link to={`/edit/${contact.id}`} className='btn btn-small btn-primary me-2'>Edit</Link>
                                            {/* Button to delete a contact */}
                                            <button type='button' onClick={() => deleteContact(contact.id)} className='btn btn-small btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home;
