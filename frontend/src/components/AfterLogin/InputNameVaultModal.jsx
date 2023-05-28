import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

const InputNameVaultModal = ({ isOpen, onOpen, onClose }) => {
    
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose   }>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Siddik
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}

export default InputNameVaultModal