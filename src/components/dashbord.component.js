import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Navdash from './navbardash.component';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getUsers } from '../actions/users.actions';
import { Link } from 'react-router-dom';
import { deleteUser } from '../actions/user.actions';

const Dashboard = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersReducer.users);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/alluser`);
                dispatch(getUsers(res.data));
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    
        axios.delete(`${process.env.REACT_APP_API_URL}api/user/delete/${id}`)
            .then(res => {
                dispatch(getUsers());
                console.log("User deleted successfully:", res);
            })
            .catch(err => {
                console.error("Error deleting user:", err);
            });
    }
    

    return (
        <div className='auth-wrapper'>
            <Navdash />
            {users.length > 0 && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.pseudo}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Link className="nav-link" to={`/edit/${user._id}`}>
                                        <Button variant="primary" size="sm">
                                            Modifier
                                        </Button>
                                    </Link>
                                    &nbsp;
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default Dashboard;
