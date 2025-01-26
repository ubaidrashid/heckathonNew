import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import useFetch from "../../hooks/useFetch";

function PropertyList() {
  const { data, loading, error } = useFetch("/hotels/countByType");

  if (loading) return <div className="text-center text-light-green">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  const images = [
    "https://thumbs.dreamstime.com/b/hotel-room-19941721.jpg",
    "https://media.istockphoto.com/id/1398814566/photo/interior-of-small-apartment-living-room-for-home-office.jpg?s=612x612&w=0&k=20&c=8clwg8hTpvoEwL7253aKdYAUuAp1-usFOacNR5qX-Rg=",
    "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?cs=srgb&dl=pexels-pixabay-261169.jpg&fm=jpg",
    "https://t3.ftcdn.net/jpg/03/35/26/84/360_F_335268468_WhuECjWCoOfQOovIMq7VASxI0imSrnTE.jpg",
    "https://media.istockphoto.com/id/93463536/photo/log-cabin-in-the-forest.jpg?s=612x612&w=0&k=20&c=IbmnfgsVh77KdM2XLIz-pjWXRs1hlkBEoEzxpk41F6U="
  ];

  return (
    <>
      {/* Container for property cards */}
      <div className="flex w-full justify-between flex-wrap gap-6 dark:text-light-green">
        {data &&
          images.map((img, i) => (
            <Card
              key={i}
              img={img}
              text={data[i]?.type}
              desc={`${data[i]?.count}+ properties`}
            />
          ))}
      </div>
    </>
  );
}

export default PropertyList;

const Card = ({ img, text, desc }) => {
  return (
    <div className="w-1/6 flex flex-col justify-center items-center gap-4 bg-gray-800 rounded-3xl p-4 shadow-lg">
      <img
        src={img}
        alt=""
        className="h-32 w-full rounded-3xl object-cover border border-light-green"
      />
      <div className="text-center">
        <h1 className="font-bold text-xl">{text}</h1>
        <p className="text-light-green">{desc}</p>
      </div>
    </div>
  );
};
