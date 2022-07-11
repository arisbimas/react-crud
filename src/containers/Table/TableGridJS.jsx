import axios from "axios";
import { Grid } from "gridjs-react";
import React, { Component, useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import { Container } from "reactstrap";
import "gridjs/dist/theme/mermaid.css";
import { html } from "gridjs";

export default function TableGridJS(props) {
  const defOption = {
    limit: 5,
    pagination: true,
    sort: true,
  };

  console.log(props.column);
  const fetchData = async (url) => {
    let result = {};
    // console.log("url", url);
    if (url === "") {
      return [];
    }

    const res = await axios.get(url);
    if (res) {
      // console.log(res.data.results);
      result.data = res.data.results.map((pokemon) => [
        pokemon.name,
        html(`<a href='${pokemon.url}'>Link to ${pokemon.name}</a>`),
      ]);
      result.total = res.data.count;
    }
    return result;
  };

  const trySearch = (prev, keyword) => {
    debugger;
    return `${prev}/${keyword}`;
  };

  const grid = new Grid({
    columns: ["Name", "LINK"],
    sort: {
      enabled: props.sort ? props.sort : defOption.sort,
      multiColumn: false,
      server: {
        url: (prev, columns) => {
          if (!columns.length) return prev;
          const col = columns[0];
          const dir = col.direction === 1 ? "asc" : "desc";
          let colName = ["name", "rarity"][col.index];
          return `${prev}?&order=${colName}&dir=${dir}`;
        },
      },
    },
    search: {
      enabled: props.defaultSearch ? props.defaultSearch : false,
      server: {
        url: (prev, keyword) => trySearch(prev, keyword),
      },
    },
    pagination: {
      enabled:
        props.url !== ""
          ? props.pagination
            ? props.pagination
            : defOption.pagination
          : false,
      limit: props.limitPerPage ? props.limitPerPage : defOption.limit,
      server: {
        url: (prev, page, limit) =>
          `${prev}?&limit=${limit}&offset=${page * limit}`,
      },
    },
    server: {
      url: props.url,
      async data(opts) {
        return fetchData(opts.url);
      },
    },
  });

  useEffect(() => {});

  return (
    <Container>
      <h1>{props.url}</h1>
      <Grid {...grid.props} />
    </Container>
  );
}

TableGridJS.propTypes = {
  url: PropTypes.string,
  columns: PropTypes.array,
  pagination: PropTypes.bool,
  defaultSearch: PropTypes.bool,
  limitPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  sortColumn: PropTypes.string,
  order: PropTypes.string,
  sort: PropTypes.bool,
  keywordSerach: PropTypes.string,
  fieldSearch: PropTypes.array,
};
