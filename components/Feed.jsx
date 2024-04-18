'use client';
import React from 'react';
import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick, searchText}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            searchText={searchText}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchfilterPosts = setTimeout(async () => {
      const response = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({searchText}),
      });

      const data = await response.json();
      setPosts(data);
    }, 500);

    return () => clearTimeout(fetchfilterPosts);
  }, [searchText]);

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search for a tag or user name"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
        searchText={searchText}
      />
    </section>
  );
};

export default Feed;
