import axios from "axios";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getData } from "../redux/slices/searchSlice";
import BookMarkSide from "../Components/BookMarkSide";

const Header = () => {
  const [input, setInput] = useState("");
  const { data: BookData } = useSelector((state) => state.BookMarkSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SearchAPI = async (e) => {
    e.preventDefault();
    const URL = `https://api.tvmaze.com/search/shows?q=${input}`;
    try {
      const res = await axios.get(URL);
      dispatch(getData(res.data));
    } catch (error) {}
  };
  const handleClick = () => {
    dispatch(getData(""));
    navigate("/");
    setInput("")
  };

  return (
    <>
      <div className="bg-white  fixed w-full z-50">
        <section className="mx-10   mx-auto">
          <nav class="flex items-center justify-between flex-wrap bg-teal p-6">
            <div class="flex items-center flex-no-shrink text-black mr-6">
              <h2
                onClick={handleClick}
                class="font-semibold cursor-pointer text-xl tracking-tight"
              >
                TV MAZE
              </h2>
            </div>
            <div className="flex items-center space-x-10">
              <form
                onSubmit={SearchAPI}
                className="bg-gray-100 border border-gray-300 justify-between flex items-center rounded-md p-2 md:w-72"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search Movie Here..."
                  className="bg-transparent px-3 outline-none w-full"
                  name=""
                  id=""
                />
                <BiSearch
                  type="submit"
                  onClick={SearchAPI}
                  className="text-xl text-gray-500"
                />
              </form>
              {BookData.length > 0 && (
                <div
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                  className="flex items-center space-x-3 bg-blue-500 text-white p-2 rounded-md shadow-md cursor-pointer hover:scale-95 duration-300 px-3 font-medium"
                >
                  <h2>BookMark - </h2>
                  <h2>{BookData?.length}</h2>
                </div>
              )}
            </div>
          </nav>
        </section>
      </div>
      <BookMarkSide />
    </>
  );
};

export default Header;
