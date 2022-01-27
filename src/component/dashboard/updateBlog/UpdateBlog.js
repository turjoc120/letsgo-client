import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import swal from 'sweetalert';
import './updateBlog.css';

const UpdateBlog = () => {

    
    const {blogId} = useParams();
    const [updateBlogData, setUpdateBlogData] = useState({})

    const handleInput = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newProduct = {...updateBlogData};
        newProduct[field] = value;        
        setUpdateBlogData(newProduct)
    }
    
    useEffect(() => {
        axios.get(`https://evening-crag-06086.herokuapp.com/single-blog?blogId=${blogId}`)
        .then((response) => {
            setUpdateBlogData(response.data);
        })
    }, [blogId])

    const handleUpdateForm = e => {
        e.preventDefault();        
        axios.patch(`https://evening-crag-06086.herokuapp.com/update-blog?blogId=${blogId}`,updateBlogData)
        .then((response) => {
            if(response.data.modifiedCount) {
                swal({
                    icon: 'success',
                    text: "succefully Update blog",
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
        <div className="update-new-blog-section">
            <div className="update-new-blog-section-title">
                <h2>Update Blog</h2>
                <div className="update-blog-container">
                    <form onSubmit={handleUpdateForm}>
                        <div className="update-blog-area">
                            <div className="update-blog-from-design">
                                <label htmlFor="blog-name">Blog Title</label>
                                <input type="text"  placeholder="Enter Your blog Title" id="blog-name" name="blogName" defaultValue={updateBlogData.blogName} onChange={handleInput} required/>
                            </div>                           
                            <div className="update-blog-from-design">
                                <label htmlFor="traveler-name">Traveler Name</label>
                                <input type="text" placeholder="Enter Your Name" name="travelerName" id="traveler-name" defaultValue={updateBlogData.travelerName}  onChange={handleInput} required />
                            </div>
                            <div className="update-blog-from-design">
                                <label htmlFor="blog-image">Traveler Email</label>                              
                                <input type="email" placeholder="Enter your email address" name="travelerEmail" id="traveler-email" defaultValue={updateBlogData.travelerEmail} onChange={handleInput} required />
                            </div>
                            <div className="update-blog-from-design">
                                <label htmlFor="travle-category">Travle Category</label>
                                <input type="text" name="travelCategory" placeholder="Travel Category "id="travle-category" defaultValue={updateBlogData.travelCategory} required />
                            </div>
                            <div className="update-blog-from-design">
                                <label htmlFor="travle-cost">Travel Cost</label>
                                <input type="number" placeholder="Your Travle Cost" name="travelCost" id="travle-cost" defaultValue={updateBlogData.travelCost} onChange={handleInput} required />
                            </div>
                            <div className="update-blog-from-design">
                                <label htmlFor="travle-location">Travle Location</label>
                               <input type="text" placeholder="Enter Your Travle Location" name="travleLocation" id="travle-location" defaultValue={updateBlogData.travleLocation} onChange={handleInput} required />
                            </div> 
                            <div className="update-blog-from-design">
                                <label htmlFor="sport-image">sport Image</label>
                               <input type="url" name="sportImage" id="sport-image" placeholder="Enter Your Image Url" defaultValue={updateBlogData.sportImage} onChange={handleInput} required />
                            </div>
                            <div className="update-blog-from-design">
                                <label htmlFor="review-star">Your Rating</label>
                               <input type="number" placeholder="Enter Your Review Star (max 5)" name="reviewStar" id="review-star"  min="1" max="5" defaultValue={updateBlogData.reviewStar} onChange={handleInput} required />
                            </div>
                            <div className="update-blog-from-design">
                                <label htmlFor="travle-details">travle Details</label>
                                <textarea id="travel-details" cols="40" rows="7" placeholder="Enter Your Blog Details" name="travelDetails" defaultValue={updateBlogData.travelDetails} onChange={handleInput} required></textarea>
                            </div>                          
                        </div>
                        <input type="submit" defaultValue="Add Blog" id="update-new-blog-button"/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBlog;