import { Rating } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import './blogDetails.css';

const BlogDetails = () => {

    const [singleBlogData, setSingleBlogData] = useState({});
    const { blogId } = useParams();

    useEffect(() => {
        axios.get(`https://evening-crag-06086.herokuapp.com/single-blog?blogId=${blogId}`)
            .then((response) => {
                setSingleBlogData(response.data);
            })
            .catch((error) => {
                if (error.message) {
                    swal({
                        icon: 'warning',
                        text: 'Something Was wrong Please Try Again',
                        button: 'ok'
                    })
                }
            })
    }, [blogId])

    return (
        <>
            <Navbar />
            <section id="blog-details-page">
                <div className="container-fluid">
                    <div className="blog-details-container">
                        <section id="blog-details-image-section">
                            <div className="blog-details-image">
                                <img src={singleBlogData.sportImage} alt={singleBlogData.blogName} />
                            </div>
                        </section>
                        <section id="blog-details-section">
                            <div className="blog-general-features">
                                <div className="blog-name">
                                    <h2>{singleBlogData.blogName}</h2>
                                </div>
                                <div className="blog-rating">
                                    <Rating name="read-only" value={parseInt(singleBlogData.reviewStar)} readOnly />
                                </div>
                                <div className="blog-general-feature-blog-cost">
                                    {

                                        <small>Cost: {singleBlogData.travelCost}$</small>

                                    }
                                </div>
                            </div>
                            <div className="other-blog-details">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Travler Name</td>
                                            <td>{singleBlogData.travelerName}</td>
                                        </tr>
                                        <tr>
                                            <td>Travler Email</td>
                                            <td>{singleBlogData.travelerEmail}</td>
                                        </tr>
                                        <tr>
                                            <td>Travle Category</td>
                                            <td>{singleBlogData.travelCategory}</td>
                                        </tr>
                                        <tr>
                                            <td>Travle Location</td>
                                            <td>{singleBlogData.travleLocation}</td>
                                        </tr>
                                        <tr>
                                            <td>Travle Data</td>
                                            <td>{singleBlogData.date}</td>
                                        </tr>
                                    </tbody>
                                </table >

                                <div className="blog-descriptions">
                                    <dl>
                                        <dt>About This Product</dt>
                                        <dd>
                                            <p>{singleBlogData.travelDetails}</p>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default BlogDetails;