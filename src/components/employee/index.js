import React from "react";
import EmployeeList from "./list";

const Employee = (props) => {
  const { deleteActiveStatus, onEmployeeDeletedStatus } = props;

  return (
    <>
      <EmployeeList
        title={props.title || ''} 
        subTitle={props.subTitle || ''}
        onEmployeeDeletedStatus={onEmployeeDeletedStatus}
        deleteActiveStatus={deleteActiveStatus}
      />
    </>
  );
};

export default Employee;
