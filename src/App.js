import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import Map from "./map/index";
import Modal from "./modal/index";

function App() {
  const [travel, setTravel] = React.useState([]);

  const handleConfirm = (selectedOption) => {
    console.log(selectedOption);
    setTravel(selectedOption);
  };
  return (
    <ChakraProvider>
      <Map travel={travel} />
      <Modal onConfirm={handleConfirm} />
    </ChakraProvider>
  );
}

export default App;
