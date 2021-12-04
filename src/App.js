import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);

  const getUser = async () => {
    console.log("ok");
    setPage((page) => page + 1);
    const url = `https://randomuser.me/api/?page=${page}&results=10`;
    const response = await fetch(url);
    const usersData = await response.json();
    let allUsers = [];
    allUsers = usersData.results.map((user) => {
      return {
        name: user.name.first + " " + user.name.last,
        picture: user.picture.thumbnail,
        email: user.email,
        id: user.phone,
      };
    });
    setUsers([...users, ...allUsers]);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <div className="content">
        <InfiniteScroll
          className="users-container"
          dataLength={users.length}
          hasMore={true}
          next={getUser}
          height={500}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {users.map((user) => (
            <div key={user.id} className="each-user">
              <img className="user-img" src={user.picture} alt={user.name} />
              <div className="info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
