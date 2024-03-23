"use client";
import { Button, Textarea } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import React from "react";
import ResizeTextarea from "react-textarea-autosize";

const InputBox = (props) => {
  const [query, setQuery] = React.useState("");

  // const WS = new WebSocket("wss://apps.lien.bloombyte.dev/ws");

  const handleSubmit = async (e) => {
    if (e.code == "Enter") {
      e.preventDefault();
      chatWithBot();
    }
  };

  const chatWithBot = async () => {
    const token = localStorage.getItem("token");

    const WS = new WebSocket(`wss://apps.lien.bloombyte.dev/ws?token=${token}`);
    try {
      props.setLoader(true);
      if (query) {
        props.setChat((prev) => [...prev, { bot: "", question: query }]);
      }

      WS.onopen = () => {
        WS.send(query);
      };

      WS.onerror = (e) => {
        console.log(e, "connection has failed");
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

  //! Endpoint to call when not using socket.
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
          backgroundColor="white"
          color="black"
        />
        <Button
          onClick={chatWithBot}
          type="submit"
          h="1.75rem"
          p="15px"
          cursor="pointer"
          disabled={query ? false : true}
        >
          {<ArrowUpIcon fontSize="24px" />}
        </Button>
      </form>
    </div>
  );
};

export default InputBox;
