import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import allActions from "../../../redux/actions";
import styles from "./AdminDashboardUI.module.css";

const AdminDashboardUI = () => {
  const [hamburg, setHamburg] = useState(false);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const adminUpdatedData = useSelector(
    (state) => state?.getuserposts?.postItems?.users?.data
  );

  const managerData = adminUpdatedData?.filter((arr) => {
    return arr.roles[0].name === "manager";
  });

  const userData = adminUpdatedData?.filter((arr) => {
    return arr.roles[0].name === "user";
  });

  useEffect(() => {
    dispatch(allActions.getUserData.getUserPost());
    // eslint-disable-next-line
  }, []);

  const clickHandler = () => {
    if (hamburg === false) {
      setHamburg(true);
    } else {
      setHamburg(false);
    }
  };

  const onDelete = (id) => {
    dispatch(allActions?.deleteusers?.deleteUser(id));
  };

  const onLogout = () => {
    localStorage.clear();
  };

  // todo: exporting logic fix errors
  // const headers = [
  //   { label: "First Name", key: "firstName" },
  //   { label: "Last Name", key: "lastName" },
  //   { label: "Email", key: "email" },
  // ];

  // const csvReport = {
  //   data: adminUpdatedData,
  //   headers: headers,
  //   filename: "UsersDetail.csv",
  // };

  return (
    <div className={styles.dashboard_wrapper}>
      <div className={styles.navbar_wrapper}>
        <div className={styles.logo_wrapper}>
          <h2>Dashboard</h2>
        </div>
        <div className={styles.menuItem_wrapper}>
          <button className={styles.create_btn}>
            <Link to="/signup/:id" className={styles.create_manager}>
              Create Manager
            </Link>
          </button>
          <button className={styles.create_btn}>
            <Link to="/create/:id" className={styles.create_manager}>
              Create User
            </Link>
          </button>
          <Link to="/">
            <button className={styles.logout_btn} onClick={onLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </Link>
          <button className={styles.humberg_button} onClick={clickHandler}>
            <span
              className={
                hamburg === false ? `${styles.topbar}` : `${styles.topbarcross}`
              }
            ></span>
            <span
              className={
                hamburg === false ? `${styles.midbar}` : `${styles.midbarcross}`
              }
            ></span>
            <span
              className={
                hamburg === false
                  ? `${styles.bottombar}`
                  : `${styles.bottombarcross}`
              }
            ></span>
          </button>
          {hamburg === true ? (
            <div className={styles.absolute_wrapper}>
              <div className={styles.absolute_wrapper_items}>
                <button className={styles.absolute_create_btn}>
                  <Link to="/signup/:id" className={styles.create_manager}>
                    Create Manager
                  </Link>
                </button>
                <button className={styles.absolute_create_btn}>
                  <Link to="/create/:id" className={styles.create_manager}>
                    Create User
                  </Link>
                </button>
                <Link to="/">
                  <button
                    className={styles.absolute_logout_btn}
                    onClick={onLogout}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="container">
        <div>{/* <CSVLink {...csvReport}>Export to CSV</CSVLink> */}</div>
        <div className="row justify-content-center">
          <div className="col-10">
            <h3 className="text-center mb-4">Manager List</h3>
            <div className="table-responsive">
              <table className="table">
                <thead className={styles.thead}>
                  <tr className="text-center">
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {managerData?.length ? (
                    managerData.map((data) => {
                      return (
                        <tr key={data.id}>
                          <td>{data.firstName}</td>
                          <td>{data.lastName}</td>
                          <td>{data.email}</td>
                          <td>{data.roles[0].name}</td>
                          <td>
                            <button onClick={() => push(`/signup/${data.id}`)}>
                              <FontAwesomeIcon
                                icon={faPen}
                                className="edit_icon"
                              />
                            </button>
                            <button
                              onClick={() => {
                                onDelete(data.id);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="dlt_icon"
                              />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td>Loading</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-10">
            <h3 className="text-center mb-4">Users List</h3>
            <div className="table-responsive">
              <table className="table">
                <thead className={styles.thead}>
                  <tr className="text-center">
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userData?.length ? (
                    userData.map((data) => {
                      return (
                        <tr key={data.id}>
                          <td>{data.firstName}</td>
                          <td>{data.lastName}</td>
                          <td>{data.email}</td>
                          <td>{data.roles[0].name}</td>
                          <td>
                            <button onClick={() => push(`/create/${data.id}`)}>
                              <FontAwesomeIcon
                                icon={faPen}
                                className="edit_icon"
                              />
                            </button>
                            <button
                              onClick={() => {
                                onDelete(data.id);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="dlt_icon"
                              />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td>Loading</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUI;
