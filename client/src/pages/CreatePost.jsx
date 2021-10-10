import React , {useContext , useEffect}from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreatePost.scss"
import { useHistory } from "react-router-dom";
import { AuthContext } from './../helpers/AuthContext';

const CreatePost = ()=> {
	const {auth} =useContext(AuthContext)
  const history = useHistory()
  const initialValues = {
    title: "",
    postText: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("عنوان پست اجباری ست "),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3003/posts", data , {
		headers : {accessToken :  sessionStorage.getItem("accessToken")} }).then((response) => {
    if(response.status === 200)
	history.push("/")
    });
   
  };
  useEffect(() => {
	if(!auth.status){
		history.push("/login")
	}
})
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />
          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;