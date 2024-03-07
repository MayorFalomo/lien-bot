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
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config/Firebase-config";
import { useAppContext } from "@/app/helper/Helpers";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignUp = () => {
  const { contextValue } = useAppContext();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const router = useRouter();

  //generateId
  function dec2hex(dec) {
    return dec.toString(16).padStart(2, "0");
  }

  // generateId :: Integer -> String
  function generateId(len) {
    var arr = new Uint8Array((len || 40) / 2);
    if (typeof window !== "undefined") {
      window.crypto.getRandomValues(arr);
      return Array.from(arr, dec2hex).join("");
    }
  }

  // Sign Up With Google
  const signUpWithGoogle = async (e) => {
    e.preventDefault();

    try {
      signInWithPopup(auth, provider)
        .then(async (response) => {
          //Checks if the saveOnStorage is true then saves to either local storage based on the state
          localStorage.setItem("user", generateId(24));
          // setCookie("user", generatedId, { path: "/" });
          let userInfo = {
            _id: generateId,
            userId: response.user.uid,
            username: response.user.displayName,
            email: response.user.email,
            profilePic:
              response.user.photoURL == null || ""
                ? "https://i.pinimg.com/564x/33/f4/d8/33f4d8c6de4d69b21652512cbc30bb05.jpg"
                : response.user.photoURL,
          };
          console.log(userInfo, "this is userInfo");
          //   await axios.post(
          //     // "https://keep-backend-theta.vercel.app/api/users/register",
          //     userInfo
          //   );

          //   contextValue?.getCurrentUser(userInfo?._id);
          router.push("/");
          toast(
            `${response.user.displayName}, you have registered successfully!`
          );
        })
        .catch((err) => console.log(err && setIsAuth(true)));
    } catch (err) {
      console.log("Sign up with Google error:", err && setIsAuth(true));
    }
  };

  // const generatedId = generateId(24);

  //Sign up by creating account
  const handleSubmit = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
      async (response) => {
        localStorage.setItem("user", generatedId);
        const userInfo = {
          _id: generatedId, //Self generated
          userId: response.user.uid, //userId is from google
          username: userName,
          email: email,
          password: password,
          //   profileDp:
          //     "https://i.pinimg.com/564x/33/f4/d8/33f4d8c6de4d69b21652512cbc30bb05.jpg",
        };
        try {
          await axios.post(
            // "https://keep-backend-theta.vercel.app/api/users/register",
            userInfo
          );

          await contextValue
            ?.getCurrentUser(userInfo?._id)
            .catch((err) => err && setIsAuth(true));
          router.push("/");
        } catch (error) {
          console.log(error && setIsAuth(true));
        }
      }
    );
  };

  const breakpoints = {
    base: "0px",
    sm: "450px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };

  return (
    <Container width="100vw" height="100vh" p="0" m="0" maxHeight="100vh">
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        border="2px blue solid"
        height="100%"
        width={{ base: "100%", sm: "100%", nav: "90%" }}
        p="0"
        m="0"
        // p={{ base: "0", sm: "0" }}
        // m={{ base: "0", sm: "0" }}
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
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
          p="0"
          m="0"
          //   border="2px yellow solid"
        >
          <Stack
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            spacing="20px"
            w="100%"
            h="100%"
            // border="2px green solid"
          >
            <Heading as="h3" size="lg">
              Create Your Account
            </Heading>
            <form
              className="flex flex-col gap-6 w-full "
              onSubmit={handleSubmit}
            >
              <Input placeholder="Enter email address" size="lg" />
              {hidePassword ? (
                <Box position="relative">
                  <Input type="text" placeholder="Enter password" size="lg" />
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
                  />
                  <span
                    onClick={() => setHidePassword(true)}
                    className="absolute right-2 top-3 z-10 cursor-pointer"
                  >
                    {<ViewIcon />}{" "}
                  </span>
                </Box>
              )}
              <Button type="submit" w="100%" colorScheme="teal" size="lg">
                Create Account
              </Button>
            </form>
            <Text fontSize="md">
              Already have an account?{" "}
              <Link as={NextLink} href="/login">
                <span className="text-[teal] cursor-pointer ">Login</span>
              </Link>
            </Text>
            <Flex alignItems="center" gap="10px">
              <span className="h-[1px] w-[200px] bg-black opacity-[0.25]  max-nav:w-[150px] max-sm:w-[100px]  "></span>
              <Text fontSize="md">OR </Text>
              <span className="h-[1px] w-[200px] bg-black opacity-[0.25]  max-nav:w-[150px]  max-sm:w-[100px] "></span>
            </Flex>
            <Button
              display="flex"
              alignItems="center"
              //   justifyContent="flex-start"
              gap="20px"
              size="lg"
              w="100%"
            >
              {<FcGoogle className="text-[24px] max-[400px]:text-[18px]" />}
              <Text onClick={signUpWithGoogle} fontSize="md">
                Continue with Google{" "}
              </Text>
            </Button>
          </Stack>
        </Box>
      </Container>
      <ToastContainer />
    </Container>
  );
};

export default SignUp;
