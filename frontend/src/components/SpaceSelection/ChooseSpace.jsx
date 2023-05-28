import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import icon from "../../images/chooseSpace/icon.png"

import familyImg from "../../images/chooseSpace/familyImg.png";
import corridorImg from "../../images/chooseSpace/corridorImg.png";
import livingImg from "../../images/chooseSpace/livingImg.png";
import bedroomImg from "../../images/chooseSpace/bedroomImg.png";

const ChooseSpace = () => {
  return (
    <div>
        <Flex mt={["51px", "51px", "80px", "80px"]} justifyContent={"center"} alignItems={"center"}>
            <Text fontSize={"36px"} fontFamily={"Inter"} >Chooose the space</Text>
            <Image src={icon}/>
        </Flex>

        <Flex gap={5} mt={5} alignItems={"center"} justifyContent={"center"}>
            
            <Box>
                <Image src={bedroomImg}/>
                <Text textAlign={"center"} fontSize={"24px"}>Bedroom</Text>
            </Box>
            <Box>
                <Image src={corridorImg}/>
                <Text textAlign={"center"} fontSize={"24px"}>Corridor</Text>
            </Box>
            <Box>
                <Image src={familyImg}/>
                <Text textAlign={"center"} fontSize={"24px"}>Family Room</Text>
            </Box>
            <Box>
                <Image src={livingImg}/>
                <Text textAlign={"center"} fontSize={"24px"}>Living Room</Text>
            </Box>
        </Flex>
    </div>
  )
}

export default ChooseSpace