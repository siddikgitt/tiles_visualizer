import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/home/icon.png";
import vaultIcon from "../../images/afterLogin/vault.png";
import downloadIcon from "../../images/afterLogin/download.png";
import printIcon from "../../images/afterLogin/print.png";
import instagramIcon from "../../images/afterLogin/instagram.png";
import facebookIcon from "../../images/afterLogin/facebook.png";
import userIcon from "../../images/afterLogin/userIcon.png";

const NewNavbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Flex
        position={"fixed"}
        top={0}
        zIndex={1}
        width={"100%"}
        backgroundColor={"white"}
        // border={"1px"}
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={["0px 11px", "0px 11px", "0px 15px", "0px 15px"]}
      >
        <Image
          cursor={"pointer"}
          onClick={() => navigate("/")}
          borderRadius={"0px 0px 20px 20px"}
          width={["70px", "70px", "154px", "154px"]}
          height={["45px", "45px", "70px", "70px"]}
          src={logo}
          alt="logo"
        />

        <Flex
          cursor={"pointer"}
          onClick={() => navigate("/myvault")}
          alignItems={"center"}
          gap={"7px"}
        >
          <Image w={"22.5px"} height={"22.5px"} src={vaultIcon} />
          <Text>My Vault</Text>
        </Flex>

        <Flex
          cursor={"pointer"}
          onClick={() => navigate("/generate-pdf")}
          alignItems={"center"}
          gap={"35px"}
        >
          <Flex alignItems={"center"} gap={"7px"}>
            <Image src={downloadIcon} />
            <Text>Download</Text>
          </Flex>

          <Flex alignItems={"center"} gap={"7px"}>
            <Image src={printIcon} />
            <Text>Print</Text>
          </Flex>

          <Flex alignItems={"center"} gap={"7px"}>
            <Text>Share</Text>
            <Image src={instagramIcon} />
            <Image src={facebookIcon} />
          </Flex>
        </Flex>
        <Image src={userIcon} w={"29px"} h={"29px"} />
      </Flex>
    </div>
  );
};

export default NewNavbar;
