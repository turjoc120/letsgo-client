import React, { useEffect, useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


const ManageAllBlog = () => {
    
    const [allBlog, setAllBlog] = useState([]);
    const navigate = useNavigate()
    const deteleRef = useRef(null);

    useEffect(() => {
        axios.get(`https://evening-crag-06086.herokuapp.com/all-blog?status=confirm`)
        .then((response) => {
            setAllBlog(response.data);
        })
    }, [])
    
    const updateBlog = (id) => {
        navigate(`/dashboard/update-blog/${id}`,{
            replace: true,
        })
    } 

    const handleDelete = id => {
        axios.delete(`https://evening-crag-06086.herokuapp.com/delete-single-blog?blogId=${id}`)
        .then((response) => {
            if(response.data.deletedCount) {
                swal({
                    icon: 'success',
                    text: 'Blog Succefully Delete',
                    button: 'ok',
                })
                deteleRef.current.parentElement.parentElement.remove();     
            }
        })
        .catch((error) => {
            if(error.message) {
                swal({
                    icon: 'warning',
                    text: "Somethng Was Worng Please Try Again",
                    button: 'ok',
                })
            }
        })
    }

    return (
        <section id="manege-all-blogs">
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Blog Title</TableCell> 
                            <TableCell align="center">user Name</TableCell>                               
                            <TableCell align="center">Create Date</TableCell>                                                      
                            <TableCell align="center">Action</TableCell>           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            allBlog.map((data) => (
                                <TableRow
                                key={data._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}                            
                                >
                                    <TableCell component="th" scope="row" style={{width: '30%'}}>
                                        {data?.blogName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {data?.travelerName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {data?.date}
                                    </TableCell>                                   
                                    <TableCell align="center">
                                        <Button style={{
                                            textAlign: 'right',
                                            marginRight: '7px',
                                            backgroundColor: 'dodgerblue',
                                            color: '#f5f5f5',
                                            }}
                                            variant="outlined"
                                            onClick={() => updateBlog(data._id)}                                            
                                            >
                                                Update
                                        </Button>
                                        <Button style={{
                                            textAlign: 'right',
                                            backgroundColor: 'red',
                                            color: '#f5f5f5',
                                            }}
                                            variant="outlined"
                                            onClick={() => handleDelete(data._id)}
                                            ref={deteleRef}                                            
                                            >
                                                Delete
                                        </Button>
                                    </TableCell>                            
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
};

export default ManageAllBlog;