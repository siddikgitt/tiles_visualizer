import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  Image,
  Box,
  Center,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import icon from "../../images/chooseSpace/assistant_Icon.png";
import rectangleShapeImg from '../../images/chooseSpace/Rectangle_Shape_Modal.png'
import { useNavigate } from 'react-router-dom';


const RecShapeModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <div>
        <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={5} justifyContent={"center"} alignItems={"end"}>
              <Text fontSize={"36px"} fontFamily={"Inter"}>
                Welcome
              </Text>
              <Image src={icon} w={"120px"} />
            </Flex>
            <Text
              textAlign={"center"}
              color={"rgba(51, 51, 51, 0.7)"}
              fontSize={"16px"}
            >
              Before we get going, Enter the exact dimensions of your room
            </Text>

            <Flex
              mt={2}
              gap={2}
              alignItems={"center"}
              justifyContent={"center"}
              fontFamily={"Inter"}
              fontSize={18}
              color={"rgba(51, 51, 51, 0.7)"}
            >
              <Box>
                <Center
                  cursor={"pointer"}
                  textAlign={"center"}
                  alignItems={"center"}
                  width={"95px"}
                  borderRadius={"50px"}
                  h={"43px"}
                  _hover={{ backgroundColor: "#EA431B", color: "white" }}
                >
                  cm
                </Center>
              </Box>

              <Box>
                <Center
                  cursor={"pointer"}
                  textAlign={"center"}
                  alignItems={"center"}
                  width={"95px"}
                  h={"43px"}
                  borderRadius={"50px"}
                  _hover={{ backgroundColor: "#EA431B", color: "white" }}
                >
                  m/cm
                </Center>
              </Box>

              <Box>
                <Center
                  cursor={"pointer"}
                  textAlign={"center"}
                  alignItems={"center"}
                  width={"95px"}
                  h={"43px"}
                  borderRadius={"50px"}
                  _hover={{ backgroundColor: "#EA431B", color: "white" }}
                >
                  ft/in
                </Center>
              </Box>

              <Box>
                <Center
                  cursor={"pointer"}
                  textAlign={"center"}
                  alignItems={"center"}
                  width={"95px"}
                  h={"43px"}
                  borderRadius={"50px"}
                  _hover={{ backgroundColor: "#EA431B", color: "white" }}
                >
                  in
                </Center>
              </Box>
            </Flex>

            <Flex mt={1} gap={5}>
              <Box w={"50%"}>
                <Image src={rectangleShapeImg} />
              </Box>
              <Box margin={"auto"} w={"50%"}>
                
                <SimpleGrid columns={2} spacing={5}>
                  <Flex gap={2} alignItems={"center"}>
                    <Text>A</Text>
                    <Input
                      border={"1px solid rgba(167, 165, 165, 1)"}
                      w={"149px"}
                      type="number"
                    />
                  </Flex>
                  <Flex gap={2} alignItems={"center"}>
                    <Text>B</Text>
                    <Input
                      border={"1px solid rgba(167, 165, 165, 1)"}
                      type="number"
                    />
                  </Flex>
                  <Flex gap={2} alignItems={"center"}>
                    <Text>C</Text>
                    <Input
                      border={"1px solid rgba(167, 165, 165, 1)"}
                      type="number"
                    />
                  </Flex>
                  <Flex gap={2} alignItems={"center"}>
                    <Text>D</Text>
                    <Input
                      border={"1px solid rgba(167, 165, 165, 1)"}
                      type="number"
                    />
                  </Flex>
                
                </SimpleGrid>
                <Button onClick={() => navigate("/visualizer")} _hover={{backgroundColor: "black", color: "white"}} w={"100%"} mt={5} backgroundColor={"black"} color={"white"} borderRadius={"60px"}>Get Started</Button>

              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default RecShapeModal