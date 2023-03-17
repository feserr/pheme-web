import { loginUser, registerUser } from "../api/UserApi";
import useAuth from "../hooks/useAuth";
import { addNewUser } from "../redux/slices/userSlice";
import Button from "../shared/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthProps, IUser } from "../types/UserInterfaces";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";

const RegisterScreen: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const currentUser = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [customErr, setCustomErr] = useState<string>("");

  const registerMutation = useMutation({
    mutationFn: registerUser,
  });

  useEffect(() => {
    currentUser !== null && navigate("/");
  }, [currentUser, navigate]);

  const handleRegister = (data: AuthProps) => {
    if (data.username === "" || data.email === "" || data.password === "") {
      alert("Please fill in required fields");
    }

    registerMutation.mutate(data, {
      onSuccess: (response: any) => {
        localStorage.setItem("userDetails", JSON.stringify(response));
        dispatch(addNewUser(response as IUser));
      },
      onError: (err) => {
        setCustomErr("Incorrect username, email or password");
      },
    })
  };

  return (
    <div className="w-full lg:mt-20 flex flex-col items-center justify-center
        min-h-[80vh]">
      <form
        onSubmit={handleSubmit(handleRegister as any)}
        encType="multipart/form-data"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            {...register("username", { required: true })}
            className="shadow appearance-none border border-red rounded w-full
              py-2 px-3 text-grey-darker mb-3"
            id="username"
            type="text"
            placeholder="Enter Your Username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            {...register("email", {
              required: true,
            })}
            className="shadow appearance-none border border-red rounded w-full
              py-2 px-3 text-grey-darker mb-3"
            id="email"
            type="email"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>

          <input
            className="shadow appearance-none border border-red rounded w-full
              py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
          />
        </div>
        {customErr !== "" ? (
          <div
            className="px-4  flex flex-row flex-wrap flex-1 items-center
              justify-between py-4 mb-4 leading-normal text-black  bg-red-500
              rounded-lg"
            role="alert"
          >
            <p>{customErr}</p>
            <i className="cursor-pointer" onClick={(e) => setCustomErr("")}>
              <FaTimes />
            </i>
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            bgColor="bg-deepBlue"
            margin="1"
            size="md"
            textColor="white"
            hover="gray-800"
            title="Sign Up"
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
