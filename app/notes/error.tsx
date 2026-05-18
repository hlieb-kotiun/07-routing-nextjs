"use client";

interface ErrorProps {
  error: Error;
}

const error = ({ error }: ErrorProps) => {
  return <p>Could not fetch the list of notes. {error.message}</p>;
};
export default error;
