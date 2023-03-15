import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createComment, editComment, deleteComment, fetchComments } from "../../store/comments";
import { useState } from "react";

function MakeComment () {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const comments = useSelector((state) => state.comments)
    const pageId = useSelector((state) => state.pages?._id)
    const [data, setData] = useState({
        text: ""
    });

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

    const commentsList = 
        comments ?
            Object.values(comments).map((commentItem, i) => (
            <div key={i}>{commentItem.text}</div>
        )) : null;
      

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