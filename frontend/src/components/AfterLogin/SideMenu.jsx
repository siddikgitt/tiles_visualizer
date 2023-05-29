import React, { useEffect, useState } from "react";
import NewNavbar from "./NewNavbar";
import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import tilesIcon from "../../images/afterLogin/TilesIcon-Sidebar.svg";
import planksIcon from "../../images/afterLogin/PlanksIcon-Sidebar.svg";
import SideSubMenu from "./SideSubMenu";

// Three.js library imort
import ThreeD from "./ThreeD";

// axios install
import axios from "axios";
const SideMenu = () => {
  const [tilesArr, setTilesArr] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchTiles = () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BACKEND_DEPLOYED_LINK}/tiles/`).then((res) => {
      // console.log(res.data.data);
      setLoading(false);
      setTilesArr(res.data.data);
      // let convertedImg = convertImgFormat(res.data.data[0].img.data.data);
      // setTileImg(`data:image/png;base64, ${convertedImg}`)
    });
  };

  const fetchRugs = () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BACKEND_DEPLOYED_LINK}/rug`).then((res) => {
      setLoading(false);
      setTilesArr(res.data.data);
    });
  };

  const fetchPlanks = () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BACKEND_DEPLOYED_LINK}/plank`).then((res) => {
      setLoading(false)
      setTilesArr(res.data.data);
    });
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_DEPLOYED_LINK}/tiles/`).then((res) => {
      // console.log(res.data.data);
      setLoading(false);
      setTilesArr(res.data.data);
      let convertedImg = convertImgFormat(res.data.data[0].img.data.data);
      setTileImg(`data:image/png;base64, ${convertedImg}`)
      localStorage.setItem("tileImgID", res.data.data[0]._id);
      localStorage.setItem("plankImgID", "");
    });
  }, []);

  const [name, setName] = useState("");
  const [tileImg, setTileImg] = useState("");
  const [rugImg, setRugImg] = useState("");

  const onChangeTileImg = (val) => {
    setTileImg(val);
  };

  const onChangeRugImg = (val) => {
    setRugImg(val);
  };

  const [open, setOpen] = useState(false);

  const onCloseFn = () => {
    setName("");
    setOpen(false);
  };

  return (
    <div>
      <Flex mt={"70px"}>
        <Flex
          paddingTop={"25px"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={"25px"}
          height={"88.28vh"}
          w={"10%"}
          border={"1px"}
        >
          <Flex
            cursor={"pointer"}
            _hover={{ fontWeight: "bold" }}
            flexDirection={"column"}
            alignItems={"center"}
            onClick={() => {
              setName("Tiles");
              setOpen(true);
              fetchTiles();
            }}
          >
            <Box
              borderRadius={"50%"}
              padding={"15px"}
              backgroundColor={"#E6E6E6"}
            >
              <Image w={"35px"} h={"35px"} src={tilesIcon} />
            </Box>
            <Text
              fontWeight={name == "Tiles" ? "bold" : null}
              color={name == "Tiles" ? "crimson" : "black"}
              fontFamily={"Inter"}
            >
              Tiles
            </Text>
          </Flex>

          <Flex
            cursor={"pointer"}
            _hover={{ fontWeight: "bold" }}
            flexDirection={"column"}
            alignItems={"center"}
            onClick={() => {
              setName("Planks");
              fetchPlanks();
              setOpen(true);
            }}
          >
            <Box
              borderRadius={"50%"}
              padding={"15px"}
              backgroundColor={"#E6E6E6"}
            >
              <Image w={"35px"} h={"35px"} src={planksIcon} />
            </Box>
            <Text
              fontWeight={name == "Planks" ? "bold" : null}
              color={name == "Planks" ? "crimson" : "black"}
              fontFamily={"Inter"}
            >
              Planks
            </Text>
          </Flex>

          <Flex
            cursor={"pointer"}
            _hover={{ fontWeight: "bold" }}
            flexDirection={"column"}
            alignItems={"center"}
            onClick={() => {
              setName("Rugs");
              fetchRugs();
              setOpen(true);
            }}
          >
            <Box
              borderRadius={"50%"}
              padding={"15px"}
              backgroundColor={"#E6E6E6"}
            >
              <Image
                w={"35px"}
                h={"35px"}
                src={"https://cdn-icons-png.flaticon.com/512/1606/1606199.png"}
              />
            </Box>
            <Text
              fontWeight={name == "Rugs" ? "bold" : null}
              color={name == "Rugs" ? "crimson" : "black"}
              fontFamily={"Inter"}
            >
              Rug
            </Text>
          </Flex>
        </Flex>

        {open ? (
          <SideSubMenu
            loading={loading}
            onChangeRugImg={onChangeRugImg}
            onChangeTileImg={onChangeTileImg}
            onCloseFn={onCloseFn}
            tilesImages={tilesArr}
            name={name}
          />
        ) : null}

        <Box>
          <ThreeD url={tileImg} rugTexture={rugImg} />
        </Box>
      </Flex>
    </div>
  );
};

export default SideMenu;