import { fetchAllPhemes, fetchUserPhemes } from "../../api/PostApi";
import SuspenseWrapper from "../../shared/SuspenseWrapper";
import { IPost } from "../../types/PostInterfaces";
//@ts-ignore
import { lazy, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CustomPost from "./CustomPost";

interface PhemeListProps {
  data: IPost[];
  refetch: any;
}

interface UserIdProp {
  id?: Number;
}

const Post = lazy(() => import("./Post" /* webpackChunkName: "Post" */));
const PostsList = ({ id }: UserIdProp) => {
  const [phemes, setPhemes] = useState<IPost[]>([]);

  useQuery(["phemes"], !id ? fetchAllPhemes : () => fetchUserPhemes(id), {
    onSuccess: (data: PhemeListProps["data"]) => {
      setPhemes(data);
    },

    onSettled: () => {
      setPhemes((phemes) => phemes)
    }
  });

  return (
    <div className="flex items-center justify-center flex-wrap w-full flex-col">

      <SuspenseWrapper>

        {phemes.map((post: IPost) => (
          (!id
            ? <Post key={post.id} post={post} />
            : <CustomPost key={post.id} post={post} />
          )
        ))}
      </SuspenseWrapper>
    </div>
  );
};

export default PostsList;
