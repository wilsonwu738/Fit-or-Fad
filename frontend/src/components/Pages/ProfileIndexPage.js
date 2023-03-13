import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPageErrors, fetchUserPages } from "../../store/pages";
import ProfileIndexItem from "./ProfileIndexItem";

function ProfileIndexPage({ userId }) {
  const dispatch = useDispatch();
  const pages = useSelector(
    (state) => state.pages && Object.values(state.pages)
  );
  useEffect(() => {
    dispatch(fetchUserPages(userId));
    return () => dispatch(clearPageErrors());
  }, [dispatch]);

  if (!pages || pages.length === 0) return <div>There are no Pages</div>;

  return (
    <>
      {pages.map((page, i) => (
        <ProfileIndexItem key={i} page={page} />
      ))}
    </>
  );
}

export default ProfileIndexPage;
