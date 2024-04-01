import React, { useEffect, useState } from "react";
import { UidContext } from "./Appcontent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/login.component'
import SignUp from './components/signup.component'
import Home from './components/home.component'
import Navbars from './components/navbar.component'
import Footer from './components/footer.component'
import Dashbord from './components/dashbord.component'
import Logout from './components/logout.component'
import Profil from "./components/profil/profil.component";
import UpdateProfil from "./components/profil/updateProfil.component";
import UpdateUser from "./components/crudUser/update.component";
import AddUser from "./components/crudUser/add.compenent";
import ProtectedRoute from "./protect/ProtectedRoute.component";
import Unauthorized from "./protect/unauthorized.component";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);
  return (

    <Router>
      <div className="App">
        <Navbars />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <UidContext.Provider value={uid}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route
                  path="/dashbord"
                  element={<ProtectedRoute element={<Dashbord />} allowedRoles={['ADMIN', 'SOUS-ADMIN']} />}
                />
                <Route
                  path="/edit/:id"
                  element={<ProtectedRoute element={<UpdateUser />} allowedRoles={['ADMIN', 'SOUS-ADMIN']} />}
                />
                <Route
                  path="/add-user"
                  element={<ProtectedRoute element={<AddUser />} allowedRoles={['ADMIN', 'SOUS-ADMIN']} />}
                />
                <Route path="/Logout" element={<Logout />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/updateprofil" element={<UpdateProfil />} />
                <Route path="/Unauthorized" element={<Unauthorized />} />
              </Routes>
            </UidContext.Provider>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
