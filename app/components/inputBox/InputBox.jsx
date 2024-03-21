"use client";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import React from "react";
import ResizeTextarea from "react-textarea-autosize";
import { forwardRef } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const InputBox = (props) => {
  const [query, setQuery] = React.useState("");

  const WS = new WebSocket("ws://217.160.156.197/ws");

  // WS.onopen = () => {
  //   console.log("WebSocket connection is open");
  // };

  const handleSubmit = async (e) => {
    if (e.code == "Enter") {
      e.preventDefault();
      console.log("entered");
      chatWithBot();
    }
  };

  const chatWithBot = async () => {
    try {
      props.setLoader(true);
      if (query) {
        props.setChat((prev) => [...prev, { bot: "", question: query }]);
      }

      WS.onopen = () => {
        WS.send(query);
      };

      WS.onmessage = (e) => {
        props.setChat((prevChat) => {
          return [...prevChat, { bot: e.data }];
        });
        setQuery(" ");
        props.setLoader(false);
      };
    } catch (error) {
      console.log(error);
    }
  };

  // const chatWithBot = async () => {
  //   props.setLoader(true);
  //   if (query) {
  //     props.setChat((prev) => [...prev, { bot: "", question: query }]);
  //   }
  //   const chat = {
  //     query: query,
  //   };
  //   // console.log(chat, "chat");
  //   props.setQuery(query);
  //   const token = localStorage.getItem("token");
  //   try {
  //     const response = await axios({
  //       method: "Post",
  //       url: "https://apps.lien.bloombyte.dev/chat",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       data: chat,
  //     }).catch((err) => {
  //       console.log(err) &&
  //         props.setErr(true) &&
  //         setTimeout(() => {
  //           props.setErr(false);
  //         }, 4000);
  //       // router.push("/login");
  //     });
  //     if (response.status == 401) {
  //       props.setErr(true) &&
  //         setTimeout(() => {
  //           props.setErr(false);
  //         }, 4000);
  //       // router.push("/login");
  //     } else if (response.status == 400) {
  //       props.setTryAgain(true) &&
  //         setTimeout(() => {
  //           props.setTryAgain(false);
  //         }, 4000);
  //     }

  //     props.setLoader(false);
  //     // console.log(response, "res");

  //     props.setChat((prevChat) => {
  //       return [...prevChat, { bot: response.data?.bot }];
  //     });
  //     setQuery(" ");

  //     chat.query = "";
  //   } catch (error) {
  //     console.log(error);
  //     props.setErr(true);
  //     setTimeout(() => {
  //       setErr(false);
  //       console.log("turned off");
  //     }, 4000);
  //   }
  // };

  return (
    <div className="flex justify-center max-w-[700px] w-[60%] max-md:w-[95%] ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[100%] max-h-[100px] flex items-center rounded-[10px] outline-none border-2 border-grey-400"
      >
        <Textarea
          minH="unset"
          overflow="hidden"
          w="100%"
          border="none"
          resize="none"
          minRows={2}
          focusBorderColor="transparent"
          as={ResizeTextarea}
          borderRadius="20px"
          outline="0"
          placeholder="Ask me something"
          _placeholder={{ pt: "10px" }}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSubmit}
          value={query}
          // onChange={(e) => {
          //   props.setChat({
          //     ...props.chat,
          //     query: e.target.value,
          //   });
          // }}
          // defaultValue={props.query}
        />
        <Button
          onClick={chatWithBot}
          type="submit"
          h="1.75rem"
          p="15px"
          cursor="pointer"
        >
          {<ArrowUpIcon fontSize="24px" />}
        </Button>
      </form>
    </div>
  );
};

export default InputBox;
