import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUser] = useState([])
  const [price, setprice] = useState("");
  const [author, setauthor] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [userId,setUserId]=useState("");
  const [comment, setComment]=useState("");

 
  useEffect(() => {
    getUsers(); 
  }, [])

  function getUsers() {
    fetch("https://60a61d65c0c1fd00175f546a.mockapi.io/library/Json").then((result) => {
      result.json().then((resp) => {
        setUser(resp)
      })
    })
  }

  function Dislike(id) {
    getUsers()
    let item=users[id-1];
    console.log(users);
    setauthor(item.author)
    setprice(item.price - 1);
    setUserId(item.id)
    setdescription(item.description)
    setimage(item.image)
    setUserId(item.id)
    setComment(item.comment)
    SaveUser()

  }
  function Like(id) {
    getUsers()
    let item=users[id-1];
    console.log(users);
    setauthor(item.author)
    setprice(item.price + 1);
    setUserId(item.id)
    setdescription(item.description)
    setimage(item.image)
    setUserId(item.id)
    setComment(item.comment)
    SaveUser()
  }

  function AddComment(id) {
    getUsers()
    let item=users[id-1];
    console.log(item.comment);
    setauthor(item.author)
    setprice(item.price + 1);
    setUserId(item.id)
    setdescription(item.description)
    setimage(item.image)
    setUserId(item.id)
    setComment(item.comment)
    SaveUser()

  }
  function SaveUser() {
  
    var item={author,price,description,image,comment}
    console.warn("item",item)
    fetch(`https://60a61d65c0c1fd00175f546a.mockapi.io/library/Json/${userId}`, {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers()
      })
    })
    getUsers()
  }
  return (
      <div className = "container">
      <h2>Your Feed </h2>
      <div border="1px solid" style={{ float: 'left' }}>
          {
            users.map((item, i) =>
              <div key={i}>
                <div><img src ={item.image}></img></div>
                <div>Likes {item.price}</div>
                <div><b>{item.author} </b> {item.description}</div>
                <div>Comments</div>
                <div> {item.comment}</div>
                <div><button onClick={() => Dislike(item.id)}>Dislike</button>
                <button onClick={() => Like(item.id)}>Like</button></div>
                <div>
                  <input type="text"  onChange={(e)=>{setComment(e.target.value)}} /> 
                  <button onClick={()=> AddComment(item.id)}>Add Comment</button>
                </div>
                <div>&ensp; </div>
                <div>&ensp; </div>

              </div>
            )
          }
      </div>
      </div>
  );
  }

export default App;
