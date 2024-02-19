import { Button, Heading, Stack, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { addNewPost } from "../api";
const AddPost = () => {
  const [formData, setFormData] = useState({
    title: "ddddddd",
    body: "",
  });
  const toast = useToast();
  const { isLoading, data, mutateAsync } = useMutation("newPost", addNewPost, {
    onError: (error) => {
      toast({ status: "error", title: error });
    },
  });
  const onSubmit = async () => {
    // event.preventDefault();
    console.log("object", formData);
    // console.log("event ", event);
    if (!Object.values(formData).every((obj) => obj)) return;

    console.log("form ", formData);
    // await mutateAsync({ title: formData.title, body: formData.body });
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div style={{ width: "1200px", marginBottom: "5px", margin: "auto" }}>
      <Heading textAlign={"center"} fontSize={"2xl"} mt={"5"}>
        Add New Post
      </Heading>
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={(values) => {
          console.log("dddd", values);
          setFormData(values);
          // await mutateAsync({ title: values.title, body: values.body });
        }}
      >
        <Form>
          <Stack my={"1"}>
            <label>
              {" "}
              <b>Title</b>{" "}
            </label>
            <input
              type={"text"}
              style={{
                border: "1px solid whitesmoke",
                padding: "6px 10px",
                borderRadius: "5px",
              }}
              value={formData.title}
              name={"title"}
              onChange={(e) => onChangeInput(e)}
            ></input>

            <label>
              {" "}
              <b>Content</b>{" "}
            </label>
            <input
              type={"text"}
              style={{
                border: "1px solid whitesmoke",
                padding: "6px 10px",
                borderRadius: "5px",
              }}
              value={formData.body}
              name={"body"}
              onChange={(e) => onChangeInput(e)}
            ></input>

            <SubmitButton type="button" onClick={onSubmit}>
              Add New Post{" "}
            </SubmitButton>
          </Stack>
        </Form>
      </Formik>
    </div>
  );
};

export default AddPost;
