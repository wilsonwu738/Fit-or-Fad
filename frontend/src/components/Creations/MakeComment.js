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

  const [editData, setEditData] = useState({
    text: ""
  });
  const [editingCommentId, setEditingCommentId] = useState(null);


  
  useEffect(() => {
    dispatch(fetchComments())
    dispatch(fetchUsers())
  }, [dispatch])

  const handleChange = (e) => {
    setData({ ...data, text: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      commenter: currentUser._id,
      page: pageId,
      text: data.text
    };
    
    dispatch(createComment(finalData, pageId));

    setData({ text: "" });
  }

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const handleEditSubmit = (e, commentId) => {
    e.preventDefault();
    const updateData = {
      commenter: currentUser._id,
      page: pageId,
      text: editData.text
      
    };
    dispatch(editComment(commentId, updateData));
    setEditingCommentId(null);
  }

  const handleEdit = (comment) => {
    setEditData({ ...editData, text: comment.text});
    // setData({ text: "" })
    setEditingCommentId(comment._id);
  }

  const commentsList =
  comments?.length > 0 ? (
    comments.map((commentItem, i) => (
      <div className="comment-item" key={i}>
        <div className="commenter">{commentItem?.commenter?.username}</div>
        {editingCommentId === commentItem._id ? (

          // Edit comment form
          <form onSubmit={(e) => handleEditSubmit(e, commentItem._id)}>
            <input type="text" 
              value={editData.text}
              placeholder={data.text}
              onChange={handleEditChange}
            />
            <button type="submit">Update</button>
          </form>
        ) : (
          <div className="comment-content">
            <div className="comment-text">{commentItem?.text}</div>

            {/* Edit Delete buttons */}
            {currentUser?._id === commentItem?.commenter?._id && (
              <div className="comment-edit-delete">
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
      <form className="input-comment" onSubmit={handleSubmit}>
        <input 
          type="comment" 
          value={data.text} 
          placeholder="Write a comment"
          onChange={handleChange}
        />
        <button type="submit">➤</button>
      </form>
      <div className="comments-list">
        {commentsList}
      </div>
    </div>
  );
}

export default MakeComment;
