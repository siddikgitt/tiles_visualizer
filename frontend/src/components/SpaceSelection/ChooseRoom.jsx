import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import icon from "../../images/chooseSpace/assistant_Icon.png";

import lshape from "../../images/chooseSpace/L_Shape.png";
import squareShape from "../../images/chooseSpace/squareShape.png";
import rectangleShape from "../../images/chooseSpace/RectangleShape.png";
import trapeziumShape from "../../images/chooseSpace/TrapeziumShape.png";
import LShapeModal from "./LShapeModal";
import SqrShapeModal from "./SqrShapeModal";
import RecShapeModal from "./RecShapeModal";
import TrapShapeModal from "./TrapShapeModal";

const ChooseRoom = () => {
  const { isOpen: isOpenLShape, onOpen: onOpenLShape, onClose: onCloseLShape } = useDisclosure();
  const { isOpen: isOpenSquareShape, onOpen: onOpenSquareShape, onClose: onCloseSquareShape } = useDisclosure();
  const { isOpen: isOpenRectangleShape, onOpen: onOpenRectangleShape, onClose: onCloseRectangleShape } = useDisclosure();
  const { isOpen: isOpenTrapeziumShape, onOpen: onOpenTrapeziumShape, onClose: onCloseTrapeziumShape } = useDisclosure();
  return (
    <div>
      <Flex
        gap={7}
        mt={["51px", "51px", "80px", "80px"]}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize={"36px"} fontFamily={"Inter"}>
          Chooose The Shape Of The Room
        </Text>
        <Image src={icon} />
      </Flex>
      <Flex gap={7} mt={"51px"} alignItems={"center"} justifyContent={"center"}>
        {/* <Box cursor={"pointer"} onClick={onOpenLShape}>
          <Image src={lshape} />
          <LShapeModal isOpen={isOpenLShape} onClose={onCloseLShape}/>
        </Box> */}
        <Box cursor={"pointer"} onClick={onOpenSquareShape}>
          <Image src={squareShape} />
          <SqrShapeModal isOpen={isOpenSquareShape} onClose={onCloseSquareShape}/>
        </Box>
        {/* <Box cursor={"pointer"} onClick={onOpenRectangleShape}>
          <Image src={rectangleShape} />
          <RecShapeModal isOpen={isOpenRectangleShape} onClose={onCloseRectangleShape}/>
        </Box>
        <Box cursor={"pointer"} onClick={onOpenTrapeziumShape}>
          <Image src={trapeziumShape} isOpen={isOpenTrapeziumShape} onClose={onCloseTrapeziumShape}/>
          <TrapShapeModal isOpen={isOpenTrapeziumShape} onClose={onCloseTrapeziumShape}/>
        </Box> */}
      </Flex>
    </div>
  );
};

export default ChooseRoom;
