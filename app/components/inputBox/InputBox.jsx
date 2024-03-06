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
const InputBox = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  function PasswordInput() {}
  return (
    <div className="flex justify-center max-w-[700px] w-[60%] max-md:w-[100%] ">
      <form className="w-[100%] max-h-[100px] flex items-center rounded-[10px] border-2 border-grey-400">
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
        />
        <Button h="1.75rem" p="15px" cursor="pointer" onClick={handleClick}>
          {<ArrowUpIcon fontSize="24px" />}
        </Button>
      </form>
    </div>
  );
};

export default InputBox;
