import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ shows, loading }) => {
  const navigate = useNavigate();

  return (
    <>
      <section className=" ">
        <div className="md:mx-auto flex  overflow-y-hidden  overflow-x-auto space-x-5">
          {!loading ? (
            shows?.map((item) => {
              return (
                <article
                  key={item?.id || item?.show?.id}
                  className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl"
                >
                  <div className="w-60">
                    <div className="relative flex items-end overflow-hidden rounded-xl">
                      <img
                        className="h-72 w-full"
                        src={
                          item?.image?.original || item?.show?.image?.original
                        }
                        alt=""
                      />
                      <h2 className="absolute top-2 left-2 text-xs bg-yellow-700 text-white px-1 py-0.5 rounded">
                        Regular
                      </h2>
                    </div>

                    <div className="mt-1 p-2">
                      <div className="flex justify-between items-center">
                        <h2 className="text-slate-700 font-semibold text-lg">
                          {item?.name?.slice(0, 15) ||
                            item?.show?.name?.slice(0, 15)}
                        </h2>
                        <div className="flex items-center space-x-2 bg-red-500 text-white text-xs py-0.5 rounded px-2">
                          <AiFillStar />
                          <h2 className="font-medium">
                            {item?.rating?.average ||
                              item?.show?.rating?.average}
                          </h2>
                        </div>
                      </div>

                      <div className="flex hover:scale-105 duration-300 item-center justify-center bg-blue-500 cursor-pointer text-white rounded-md p-1 mt-4">
                        <div
                          onClick={() =>
                            navigate(
                              `/show/${item?.name
                                ?.toLowerCase()
                                .replace(/\s+/g, "-") || item?.show?.name
                                ?.toLowerCase()
                                .replace(/\s+/g, "-")}`,
                              { state: item }
                            )
                          }
                        >
                          {" "}
                          View Detail
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <h2>Loading.....</h2>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductCard;
