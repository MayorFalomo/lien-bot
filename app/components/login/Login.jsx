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
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config/Firebase-config";
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
  const [InLocalStorage, setInLocalStorage] = useState(false);

  const router = useRouter();

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(async (res) => {
        let userInfo = {
          userId: res.user.uid,
        };
        // console.log(userInfo);
        //   localStorage.setItem("user", userInfo?.userId);

        // const response = await axios.get(`https://`);
        router.push("/");
        toast(`${res.user.displayName}, login successful!`);

        if (userInfo?.userId) {
          localStorage.setItem("user", userInfo?.userId);

          //   userInfo?.userId
          //     ? contextValue?.getCurrentUser(userObject.data?._id)
          //     : "";
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userInfo = {
      email: email,
      password: password,
    };
    // console.log(userInfo, "This is userInfo");
    const response = await axios({
      method: "POST",
      url: "https://apps.lien.bloombyte.dev/login/",
      data: userInfo,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      router.push("/");
      contextValue.getCurrentUser(response.data.token);
    } else {
      console.log("Validation Error");
      setIsAuth(true);
    }
    try {
    } catch (error) {
      console.log(error);
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
            src="./chatgpt.svg"
            alt="Chat gpt"
            margin="30px auto"
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
              <Button type="submit" w="100%" colorScheme="blue" size="lg">
                Login to your account
              </Button>
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
            <Flex alignItems="center" gap="10px">
              <span className="h-[1px] w-[200px] bg-black opacity-[0.25]  max-nav:w-[150px] max-sm:w-[100px]  "></span>
              <Text fontSize="sm">OR </Text>
              <span className="h-[1px] w-[200px] bg-black opacity-[0.25]  max-nav:w-[150px] max-sm:w-[100px]  "></span>
            </Flex>
            r4
            <Button
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
            </Button>
          </Stack>
        </Box>
      </Container>
    </Container>
  );
};

export default Login;
