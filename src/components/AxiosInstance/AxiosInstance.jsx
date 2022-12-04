import React, { useEffect, useState } from "react";
import { axiosInstance, axiosPrivateInstance } from "../../API/axiosInstance";
import "./AxiosInstance.css";

const AxiosInstance = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const getPosts = async () => {
    try {
      // const { data } = await axios.get(`${BASE_URL}/posts`);
      // const { data } = await axiosInstance.get("/posts");
      const { data } = await axiosPrivateInstance.get("/posts");
      setPosts(data.reverse());
    } catch (error) {
      console.log("error while fetching posts", error);
    }
  };

  const addPost = async () => {
    setIsLoading(true);
    let postData = {
      title: post,
      body: "bar",
      userId: 1,
    };
    try {
      // const { data } = await axios.post(`${BASE_URL}/posts`, postData, {
      //   headers: {
      //     "Content-type": "application/json; charset=UTF-8",
      //     "custom-header": "test",
      //   },
      // });
      // const { data } = await axiosInstance.post("/posts", postData);
      const { data } = await axiosPrivateInstance.post("/posts", postData);
      setPost("");
      alert("Post added successfully");
      setPosts((prev) => [data, ...prev]);
    } catch (error) {
      console.log("error while adding post", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="axios_instance_container">
      <h1 style={{ textAlign: "center" }}>
        Welcome to Axios Tutorial (Axios Instance)
      </h1>
      <p className="header">POSTS</p>
      <textarea
        placeholder="Add Post"
        onChange={(e) => setPost(e.target.value)}
        value={post}
        className="post_input"
      />
      <button onClick={addPost} className="add_post_btn" disabled={isLoading}>
        {isLoading ? "Loading" : "Add Post"}
      </button>
      {posts.map((post, index) => {
        return (
          <p key={`post${index}`} className="post_card">
            {post.title}
          </p>
        );
      })}
    </div>
  );
};

export default AxiosInstance;
