import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import banner1 from "../images/home/banner1.png";
import banner2 from "../images/home/banner2.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Box mt={["51px", "51px", "80px", "80px"]} width={"100%"} padding={["0px 15px","0px 15px","0px 15px","0px 84px"]}>
        <Image src={banner1} borderRadius={"2.5%"} />
      </Box>

      <SimpleGrid columns={[1,1,2,2]} mt={"11px"} marginBottom={["25px","25px","11px","11px",]} padding={["0px 15px","0px 15px","0px 84px","0px 84px"]} gap={5}>
        <Box>
          <Image src={banner2} width={"612px"} height={[,,,"87vh"]} />
        </Box>

        <Box margin={["0%","0%", "7%", "7%"]}>
          <Text
            fontFamily={"Inter"}
            fontWeight={"700"}
            fontSize={["21px","21px","28px","28px"]}
            lineHeight={"58px"}
          >
            Interactive Tile Visualizer
          </Text>
          <Box>
            <Text
              color={"rgba(0, 0, 0, 0.6)"}
              fontFamily={"Inter"}
              fontWeight={"400"}
              fontSize={["14px", "14px", "18px", "18px"]}
            >
              The concept? Mix things up! The floor is yours!
            </Text>
            <Text
              color={"rgba(0, 0, 0, 0.6)"}
              fontFamily={"Inter"}
              fontWeight={"400"}
              fontSize={["14px", "14px", "18px", "18px"]}
            >
              Combine different colours and create your own patterns.
            </Text>
            <Text
              color={"rgba(0, 0, 0, 0.6)"}
              fontFamily={"Inter"}
              fontWeight={"400"}
              fontSize={["14px", "14px", "18px", "18px"]}
            >
              Create your own graphic effects, from high-impact style to subtle
              variations.
            </Text>
            <br />
            <Text
              color={"rgba(0, 0, 0, 0.6)"}
              fontFamily={"Inter"}
              fontWeight={"400"}
              fontSize={["14px", "14px", "18px", "18px"]}
            >
              Tiles, planks, or both - choose your format! Wall to wall or rug
              effect… everything is possible!
            </Text>
            <br />
            <Text
              color={"rgba(0, 0, 0, 0.6)"}
              fontFamily={"Inter"}
              fontSize={["14px", "14px", "18px", "18px"]}
            >
              Create your own floor with an original layout for your family
              room, living room, bedroom or corridors.
            </Text>
          </Box>
          <Button
          // onClick={() => {window.location.href = url}}
          
          onClick={() => navigate("/chooseroom")}  
          _hover={{ backgroundColor: "black", color: "white" }}
            width={"100%"}
            mt={7}
            backgroundColor={"black"}
            color={"white"}
            padding={["15px 111px","15px 111px","36px 200px","36px 200px"]}
            fontSize={"21px"}
            borderRadius={11}
          >
            Visualizer Process
          </Button>
        </Box>
      </SimpleGrid>
    </div>
  );
};

export default Home;
