import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments ,setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3003/posts/byId/${id}`).then((response) => {
      
      setPostObject(response.data);
    });
    axios.get(`http://localhost:3003/comments/${id}`).then((response) => {
      console.log(response.data)
      setComments(response.data);
    });
  },[]);
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input type="text" placeholder="Add new comment" autoComplete="off" />
          <button>add</button>
        </div>
        <div className="listOfComments">
          <ul>
          {comments && comments.map((comment, index)=>{
            return<li className="comment" key={index}>{comment.commentBody}</li>
          })}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Post;