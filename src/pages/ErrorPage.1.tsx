import { Text, Heading } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <Heading>Oops...</Heading>

      <Text>
        {isRouteErrorResponse(error)
          ? "This page does not exist."
          : "Sorry, an unexpected error has occurred."}
      </Text>
    </>
  );
};
