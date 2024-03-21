import { useState } from "react";

function Error({ statusCode }) {
  const [error, setError] = useState(null);
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on the server ---ADA`
        : "An error occurred on the client ---ADA"}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
