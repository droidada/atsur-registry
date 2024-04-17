import { useRouter } from "next/router";
import React from "react";

interface Props {
  userIsRegistered: boolean;
  type: string;
  inviter: { firstName: string; lastName: string };
  token: string;
}
const NotAuthScreen = ({ userIsRegistered, type, inviter, token }: Props) => {
  const router = useRouter();
  return (
    <div className="container mx-auto flex flex-col items-center gap-5 p-10 min-h-screen">
      <h2>Invitation</h2>
      <p>
        {inviter?.firstName} {inviter?.lastName} invited you to join{" "}
        {type === "user" ? "our platform" : ""}
      </p>

      {!userIsRegistered ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push(`/signup?token=${token}`)}
        >
          Register to accept
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push(`/login?token=${token}`)}
        >
          Login to accept
        </button>
      )}
    </div>
  );
};

export default NotAuthScreen;
