import React from 'react'
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import logo from "../images/home/icon.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        position={"fixed"}
        top={0}
        zIndex={2}
        backgroundColor={"white"}
        padding={["0px 11px","0px 11px","0px 85px","0px 85px"]}
        width={"100%"}
        border={"1px solid"}
      >
        <Image cursor={"pointer"} onClick={() => navigate("/")} borderRadius={"0px 0px 20px 20px"} width={["70px","70px","154px","154px"]} height={["45px","45px","70px","70px"]} src={logo} alt="logo" />
        <Flex alignItems={"center"}>
          <Button
            backgroundColor={"white"}
            _hover={{ backgroundColor: "white" }}
            fontSize={["12px", "12px", "18px", "18px"]}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
          <Button
            backgroundColor="#387CFF"
            _hover={{backgroundColor: "#387CFF"}}
            color={"white"}
            fontSize={["12px", "12px", "18px", "18px"]}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </div>
  )
}

export default Navbar