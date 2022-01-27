import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './allBlog.css';

const AllBlog = () => {
    const navigate = useNavigate();
    const [blog, setBlog] = useState([]);
    const [totalPage, setTotalPage] = useState([]);
    const [page, setPage] = useState(0);
    const size = 12;

    useEffect(() => {
        axios.get(`https://evening-crag-06086.herokuapp.com/all-blog?page=${page}&&size=${size}`)
            .then((response) => {
                setBlog(response.data.blog);
                const count = response.data.count;
                const pageNumber = Math.ceil(count / 10);
                setTotalPage(pageNumber);
            })
    }, [page])

    const goDetailsPage = (id) => {
        navigate(`/blog-details/${id}`, {
            replace: true,
        })
    }

    return (
        <section id="all-blog-section">
            <div className="container-fluid">
                <div className="all-blog-section-title">
                    <h1>All Travel Blogs</h1>
                </div>
                <div className="blog-container">
                    {
                        blog.reverse().map((data) => (
                            <div className="single-blog" key={data._id} onClick={() => goDetailsPage(data._id)}>
                                <div className="single-blog-container">
                                    <div className="single-blog-image">
                                        <img src={data.sportImage} alt="" />
                                    </div>
                                    <div className="single-blog-title">
                                        <h4>{data.blogName}</h4>
                                    </div>
                                    <div className="single-blog-details">
                                        <p>{data.travelDetails}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="pagination">
                    {
                        [...Array(totalPage).keys()].map((number) => (
                            <button key={number}
                                className={number === page ? 'selected-page' : ''}
                                onClick={() => setPage(number)}
                            >{number + 1}</button>)
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default AllBlog;