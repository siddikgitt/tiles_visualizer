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
import Vault3D from "./Vault3D";
import { useParams } from "react-router-dom";
import VaultSideSubMenu from "./VaultSideSubMenu";
const VaultVisualizer = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [tilesArr, setTilesArr] = useState([]);


  const [tileImg, setTileImg] = useState("");
  const [rugImg, setRugImg] = useState("");
  const [loading, setLoading] = useState(false);

  let { id } = useParams();
  console.log(id);

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

  const getData = () => {
    axios.get(`http://localhost:8080/vault/${id}`).then((res) => {
      // setRugImg(res.data.data.plankImgID.img.data.data);
      // setTileImg(res.data.data.tileImgID.img.data.data);
      setRugImg(
        `data:image/png;base64, ${convertImgFormat(
          res.data.data.rugImgID.img.data.data
        )}`
      );

      if (res.data.data.tileImgID != undefined) {
        setTileImg(
          `data:image/png;base64, ${convertImgFormat(
            res.data.data.tileImgID.img.data.data
          )}`
        );
      } else {
        setTileImg(
          `data:image/png;base64, ${convertImgFormat(
            res.data.data.plankImgID.img.data.data
          )}`
        );
      }
    });
  };

  const fetchTiles = () => {
    setLoading(true);
    axios.get("http://localhost:8080/tiles/").then((res) => {
      // console.log(res.data.data);
      setLoading(false);
      setTilesArr(res.data.data);
      // let convertedImg = convertImgFormat(res.data.data[0].img.data.data);
      // setTileImg(`data:image/png;base64, ${convertedImg}`)
    });
  };

  const fetchRugs = () => {
    setLoading(true);
    axios.get("http://localhost:8080/rug").then((res) => {
      setLoading(false);
      setTilesArr(res.data.data);
    });
  };

  const fetchPlanks = () => {
    setLoading(true);
    axios.get("http://localhost:8080/plank").then((res) => {
      setLoading(false);
      setTilesArr(res.data.data);
    });
  };

  const onChangeTileImg = (val) => {
    setTileImg(val);
  };

  const onChangeRugImg = (val) => {
    setRugImg(val);
  };

  const onCloseFn = () => {
    setName("");
    setOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);

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
          <VaultSideSubMenu
            loading={loading}
            onChangeRugImg={onChangeRugImg}
            onChangeTileImg={onChangeTileImg}
            onCloseFn={onCloseFn}
            tilesImages={tilesArr}
            name={name}
          />
        ) : null}

        <Box>
          <Vault3D url={tileImg} rugTexture={rugImg} />
        </Box>
      </Flex>
    </div>
  );
};

export default VaultVisualizer;
