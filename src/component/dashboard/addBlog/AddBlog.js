import axios from 'axios';
import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import { FirebaseContext } from '../../../context/FirebaseProvider';
import './addBlog.css';
const AddBlog = () => {

    const [blogData, setBlogData] = useState({});    
    
    const {admin, user} = useContext(FirebaseContext);

    const handleInput = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newProduct = {...blogData};
        newProduct[field] = value;        
        setBlogData(newProduct)
    }

    const handleForm = e => {
        e.preventDefault();
        if(admin.isAdmin) {
            blogData.status = 'confirm';
        }
        else if(user.email) {
            blogData.status = 'pending';
        }

        function getFormateTime() {
            const now = new Date().toLocaleString();
        
            const date = now.split(',')[0].split('/');         
            
            return {
                date: `${date[1]}/${date[0]}/${date[2]}`,
                
            };
        }
        const {date} = getFormateTime();
        
        const addDate = {
            ...blogData,
            date: date,
        }
               
        

        axios.post('https://evening-crag-06086.herokuapp.com/add-blog', addDate)
        .then((response) => {
            if(response.data.insertedId.length >= 1) {
                swal({
                    icon: 'success',
                    text: 'Succefully Blog Upload',
                    buttom: 'ok'
                })
                e.target.reset();
            }
        })
        .catch((error) => {
            if(error.message) {
                swal({
                    icon: 'warning',
                    text: 'Somthing Was Worng Please Try Again',
                    buttom: 'ok'
                })
            }
        })
    }

  

    return (
        <div className="add-new-blog-section">
            <div className="add-new-blog-section-title">
                <h2>Add New Blog</h2>
                <div className="add-blog-container">
                    <form onSubmit={handleForm} encType="multipart/form-data">
                        <div className="add-blog-area">
                            <div className="add-blog-from-design">
                                <label htmlFor="blog-name">Blog Title</label>
                                <input type="text"  placeholder="Enter Your blog Title" id="blog-name" name="blogName" onInput={handleInput} required/>
                            </div>                           
                            <div className="add-blog-from-design">
                                <label htmlFor="traveler-name">Traveler Name</label>
                                <input type="text" placeholder="Enter Your Name" name="travelerName" id="traveler-name"  onInput={handleInput} required />
                            </div>
                            <div className="add-blog-from-design">
                                <label htmlFor="blog-image">Traveler Email</label>                              
                                <input type="email" placeholder="Enter your email address" name="travelerEmail" id="traveler-email"  onInput={handleInput} required />
                            </div>
                            <div className="add-blog-from-design">
                                <label htmlFor="travle-category">Travle Category</label>
                                <input type="text" name="travelCategory" placeholder="Travel Category "id="travle-category" onInput={handleInput} required />
                            </div>
                            <div className="add-blog-from-design">
                                <label htmlFor="travle-cost">Travel Cost</label>
                                <input type="number" placeholder="Your Travle Cost" name="travelCost" id="travle-cost" onInput={handleInput} required />
                            </div>
                            <div className="add-blog-from-design">
                                <label htmlFor="travle-location">Travle Location</label>
                               <input type="text" placeholder="Enter Your Travle Location" name="travleLocation" id="travle-location" onInput={handleInput} required />
                            </div> 
                            <div className="add-blog-from-design">
                                <label htmlFor="sport-image">sport Image</label>
                               <input type="url" name="sportImage" id="sport-image" placeholder="Enter Your Image Url" onInput={handleInput} required />
                            </div>
                            <div className="add-blog-from-design">
                                <label htmlFor="review-star">Your Rating</label>
                               <input type="number" placeholder="Enter Your Review Star (max 5)" name="reviewStar" id="review-star"  min="1" max="5" onInput={handleInput} required />
                            </div>
                            <div className="add-blog-from-design">
                                <label htmlFor="travle-details">travle Details</label>
                                <textarea id="travel-details" cols="40" rows="7" placeholder="Enter Your Blog Details" name="travelDetails" onInput={handleInput} required></textarea>
                            </div>                          
                        </div>
                        <input type="submit" value="Add Blog" id="add-new-blog-button"/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;