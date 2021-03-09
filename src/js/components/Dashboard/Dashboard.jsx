import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  caption-side: bottom; 
  td,
  th {
    border: 1px solid purple;
  }

  td {
    padding: 5px 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;
export default ({ data }) => (
        <TableMarkup titles={Object.keys(data[0])} data={data} />
    );
const TableMarkup = ({ titles, data }) => (

    <StyledTable>
        <caption></caption>
        <colgroup>
            <col />
            <col />
            <col />
        </colgroup>
        <thead>
            <tr>
                {titles.map((title, index) => (
                    <th key={index}>{title}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {titles.map((title, index) => (
                        <td key={index}>{item[title]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </StyledTable>
);
