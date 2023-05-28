import React, { useRef, useEffect } from "react";
import { Box, Button, Flex, useDisclosure, useToast } from "@chakra-ui/react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useParams } from "react-router-dom";
import axios from "axios";

const Vault3D = ({ url, rugTexture }) => {
  const mount = useRef(null);
  const toast = useToast();

  useEffect(() => {
    let doubleTiles = false;
    let doubleRug = false;

    let renderer, orbit, camera, intersect;

    //WebGLRenderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("white");
    renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);

    //Scene
    var planeW = 2; // pixels
    var planeH = 2; // pixels
    var numW = 2; // how many wide (50*50 = 2500 pixels wide)
    var numH = 2; // how many tall (50*50 = 2500 pixels tall)

    var scene = new THREE.Scene();

    var texture = new THREE.TextureLoader().load(url);

    // planeGeometry
    var planeGeometry = new THREE.PlaneGeometry(12, 12, 12, 12);
    var planeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      depthTest: false,
      needsUpdate: true,
    });

    let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial, 12);
    planeMesh.rotateX(-Math.PI / 2);

    let gridPlaneMesh;
    function refreshFn() {
      // doubleRug = false
      if (!doubleTiles) {
        // if (!doubleTiles) {
        doubleTiles = true;

        var loader = new THREE.TextureLoader().load(
          // resource URL
          url,
          // Function when resource is loaded
          function (texture) {
            // do something with the texture
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.offset.x = 90 / (2 * Math.PI);
            texture.repeat.set(12, 12);
            material.map = texture; // set the material's map when when the texture is loaded
            material.map.needsUpdate = true;
          },
          // Function called when download progresses
          function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          // Function called when download errors
          function (xhr) {
            console.log("An error happened");
          }
        );

        // return material; // return the material
        // }

        var material = new THREE.MeshBasicMaterial({ map: loader }); // create a material

        gridPlaneMesh = new THREE.Mesh(planeGeometry, material);
        gridPlaneMesh.rotateX(-Math.PI / 2);
        scene.add(gridPlaneMesh);
      }
    }
    refreshFn();

    //Update Tiles texture
    function updateTilesTexture(el) {
      // alert(1)
      var loader = new THREE.TextureLoader().load(
        // resource URL
        el,
        // Function when resource is loaded
        function (texture) {
          // do something with the texture
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.offset.x = 90 / (2 * Math.PI);
          texture.repeat.set(12, 12);
          planeMaterial.map = texture; // set the material's map when when the texture is loaded
          planeMaterial.map.needsUpdate = true;
        },
        // Function called when download progresses
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // Function called when download errors
        function (xhr) {
          console.log("An error happened");
        }
      );

      gridPlaneMesh.material.map = loader;
      gridPlaneMesh.material.needsUpdate = true;
    }
    //Update Tiles texture

    // BoxGeometry wall
    const cylinder = new THREE.CylinderGeometry(8.4, 8.4, 5, 4, 1, true);

    const cylinderMeshMaterial = new THREE.MeshLambertMaterial({
      color: 0xfafafa,
      opacity: 0.1,
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: false,
    });

    let cylinderMesh = new THREE.Mesh(cylinder, cylinderMeshMaterial);
    cylinderMesh.position.set(0, 2.5, 0);
    cylinderMesh.rotation.y = 0.25 * Math.PI;
    scene.add(cylinderMesh);

    // ================ RUG CODE (Resizable and draggable planeGeometry) ================

    function addResizeDrag(mesh) {
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };
      let planeOffset = new THREE.Vector3();

      function onDocumentMouseDown(event) {
        isDragging = true;
        previousMousePosition = {
          x: event.clientX,
          y: event.clientY,
        };

        const intersects = getIntersects(event.layerX, event.layerY);

        if (intersects.length > 0) {
          planeOffset.copy(intersects[0].point).sub(mesh.position);
        }
      }

      function onDocumentMouseMove(event) {
        if (isDragging) {
          const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y,
          };

          if (planeOffset.length() > 0) {
            // const intersects = getIntersects(event.layerX, event.layerY);
            // if (intersects.length > 0) {

            //   mesh.position.copy(intersects[0].point.sub(planeOffset));
            // }

            const intersects = getIntersects(event.layerX, event.layerY);
            if (intersects.length > 0) {
              const newPosition = intersects[0].point.sub(planeOffset);

              // Get the dimensions of the planeGeometry
              const planeWidth = planeGeometry.parameters.width;
              const planeHeight = planeGeometry.parameters.height;

              // Get the dimensions of the rugGeometry
              const rugWidth = mesh.geometry.parameters.width;
              const rugHeight = mesh.geometry.parameters.height;

              // Calculate the boundaries of the planeGeometry
              const xMin = -(planeWidth / 2) + rugWidth / 2;
              const xMax = planeWidth / 2 - rugWidth / 2;
              const zMin = -(planeHeight / 2) + rugHeight / 2;
              const zMax = planeHeight / 2 - rugHeight / 2;

              // Clamp the newPosition within the planeGeometry boundaries
              const clampedX = THREE.MathUtils.clamp(newPosition.x, xMin, xMax);
              const clampedZ = THREE.MathUtils.clamp(newPosition.z, zMin, zMax);
              newPosition.set(clampedX, newPosition.y, clampedZ);
              mesh.position.copy(newPosition);
            }
          }

          previousMousePosition = {
            x: event.clientX,
            y: event.clientY,
          };
        }
      }

      function onDocumentMouseUp(event) {
        isDragging = false;
        planeOffset.set(0, 0, 0);
      }

      function getIntersects(x, y) {
        const mouseVector = new THREE.Vector3(
          (x / window.innerWidth) * 0.9 * 2 - 1,
          -(y / window.innerHeight) * 2 + 1,
          0.5
        );
        // console.log("mouseVector:", mouseVector);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouseVector, camera);
        // console.log("ray:", raycaster.intersectObject(mesh));
        return raycaster.intersectObject(mesh);
      }

      function onWindowResize() {
        camera.aspect = ((window.innerWidth * 0.8) / window.innerHeight) * 0.8;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
      }

      window.addEventListener("resize", onWindowResize);
      document.addEventListener("mousedown", onDocumentMouseDown);
      document.addEventListener("mousemove", onDocumentMouseMove);
      document.addEventListener("mouseup", onDocumentMouseUp);
    }

    // ================ RUG CODE (Resizable and draggable planeGeometry) ================

    // Create a plane geometry and mesh when clicked
    let rugMesh;
    if (rugTexture != "") {
      createRug();
    }

    function createRug(event) {
      if (!doubleRug) {
        doubleRug = true;
        var rugTextureLoader = new THREE.TextureLoader().load(rugTexture);

        const rugGeometry = new THREE.PlaneGeometry(4, 7);
        const rugMaterial = new THREE.MeshBasicMaterial({
          map: rugTextureLoader,
          depthTest: false,
          needsUpdate: true,
        });

        rugMesh = new THREE.Mesh(rugGeometry, rugMaterial);
        rugMesh.rotateX(-Math.PI / 2);
        addResizeDrag(rugMesh);
        scene.add(rugMesh);
      }
    }
    // Create a plane geometry and mesh when clicked

    // Update a texture of Rug
    function updateRugTexture() {
      // Load the selected texture with a texture loader
      var rugTextureLoader = new THREE.TextureLoader().load(rugTexture);
      // Update the texture of the rug material with the new texture
      rugMesh.material.map = rugTextureLoader;
      rugMesh.material.needsUpdate = true;
    }
    // Update a texture of Rug

    // Camera
    camera = new THREE.PerspectiveCamera(
      2.5,
      ((window.innerWidth * 0.9) / window.innerHeight) * 0.9,
      0.1,
      1000
    );

    // ================ 3D PerspectiveCamera ================

    // Sets orbit control to move the camera around
    orbit = new OrbitControls(camera, renderer.domElement);

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    orbit.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
    orbit.enableZoom = true;
    // orbit.dampingFactor = 5;
    // orbit.dampingFactor = 0.05;

    orbit.screenSpacePanning = false;

    // orbit.minDistance = 100;
    orbit.minDistance = 10;
    orbit.maxDistance = 500;

    orbit.maxPolarAngle = Math.PI / 2.5;
    orbit.enabled = false;

    // camera.position.set(6, 8, 14);

    // Camera positioning
    camera.position.set(0, 360, 0);

    // camera.zoom = zoomFactor
    // camera.far = 500
    // camera.updateProjectionMatrix();
    orbit.update();

    // ================ 2D to 3D SWITCH LOGIC ================

    document.getElementById("twoD").addEventListener("click", () => {
      // camera.position.set(0, 360, 100);

      camera.position.set(0, 360, 0);
      // orbit.object.position.z = 0;
      orbit.enabled = false;
      orbit.update();
    });

    document.getElementById("threeD").addEventListener("click", () => {
      // Toggle between 2D and 3D views by updating the OrbitControls
      camera.position.set(290, 120, 180);
      orbit.enabled = true;
      orbit.update();
    });

    // ================ 2D to 3D SWITCH LOGIC ================

    //disc icon
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.88);
    mount.current.appendChild(renderer.domElement);

    //responsive window
    window.addEventListener("resize", () => {
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.9, window.innerHeight);
      camera.aspect = (window.innerWidth * 0.9) / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      orbit.update();
    };

    animate();

    return () => {
      if (mount.current && renderer.domElement) {
        mount.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [url, rugTexture]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  let { id } = useParams();


  const onSaveBtnFn = () => {
    
    let tileImgIDLS = localStorage.getItem("vault-tileImgID");
    let plankImgIDLS = localStorage.getItem("vault-plankImgID");
    let rugImgIDLS = localStorage.getItem("vault-rugImgID");

    let obj = {
      userID: localStorage.getItem("userID"),
      ...(tileImgIDLS != "" && { tileImgID: tileImgIDLS }),
      ...(plankImgIDLS != "" && { plankImgID: plankImgIDLS }),
      ...(rugImgIDLS != "" && { rugImgID: rugImgIDLS }),
    };
    console.log(id, obj);
    
    axios.patch(`http://localhost:8080/vault/${id}`, obj);

  };

  return (
    <div>
      <Box ref={mount}></Box>

      <Button
        onClick={() =>
          {
            onSaveBtnFn()
            toast({
              title: "Vault Updated Successfully",
              description: "We've updated this vault for you.",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }
        }
        _hover={{ backgroundColor: "black", color: "white" }}
        position={"absolute"}
        top={5}
        right={5}
        backgroundColor={"#EA431B"}
        color={"white"}
      >
        Save
      </Button>

      <Flex position={"absolute"} bottom={5} right={5} gap={2}>
        <Button
          _hover={{ backgroundColor: "black", color: "white" }}
          backgroundColor={"#EA431B"}
          color={"white"}
          id="twoD"
        >
          2D
        </Button>
        <Button
          _hover={{ backgroundColor: "black", color: "white" }}
          backgroundColor={"#EA431B"}
          color={"white"}
          id="threeD"
        >
          3D
        </Button>
      </Flex>

      {/* <SaveModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} /> */}
    </div>
  );
};

export default Vault3D;
