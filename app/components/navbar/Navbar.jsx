"use client";
import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./Navbar.css";
const Navbar = (props) => {
  return (
    <div>
      <Container
        position="relative"
        height="100vh"
        bg="#FAFAFA"
        p="0"
        className="max-[650px]:hidden"
      >
        <Flex
          position="absolute"
          left="0"
          top="0"
          zIndex="999"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
          gap="8px"
          p="20px"
          display={props.navbarState ? "none" : "flex"}
        >
          <HStack alignItems="center" spacing="7px">
            <Avatar size={"sm"} src="./logos.png" />
            <Text>New chat </Text>
          </HStack>
          <Tippy content="New chat" placement="bottom">
            <span className="cursor-not-allowed">
              <EditIcon fontSize="20px" />
            </span>
          </Tippy>
        </Flex>
        <Box
          m="0"
          p="0"
          height="90%"
          overflow="auto"
          w="100%"
          // border="2px green solid"
        >
          {/* This would be where the previous questions you asked would be */}
        </Box>
        <Box
          position="absolute"
          left="0"
          bottom="0px"
          zIndex="999"
          p="20px"
          display={props.navbarState ? "none" : "flex"}
          justifyContent="flex-start"
          alignItems="center"
          gap="10px"
          w="100%"
          className="cursor-pointer max-[650px]:hidden hover:bg-#fff"
        >
          <Image
            borderRadius="full"
            boxSize="50px"
            objectFit="cover"
            src={
              "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            }
          />
          <Text fontSize="md">Harry Potter </Text>
        </Box>
      </Container>
    </div>
  );
};

export default Navbar;
