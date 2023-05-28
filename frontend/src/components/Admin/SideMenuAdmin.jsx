import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import tilesIcon from "../../images/afterLogin/TilesIcon-Sidebar.svg";
import planksIcon from "../../images/afterLogin/PlanksIcon-Sidebar.svg";
import userIcon from "../../images/afterLogin/userIcon.png";
import { useNavigate } from "react-router-dom";
// import { BiUser } from "react-icons/bi";

export const SideMenuAdmin = ({active}) => {
  const navigate = useNavigate();
  return (
    <>
    <Flex width={"15vw"}
        height={"100vh"} justifyContent={"space-between"} flexDirection={"column"}>
      
      <Flex
        padding={"1.5rem"}
        fontSize={"25px"}
        flexDirection={"column"}
        gap={7}
      >
        <Flex onClick={() => navigate("/admin-users")} _hover={{color: "crimson"}} cursor={"pointer"} alignItems={"center"} gap={5}>
          <Image w={"35px"} h={"35px"} src={userIcon} />
          <Text fontWeight={active == "User" ? "bold" : "normal"} color={active == "User" ? "crimson": "black"}>Users</Text>
        </Flex>
        <Flex onClick={() => navigate("/admin-tiles")} _hover={{color: "crimson"}} cursor={"pointer"} alignItems={"center"} gap={5}>
          <Image w={"35px"} h={"35px"} src={tilesIcon} />
          <Text fontWeight={active == "Tiles" ? "bold" : "normal"} color={active == "Tiles" ? "crimson": "black"}>Tiles</Text>
        </Flex>
        <Flex onClick={() => navigate("/admin-planks")} _hover={{color: "crimson"}} cursor={"pointer"} alignItems={"center"} gap={5}>
          <Image w={"35px"} h={"35px"} src={planksIcon} />
          <Text fontWeight={active == "Planks" ? "bold" : "normal"} color={active == "Planks" ? "crimson": "black"}>Planks</Text>
        </Flex>
        <Flex onClick={() => navigate("/admin-rugs")} _hover={{color: "crimson"}} cursor={"pointer"} alignItems={"center"} gap={5}>
          <Image
            w={"35px"}
            h={"35px"}
            src={"https://cdn-icons-png.flaticon.com/512/1606/1606199.png"}
          />
          <Text fontWeight={active == "Rugs" ? "bold" : "normal"} color={active == "Rugs" ? "crimson": "black"}>Rugs</Text>
        </Flex>

      </Flex>

      <Button borderRadius={0} colorScheme="red">Logout</Button>
      </Flex>
    </>
  );
};
