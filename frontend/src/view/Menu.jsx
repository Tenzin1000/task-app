import React from "react";
import useFetch from "../hooks/useFetch";
import "../css/Menu.css";

export default function Menu() {
  const {
    data: subscription,
    loading: subsloading,
    error: subsError,
  } = useFetch("/subscriptions.json");
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useFetch("/users.json");
  if (subsError) {
    return <div>Error: {subsError.message}</div>;
  }
  const subscriptionCount = subscription.reduce((acc, curr) => {
    acc[curr.package] = (acc[curr.package] || 0) + 1;
    return acc;
  }, {});
  return (
    <div>
      {subsloading ? (
        <div className="loading">loading ....</div>
      ) : (
        <div className="menu_subContainer">
          <div className="menu_main">
            <div className="menu_sub_head">Total Subscription Package</div>
            <div className="menu_list_container">
              {Object.keys(subscriptionCount).map((key, index) => (
                <div className="menu_sub_list" key={key}>
                  <div className="menu_sub_sn">{index + 1}.</div>
                  <div className="menu_sub_title">Plan for {key}</div>
                  <div className="menu_sub_number">
                    {subscriptionCount[key]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
