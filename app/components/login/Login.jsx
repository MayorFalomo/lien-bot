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
import NextLink from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useAppContext } from "@/app/helper/Helpers";
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../firebase-config/Firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const { contextValue } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const router = useRouter();

  // const signInWithGoogle = async (e) => {
  //   e.preventDefault();
  //   signInWithPopup(auth, provider)
  //     .then(async (res) => {
  //       let userInfo = {
  //         userId: res.user.uid,
  //       };
  //       // console.log(userInfo);
  //       //   localStorage.setItem("user", userInfo?.userId);

  //       // const response = await axios.get(`https://`);
  //       router.push("/");
  //       toast(`${res.user.displayName}, login successful!`);

  //       if (userInfo?.userId) {
  //         localStorage.setItem("user", userInfo?.userId);

  //         //   userInfo?.userId
  //         //     ? contextValue?.getCurrentUser(userObject.data?._id)
  //         //     : "";
  //         router.push("/");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userInfo = {
      email: email,
      password: password,
    };
    if (userInfo.email && userInfo.password) {
      setLoadingBtn(true);

      try {
        const response = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/login/`,
          data: userInfo,
          headers: {
            "Content-Type": "application/json",
          },
        }).catch((err) => console.log(err, "network error"));

        if (response.status === 200) {
          setLoadingBtn(false);
          localStorage.setItem("token", response.data.token);
          router.push("/");
          const token = localStorage.getItem("token");
          contextValue.setToken(token);
          contextValue.getCurrentUser(response.data.token);
        } else if (response.status == 400) {
          setIsAuth(true);
          setTimeout(() => {
            setIsAuth(false);
          }, 4000);
        } else {
          console.log("Validation Error");
          setIsAuth(true);
          setTimeout(() => {
            setIsAuth(false);
          }, 4000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container
      width="100vw"
      height="100vh"
      overflow="hidden"
      p="0"
      m="0 auto"
      maxHeight="100vh"
    >
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
        width="100%"
        p="0"
        m="0"
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
          // flexDirection="column"
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
            m="0 auto"
            spacing="20px"
            h="100%"
            className="w-[90%] max-sm:w-[100%] "
          >
            <Heading as="h3" size="lg">
              Login to your account
            </Heading>
            <form
              className="flex flex-col gap-6 w-full "
              onSubmit={handleLogin}
            >
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email address"
                defaultValue={email}
                size="lg"
              />
              {hidePassword ? (
                <Box position="relative">
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    placeholder="Enter password"
                    size="lg"
                    defaultValue={password}
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
                    defaultValue={password}
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
                    className="inline w-4 h-4 me-3 text-white animate-spin"
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
                  logging in...
                </Button>
              ) : (
                <Button type="submit" w="100%" colorScheme="blue" size="lg">
                  Login to your account
                </Button>
              )}
              {isAuth ? (
                <Text color="red" textAlign="center">
                  {" "}
                  seems something went wrong.{" "}
                </Text>
              ) : (
                ""
              )}
            </form>
            <Text fontSize="md">
              Don't have have an account?{" "}
              <Link as={NextLink} href="/signup">
                <span className="text-[teal] cursor-pointer ">Sign up </span>
              </Link>
            </Text>
            {/* <Flex alignItems="center" gap="10px">
              <span className="h-[1px] w-[200px] bg-black opacity-[0.25]  max-nav:w-[150px] max-sm:w-[100px]  "></span>
              <Text fontSize="sm">OR </Text>
              <span className="h-[1px] w-[200px] bg-black opacity-[0.25]  max-nav:w-[150px] max-sm:w-[100px]  "></span>
            </Flex> */}
            {/* <Button
              display="flex"
              alignItems="center"
              //   justifyContent="flex-start"
              gap="20px"
              size="lg"
              w="100%"
              onClick={signInWithGoogle}
            >
              {<FcGoogle className="text-[24px] max-[400px]:text-[18px]" />}
              <Text fontSize="md">Continue with Google </Text>
            </Button> */}
          </Stack>
        </Box>
      </Container>
    </Container>
  );
};

export default Login;
