import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createComment, editComment, deleteComment, fetchComments } from "../../store/comments";
import { useState } from "react";
import { fetchUsers } from "../../store/users";
import "./MakeComment.css"


function MakeComment () {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users?.users)
  const allComments = useSelector((state) => state.comments)
  const pageId = useSelector((state) => state.pages?._id)
  const comments = allComments ? Object.values(allComments).filter((comment) => comment?.page === pageId) : [];
  const [data, setData] = useState({
    text: ""
  });
  const [editingCommentId, setEditingCommentId] = useState(null);


  
  useEffect(() => {
    dispatch(fetchComments())
    dispatch(fetchUsers())
  }, [])

  const handleChange = (e) => {
    setData({ ...data, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      commenter: currentUser._id,
      page: pageId,
      text: data.text
    };
    
    dispatch(createComment(finalData, pageId))
  }

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const handleEditSubmit = (e, commentId) => {
    e.preventDefault();
    const updateData = {
      commenter: currentUser._id,
      page: pageId,
      text: data.text
      
    };
    dispatch(editComment(commentId, updateData));
    setEditingCommentId(null);
  }

  const handleEdit = (comment) => {
    setData({ ...data, text: comment.text});
    setEditingCommentId(comment._id);
  }

  const commentsList =
  comments?.length > 0 ? (
    comments.map((commentItem, i) => (
      <div key={i}>
        <div>{commentItem?.commenter?.username}</div>
        {editingCommentId === commentItem._id ? (
          <form onSubmit={(e) => handleEditSubmit(e, commentItem._id)}>
            <input type="text" 
              value={data.text}
              onChange={handleChange}
            />
            <button type="submit">Update</button>
          </form>
        ) : (
          <div>
            <div>{commentItem?.text}</div>
            {currentUser?._id === commentItem?.commenter?._id && (
              <div>
                <button onClick={() => handleEdit(commentItem)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(commentItem._id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    ))
  ) : (
    <p>Be the first to comment on this post!</p>
  );

  return (
    <div className="comments-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={data.text} 
          placeholder="Write a comment"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {commentsList}
      </div>
    </div>
  );
}

export default MakeComment;
