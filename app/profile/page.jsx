'use client';

import React from 'react';
import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';

import Profile from '@components/Profile';

const ProfilePage = () => {
  const {data: session} = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/${session.user.id}/posts`
      );
      console.log(`/api/users/${session.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user?.id) fetchPosts();
  }, [session]);

  const handleEdit = () => {
    console.log('clicked');
  };

  const handleDelete = () => {
    console.log('clicked');
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalised profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
