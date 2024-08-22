import React from "react";

const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <p>예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
    </div>
  );
};

export default ErrorPage;
