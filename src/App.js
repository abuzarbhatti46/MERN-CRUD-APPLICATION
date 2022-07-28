import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "90%", margin: "auto auto", paddingTop: "10%", textAlign: "center" }}>
      <h1>WELCOM TO MERN STACK CRUD APP</h1>
      <p>To create a post, please hit the Create Post button!</p>
      <Button
        style={{ width: "55%" }}
        variant="outline-dark"
        onClick={() => navigate("create")} >
        CREATE POST
      </Button>
    </div>
  );
}

export default App;
