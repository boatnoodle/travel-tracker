import React from "react";

export interface RatingProps {
  value: string;
  onChange: (rate: string) => void;
}

export const Rating = (props: RatingProps) => {
  const { value, onChange } = props;

  const ratingScores = ["แย่มาก", "ไม่ดี", "ปานกลาง", "ดี", "ยอดเยี่ยม"];
  console.log("value =", value);

  return (
    <div className="flex justify-evenly">
      {ratingScores.map((score, index) => {
        return (
          <div className="flex w-[55px] flex-col items-center gap-1">
            <button
              className={`h-5 w-5 rounded-full border-[1px] border-gray-800 ${
                value === `${index + 1}` ? "bg-gray-300" : ""
              } text-center text-sm active:bg-gray-800`}
              onClick={() => {
                onChange(`${index + 1}`);
              }}
            >
              {index + 1}
            </button>
            <p className="text-sm text-gray-800">{score}</p>
          </div>
        );
      })}
    </div>
  );
};
