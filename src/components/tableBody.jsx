import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  render() {
      this.renderCell = (item,column) =>{
          if(column.content) return column.content(item);
          
          return _.get(item, column.path);
      }
      
      this.createKey = (item, column) => {
          return item._id + (column.path || column.key);
      };
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>{this.renderCell(item, column)}</td>
            ))}
            <td> </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
