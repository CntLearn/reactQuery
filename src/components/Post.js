import {
  Container,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  Grid,
  useToast,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPost } from "../api";
const Post = () => {
  const { id } = useParams();
  let postId = parseInt(id);
  const navigate = useNavigate();
  // const { data, error, isError, isLoading } = useQuery("posts", fetchPosts);
  // we can do some config
  const toast = useToast();
  // in the use query the data is stored according to unique identifier, but we want to get each page has diff post so change some logic
  /* useQuery('posts")  instead of this use some other,*/
  const { data, isError, isLoading } = useQuery(
    ["post", postId],
    () => fetchPost(postId),
    { keepPreviousData: true }, // this will keep previous data as untill or unless next page data is not loaded.
    {
      onError: (error) => {
        toast({ status: "error", title: error.message });
      },
    }
  );

  const previousBtn = () => {
    navigate(-1);
  };

  return (
    <Container maxW={"1300px"} mt={"3"}>
      <Flex justifyContent={"space-between"} p={"4"}>
        <Button colorScheme={"red"} onClick={() => previousBtn()}>
          Previous
        </Button>
        <Text>Current Post ID : {postId} </Text>
      </Flex>
      {isLoading ? (
        <Grid placeItems={"center"} height={"100vh"}>
          <Spinner />
        </Grid>
      ) : (
        <Stack
          m="2"
          p="4"
          boxShadow={"md"}
          border={"1px solid #ccc"}
          borderRadius={"xl"}
        >
          <Flex justify={"space-between"}>
            <Text> UserID: {!!data && data.data.user_id} </Text>
            <Text> PostID: {!!data && data.data.id} </Text>
          </Flex>
          <Heading fontSize={"2xl"}>
            Title : {!!data && data.data.title}{" "}
          </Heading>
          <Text>Content: {!!data && data.data.body} </Text>
        </Stack>
      )}
    </Container>
  );
};

export default Post;
