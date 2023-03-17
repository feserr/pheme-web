import DeleteBox from "../../components/Popup/DeleteBox";
import { BiTrash } from "@react-icons/all-files/bi/BiTrash";
import { RootState } from "../../redux/store";
import Avatar from "../../shared/Avatar";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IPost } from "../../types/PostInterfaces";
import Image from "../../shared/Image";

type PostProps = {
  post: IPost;
};

const Post = ({ post }: PostProps) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const formatedDate = useMemo(
    () => new Date(post.createdAt as any).toLocaleDateString(),
    [post.createdAt]
  );

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const navigate = useNavigate();
  const navigateToUserPage = () => {
    navigate(currentUser.id === post.createdBy
      ? "/profile"
      : `/user/${post.createdBy}`);
  };

  return (
    <article
      key={post.id}
      className="w-full min-h-[100px] flex flex-col items-start justify-between
        my-[10px] flex-wrap bg-white rounded-sm border border-[#F5F7F9]
        shadow-box"
    >

      <div className="w-full flex mx-1 text-center  my-1 flex-row items-center
          justify-between flex-wrap">
        <div className="w-auto flex text-center my-1 flex-row items-center
            flex-wrap justify-center">
          <Avatar
            src={post.avatar}
            onClick={navigateToUserPage}
            alt="User avatar"
          />

          <div className="flex flex-col items-start justify-center flex-wrap">
            <div className="flex flex-row items-center justify-center gap-2
                flex-wrap">
              <Link
                className="lg:text-xl md:text-md sm:text-sm font-bold break-all"
                to={
                  post.createdBy === currentUser.id
                    ? `profile`
                    : `/user/${post.createdBy}`
                }
              >
                {post.username}
              </Link>
            </div>
            <h1 className="text-sm">{formatedDate}</h1>
          </div>
        </div>
        <div className="w-auto flex mx-1 items-center justify-center flex-row
            flex-wrap my-4">
          {post.userId === currentUser.id && (
            <i onClick={handlePopup} className=" cursor-pointer p-1 ">
              {" "}
              <BiTrash
                color="#DC2626"
                className="hover:text-slate-900"
                size="1.5em"
              />
            </i>
          )}
        </div>
      </div>

      <div className="w-full flex-1 flex text-center  flex-wrap flex-col
          items-center justify-center">
        <div className="text-center break-all text-sm    mx-3  self-start
            font-normal">
          <h1 className="pt-1 pb-3 my-1 text-lg"> {post.text}</h1>
        </div>
        {post.image && <Image src={post.image} alt="Image" />}
      </div>
      {showPopup && <DeleteBox id={post.id} />}
    </article>
  );
};
export default Post;
