import { useState, FormEvent } from "react";
import { toast } from "react-toastify";

import { authApi } from "../../api-client";
import { MapParameter } from "../../models";
export interface ISearchProps {
  setViewState: ({ latitude, longitude, zoom }: MapParameter) => void;
}

export default function Search({ setViewState }: ISearchProps) {
  const [isSearch, setIsSearch] = useState(false);
  const [isDistance, setIsDistance] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleChangeSearchInput = (e: FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };
  const handleOnClickSearch = async () => {
    if (!isSearch) {
      setIsSearch(true);
    } else if (searchInput.length === 0) {
      toast.warning("Vui lòng nhập địa chỉ bạn nhé", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      try {
        const locationSearch = await authApi.getLocation(searchInput);
        setViewState({
          latitude: Number(locationSearch.data.features[0].center[1]),
          longitude: Number(locationSearch.data.features[0].center[0]),
          zoom: 15,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div
        className={
          isSearch
            ? "w-[340px] h-[40px] bg-pink-500 absolute z-10 duration-1000 ease-out top-3 left-3 rounded-[999px] overflow-hidden"
            : "w-[40px] h-[40px] bg-pink-500 absolute z-10 duration-1000 top-3 left-3 ease-in overflow-hidden rounded-[999px]"
        }
      >
        <input
          className={
            isSearch
              ? "w-[200px] relative top-[-10px] left-[20px] bg-pink-500 duration-1000 ease-out border-none outline-none text-white placeholder:text-white placeholder:duration-1000 placeholder:ease-out"
              : "w-0 duration-1000 ease-in relative top-[-25%] left-[20px]"
          }
          type="text"
          placeholder={isDistance ? "Điểm đi" : "Tìm kiêm"}
          value={searchInput}
          onChange={handleChangeSearchInput}
        />

        <button
          className={
            isSearch
              ? "relative w-[40px] h-[40px] top-0 left-[20px] bg-pink-500 hover:cursor-pointer hover:opacity-70"
              : "relative w-[40px] h-[40px] top-0 left-0 bg-pink-500 hover:cursor-pointer hover:opacity-70"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-7 h-7 text-white m-auto"
            onClick={() => handleOnClickSearch()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <button
          className="relative w-[40px] h-[40px] top-0 left-[20px] bg-pink-500 hover:cursor-pointer hover:opacity-70"
          onClick={() => setIsDistance(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-7 h-7 text-white m-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            />
          </svg>
        </button>
        <button
          className="relative w-[40px] h-[40px] top-0 left-[20px] bg-pink-500 hover:cursor-pointer hover:opacity-70"
          onClick={() => {
            setIsSearch(false);
            setIsDistance(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-7 h-7 text-white m-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div
        className={
          isDistance
            ? "w-[280px] h-[40px] bg-pink-500 absolute z-10 duration-900 ease-out top-16 left-3 rounded-[999px] overflow-hidden"
            : "w-[0] absolute z-10 duration-1000 top-16 left-3 ease-in overflow-hidden rounded-[999px]"
        }
      >
        <input
          className={
            isDistance
              ? "w-[220px] relative top-[-8px] left-[20px] bg-pink-500 duration-1000 ease-out border-none outline-none text-white placeholder:text-white placeholder:duration-1000 placeholder:ease-out"
              : "w-0 duration-900 ease-in relative top-[-25%] left-[20px]"
          }
          type="text"
          placeholder={isDistance ? "Điểm đến" : ""}
        />

        <button
          className={
            isDistance
              ? "relative w-[40px] h-[40px] top-0 left-[20px] bg-pink-500 hover:cursor-pointer hover:opacity-70 duration-1000 ease-out"
              : "hidden duration-900 ease-in"
          }
          onClick={() => {
            setIsDistance(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-7 h-7 text-white m-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
