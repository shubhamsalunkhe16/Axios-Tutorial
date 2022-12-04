import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../API/constatnt";

const Intro = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/posts`);
      console.log("Posts", data);
      setPosts(data.reverse());
    } catch (error) {
      console.log("error while fetching posts", error);
    }
  };

  const addPost = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/posts`,
        {
          title: post,
          body: "bar",
          userId: 1,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "custom-header": "test",
          },
        }
      );
      console.log("Posts", data);
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
    <div>
      <p
        style={{
          backgroundColor: "Highlight",
          padding: "10px 20px",
          textAlign: "center",
        }}
      >
        POSTS
      </p>
      <textarea
        name="add_post"
        id="add_post"
        placeholder="Add Post"
        onChange={(e) => setPost(e.target.value)}
        cols="30"
        rows="10"
        value={post}
        style={{
          margin: "0 auto",
          width: "60%",
          display: "block",
          fontSize: "16px",
        }}
      ></textarea>
      <button
        style={{ display: "block", margin: "15px auto" }}
        onClick={addPost}
        disabled={isLoading}
      >
        {isLoading ? "Loading" : "Add Post"}
      </button>
      {posts.map((post, index) => {
        return (
          <p
            key={`post${index}`}
            style={{
              backgroundColor: "yellow",
              padding: "10px 20px",
              textAlign: "center",
            }}
          >
            {post.title}
          </p>
        );
      })}
    </div>
  );
};

export default Intro;
