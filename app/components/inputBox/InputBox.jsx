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
  const [show, setShow] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const router = useRouter();
  //   setChat(prevChat => {
  //   const newChat = [...prevChat]; // create a copy of the state
  //   newChat.push(item); // push the new item
  //   return newChat; // update the state
  // });

  const handleSubmit = async (e) => {
    e.code == "Enter" && chatWithBot(e);
  };

  const chatWithBot = async (e) => {
    e.preventDefault();
    props.setLoader(true);
    if (query) {
      props.setChat((prev) => [...prev, { bot: "", question: query }]);
      // props.setChat((prev) => [...prev, query]);
    }
    const chat = {
      query: query,
    };
    props.setQuery(query);
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "Post",
        url: "http://217.160.156.197/chat",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: chat,
      }).catch((err) => {
        console.log(err);
        props.setErr(true);
      });
      if (response.status == 401) {
        props.setErr(true);
        router.push("/login");
      }

      props.setLoader(false);
      setQuery("");
      // console.log(response, "res");

      props.setChat((prevChat) => {
        return [...prevChat, { bot: response.data?.bot }];
      });
      // console.log(response.data.bot);
      // props.setBotAnswer(response.data.bot);

      chat.query = "";
    } catch (error) {
      console.log(error);
      props.setErr(true);
    }
  };
  return (
    <div className="flex justify-center max-w-[700px] w-[60%] max-md:w-[95%] ">
      <form
        onSubmit={chatWithBot}
        className="w-[100%] max-h-[100px] flex items-center rounded-[10px] border-2 border-grey-400"
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
          // outline="0"
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
        <Button type="submit" h="1.75rem" p="15px" cursor="pointer">
          {<ArrowUpIcon fontSize="24px" />}
        </Button>
      </form>
    </div>
  );
};

export default InputBox;
