import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveBookMark } from "../redux/slices/bookMarkSlice";

const BookMarkSide = () => {
  const dispatch = useDispatch();
  const { data: BookData } = useSelector((state) => state.BookMarkSlice);
  const RemoveBookMarking = (data) => {
    dispatch(RemoveBookMark(data));
  };

  return (
    <>
      <div
        class="offcanvas offcanvas-end fixed bottom-0 flex flex-col max-w-full bg-white invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 right-0 border-none w-96"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header mt-28 flex items-center justify-between p-4">
          <div className="w-full space-y-4">
            {BookData &&
              BookData.map((e) => {
                return (
                  <div className="flex w-full space-x-3 border border-gray-300 shadow-md p-2 bg-orange-100 rounded-md">
                    <img
                      className="w-24 rounded-md h-24"
                      src={e?.image?.medium}
                      alt=""
                    />
                    <div className="flex w-full flex-col justify-between">
                      <h2 className="text-lg font-medium ">{e?.name}</h2>
                      <button
                        onClick={() => RemoveBookMarking(e)}
                        className="w-full bg-black text-white rounded-md py-0.5"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          className="bg-black m-2 text-center text-white p-2 rounded-md cursor-pointer"
        >
          Close
        </div>
      </div>
    </>
  );
};

export default BookMarkSide;
