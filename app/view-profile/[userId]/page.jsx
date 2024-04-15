'use client';

import React from 'react';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

import Profile from '@components/Profile';

const ViewProfile = ({params}) => {
  const {userId} = params;
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${userId}/posts`);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    if (userId) fetchPosts();
  }, [userId]);

  return (
    <Profile
      name="User"
      desc={`Welcome to profile page`}
      data={posts}
    />
  );
};

export default ViewProfile;
