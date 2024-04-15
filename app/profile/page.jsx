'use client';

import React from 'react';
import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

import Profile from '@components/Profile';

const ProfilePage = () => {
  const router = useRouter();
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

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete the prompt'
    );
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE',
        });

        const filtredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filtredPost);
      } catch (error) {
        console.log('delete error', error);
      }
    }
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
