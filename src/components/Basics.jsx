import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../API/constatnt";
import "./Basics.css";

const Basics = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/posts`);
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
      const { data } = await axios.post(`${BASE_URL}/posts`, postData, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "custom-header": "test",
        },
      });
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
    <div className="basics_container">
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

export default Basics;
