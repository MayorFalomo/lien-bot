"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import NextLink from "next/link";
// import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../firebase-config/Firebase-config";
import { useAppContext } from "@/app/helper/Helpers";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";

const SignUp = () => {
  const { contextValue } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(false);

  const [isAuth, setIsAuth] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  // // Sign Up With Google
  // const signUpWithGoogle = async (e) => {
  //   e.preventDefault();

  //   try {
  //     signInWithPopup(auth, provider)
  //       .then(async (response) => {
  //         localStorage.setItem("user", generateId(24));
  //         let userInfo = {
  //           _id: generateId,
  //           userId: response.user.uid,
  //           username: response.user.displayName,
  //           email: response.user.email,
  //           profilePic:
  //             response.user.photoURL == null || ""
  //               ? "https://i.pinimg.com/564x/33/f4/d8/33f4d8c6de4d69b21652512cbc30bb05.jpg"
  //               : response.user.photoURL,
  //         };
  //         console.log(userInfo, "this is userInfo");

  //         router.push("/");
  //         toast(
  //           `${response.user.displayName}, you have registered successfully!`
  //         );
  //       })
  //       .catch((err) => console.log(err && setIsAuth(true)));
  //   } catch (err) {
  //     console.log("Sign up with Google error:", err && setIsAuth(true));
  //   }
  // };

  //Sign up by creating account
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      email: email,
      password: password,
    };

    if (userInfo.email && userInfo.password.length >= 6) {
      setLoadingBtn(true);

      try {
        const response = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/signup`,
          data: userInfo,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          setLoadingBtn(false);
          toast.success("sign up successful, now login");
          router.push("/login");
        } else if (response.status === 400) {
          toast.error("This account already exists!");
        } else {
          console.log("Validation Error");
          toast.error("sign up unsuccessful");
          setIsAuth(true);
          setTimeout(() => {
            setIsAuth(false);
          }, 4000);
        }
      } catch (error) {
        console.log(error);
        setIsAuth(true);
        setTimeout(() => {
          setIsAuth(false);
        }, 4000);
      }
    } else {
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 4000);
    }
  };

  return (
    <Container
      width="100vw"
      max-width="100%"
      minW="100%"
      height="100vh"
      p="0"
      m="0"
      overflow="hidden"
      maxHeight="100vh"
    >
      <Container
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
        p="0"
        m="0 auto"
      >
        <Box>
          <Image
            boxSize="50px"
            objectFit="cover"
            src="./logos.png"
            alt="Chat gpt"
            margin="30px auto"
            borderRadius="50%"
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="95%"
          p="0"
          m="0 auto"
        >
          <Stack
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            spacing="20px"
            w="100%"
            h="100%"
          >
            <Heading as="h3" size="lg">
              Create Your Account
            </Heading>
            <form
              className="flex flex-col gap-6 w-full "
              onSubmit={handleSubmit}
            >
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                size="lg"
              />
              {hidePassword ? (
                <Box position="relative">
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    placeholder="Enter password"
                    size="lg"
                  />
                  <span
                    onClick={() => setHidePassword(false)}
                    className="absolute right-2 top-3 z-10 cursor-pointer"
                  >
                    {<ViewOffIcon />}{" "}
                  </span>
                </Box>
              ) : (
                <Box position="relative">
                  <Input
                    type="password"
                    placeholder="Enter password"
                    size="lg"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setHidePassword(true)}
                    className="absolute right-2 top-3 z-10 cursor-pointer"
                  >
                    {<ViewIcon />}{" "}
                  </span>
                </Box>
              )}
              {loadingBtn ? (
                <Button
                  size="lg"
                  disabled
                  type="button"
                  colorScheme="blue"
                  // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  creating user...
                </Button>
              ) : (
                <Button type="submit" w="100%" colorScheme="blue" size="lg">
                  Create Account
                </Button>
              )}
              {passwordError ? (
                <Text color="red" textAlign="center">
                  {" "}
                  password must be at least six digits{" "}
                </Text>
              ) : (
                ""
              )}
              {isAuth ? (
                <Text color="red" textAlign="center">
                  {" "}
                  seems like something went wrong.{" "}
                </Text>
              ) : (
                ""
              )}
            </form>
            <Text fontSize="md">
              Already have an account?{" "}
              <Link as={NextLink} href="/login">
                <span className="text-[blue] cursor-pointer ">Login</span>
              </Link>
            </Text>
            {/* <Flex alignItems="center" gap="10px">
              <span className="h-[1px] w-[200px] bg-black opacity-[0.25]  max-nav:w-[150px] max-sm:w-[100px]  "></span>
              <Text fontSize="md">OR </Text>
              <span className="h-[1px] w-[200px] bg-black opacity-[0.25]  max-nav:w-[150px]  max-sm:w-[100px] "></span>
            </Flex> */}
            {/* <Button
              display="flex"
              alignItems="center"
              gap="20px"
              size="lg"
              w="100%"
            >
              {<FcGoogle className="text-[24px] max-[400px]:text-[18px]" />}
              <Text onClick={signUpWithGoogle} fontSize="md">
                Continue with Google{" "}
              </Text>
            </Button> */}
          </Stack>
        </Box>
      </Container>
    </Container>
  );
};

export default SignUp;
