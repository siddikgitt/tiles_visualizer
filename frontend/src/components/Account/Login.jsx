import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import leftImg from "../../images/account/registerImg1.png";
import rightImg from "../../images/account/register2.png";
import AccountModalSuccess from "./AccountModalSuccess";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const toast = useToast();

  const {isAuth, loginUser} = useContext(AuthContext);

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [cshow, setCshow] = React.useState(false);
  const handleClickC = () => setCshow(!cshow);

  const handleChange = (e) => {
    const { name: key, value } = e.target;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_BACKEND_DEPLOYED_LINK)

    console.log("data", data);
    try {
      let res = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOYED_LINK}/login`, data);
      let resData = await res.data;
      console.log(resData);
      if (resData) {
        toast({
          title: "Login Successful",
          description: "Welcome to Balsan 🙏",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        localStorage.setItem('userID', resData.data._id);
        loginUser();
        navigate("/chooseroom");
      } else {
        toast({
          title: "Invalid Credential",
          description: "Please enter correct credentials",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        // alert("Invalid Credential");
      }
    } catch (e) {
      console.log(e.message);
      toast({
        title: "Invalid Credential",
        description: "Please enter correct credentials",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      // alert("Invalid Credential");
    }
  };

  return (
    <div>
      <Flex
        mt={["51px", "51px", "80px", "80px"]}
        padding={["0px 15px", "0px 15px", "0px 15px", "0px 84px"]}
      >
        <Box w={"50%"}>
          <Image src={leftImg} w={"71%"} />
        </Box>
        <Box w={"50%"}>
          <Flex alignItems={"baseline"} justifyContent={"center"}>
            <Text fontFamily={"Inter"} fontWeight={"500"} fontSize={"36px"}>
              Login
            </Text>
            <Image src={rightImg} />
          </Flex>

          {/* input */}
          <form onSubmit={handleSubmit}>
            <Box padding={["10px", "10px", "20px", "20px"]} gap={"5px"}>
              <Input
                isRequired
                onChange={handleChange}
                name="email"
                placeholder="Email"
                mt={2}
              />

              <InputGroup size="md" mt={2}>
                <Input
                  isRequired
                  onChange={handleChange}
                  name="password"
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {/* <Input placeholder="Confirm Password" type="password" mt={2} /> */}
              <InputGroup size="md" mt={2}>
                <Input
                  pr="4.5rem"
                  type={cshow ? "text" : "password"}
                  placeholder="Confirm Password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClickC}>
                    {cshow ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <br />
              <Input
                value={"Login"}
                type="submit"
                mt={2}
                w={"100%"}
                _hover={{ color: "white", backgroundColor: "black" }}
                backgroundColor={"black"}
                color={"white"}
              />
            </Box>
          </form>
        </Box>
      </Flex>
      {/* <AccountModalSuccess/> */}
    </div>
  );
};

export default Login;
