import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import Select from "react-select";

import { cities } from "../data/cities";

function ModalAddLocation({ onConfirm }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = React.useState([]);

  const getIndoCities = cities.objects.IDN.geometries;
  const renderOptions = getIndoCities.map((city) => {
    return {
      label: city.properties.NAME_2,
      value: city.properties.NAME_2,
    };
  });

  return (
    <>
      <Button onClick={onOpen}>Tambah Perjalanan</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Silahkan Isi Riwayat Perjalanan </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              isMulti
              name="colors"
              options={renderOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => setSelectedOption(e)}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Tutup
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                onConfirm(selectedOption);
                onClose();
              }}
            >
              Tampilkan Peta
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalAddLocation;
