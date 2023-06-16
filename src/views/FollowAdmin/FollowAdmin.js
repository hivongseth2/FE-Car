import React, { useEffect, useState } from "react";
import MainLayoutAdmin from "../Dashboard/MainLayoutAdmin";
import "../../styles/DashboardScss/TableStudent.scss";
import "./FollowAdmin.scss";
import axios from "axios";

const FollowAdmin = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState();
  const [totalPage, setTotalPage] = useState();
  const [degree, setDegree] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [selectedDegree, setSelectedDegree] = useState(-1);
  const [isDegree, setIsDegree] = useState(false);
  const [urlDegree,setUrlDegree] = useState("")
  const[isSearch,setIsSearch] = useState(false)
  const params = {
    filter: inputSearch,
    page: 0,
    size: 10
  };
  const url = 'http://trungtamdaotaolaixebinhduong.com:8080/api/admin/follow';


// ========config default


  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json'
    },
    params
  };
  // =========config của Search Degree
  const paramsDe = {
    'degree-id': selectedDegree,
    filter: inputSearch,
    page: 0,
    size: 10
  };
  
  const configDe = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json'
    },
    paramsDe
  };

  const handleDegreeChange = (e) => {
    setInputSearch("");
    setSelectedDegree(e.target.value);
    console.log(selectedDegree)
  };
  // ============
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDegree();
  }, []);


useEffect(() => {
  if (selectedDegree == -1) {
    setIsDegree(false);
  } else {
    setIsDegree(true);
    setUrlDegree(
      `http://trungtamdaotaolaixebinhduong.com:8080/api/admin/follow/by-degree?degree-id=${selectedDegree}`
    );
  }
}, [selectedDegree]);


useEffect(() => {
  if (!isDegree) {
    fetchData();
  } else {
    fetchFollowByDegree();
  }
}, [isDegree, urlDegree]);
// ==========================fetch data
  const fetchData = () => {
    axios.get(url, config)
    .then(response => {
      setData(response.data.data);
      setTotalPage(response.data.totalPages);
      setCurrentPage(response.data.currentPage + 1);
      console.log(currentPage);
    })
      .catch((error) => {
        console.error(error);
      });
  };
//=============fetch loại bằng
  const fetchDegree = () => {
    axios
      .get("http://trungtamdaotaolaixebinhduong.com:8080/api/degree?size=10", {})
      .then((response) => {
        setDegree(response.data.data);
        console.log("loai bang", degree);
      })
      .catch((error) => {
        console.error(error);
      });
  };
//=================fetch follow loại bằng
  const fetchFollowByDegree = () => {
    axios
      .get(
        urlDegree,configDe
        
      )
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  // ==================== fetch data search


  const handleInputSearch = (e) => {

    setInputSearch(e.target.value);

    
  };


  const handleClickSearch = () => {
    console.log(isDegree)
    if (isDegree===false) {
      console.log("135",isDegree)
      fetchData();
    } else {
      setUrlDegree(`http://trungtamdaotaolaixebinhduong.com:8080/api/admin/follow/by-degree?degree-id=${selectedDegree}&filter=${inputSearch}`

      );
    }
  };
  useEffect(() => {
    if (!isDegree) {
      fetchFollowByDegree();
    }
  }, [urlDegree]);
  
 
  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <h1>Quản lý theo dõi học viên</h1>
          <button>Thêm Slider mới</button>

          {/* {isFormOpen && <AddSlide onClose={handleFormClose} />} */}
        </div>
      </div>

      <div class="s131">
        <form>
          <div class="inner-form">
            <div class="input-field first-wrap">
              <input
                id="search"
                type="text"
                value={inputSearch}
                onChange={(e) => handleInputSearch(e)}
                placeholder="Nhập thông tin học viên?"
              />
            </div>
            <div class="input-field third-wrap">
              <button class="btn-search" type="button" onClick ={ () =>{handleClickSearch()}}>
                SEARCH
              </button>
            </div>
            <h3>Filter</h3>
            <div class="input-field second-wrap">
              <div className="input-select">
                <select
                  data-trigger=""
                  name="choices-single-defaul"
                  className="fieldSelect"
                  onChange={handleDegreeChange}
                >
                  <option value="-1" key={-1}>Tất cả</option>
                  {degree.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.rating}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>

      <table className="striped-table-info">
        <thead>
          <tr>
            {/* <th>Mã học viên</th> */}
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Loại bằng</th>
            <th>Khóa học</th>
            <th>Giờ chạy DAT</th>
            <th>Giờ chạy đêm</th>
            <th>Giờ chạy tự động</th>
            <th>Số km DAT</th>
            <th>Điểm lý thuyết</th>
            <th>Điểm mô phỏng</th>
            <th>Giáo viên </th>
            <th>Ghi chú</th>
            <th className="text-center-info">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={`${item.id.student.id} ${item.id.degree.id} `}
              className="rowFollow"
            >
              {/* <td>{item.id.student.id}</td> */}
              <td>{item.id.student.fullName}</td>
              <td>{item.id.student.phoneNumber}</td>
              <td>{item.id.degree.rating}</td>
              <td>{item.course}</td>

              <td>{item.hoursRunningDAT}</td>
              <td>{item.nightRunningHours}</td>
              <td>{item.automaticRunningHours}</td>
              <td>{item.kmDAT}</td>

              <td>{item.theotyTestScore}</td>
              <td>{item.simulatedTestScore}</td>
              <td>{item.teacher}</td>
              <td>{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="TotalPageContainer">
        <ul className="TotalPage">
          {Array.from({ length: totalPage }, (_, index) => (
            <li
              key={index}
              className={
                index + 1 === currentPage
                  ? "TotalPageItem current"
                  : "TotalPageItem"
              }
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* </div> */}
    </MainLayoutAdmin>
  );
};

export default FollowAdmin;
