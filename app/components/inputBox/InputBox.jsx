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
    <div className="flex justify-center max-w-[700px] w-[60%]">
      <InputGroup size="sm">
        <form className="h-[70px] w-[100%]">
          <Textarea
            minH="unset"
            overflow="hidden"
            w="100%"
            resize="none"
            // ref={ref}
            minRows={2}
            as={ResizeTextarea}
            borderRadius="20px"
            placeholder="Ask me something"
            _placeholder={{ pt: "10px" }}
          />

          {/* <Input pr="4.5rem" type={"text"} placeholder="Ask me something" /> */}
          <InputRightElement
            position="absolute"
            right="0"
            top="20%"
            width="4.5rem"
          >
            <Button h="1.75rem" p="15px" cursor="pointer" onClick={handleClick}>
              {<ArrowUpIcon fontSize="24px" />}
            </Button>
          </InputRightElement>
        </form>
      </InputGroup>
    </div>
  );
};

export default InputBox;
