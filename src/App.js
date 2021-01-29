import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import IssueList from "./components/IssueList";
import SearchForm from "./components/SearchForm";

function App() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [url, setUrl] = useState(
    "https://api.github.com/repos/facebook/react/issues"
  );
  useEffect(() => {
    async function fetchData() {
      let result = await fetch(url);
      let json = await result.json();
      // console.log(json[6].labels[0].name);
      setIssues(json);
    }
    fetchData();
  }, [url]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleClick = () => {
    setUrl(`https://api.github.com/repos/${searchTerm}/issues`);
  };
  return (
    <Container>
      <h1 className="text-center text-blue">GitHub Issues Browser</h1>
      <SearchForm
        handleClick={handleClick}
        handleChange={handleChange}
        searchTerm={searchTerm}
      ></SearchForm>

      <IssueList issues={issues} />
    </Container>
  );
}

export default App;
