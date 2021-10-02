import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
const getComments = ()=>{
  axios.get(`http://localhost:3003/comments/${id}`).then((response) => {
    setComments(response.data);
  });
}
  useEffect(() => {
    axios.get(`http://localhost:3003/posts/byId/${id}`).then((response) => {
      
      setPostObject(response.data);
    });
    getComments();
  
  },[]);

  const addComment = ()=>{
    
    const body = {commentBody : newComment , PostId : id}
    axios.post('http://localhost:3003/comments',body , {
		headers  : {accessToken : sessionStorage.getItem("accessToken")}
	} ).then(res=>{
        if(res.data.error){
			console.log(res.data.error)
		}else{
			getComments()
		}
    })

  }
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
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;