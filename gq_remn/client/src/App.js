import axios from "axios";

function App() {

  const addUserHandler = () => {
    const userData = {
      email: 'some1@email',
      password: '123'
    };

    axios({
      url: '/graphql',
      method: 'POST',
      data: {
        query: `
          mutation {
            addUser(userInput: {
              email: "${userData.email}"
              password: "${userData.password}"
            }) {
              _id
              email
              password
            }
          }
        `
      }
    }).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.error(err);
    });
  };

  return (
    <div className="App">
      App
      <button onClick={addUserHandler}>PeUu</button>
    </div>
  );
}

export default App;
