import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  Image,
  useDisclosure,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";

import assistant_Icon from "../../images/chooseSpace/assistant_Icon.png";
import InputNameVaultModal from "./InputNameVaultModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SaveModal = ({ isOpen, onOpen, onClose }) => {
  const [inputModal, setInputModal] = useState(false);
  const navigate = useNavigate();
  const [vaultName, setVaultName] = useState("");

  const saveToVaultFn = () => {
    let tileImgIDLS = localStorage.getItem("tileImgID");
    let plankImgIDLS = localStorage.getItem("plankImgID");
    let rugImgIDLS = localStorage.getItem("rugImgID");

    let obj = {
      userID: localStorage.getItem("userID"),
      name: vaultName,
      ...(tileImgIDLS != "" && { tileImgID: tileImgIDLS }),
      ...(plankImgIDLS != "" && { plankImgID: plankImgIDLS }),
      ...(rugImgIDLS != "" && { rugImgID: rugImgIDLS }),
    };
    console.log(obj);
    axios.post(`${process.env.REACT_APP_BACKEND_DEPLOYED_LINK}/vault`, obj).then((res) => {
      console.log(res.data);
      navigate("/myvault");
    });
  };

  

  return (
    <>
      <Modal w={"80%"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody mt={9} mb={9}>
            {inputModal ? (
              <Box>
                <Input
                  onChange={(e) => setVaultName(e.target.value)}
                  mt={5}
                  placeholder="Enter the Vault Name"
                />
                <Button
                  onClick={() => {
                    saveToVaultFn();
                  }}
                  _hover={{ backgroundColor: "black", color: "white" }}
                  backgroundColor={"#EA431B"}
                  color={"white"}
                  isDisabled={vaultName == "" ? true : false}
                  w={"100%"}
                  mt={5}
                >
                  Save
                </Button>
                </Box>
            ) : (
              <Flex
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image w={"151px"} src={assistant_Icon} />
                <Text fontWeight={"bold"} mt={5} fontSize={"18px"}>
                  Do You Want To Save The Progress?
                </Text>
                <Flex
                  mt={5}
                  gap={5}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Button
                    _hover={{ backgroundColor: "#333333", color: "white" }}
                    w={"100px"}
                    border={"1px solid"}
                    borderRadius={"25px"}
                    backgroundColor={"white"}
                    onClick={() => {
                      setInputModal(true);
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    _hover={{ backgroundColor: "#333333", color: "white" }}
                    w={"100px"}
                    border={"1px solid"}
                    borderRadius={"25px"}
                    backgroundColor={"white"}
                    onClick={onClose}
                  >
                    No
                  </Button>
                </Flex>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <InputNameVaultModal isOpen={isOpenInput} onOpen={onOpenInput} onClose={onCloseInput}/> */}
    </>
  );
};

export default SaveModal;
