import React, {useReducer, useEffect} from 'react';
import UserAreaHoc from "../../hoc/userAreaHoc";
import {Table, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {getUserPosts, updatePostStatus, deletePost} from "../../../store/actions";

const AdminArticles = (props) => {
  const [sort, setSort] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {limit: 3, order: 'desc', sortBy: '_id', skip: 0}
  );

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPosts(sort, [], user.auth._id));
  }, [dispatch]);

  const addMorePostsHandle = () => {
    const skip = sort.skip + sort.limit;
    dispatch(getUserPosts({...sort, skip}, user.posts, user.auth._id)).then(() => {
      setSort({skip: skip});
    });
  };

  const updateStatusHandler = (item) => {
    const status = item.status === 'DRAFT' ? 'PUBLIC' : 'DRAFT';
    dispatch(updatePostStatus(status, item._id, user.posts));
  };

  const deletePostHandler = (postId) => {
    dispatch(deletePost(postId, user.posts));
  };

  return (
    <UserAreaHoc>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Category</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {user.posts ?
          user.posts.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.title}</td>
              <td>{item.categories.name}</td>
              <td
                onClick={() => {updateStatusHandler(item)}}
                className={
                  item.status === 'DRAFT' ? 'yell' : 'green'
                }
              >{item.status}</td>
              <td className="remove_btn">
                <Button
                  onClick={() => {deletePostHandler(item._id)}}
                  variant="danger"
                >Remove</Button>
              </td>
            </tr>
          ))
          :
          null
        }
        </tbody>
      </Table>
      <Button onClick={addMorePostsHandle}>Load more posts</Button>
      <Button className="ml-2" variant="outline-info" onClick={() => {props.history.push('/user_area/create')}}>Create new article</Button>
    </UserAreaHoc>
  );
};

export default AdminArticles;