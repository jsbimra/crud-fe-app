import React, { useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
// import { LSKey } from "../../utlity/constants";
import { Input, Button } from "@material-ui/core";

const Reset = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      resetCode: ""
    }
  });

  const { dirtyFields } = useFormState({
    control
  });

  const onSubmit = (data) => {
    if (window.localStorage) {
      localStorage.clear();
    }
  };

  console.log(errors);
  // console.log("props", props);

  useEffect(() => {}); //important empty otherwise infinite loop

  return (
    <div>
      <h2>Reset captain!</h2>
      <form onSubmit={handleSubmit(onSubmit)} m={3}>
        <Input
          placeholder="Reset Code"
          inputProps={{
            "aria-label": "description",
            ...register("resetCode", { required: true, maxLength: 80 })
          }}
        />
        {dirtyFields.firstName && <p>Field is dirty.</p>}

        <Button variant="contained" color="secondary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Reset;
