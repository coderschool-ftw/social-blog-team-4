import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuAdmin from "../components/MenuAdmin";
import { Row, Col } from "react-bootstrap";
import friendActions from "../redux/actions/friend.actions";
import PaginationBar from "../components/PaginationBar";
import FriendTabs from "../components/FriendTabs";
import FriendTable from "../components/FriendTable";
import { ClipLoader } from "react-spinners";
import FormSearch from "../components/FormSearch";

const FriendPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [currentTab, setCurrentTab] = useState("all");
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState(1);
  const limit = 10;
  const friends = useSelector((state) => state.friend.friends);
  const totalPages = useSelector((state) => state.friend.totalPages);
  const loading = useSelector((state) => state.friend.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    switch (currentTab) {
      case "friend":
        dispatch(
          friendActions.getFriends(pageNum, limit, searchTerm, sortBy, order)
        );
        return;
      case "sent":
        dispatch(
          friendActions.getSentRequest(
            pageNum,
            limit,
            searchTerm,
            sortBy,
            order
          )
        );
        return;
      case "received":
        dispatch(
          friendActions.getReceivedRequest(
            pageNum,
            limit,
            searchTerm,
            sortBy,
            order
          )
        );
        return;
      default:
        dispatch(
          friendActions.getListUsers(pageNum, limit, searchTerm, sortBy, order)
        );
        return;
    }
  }, [dispatch, currentTab, pageNum, limit, searchTerm, sortBy, order]);
  const handleSortBy = (e) => {
    const arraySort = e.target.value.split("_");
    console.log("arraySort", arraySort);
    setSortBy(arraySort[0]);
    if (arraySort[1] === "DESC") {
      setOrder(-1);
    } else {
      setOrder(1);
    }
  };
  return (
    <>
      <Row>
        <Col md={2}>
          <MenuAdmin />
        </Col>
        <Col md={9}>
          <h2>Friend Manage</h2>
          <FormSearch
            searchInput={input}
            handleSearchChange={(e) => setInput(e.target.value)}
            handleSubmit={(e) => {
              e.preventDefault();
              setSearchTerm(input);
            }}
          />
          <FriendTabs
            currentTab={currentTab}
            handleTabSelect={(eventKey) => {
              setPageNum(1);
              setCurrentTab(eventKey);
            }}
          />

          {loading ? (
            <div className='text-center'>
              <ClipLoader color='#f86c6b' size={150} loading={true} />
            </div>
          ) : (
            <FriendTable
              currentTab={currentTab}
              friends={friends}
              handleSort={handleSortBy}
              handleSendFriendRequest={(e) => {
                dispatch(friendActions.sendFriendRequest(e.target.value));
              }}
              handleCancelFriendRequest={(e) => {
                dispatch(friendActions.cancelFriendRequest(e.target.value));
              }}
              handleRemoveFriend={(e) => {
                dispatch(friendActions.removeFriend(e.target.value));
              }}
              handleAcceptFriendRequest={(e) => {
                dispatch(friendActions.acceptFriend(e.target.value));
              }}
              handleDeclineFriendRequest={(e) => {
                dispatch(friendActions.declineFriendRequest(e.target.value));
              }}
            />
          )}

          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPages}
          />
        </Col>
      </Row>
    </>
  );
};

export default FriendPage;
