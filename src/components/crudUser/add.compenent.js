import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleAdd = async (e) => {
        e.preventDefault();
        const passwordError = document.querySelector(".password.error");
        const pseudoError = document.querySelector(".pseudo.error");
        const emailError = document.querySelector(".email.error");
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/register`,
            data: {
                pseudo,
                email,
                password,
            },
        })
            .then((res) => {
                console.log(res);
                if (res.data.errors) {
                    pseudoError.innerHTML = res.data.errors.pseudo;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                }else {
                    navigate("/Dashbord");
                }
                
            })
            .catch((err) => console.log(err));
    }
    return (
        <div>
            <form onSubmit={handleAdd}>
                <h3>Add user</h3>

                <div className="mb-3">
                    <label htmlFor="pseudo">pseudo</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="pseudo "
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
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="password error"></div>
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Ajouter
                    </button>
                </div>
            </form>

        </div>
    )
}

export default AddUser;