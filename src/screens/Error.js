import { useRouteError } from "react-router-dom";
import Wrapper from "../utilities/wrapper";
import "./Error.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Wrapper>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          Error Message <i>{error.statusText || error.message}</i>
        </p>
        <a href="/">Go back</a>
      </div>
    </Wrapper>
  );
}
