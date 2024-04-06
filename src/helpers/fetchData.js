import { getSession } from "next-auth/react";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import axios from "@/lib/axios";

const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHQL;

const fetchData = async (query, { variables = {} }) => {
  const session = await getSession(authOptions);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer RXkNf3iCBakaU0am8viYoQzCN2Xge1U5`,
  };

  console.log("session here is ... ", session);
  console.log("query here is ... ", query);
  console.log("variables here is ... ", variables);

  // const res = await axios.post('/graphql', {
  const res = await fetch(graphQLAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.jwt}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors);
  }

  return json;
};

export default fetchData;
