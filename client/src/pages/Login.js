import axios from "axios";
import {useHistory} from "react-router-dom";
import React, {useContext} from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import {AuthContext} from "../helper/AuthContext";


function Login(){
    const {setAuthState} = useContext(AuthContext);
    const initialValues = {
      username: "",
      password: ""
    };
    let history = useHistory();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
    })

    const onSubmit = (data) =>{
    axios.post("http://localhost:3001/auth/Login",data).then((response) =>{
      if(response.data.Error) return alert(response.data.Error);
      if(response.data.Invalid) return alert(response.data.Invalid);
      // if(response.data.Message) alert(response.data.Message);
      const token = response.data.token;
      localStorage.setItem("accessToken",token)
      setAuthState(true);
      history.push('/')

    })

        console.log(data)
    }
    return(
        <div className="createPostPage">
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form style={{width:'30%'}} className="container center_div">
              <div className="form-group">
                <label>Username: </label>
                  <ErrorMessage name="username" component="span"/>
                <Field id="" className="form-control" name="username" placeholder="(Ex. Rajendra123...)"/>
              </div>
              <div className="form-group">
                <label>Password: </label>
                  <ErrorMessage name="password" component="span"/>
                <Field id="" type="password" className="form-control" name="password" placeholder="(Ex. Password...)"/>
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </Form>
          </Formik>

     </div>
    )
}

export default Login;
