import React, { useState } from "react";
import axios from "axios";
import Login from "./login.component";

const SignUp = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById("terms");
        const pseudoError = document.querySelector(".pseudo.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector( ".password-confirm.error");
        const termsError = document.querySelector(".terms.error");

        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";

        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword)
                passwordConfirmError.innerHTML =
                    "Les mots de passe ne correspondent pas";

            if (!terms.checked)
                termsError.innerHTML = "Veuillez valider les conditions générales";
        } else {
            await axios({
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
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
            {formSubmit ? (
                <>
                    <Login />
                    <span></span>
                    <h4 className="success">
                        Enregistrement réussi, veuillez-vous connecter
                    </h4>
                </>
            ) : (

                <form onSubmit={handleRegister}>
                    <h3>Sign Up</h3>

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
                        <label htmlFor="password">Password</label>
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

                    <div className="mb-3">
                        <label htmlFor="password-conf">Confirmer password</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Confirmer password"
                            id="password-conf"
                            onChange={(e) => setControlPassword(e.target.value)}
                            value={controlPassword}
                        />
                        <div className="password-confirm error"></div>
                    </div>
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                        J'accepte les{" "}
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            conditions générales
                        </a>
                    </label>
                    <div className="terms error"></div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered <a href="/sign-in">sign in?</a>
                    </p>
                </form>

            )}
        </>
    )
}
export default SignUp;
