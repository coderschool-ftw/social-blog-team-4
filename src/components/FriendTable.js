import React from "react";
import { Table, Button, Badge, Image } from "react-bootstrap";
const FriendTable = ({
  currentTab,
  friends,
  handleAcceptFriendRequest,
  handleCancelFriendRequest,
  handleDeclineFriendRequest,
  handleRemoveFriend,
  handleSendFriendRequest,
  handleSort,
}) => {
  const addDefaultSrc = (e) => {
    e.target.src =
      "https://cdn.itviec.com/employers/coderschool/logo/social/8p67H9qvrjNV5FNxB5ZEuPoM/Logo-full@2x-1024x800.png";
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className='pb-3'>Avatar</th>
          <th>
            Name
            <button
              className='m-2 link-button'
              value='name_ASC'
              onClick={handleSort}
            >
              ⬆️
            </button>
            <button
              className='link-button'
              value='name_DESC'
              onClick={handleSort}
            >
              ⬇️
            </button>
          </th>
          <th>
            Email
            <button
              className='m-2 link-button'
              value='email_ASC'
              onClick={handleSort}
            >
              ⬆️
            </button>
            <button
              className='link-button'
              value='email_DESC'
              onClick={handleSort}
            >
              ⬇️
            </button>
          </th>
          <th>
            Friend Count{" "}
            <button
              className='m-2 link-button'
              value='friendCount_ASC'
              onClick={handleSort}
            >
              ⬆️
            </button>
            <button
              className='link-button'
              value='friendCount_DESC'
              onClick={handleSort}
            >
              ⬇️
            </button>
          </th>
          <th className='pb-3'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {friends.length > 0 ? (
          friends.map((f) => (
            <tr key={f._id}>
              <td>
                <Image
                  src={f.avatarUrl}
                  onError={addDefaultSrc}
                  roundedCircle
                  width='50px'
                  height='50px'
                />
              </td>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>{f.friendCount}</td>
              <td>
                {currentTab === "all" &&
                  f &&
                  f.friendship &&
                  f.friendship.status === "requesting" && (
                    <h5>
                      <Badge pill variant='warning'>
                        Requesting
                      </Badge>
                    </h5>
                  )}
                {currentTab === "all" &&
                  f &&
                  f.friendship &&
                  f.friendship.status === "accepted" && (
                    <h5>
                      <Badge pill variant='success'>
                        Friend
                      </Badge>
                    </h5>
                  )}
                {currentTab === "all" &&
                  f &&
                  (f.friendship === null ||
                    (f.friendship.status !== "requesting" &&
                      f.friendship.status !== "accepted")) &&
                  (f.requestingStatus ? (
                    <h5>
                      <Badge pill variant='warning'>
                        Requesting
                      </Badge>
                    </h5>
                  ) : (
                    <Button
                      variant='primary'
                      value={f._id}
                      onClick={handleSendFriendRequest}
                    >
                      Add friend
                    </Button>
                  ))}
                {currentTab === "sent" && (
                  <Button
                    variant='primary'
                    value={f._id}
                    onClick={handleCancelFriendRequest}
                  >
                    Cancel
                  </Button>
                )}
                {currentTab === "friend" && (
                  <Button
                    variant='danger'
                    value={f._id}
                    onClick={handleRemoveFriend}
                  >
                    Remove Friend
                  </Button>
                )}
                {currentTab === "received" && (
                  <>
                    <Button
                      variant='primary'
                      className='mr-1'
                      value={f._id}
                      onClick={handleAcceptFriendRequest}
                    >
                      Accept
                    </Button>
                    <Button
                      variant='danger'
                      value={f._id}
                      onClick={handleDeclineFriendRequest}
                    >
                      Decline
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan='5'>No result</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default FriendTable;
