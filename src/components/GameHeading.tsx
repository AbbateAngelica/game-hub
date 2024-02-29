import { Heading } from "@chakra-ui/react";
import useGameQueryStore from "../store";

const GameHeading = () => {
  const genre = useGameQueryStore((s) => s.gameQuery.genre);
  const platform = useGameQueryStore((s) => s.gameQuery.platform);
  const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;
  return (
    <Heading as="h1" marginBottom={4} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default GameHeading;
