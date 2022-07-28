import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';


function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const handleClick = (e) => {
    if (post.title.trim().length > 0 && post.description.trim().length > 0) {
      e.preventDefault();
      console.log(post);

      axios
        .post("/create", post)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      navigate("posts")
    } else {
    }
  };
  // useEffect(() => {
  //   console.log(post);
  // }, [post]);

  return (
    <div style={{ width: "30%", margin: "auto auto", textAlign: "center", paddingTop: "2rem" }}>
      <h1>CREATE POST</h1>
      <Form>
        <Form.Group>
          <Form.Control
            name="title"
            placeholder="Title"
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
            value={post.title}
          />
          <Form.Control
            name="description"
            placeholder="Description"
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
            value={post.description}
          />
        </Form.Group>
        <Button
          onClick={handleClick}
          style={{ width: "100%", marginBottom: "1rem" }}
          variant="outline-success"
        >
          CREATE POST
        </Button>
      </Form>
      <Button
        style={{ width: "100%", marginBottom: "1rem" }}
        onClick={() => navigate("posts")}
        variant="outline-dark">
        CHECK POSTS
      </Button>
      <Button
        style={{ width: "100%" }}
        onClick={() => navigate(-1)}
        variant="outline-dark">
        BACK TO HOMEPAGE
      </Button>
    </ div>
  );
}

export default CreatePost;
