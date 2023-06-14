import React, { useState, useEffect } from "react";

const FormSearchStudent = () => {
  const accessToken = localStorage.getItem("token");

  const [searchId, setSearchId] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  const [searchResult, setSearchResult] = useState([]);

  const [data, setData] = useState([]);

  const handleSearch = async () => {
    try {
      const url = `http://trungtamdaotaolaixebinhduong.com:8080/api/admin/account/${searchId}`;

      if (searchId === "") {
        setSearchResult(data);
        setIsSearching(true);
      } else {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const responseDataSearchByID = await response.json();
        console.log("API response:", responseDataSearchByID);

        // Gán dữ liệu vào biến state searchResult
        if (responseDataSearchByID) {
          setSearchResult([responseDataSearchByID]);
          setIsSearching(true);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const renderData = isSearching ? searchResult : data;
  const handleReset = () => {
    setSearchId("");
    setSearchResult([]);
    setIsSearching(false);
  };
  return (
    <div className="searchByID">
      Tìm kiếm học viên theo ID:
      <input
        className="input-searchByID"
        type="text"
        placeholder="Nhập ID học viên"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Tìm kiếm
      </button>
      {isSearching && (
        <button className="reset-button" onClick={handleReset}>
          Trở về
        </button>
      )}
    </div>
  );
};
export default FormSearchStudent;
