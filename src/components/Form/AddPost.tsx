import { addPost } from "../../api/PostApi";
import Button from "../../shared/Button";
// @ts-ignore
import { useState, startTransition } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import useAuth from "../../hooks/useAuth";
import { IAddPost } from "../../types/PostInterfaces";

interface ISubmitForm {
  textarea: string;
}

const AddPost = () => {
  const currentUser = useAuth();
  const { register, reset, handleSubmit } = useForm();
  const [customErr, setCustomErr] = useState("");

  const { mutate } = useMutation<unknown, unknown, IAddPost>(addPost as any);

  function submitPost(data: ISubmitForm) {
    // handle the click event
    if (data.textarea === "") {
      setCustomErr("Write some text to create a pheme");
    } else {
      let pheme: IAddPost = {
        category: "general",
        visibility: 255,
        text: data.textarea,
        userID: currentUser.id
      };
      mutate(pheme, {
        onSuccess: () => {
          queryClient.invalidateQueries(["phemes"]);
        },
      });

      startTransition(() => {
        reset();
      });
    }
  }
  return (
    <div className="w-full min-h-[100px] flex flex-col items-center
        justify-center  flex-wrap  bg-white rounded-lg border border-[#F5F7F9]
        shadow-md">
      <div className="w-full flex-wrap flex text-center  gap-1 flex-row
          items-center lg:justify-between">
        <div className="flex md:w-auto w-full flex-1  items-center
            justify-between flex-wrap flex-row">
          <input
            {...register("textarea")}
            className="flex w-[200px] md:w-32 break-all text-ellipsis md:mx-1
              mx-2 items-center
              md:flex-1 flex-initial font-bold py-3 my-2 px-1 resize-none
              self-center"
            placeholder="Write Something"
          />
        </div>
      </div>
      {customErr && <h1 className="text-sm text-gray-700">{customErr}</h1>}
      <div className="flex w-full bg-deepBlue flex-row items-center
          justify-center flex-wrap">
        <Button
          type="button"
          onClick={handleSubmit(submitPost as any)}
          bgColor="transparent"
          margin="1"
          title="Pheme it"
          size="fluid"
          textColor="white"
          rounded="sm"
          hover="purple-700"
        />
      </div>
    </div>
  );
}

export default AddPost;
