import { useState } from "react";

function GlobalError({ statusCode }) {
  const [error, setError] = useState(null);
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on the server ---ADA`
        : "An error occurred on the client ---ADA"}
    </p>
  );
}

GlobalError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default GlobalError;
