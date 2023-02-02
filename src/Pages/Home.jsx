import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  const [filteredData, setFilteredData] = useState([]);
  const { data } = useSelector((state) => state.SearchSlice);
  const [load, setLoad] = useState({
    showsLoad: false,
  });
  const FetchShows = async () => {
    setLoad({ ...load, showsLoad: true });
    try {
      const res = await axios.get("https://api.tvmaze.com/shows");
      const genres = [];
      res.data.map((item) => {
        genres.push(...item.genres);
      });
      const arr = new Set(genres);
      const newArr = [];
      for (const item of arr) {
        newArr.push(item);
      }
      const b = newArr.map((genItem) => {
        const a = res.data.filter((items) => items.genres.includes(genItem));
        return { [genItem]: a };
      });
      setFilteredData(b);
      setLoad({ ...load, showsLoad: false });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchShows();
  }, []);

  return (
    <>
      <div className="md:mx-auto md:pt-28 md:mx-10">
        {data ? (
          <ProductCard shows={data} loading={load.showsLoad} />
        ) : (
          filteredData.map((num, index) => {
            for (const key in num) {
              return (
                <div key={index} className="md:pt-28 pt-16 mx-2 md:mx-10">
                  <h2 className="font-bold text-2xl pb-3 ml-3">{key}</h2>
                  <ProductCard shows={num[key]} loading={load.showsLoad} />
                </div>
              );
            }
          })
        )}
      </div>
    </>
  );
};

export default Home;
