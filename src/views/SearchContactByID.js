import { useState, useEffect } from "react";

const SearchContactByID = () => {
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [allData, setAllData] = useState([]);

  const handleSearch = async () => {
    try {
      const url = `http://trungtamdaotaolaixebinhduong.com:8080/api/admin/contact/${searchId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const responseData = await response.json();
      setSearchResult(responseData);
      setShowResult(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    setShowResult(false);
    setSearchResult(null);
    setAllData([]);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const url =
          "http://trungtamdaotaolaixebinhduong.com:8080/api/admin/contact";

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const responseData = await response.json();
        setAllData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="searchByID">
      Tìm kiếm tài khoản theo ID:
      <input
        type="text"
        placeholder="Nhập ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={handleSearch}>Tìm kiếm</button>
      {showResult && <button onClick={handleReset}>Trở về</button>}
      {searchResult && showResult && (
        <div>
          <p>ID: {searchResult.id}</p>
          <p>Name: {searchResult.name}</p>
          <p>Email: {searchResult.email}</p>
          {/* Hiển thị các thông tin khác cần thiết */}
        </div>
      )}
      {!searchResult && !showResult && (
        <div>
          {/* Hiển thị toàn bộ dữ liệu */}
          {allData.map((item) => (
            <div key={item.id}>
              <p>ID: {item.id}</p>
              <p>Name: {item.name}</p>
              <p>Email: {item.email}</p>
              {/* Hiển thị các thông tin khác cần thiết */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchContactByID;
