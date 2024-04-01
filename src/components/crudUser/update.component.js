import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updateUser } from "../../actions/user.actions";
const bcrypt = require('bcryptjs');

const UpdateUser = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const users = useSelector((state) => state.usersReducer.users);
    const user = users.find(u => u._id === id);

    // Assurez-vous que user existe avant d'accéder à ses propriétés
    const initialPseudo = user ? user.pseudo : '';
    const initialEmail = user ? user.email : '';
    const initialRole = user ? user.role : '';

    const [pseudo, setPseudo] = useState(initialPseudo);
    const [email, setEmail] = useState(initialEmail);
    const [role, setRole] = useState(initialRole);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        
        e.preventDefault();
        dispatch(updateUser(id));
        const hashedPassword = bcrypt.hashSync(password, 10);
        axios.put(`${process.env.REACT_APP_API_URL}api/user/update/${id}`,{ pseudo, email, password: hashedPassword })
            .then(res => {
                dispatch(updateUser(user._id, { pseudo, email, password: hashedPassword }));
                console.log("User update successfully:", res);
                navigate("/Dashbord");

            })
            .catch(err => {
                console.error("Error updating user:", err);
            });
    };

    return (
        <div>
            <form onSubmit={handleUpdate}>
                <h3>Edit user</h3>

                <div className="mb-3">
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Pseudo"
                        id="pseudo"
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo}
                    />
                    <div className="pseudo error"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className="email error"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="password error">{passwordError}</div>
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Modifier
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
