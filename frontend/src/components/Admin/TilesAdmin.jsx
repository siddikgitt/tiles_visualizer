import {
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Grid,
  GridItem,
  Image,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SideMenuAdmin } from "./SideMenuAdmin";
import readXlsxFile from "read-excel-file";
import * as XLSX from "xlsx";

import { saveAs } from "file-saver";
import Dropzone from "react-dropzone";
import axios from "axios";

const TilesAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  function convertImgFormat(val) {
    const base64Data = btoa(
      new Uint8Array(val).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return base64Data;
  }

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     // console.log(e.target.result);
  //     const data = new Uint8Array(e.target.result);
  //     const workbook = XLSX.read(data, { type: "array" });

  //     workbook.SheetNames.forEach((sheetName) => {
  //       const worksheet = workbook.Sheets[sheetName];
  //       const cellKeys = Object.keys(worksheet);

  //       cellKeys.forEach((cellKey) => {
  //         const cell = worksheet[cellKey];
  //         // console.log(cell);
  //         if (cell.drawing && cell.drawing.length > 0) {
  //           const image = cell.drawing[0];

  //           if (image && image.image) {
  //             const base64Data = image.image;

  //             // Create a Blob from the base64 data
  //             const blob = base64ToBlob(base64Data, "image/png");

  //             // Save the image file
  //             console.log(blob)
  //             saveAs(blob, "extracted_image.png");
  //           }
  //         }
  //       });
  //     });
  //   };

  //   reader.readAsArrayBuffer(file);
  // };

  // const base64ToBlob = (base64Data, contentType) => {
  //   const byteCharacters = atob(base64Data);
  //   const byteArrays = [];

  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteArrays.push(byteCharacters.charCodeAt(i));
  //   }

  //   const byteArray = new Uint8Array(byteArrays);
  //   return new Blob([byteArray], { type: contentType });
  // };

  const getData = () => {
    setLoading(true);
    axios.get("http://localhost:8080/tiles/").then((res) => {
      setLoading(false);
      // console.log(res.data.data);
      setData(res.data.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Flex backgroundColor={"#eff3f5"}>
        <Box
          h={"100vh"}
          boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
          backgroundColor={"white"}
          borderRadius={"0px 35px 0px 0px"}
        >
          <SideMenuAdmin active={"Tiles"} />
        </Box>
        <Box
          h={"100vh"}
          overflowY={"auto"}
          padding={"1rem 2rem"}
          margin={"auto"}
          w={"100%"}
        >
          <Button w={"100%"} colorScheme="red" onClick={onOpen}>
            ADD TILES DATA
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
              bg="blackAlpha.300"
              backdropFilter="blur(10px) hue-rotate(10deg)"
            />
            <ModalContent padding={"1.5rem"}>
              <ModalHeader fontSize={"1.5rem"} textAlign={"center"}>
                ADD TILES DATA
              </ModalHeader>
              <ModalBody>
                <Grid mt={2} templateColumns="repeat(2, 1fr)" gap={5}>
                  <GridItem colSpan={2}>
                    <Input
                      // onChange={handleFileUpload}
                      padding={"0.2rem"}
                      type="file"
                      accept=".xlsx"
                      w={"100%"}
                      border={"1px solid"}
                      backgroundColor={"white"}
                    />
                  </GridItem>

                  <Input
                    border={"1px solid"}
                    backgroundColor={"white"}
                    placeholder="Tile name"
                  />
                  <Input
                    border={"1px solid"}
                    backgroundColor={"white"}
                    placeholder="Tile Color"
                  />
                  <Input
                    border={"1px solid"}
                    backgroundColor={"white"}
                    placeholder="Length of Tile"
                  />
                  <Input
                    border={"1px solid"}
                    backgroundColor={"white"}
                    placeholder="Width of Tile"
                  />
                  <Input
                    border={"1px solid"}
                    backgroundColor={"white"}
                    placeholder="Type of Tile"
                  />
                  <Input
                    w={"100%"}
                    border={"1px solid"}
                    backgroundColor={"white"}
                    placeholder="SKU of Tile"
                  />
                </Grid>
                <Button
                  mt={5}
                  w={"100%"}
                  backgroundColor={"crimson"}
                  color={"white"}
                  fontWeight={"bold"}
                  _hover={{ backgroundColor: "#333333" }}
                  type="submit"
                  cursor={"pointer"}
                >
                  ADD
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>

          <Text
            mt={7}
            fontSize={"2.5rem"}
            textAlign={"center"}
            fontWeight={"bold"}
          >
            TILE's DATA
          </Text>
          <TableContainer
            w={"80vw"}
            overflowY={"auto"}
            overflowX={"auto"}
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "transparent",
                borderRadius: "24px",
              },
            }}
            mt={5}
          >
            <Table variant="striped" colorScheme="red">
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Color</Th>
                  <Th>Type</Th>
                  <Th>SKU</Th>
                  <Th>Length</Th>
                  <Th>Width</Th>
                  <Th>Edit</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr>
                    <Td colSpan={9}>
                      <Flex justifyContent={"center"} alignItems={"center"}>
                        <Spinner size="xl" />
                      </Flex>
                    </Td>
                  </Tr>
                ) : (
                  data?.map((el) => (
                    <Tr>
                      <Td>
                        <Image
                          w={"51px"}
                          border={"1px solid black"}
                          src={
                            "data:image/png;base64," +
                            convertImgFormat(el.img.data.data)
                          }
                          alt={`${el.name} Image`}
                        />
                      </Td>
                      <Td>{el.name}</Td>
                      <Td>{el.color}</Td>
                      <Td>{el.type}</Td>
                      <Td>{el.sku}</Td>
                      <Td>{el.length}</Td>
                      <Td>{el.width}</Td>
                      <Td>
                        <Button colorScheme="teal">Edit</Button>
                      </Td>
                      <Td>
                        <Button colorScheme="red">Delete</Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </>
  );
};

export default TilesAdmin;
