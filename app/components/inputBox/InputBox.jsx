import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";

const InputBox = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  function PasswordInput() {}
  return (
    <div className="flex justify-center w-[50%]">
      <InputGroup size="lg">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};

export default InputBox;
