import axios from "axios";
import {useHistory} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

function CreatePost(){
    let history = useHistory();
    const initialValues = {
      title: "",
      postText: "",
      username: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a title"),
        postText: Yup.string().required("Please be little create"),
        username: Yup.string().min(3).max(15).required(">3<15"),
    })

    const onSubmit = (data) =>{
    axios.post("http://localhost:3001/posts",data).then((response) =>{
      history.push('/');
    })

        console.log(data)
    }
    return(
        <div className="createPostPage">
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form style={{width:'30%'}} className="container center_div">
              <div className="form-group">
                <label>Title: </label>
                  <ErrorMessage name="title" component="span"/>
                <Field id="" className="form-control" name="title" placeholder="(Ex. Rajendra...)"/>
              </div>
              <div className="form-group">
                <label>Post: </label>
                  <ErrorMessage name="postText" component="span"/>
                <Field id="" className="form-control" name="postText" placeholder="(Ex. Post...)"/>
              </div>
              <div className="form-group">
                <label>Username: </label>
                  <ErrorMessage name="username" component="span"/>
                <Field id="" className="form-control" name="username" placeholder="(Ex. Rajendra123...)"/>
              </div>
              <button type="submit" className="btn btn-primary">Create Post</button>
            </Form>
          </Formik>

     </div>
    )
}

export default CreatePost;
