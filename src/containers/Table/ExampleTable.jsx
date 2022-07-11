import { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, Input } from "reactstrap";
import TableGridJS from "./TableGridJS";

export default function ExampleTable() {
  const initState = {
    url: "",
  };
  const [data, setData] = useState("");
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(5);
  const wrapper = useRef(null);

  const getData = () => {
    setData(`https://pokeapi.co/api/v2/pokemon?`);
    setCount(count + 1);
    console.log("count ", count);
  };

  // useEffect(() => {
  //   console.log("state", data);
  // }, [data]);

  return (
    <div>
      <h1>Ex</h1>
      <p>Keyword: {keyword}</p>
      <Input onChange={(e) => setKeyword(e.target.value)}></Input>
      <Button color="info" className="btn-sm m-1" onClick={getData}>
        Show Data
      </Button>
      <TableGridJS
        url={data}
        pagination={true}
        defaultSearch={true}
        limitPerPage={count}
        keywordSerach={keyword}
        fieldSearch={["name"]}
      />
    </div>
  );
}
