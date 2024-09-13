'use client';
import { useState, useEffect } from 'react';
import { getSinglePost } from '../utils/getPost';
export interface Reactions {
  likes: number;
  dislikes: number;
}
export interface SinglePostData {
  id: number;
  title: string;
  body: string;
  reactions: Reactions;
  views: number;
  tags: string[];
}
const useSinglePost = (postId: number) => {
  const [post, setPost] = useState<SinglePostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSinglePost(postId);
        setPost(data);
      } catch (error) {
        setError((error as Error).message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);
  return {
    post,
    loading,
    error
  };
};
export default useSinglePost;