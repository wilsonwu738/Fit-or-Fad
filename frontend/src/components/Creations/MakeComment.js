import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createComment, editComment, deleteComment, fetchComments } from "../../store/comments";
import { useState } from "react";
import { fetchUsers } from "../../store/users";

function MakeComment () {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users?.users)
    const allComments = useSelector((state) => state.comments)
    const pageId = useSelector((state) => state.pages?._id)
    const comments = allComments ? Object.values(allComments).filter((comment) => comment.page === pageId) : [];
    const [data, setData] = useState({
        text: ""
    });

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

    const commentsList =
    comments?.length > 0 ? (
      comments.map((commentItem, i) => (
        <div key={i}>
          <div>{commentItem?.commenter?.username}</div>
          <div>{commentItem?.text}</div>
          {currentUser?._id === commentItem?.commenter?._id && (
            <button onClick={() => handleDelete(commentItem._id)}>
              Delete
            </button>
          )}
        </div>
      ))
    ) : (
      <p>Be the first to comment on this post!</p>
    );
      

    if (comments[0]) {
        return (
            <>
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
            </>
        )
    } else {
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    value={data.text} 
                    placeholder="Write a comment"
                    onChange={handleChange}
                    />
                    <button type="submit">Submit</button>
                </form>
                <p>Be the first to comment on this post!</p>
            </>
        )
    }
}

export default MakeComment;