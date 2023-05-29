import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Vault3D from "./Vault3D";

const MyVault = () => {

  const toast = useToast();
  const navigate = useNavigate();

  const [temp, setTemp] = useState([]);

  const getData = () => {
    let obj = { userID: localStorage.getItem("userID") };
    axios.post(`${process.env.REACT_APP_BACKEND_DEPLOYED_LINK}/vault/get`, obj).then((res) => {
      setTemp(res.data.data);
    });
  };

  const deleteVault = (id) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_DEPLOYED_LINK}/vault/${id}`).then((res) => {
      console.log(res.message);
      toast({
        title: "Vault Deleted",
        description: "Vault Deleted Successfully",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      getData();
    });
  };

  const convertImgFormat = (val) => {
    const binaryData = val;
    // const base64Data = btoa(binaryData);
    const base64Data = btoa(
      new Uint8Array(val).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    // console.log(base64Data);
    return base64Data;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box
        w={"70%"}
        margin={"auto"}
        border={"1px solid"}
        padding={"25px"}
        borderRadius={"25px"}
        mt={"111px"}
        mb={"25px"}
        backgroundColor={"white"}
      >
        <Text fontSize={"36px"} fontFamily={"Inter"} fontWeight={500}>
          My Vault
        </Text>
        <hr style={{ marginTop: "11px", marginBottom: "11px" }} />
        {temp &&
          temp?.map((el) => (
            <Box id={el._id}>
              {console.log(el)}
              <Flex gap={"45px"} mt={2}>
                <Image
                  borderRadius={"14px"}
                  w={"200px"}
                  h={"200px"}
                  border={"1px solid"}
                  src={
                    el.tileImgID
                      ? "data:image/png;base64," +
                        convertImgFormat(el.tileImgID.img.data.data)
                      : "data:image/png;base64," +
                        convertImgFormat(el.plankImgID.img.data.data)
                  }
                />
                <Box>
                  <Flex gap={"11px"}>
                    <Text>{el.name}</Text>
                    <Text color={"gray"}>
                      (
                      {`${new Date(el.createdAt).getFullYear()}-${new Date(
                        el.createdAt
                      ).getMonth()}-${new Date(el.createdAt).getDay()}`}
                      )
                    </Text>
                  </Flex>
                  <Flex gap={"18px"} mt={35}>
                    <Button
                      onClick={() => {
                        // tileImg = el.tileImgID
                        //   ? `data:image/png;base64,${convertImgFormat(
                        //       el.tileImgID.img.data.data
                        //     )}`
                        //   : `data:image/png;base64,${convertImgFormat(
                        //       el.plankImgID.img.data.data
                        //     )}`;

                        // if (el.rugImgID != undefined) {
                        //   let rugImgVar = convertImgFormat(
                        //     el.rugImgID.img.data.data
                        //   )
                        //   rugImg = "data:image/png;base64," + rugImgVar;
                        // }
                        navigate(`/vaultVisualizer/${el._id}`);
                      }}
                      w={134}
                      borderRadius={"44px"}
                      _hover={{ backgroundColor: "rgba(234, 67, 27, 1)" }}
                      backgroundColor={"rgba(234, 67, 27, 1)"}
                      color={"white"}
                    >
                      View Image
                    </Button>
                    <Button
                      onClick={async () => await deleteVault(el._id)}
                      w={134}
                      borderRadius={"44px"}
                      _hover={{ backgroundColor: "white" }}
                      backgroundColor={"white"}
                      border={"1px solid black"}
                    >
                      Remove
                    </Button>
                  </Flex>
                </Box>
              </Flex>
              <hr style={{ marginTop: "11px", marginBottom: "11px" }} />
            </Box>
          ))}
      </Box>
    </>
  );
};

export default MyVault;
