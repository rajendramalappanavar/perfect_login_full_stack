import React,{useEffect, useState, useContext} from "react";
import { useParams,useHistory } from "react-router-dom"
import axios from "axios";
import {Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import {AuthContext} from "../helper/AuthContext";

function Post() {
    const history = useHistory()
    const {setAuthState} = useContext(AuthContext);
    let { id } = useParams();
    const [postObject, setPostObject] =useState({})
    const [comment, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    useEffect(() => {
     axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) =>{
      setPostObject(response.data)
    })
        axios.get(`http://localhost:3001/comments/${id}`).then((response) =>{
      setComments(response.data)
    })
    },[])

    const addComment = () => {
        axios.post("http://localhost:3001/comments", {commentBody:newComment, PostId: id},{headers:{accessToken:localStorage.getItem("accessToken")}}).then((response) => {
            if(response.data.Error) {
                setAuthState(false);
                return history.push("/Login")
            }
            const commnentToAdd = {commentBody: newComment,username:response.data.username}
            setComments([...comment,commnentToAdd])
            setNewComment("")
        })
    }
  return (
    <div>
        <div>
      <Card style={{width:'20%'}} className="container center_div">
         <Card.Text>{postObject.username}</Card.Text>
      <Card.Body>
        <Card.Title>{postObject.title}</Card.Title>
        <Card.Text>
          {postObject.postText}
        </Card.Text>
          <Button variant="primary">Go somewhere</Button>
      </Card.Body>
     </Card>
        </div>
        <div>
            <div className="addCommentontainer">
                <input type="text" placeholder="Comment...." autoComplete="off" value={newComment} onChange={(event) => {
                    setNewComment(event.target.value)
                }}/>
                <Button onClick={addComment}>Add Comment</Button>
            <div className="listOfComments">
                {comment.map((comment, key) => {
                    return <div key={key} className="comment">
                        {comment.commentBody}
                        <span> </span>
                        <label className="alert-light small"> {comment.username}</label>
                    </div>
                })}
            </div>
            </div>
         </div>
    </div>
  );
}

export default Post;
