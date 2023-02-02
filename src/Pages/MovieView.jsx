import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DynamicStar } from "react-dynamic-star";
import {
  BsFillCalendar2DateFill,
  BsBookmarkCheck,
  BsBookmarkCheckFill,
} from "react-icons/bs";
import { MdOutlineAccessTimeFilled, MdMergeType } from "react-icons/md";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddBookMark } from "../redux/slices/bookMarkSlice";

const MovieView = () => {
  const dispatch = useDispatch();
  const { data: BookData } = useSelector((state) => state.BookMarkSlice);
  console.log(BookData, "BookData");
  const [cast, setCast] = useState([]);
  const [season, setSeason] = useState([]);
  const [episode, setEpisode] = useState([]);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const data = location.state;

  const FetchMovieDetails = async () => {
    const URL = `https://api.tvmaze.com/shows/${
      data?.id || data?.show?.id
    }/cast`;
    try {
      const res = await axios.get(URL);
      setCast(res.data);
    } catch (error) {}
  };
  const FetchSeasonList = async () => {
    const URL = `https://api.tvmaze.com/shows/${
      data?.id || data?.show?.id
    }/seasons`;
    try {
      const res = await axios.get(URL);
      setSeason(res.data);
    } catch (error) {}
  };
  const FetchEpisodeList = async (item) => {
    const URL = `https://api.tvmaze.com/seasons/${
      item?.id || item?.show?.id
    }/episodes`;
    try {
      const res = await axios.get(URL);
      setEpisode(res.data);
      setShow(true);
    } catch (error) {}
  };

  const AddBookMarking = (data) => {
    dispatch(AddBookMark(data));
  };

  useEffect(() => {
    FetchMovieDetails();
    FetchSeasonList();
  }, []);

  return (
    <div className="pt-32 max-w-[1500px] mx-auto">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="m-2 md:m-0">
          <img
            className="w-full"
            src={data?.image?.original || data?.show?.image.original}
            alt=""
          />
        </div>
        <div className="m-2 md:m-0">
          <div className="flex shadow-md rounded-md px-4 py-2 bg-white items-center justify-between ">
            <h2 className="font-bold text-2xl">
              {data?.name || data?.show?.name}{" "}
              <span className="text-red-500 text-normal">
                ({data?.rating?.average || data?.show?.rating?.average})
              </span>
            </h2>
            <div className="-mb-16 mt-2">
              <DynamicStar
                outlined={true}
                width={30}
                rating={
                  data?.rating?.average / 2 || data?.show?.rating?.average / 2
                }
              />
            </div>
          </div>
          <div className="flex mt-3 items-center space-x-5">
            <span className="flex bg-white rounded-md shadow-md p-2 items-center space-x-4 text-base">
              <BsFillCalendar2DateFill />
              <h2>{data?.premiered || data?.show?.premiered}</h2>
            </span>
            <span className="flex bg-white rounded-md shadow-md p-2 items-center space-x-4 text-base">
              <MdOutlineAccessTimeFilled className="text-lg" />
              <h2>{data?.runtime || data?.show?.runtime} Min</h2>
            </span>
            <span className="flex bg-white rounded-md shadow-md p-2 items-center space-x-4 text-base">
              <MdMergeType className="text-lg" />
              <h2>{data?.language || data?.show?.language}</h2>
            </span>
            <span
              onClick={() => AddBookMarking(data.show ? data.show : data)}
              className={`flex ${
                BookData &&
                BookData?.find(
                  (item) => item.id === (data?.id || data?.show?.id)
                )
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }
               
               cursor-pointer hover:scale-95 duration-300 rounded-md shadow-md p-2 items-center space-x-4 text-base`}
            >
              {BookData &&
              BookData?.find(
                (item) => item.id === (data?.id || data?.show?.id)
              ) ? (
                <BsBookmarkCheckFill />
              ) : (
                <BsBookmarkCheck className="text-lg" />
              )}
              <h2>BookMark</h2>
            </span>
          </div>
          {/* Description */}
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{
              __html: data?.summary || data?.show?.summary,
            }}
          />
          {/* Cast & Crew */}
          <div className="grid mt-4 grid-cols-2 md:grid-cols-3 gap-4">
            {cast?.map((item) => {
              return (
                <div className="flex bg-white space-x-4 p-2 shadow-md rounded-md items-center">
                  <img
                    className="w-20 rounded-full h-20"
                    src={item?.person.image?.medium}
                    alt=""
                  />
                  <div className="">
                    <h2 className="font-semibold">{item?.person?.name}</h2>
                    <h2>{item?.person?.birthday}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Season List */}
      <div className="mt-5 bg-white p-3 rounded-md shadow-md">
        <h2 className="font-semibold text-3xl mb-3">Season List</h2>
        <div className=" grid md:grid-cols-6 grid-cols-2 gap-4">
          {season?.map((item) => {
            return (
              <div
                onClick={() => FetchEpisodeList(item)}
                className="relative cursor-pointer"
              >
                <img
                  className="rounded-md shadow-md hover:scale-105 duration-300"
                  src={
                    item?.image?.medium ||
                    item?.image?.original ||
                    "https://dummyimage.com/540x720/f2cbf2/fff"
                  }
                  alt=""
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white w-8 h-8  flex justify-center items-center font-semibold rounded-full">
                  <h2>{item?.episodeOrder}</h2>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {show && (
        <div className="mt-5 mb-20">
          <h2 className="font-semibold text-2xl mb-3">Episode List</h2>
          <div className="grid  md:grid-cols-4 grid-cols-1 gap-6">
            {episode.map((item) => {
              return (
                <div className="relative border rounded-md bg-white shadow-md">
                  <img
                    className="rounded-md w-full"
                    src={
                      item?.image?.medium ||
                      "https://dummyimage.com/540x720/f2cbf2/fff"
                    }
                    alt=""
                  />
                  <h2 className="absolute bg-red-500 text-white text-xs px-2 py-0.5 rounded-md tracking-wide top-2 left-2">{`Season ${item?.season}`}</h2>
                  <div className="">
                    <div className="p-3 flex justify-between items-center">
                      <h2 className="bg-blue-500 text-white px-2 rounded-sm tracking-wide py-0.5 text-sm">
                        Episode - {item?.number}
                      </h2>
                      <h2 className="font-medium">
                        {item?.name?.slice(0, 20)}
                      </h2>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieView;
