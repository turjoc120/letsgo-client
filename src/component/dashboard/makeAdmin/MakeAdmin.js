import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import './makeAdmnin.css';

const MakeAdmin = () => {

    const [email, setEmail] = useState('');

    const handleAddAdmin = e => {
        e.preventDefault();
        axios.patch(`https://evening-crag-06086.herokuapp.com/add-admin?userEmail=${email}`,{role: 'admin'})
        .then((response) => {
            if(response.data.modifiedCount) {
                swal({
                    icon: 'success',
                    text: "succefully Add Admin",
                    button: 'ok',
                })               
            }
        })
        .catch((error) => {
            if(error.message) {
                swal({
                    icon: 'warning',
                    text: 'Something Was Worng Please Try Again',
                    button: 'ok',
                })
            }
        })
    }

    return (
        <section id="make-admin">
            <div className="container">
                <h1 id="make-admin-title">Add New Admin</h1>
                <form onSubmit={handleAddAdmin}>
                    <input type="email" placeholder="Email Your Add Admin" name="email" id="email" onInput={(e) => setEmail(e.target.value)} required />
                    <input type="submit" value="Add Admin" />
                </form>
            </div>
        </section>
    );
};

export default MakeAdmin;