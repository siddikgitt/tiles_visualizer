import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Box,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { SideMenuAdmin } from "./SideMenuAdmin";
import axios from "axios";

const UsersAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BACKEND_DEPLOYED_LINK}/login/`).then((res) => {
      setLoading(false);
      console.log(res.data.data);
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
          <SideMenuAdmin active={"User"} />
        </Box>
        <Box h={"100vh"} overflowY={"auto"} padding={"1rem 5rem"} w={"100%"}>
          <Text fontSize={"2.5rem"} textAlign={"center"} fontWeight={"bold"}>
            USER's DATA
          </Text>
          <TableContainer
            overflowX={"auto"}
            overflowY={"auto"}
            mt={5}
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
          >
            <Table fontSize={"1rem"} variant="striped" colorScheme="red">
              <Thead>
                <Tr>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Email</Th>
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
                      <Td>{el.firstname}</Td>
                      <Td>{el.lastname}</Td>
                      <Td>{el.email}</Td>
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

export default UsersAdmin;
