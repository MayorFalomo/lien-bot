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
import { IconButton } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useAppContext } from "@/app/helper/Helpers";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config/Firebase-config";

const Login = () => {
  const { contextValue } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [InLocalStorage, setInLocalStorage] = useState(false);

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
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        // console.log(res, "This is res");
        // console.log(res.user.uid, "This is res.user.uid");
        // const userObject = await axios.get(
        //   `https://keep-backend-theta.vercel.app/api/users/get-user/uid/${res.user.uid}`
        // );
        console.log(res, "This is res");
        // localStorage.setItem("user", res.data?._id);
        router.push("/");

        // if (userObject.data?._id) {
        //   userObject.data?._id
        //     ? contextValue?.getCurrentUser(userObject.data?._id)
        //     : "";
        //   router.push("/");
        // }
        // router.push("/");
        // window.location.reload();
        // await contextValue?.getCurrentUser(userObject.data?._id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container width="100vw" height="100vh" maxHeight="100vh">
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
          width="100%"
          p="0"
          m="0"
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
              <Input placeholder="Email address" size="lg" />
              <Button w="100%" colorScheme="teal" size="lg">
                Login to your account
              </Button>
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
