import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  const [updatedPost, setUpdatedPost] = useState([{}])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deletePost = (id) => {
    console.log(id);
    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  }

  const updatePost = (post) => {
    // console.log(post);
    setUpdatedPost(post);
    handleShow();
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedPost = () => {
    if (updatedPost.title.trim().length > 0 && updatedPost.description.trim().length > 0) {
      // console.log(updatedPost);
      axios
        .put(`/update/${updatedPost._id}`, updatedPost)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      handleClose();
      window.location.reload();
    } else {

    }
  }
  useEffect(() => {
    axios.get("/posts")
      .then((res) => {
        console.log(res)
        setPosts(res.data)
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ width: "30%", textAlign: "center", margin: "auto auto", paddingTop: "2rem" }}>
      <h1>POSTS PAGE</h1>
      <Button
        onClick={() => navigate(-1)}
        variant="outline-dark"
        style={{
          width: "100%",
          marginBottom: "1rem"
        }}>
        CREATE NEW POST
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE POST</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                onChange={handleChange}
                placeholder='Title'
                style={{
                  marginBottom: "1rem"
                }}
                name="title"
                value={updatedPost.title ? updatedPost.title : ""}
              />
              <Form.Control
                onChange={handleChange}
                placeholder='Description'
                name="description"
                value={updatedPost.description ? updatedPost.description : ""}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {posts ? (
        <>
          {posts.map(post => {
            return (
              < div
                key={post._id}
                style={{
                  border: "1px solid lightgray",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                  padding: "1rem"
                }}>
                <h4>{post.title}</h4>
                <p style={{ textAlign: "start" }}>{post.description}</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}>
                  <Button
                    onClick={() => updatePost(post)}
                    variant="outline-info"
                    style={{
                      width: "100%",
                      marginRight: "1rem"
                    }}>
                    Update
                  </Button>
                  <Button
                    onClick={() => deletePost(post._id)}
                    variant="outline-danger"
                    style={{
                      width: "100%",
                    }}>
                    Delete
                  </Button>
                </div>
              </div>
            )
          })}
        </>
      ) : ""
      }
    </div >
  );
}

export default Posts;