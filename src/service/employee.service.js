// import { employees } from "../../../public/data";
import {  dateInfo, fetchLocally } from "../utlity";

const employees = [];
export const employeesEffect = () => {
  return employees.length
    ? [...employees]
    : fetchLocally("crud-app").length
    ? [...fetchLocally("crud-app")]
    : [];
};


export const addEmployeeService = (data) => {
  console.log({ data });

  if (data) {
    const localData = fetchLocally("crud-app") || [];
    const localDataLen = localData.length;
    const updateemployees = [...localData, addNewEmployee(data)];


    if (updateemployees.length === localDataLen + 1) {
      alert(`Employee ${data.name} added successfully`);
      return true;
    }
  }
  return false;
};

function addNewEmployee(data) {
  return {
    name: data,
    onDate: null,
    already: false
  };
}

export const deleteEmployeeService = (data) => {
  console.log({ data });

  if (data) {
    const localData = fetchLocally("crud-app") || [];
    const updateemployees = localData.filter(
      (cap) => cap.name.toLowerCase() !== data.name.toLowerCase()
    );
    // console.log("deleted filtered employees ", { updateemployees });

    return updateemployees;
  }
};
