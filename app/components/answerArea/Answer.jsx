import { Text } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

const Answer = ({ con, loader }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [con]);

  return (
    <div ref={ref} className="">
      <div className="flex flex-end m-[auto]">
        {con.question ? (
          <p className="p-2 my-3 rounded-[15px] m-auto bg-[#6841EA] text-[#fff] text-[18px] flex justify-end text-right w-[100%]">
            {" "}
            {con.question}
          </p>
        ) : (
          ""
        )}
      </div>

      {loader ? <span className="loader"></span> : <Text>{`${con.bot}`}</Text>}
    </div>
  );
};

export default Answer;
