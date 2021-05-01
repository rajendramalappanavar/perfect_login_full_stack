import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home'
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import {AuthContext} from "./helper/AuthContext";
import {useState,useEffect} from "react";
import axios from "axios";

function App() {
   const [authState, setAuthState] = useState(false)
    useEffect(() => {
         axios.get("http://localhost:3001/auth/auth",{headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) =>{
             if(response.data.Error) return setAuthState(false);
             setAuthState(true);
         })
    },[])

    const logout = () => {
       localStorage.removeItem("accessToken");
       setAuthState(false)
    }
  return (
    <div className="App">
      <AuthContext.Provider value={{authState,setAuthState}}>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link active">Home</Link>
              <Link to="/createpost" className="nav-item nav-link">Create a post</Link>
              {!authState ? (
               <>
              <Link to="/Login" className="nav-item nav-link active">Login</Link>
              <Link to="/Registration" className="nav-item nav-link">Registration</Link>
              </>
              ) : (
                  <div>
                      <Link onClick={logout} className="nav-item nav-link">Logout</Link>
                  </div>
              )}
            </div>
          </div>
        </nav>


        {/*<Link to="/createpost">Create a post</Link>*/}
        {/*<Link to="/">Home</Link>*/}
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/createpost" exact component={CreatePost}/>
          <Route path="/post/:id" exact component={Post}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/registration" exact component={Registration}/>
        </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
