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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import leftImg from "../../images/account/registerImg1.png";
import rightImg from "../../images/account/register2.png";
import { useNavigate } from "react-router-dom";

import axios from "axios";

// const submitData = {
//   firstname: "",
//   lastname: "",
//   email: "",
//   password: "",
//   confirmPass: "",
// };

const Register = () => {
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

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(data);
    axios.post(`http://localhost:8080/signup`, data).then((res) => {
      if(res.data){
        navigate("/login")
      }
    });
  };

  const [checkBoxStatus, setCheckBoxStatus] = useState(false);


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
              Register
            </Text>
            <Image src={rightImg} />
          </Flex>
          <Text textAlign={"center"}>
            create your account. it’s free and takes a minute
          </Text>

          {/* =========== input =========== */}

          <form onSubmit={handleSubmit}>
            <Box padding={["10px", "10px", "20px", "20px"]} gap={"5px"}>
              <Flex gap={2}>
                <Input
                  onChange={handleChange}
                  name="firstname"
                  placeholder="First Name"
                  isRequired
                />
                <Input
                  isRequired
                  onChange={handleChange}
                  name="lastname"
                  placeholder="Last Name"
                />
              </Flex>
              <Input
                isRequired
                onChange={handleChange}
                name="email"
                // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                // title="Please enter correct Email"
                placeholder="Email"
                mt={2}
              />

              <InputGroup size="md" mt={2}>
                <Input
                  isRequired
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  // title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
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

              {/* <InputGroup size="md" mt={2}>
                <Input
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  // title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  // setCustomValidity("");
                  onChange={handleChange}
                  id="confirmPass"
                  name="confirmPass"
                  pr="4.5rem"
                  type={cshow ? "text" : "password"}
                  placeholder="Confirm Password"
                  isRequired
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClickC}>
                    {cshow ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup> */}

              <Checkbox
                mt={2}
                onChange={() => setCheckBoxStatus(!checkBoxStatus)}
              >
                I accept the Terms of use & privacy policy
              </Checkbox>
              <br />
              {checkBoxStatus ? (
                <Input
                  type="submit"
                  value="Register Now"
                  mt={5}
                  w={"100%"}
                  _hover={{ color: "white", backgroundColor: "black" }}
                  backgroundColor={"black"}
                  color={"white"}
                cursor={"pointer"}

                />
              ) : (
                <Input
                cursor={"pointer"}
                isDisabled
                  type="submit"
                  value="Register Now"
                  mt={5}
                  w={"100%"}
                  _hover={{ color: "white", backgroundColor: "black" }}
                  backgroundColor={"black"}
                  color={"white"}
                />
              )}
            </Box>
          </form>
        </Box>
      </Flex>
    </div>
  );
};

export default Register;
