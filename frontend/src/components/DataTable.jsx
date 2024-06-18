import React, { useState } from "react";
import Select from "react-select";
import useFetch from "../hooks/useFetch";
import "../css/DataTable.css";

export default function DataTable() {
  //for users
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useFetch("/users.json");
  //for subscriber
  const {
    data: subsData,
    loading: subsLoading,
    error: subsError,
  } = useFetch("/subscriptions.json");
  // Merge data based on matching user_id and id
  const mergedData = usersData.map(user => {
    const subscription = subsData.find(
      sub => sub.user_id === user.id.toString()
    );
    return {
      ...user,
      package: subscription ? subscription.package : "N/A",
    };
  });
  console.log(mergedData);
  const [filterName, setFilterName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  if (usersLoading || subsLoading) {
    return <div>Loading...</div>;
  }

  if (usersError) {
    return <div>Error loading users: {usersError.message}</div>;
  }

  if (subsError) {
    return <div>Error loading subscriptions: {subsError.message}</div>;
  }

  // Generate country options for the dropdown
  const countryOptions = Array.from(
    new Set(usersData.map(item => item.country))
  ).map(country => ({
    value: country,
    label: country,
  }));

  // Generate status options for the dropdown
  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
  ];

  // Filter data based on name, country, and status
  const filteredData = mergedData.filter(item => {
    const matchesName = item.fullName
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const matchesCountry = selectedCountry
      ? item.country === selectedCountry.value
      : true;
    const matchesStatus =
      selectedStatus !== null ? item.active === selectedStatus.value : true;
    return matchesName && matchesCountry && matchesStatus;
  });
  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  //   /change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  //user list clicked
  const userListClicked = selectedUserFromList => {
    setSelectedUser(selectedUserFromList);
    setShow(true);
  };
  // userdetail btn
  const userDetailClose = () => {
    setShow(!show);
  };
  console.log(show);
  return (
    <div className="user-container">
      <div className="user-filter">
        <div className="user-h1">All Users</div>
        <div className="user-option">
          <div className="user-search">
            <input
              type="text"
              placeholder="Name...."
              value={filterName}
              onChange={e => {
                setFilterName(e.target.value);
                paginate(1);
              }}
              className="search-input"
            />
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </div>
          <div className="user-country">
            <Select
              options={countryOptions}
              onChange={selectedOption => {
                setSelectedCountry(selectedOption);
                paginate(1);
              }}
              placeholder="Country"
              isClearable
            />
          </div>
          <div className="user-status">
            <Select
              options={statusOptions}
              onChange={selectedOption => {
                setSelectedStatus(selectedOption);
                paginate(1);
              }}
              placeholder="Status"
              isClearable
            />
          </div>
        </div>
      </div>
      <div className="user-list">
        <div className="user-lhead user-head-bg">
          <div className="user-ltitle">S.No.</div>
          <div className="user-lname">name</div>
          <div className="user-lemail">email</div>
          <div className="user-laddress">address</div>
          <div className="user-lcountry">country</div>
          <div className="user-lpackage">package</div>
          <div className="user-lstatus">status</div>
        </div>
        {currentItems.map((item, index) => (
          <div
            className="user-lhead user-lmain"
            style={{ color: item.active ? "#036303" : "#a30000" }}
            onClick={() => userListClicked(item)}>
            <div className="user-ltitle">
              {(currentPage - 1) * itemsPerPage + index + 1}.
            </div>
            <div className="user-lname">{item.fullName}</div>
            <div className="user-lemail">{item.email}</div>
            <div className="user-laddress">{item.address}</div>
            <div className="user-lcountry">{item.country}</div>
            <div className="user-lpackage">{item.package}</div>
            <div className="user-lstatus">
              {item.active ? "Active" : "Inactive"}
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        <button
          className="pagi-first"
          onClick={() => paginate(1)}
          disabled={currentPage === 1}>
          {1}
        </button>
        <button
          className="pagi-prev fa-solid fa-chevron-left"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}></button>

        <span>{currentPage}</span>
        <button
          className="pagi-next fa-solid fa-chevron-right"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}></button>
        <button
          className="pagi-last"
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages}>
          {totalPages}
        </button>
      </div>

      {/* userDetail */}
      {show && selectedUser ? (
        <div className="user-detail">
          <div className="user-detail-head">
            User's Detail
            <div
              className="user-close-btn fa-solid fa-xmark"
              onClick={userDetailClose}></div>
          </div>
          <div className="user-detail-main">
            <div className="ud-grid">
              <div>
                <span className="ud-type">User Id :</span> {selectedUser.id}
              </div>
              <div>
                <span className="ud-type">Package :</span>{" "}
                {selectedUser.package}
              </div>
            </div>
            <div className="ud-grid-name">
              <div>
                <div className="ud-type">First :</div>
                <div>{selectedUser.first_name} </div>
              </div>
              <div>
                <div className="ud-type">middle :</div>
                <div>{selectedUser.middle_name} </div>
              </div>
              <div>
                <div className="ud-type">last :</div>
                <div>{selectedUser.last_name} </div>
              </div>
            </div>
            <div className="ud-email">
              <span className="ud-type">email : </span>
              {selectedUser.email}
            </div>
            <div className="ud-password">
              <span className="ud-type">Password : </span>
              {selectedUser.password}
            </div>
            <div className="ud-add">
              <span className="ud-type">address : </span>
              {selectedUser.address}
            </div>
            <div className="ud-country">
              <span className="ud-type">Country : </span>
              {selectedUser.country}
            </div>
            <div
              className="ud-status"
              style={{ color: selectedUser.active ? "#036303" : "#a30000" }}>
              <span className="ud-type">Status : </span>
              {selectedUser.active ? "Active" : "Inactive"}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
