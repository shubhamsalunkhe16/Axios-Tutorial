import React, { useEffect, useState } from "react";
import useAxiosPrivateInstance from "../../CustomHooks/useAxiosPrivateInstance";
// import { axiosInstance, axiosPrivateInstance } from "../../API/axiosInstance";

import "./AxiosCancellation.css";

const AxiosCancellation = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadPostAt, setLoadPostAt] = useState(1);
  const [selectedPost, setselectedPost] = useState({});
  const axiosPrivateInstance = useAxiosPrivateInstance();

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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const loadPostAtIndex = async () => {
      try {
        // const { data } = await axios.get(`${BASE_URL}/posts`);
        // const { data } = await axiosInstance.get("/posts");
        const { data } = await axiosPrivateInstance.get(
          `/posts/${loadPostAt}`,
          {
            signal: controller.signal,
          }
        );
        isMounted && setselectedPost(data);
      } catch (error) {
        console.log("error while fetching posts", error);
      }
    };

    loadPostAtIndex();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [loadPostAt]);

  return (
    <div className="axios_instance_container">
      <h1 style={{ textAlign: "center" }}>
        Welcome to Axios Tutorial (Axios Instance)
      </h1>
      <button onClick={() => setLoadPostAt(1)} className="add_post_btn">
        Load Post 1
      </button>
      <button onClick={() => setLoadPostAt(2)} className="add_post_btn">
        Load Post 2
      </button>
      <button onClick={() => setLoadPostAt(3)} className="add_post_btn">
        Load Post 3
      </button>
      <h3>{selectedPost?.title}</h3>
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

export default AxiosCancellation;
