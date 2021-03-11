import React, {useEffect, useReducer} from 'react';
import {Button} from 'react-bootstrap';
import Masonry from "react-masonry-css";
import {useDispatch, useSelector} from "react-redux";
import {getPosts, getUserPosts} from "../store/actions";
import CardItem from "./utils/card";

const Home = () => {
  const [sort, setSort] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {limit: 6, order: 'desc', sortBy: '_id', skip: 0}
  );

  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(sort, []));
  }, [dispatch]);

  const addMorePostsHandle = () => {
    const skip = sort.skip + sort.limit;
    dispatch(getPosts({...sort, skip}, posts.homePosts)).then(() => {
      setSort({skip: skip});
    });
  };

  return (
    <div>
      <Masonry columnClassName="my-masonry-grid_column" className="my-masonry-grid" breakpointCols={3}>
        {posts && posts.homePosts ?
          posts.homePosts.map((post, i) => (
            <CardItem item={post} key={i} />
          ))
          :
          null
        }
      </Masonry>
      <Button onClick={addMorePostsHandle}>Load more posts</Button>
    </div>
  );
};

export default Home;