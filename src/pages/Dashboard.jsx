import React, { useContext, useEffect, useState } from 'react';
import axios from '../axios';
import { Context } from '../context/Context';

const Dashboard = () => {
  const { token } = useContext(Context);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const res = await axios.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  if (!token) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Please log in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div>
        {posts.map((post) => (
          <div key={post._id} className="border p-4 mb-4 rounded">
            <h2 className="text-xl font-semibold">{post.company}</h2>
            <p>{post.role}</p>
            <p>{post.date}</p>
            <div>{post.stages.map((stage, index) => (
              <p key={index}>{stage.stageName}: {stage.description}</p>
            ))}</div>
            <p>{post.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
