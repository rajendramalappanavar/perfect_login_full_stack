import axios from "axios";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import { Card,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home(){
  const [listOfPosts, setlistOfPosts] = useState([]);
  let history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) =>{
      console.log(response);
      setlistOfPosts(response.data);
    })
  },[])
    return(
        <div style={{width:'20%'}} className="container center_div">
        {listOfPosts.map((value, key) => {
        return(
             <Card key={key} onClick={() => {history.push(`/post/${value.id}`)}}>
                 <Card.Text>{value.username}</Card.Text>
              <Card.Body>
                <Card.Title>{value.title}</Card.Title>
                <Card.Text>
                  {value.postText}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
        )
      })}
     </div>
    )
}

export default Home;
