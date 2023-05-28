import {
  Box,
  Flex,
  Image,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";

const VaultSideSubMenu = ({
  loading,
  tilesImages,
  name,
  onCloseFn,
  onChangeTileImg,
  onChangeRugImg,
}) => {
  const convertImgFormat = (val) => {
    const binaryData = val;
    // const base64Data = btoa(binaryData);
    const base64Data = btoa(
      new Uint8Array(val).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );

    return base64Data;
  };
  return (
    <div>
      <Box
        overflow={"scroll"}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "white",
            borderRadius: "24px",
          },
        }}
        backgroundColor={"white"}
        position={"absolute"}
        w={"20vw"}
        h={"100%"}
        border={"1px"}
        padding={"15px"}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text fontFamily={"Inter"} fontSize={"21px"} fontWeight={"bold"}>
            {name}
          </Text>
          <CloseIcon onClick={onCloseFn} cursor={"pointer"} />
        </Flex>

        <Flex
          mt={"11px"}
          gap={"5px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Select size={"xs"} variant="unstyled" placeholder="Filter By Type" />
          <Select
            size={"xs"}
            variant="unstyled"
            placeholder="Filter By Color"
          />
        </Flex>

        <Input border={"1px solid black"} mt={"5px"} />

        {loading ? (
          <Flex mt={5} justifyContent={"center"} alignItems={"center"}>
            <Spinner size="lg" />
          </Flex>
        ) : (
          <SimpleGrid mt={5} columns={2} spacing={5}>
            {tilesImages?.map((el) => (
              <Box
                _hover={{ border: "2px solid black" }}
                cursor={"pointer"}
                border={"2px solid transparent"}
                onClick={() => {
                  if (name == "Tiles") {
                    localStorage.setItem("vault-plankImgID", "");
                    localStorage.setItem("vault-tileImgID", el._id);
                    onChangeTileImg(
                      `data:image/png;base64, ${convertImgFormat(
                        el.img.data.data
                      )}`
                    );
                  } else if (name == "Planks") {
                    localStorage.setItem("vault-tileImgID", "");
                    localStorage.setItem("vault-plankImgID", el._id);
                    onChangeTileImg(
                      `data:image/png;base64, ${convertImgFormat(
                        el.img.data.data
                      )}`
                    );
                  } else if (name == "Rugs") {
                    localStorage.setItem("vault-rugImgID", el._id);

                    onChangeRugImg(
                      `data:image/png;base64, ${convertImgFormat(
                        el.img.data.data
                      )}`
                    );
                  }
                }}
              >
                <Image
                  id={el._id}
                  src={
                    "data:image/png;base64," +
                    convertImgFormat(el.img.data.data)
                  }
                  alt={`${el.name} Image`}
                />
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </div>
  );
};

export default VaultSideSubMenu;
