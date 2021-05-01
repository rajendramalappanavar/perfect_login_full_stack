import axios from "axios";
import {useHistory} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

function Registration(){
    let history = useHistory();
    const initialValues = {
      username: "",
      password: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(">3<15"),
        password: Yup.string().min(5).max(20).required(">3<15"),
    })

    const onSubmit = (data) =>{
    axios.post("http://localhost:3001/auth",data).then((response) =>{
      // history.push('/');
        alert("Registration successfull")
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
              <button type="submit" className="btn btn-primary">Registration</button>
            </Form>
          </Formik>

     </div>
    )
}

export default Registration;
