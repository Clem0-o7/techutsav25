"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import { useMediaQuery } from "@mui/material";

const CardSkeleton = ({ cards }) => {
  const mobileCheck = useMediaQuery("(min-width: 600px)");
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5" key={i}>
        <div
          className={`${
            mobileCheck ? "h-[500px] p-7" : "h-[350px] p-4"
          } lg:w-full w-5/6 border-2 border-black/35 rounded-md flex flex-col gap-6 items-center cursor-pointer transition-transform duration-300 aspect-[1/1] text-center`}
        >
          <div>
            <Skeleton circle width={mobileCheck ? 130 : 90} height={mobileCheck ? 130 : 90} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton height={20} width={mobileCheck ? "100%" : "80%"} />
            <Skeleton height={20} width={mobileCheck ? "100%" : "70%"} />
            <Skeleton height={20} width={mobileCheck ? "100%" : "60%"} />
            <Skeleton height={20} width={mobileCheck ? "100%" : "50%"} />
            <Skeleton width={mobileCheck ? 200 : 150} height={35} className="mt-4" />
          </div>
        </div>
      </SkeletonTheme>
    ));
};

export default CardSkeleton;
