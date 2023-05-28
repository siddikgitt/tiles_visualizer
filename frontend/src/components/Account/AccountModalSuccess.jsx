import { Box, Button, Flex, Heading, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import modalImg from "../../images/account/register2.png";

const AccountModalSuccess = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
              <Image src={modalImg} w={"178px"} />
              <Heading fontFamily={"Inter"} fontWeight={"bold"} textAlign={"center"}>Success</Heading>
              <Box mt={5}>
              <Text fontSize={"18px"} fontFamily={"Inter"} textAlign={"center"} margin={"auto"}>
                Congratulations, your account has been successfully created.
              </Text>
              </Box>
              <Button _hover={{backgroundColor: "black", color: "white"}} mt={5} borderRadius={"50px"} w={"351px"} backgroundColor={"black"} color={"white"}>Continue</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AccountModalSuccess;
