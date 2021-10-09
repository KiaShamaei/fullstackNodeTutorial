import React, { useEffect, useState , useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from './../helpers/AuthContext';

function Post() {
const {auth}= useContext(AuthContext);
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
  const handleDeleteComment =(id)=>{
	  console.log(id)
	axios.delete(`http://localhost:3003/comments/${id}`, {
		headers : {
			accessToken : sessionStorage.getItem("accessToken")
		}
	}).then(e=>{
		e ? getComments()
		:alert(e)
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
				<span>{comment.username}</span>
				{
					auth.username === comment.username &&
					<button onClick={()=>handleDeleteComment(comment.id)}>X</button>

				}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;