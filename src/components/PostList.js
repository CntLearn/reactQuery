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
import React from "react";

import { useQuery } from "react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPosts } from "../api";
import AddPost from "./AddPost";

const PostList = () => {
  const { id } = useParams();
  let pageID = parseInt(id);
  const navigate = useNavigate();
  // const { data, error, isError, isLoading } = useQuery("posts", fetchPosts);
  // we can do some config
  const toast = useToast();
  // in the use query the data is stored according to unique identifier, but we want to get each page has diff post so change some logic
  /* useQuery('posts")  instead of this use some other,*/
  const { data, isError, isLoading } = useQuery(
    ["posts", pageID],
    () => fetchPosts(pageID),
    { keepPreviousData: true }, // this will keep previous data as untill or unless next page data is not loaded.
    {
      onError: (error) => {
        toast({ status: "error", title: error.message });
      },
    }
  );

  // const { data, isError, isLoading } = useQuery(
  //   "userPost",
  //   () => fetchUserPosts(),

  //   {
  //     keepPreviousData: true,
  //   },
  //   {
  //     onError: (error) => {
  //       toast({ status: "error", title: error.message });
  //     },
  //   }
  // );

  const previousBtn = () => {
    console.log("okn ");
    if (!!data && data.meta.pagination.links.previous !== null)
      navigate(`/${pageID - 1}`);
  };

  const nextBtn = () => {
    navigate(`/${pageID + 1}`);
  };

  return (
    <Container maxW={"1300px"} mt={"3"}>
      <AddPost />
      <Flex justifyContent={"space-between"} p={"4"}>
        <Button
          colorScheme={"red"}
          onClick={() => previousBtn()}
          // disabled={!!data && !(data.meta.pagination.links.previous !== null)}
        >
          Previous
        </Button>
        <Text>Current Page : {pageID} </Text>
        <Button colorScheme={"green"} onClick={() => nextBtn()}>
          Next
        </Button>
      </Flex>
      {isLoading ? (
        <Grid placeItems={"center"} height={"100vh"}>
          <Spinner />
        </Grid>
      ) : (
        !!data &&
        data.data.map((post, index) => {
          return (
            <Link to={`/post/${post.id}`} key={index}>
              <Stack
                m="2"
                p="4"
                boxShadow={"md"}
                border={"1px solid #ccc"}
                borderRadius={"xl"}
              >
                <Flex justify={"space-between"}>
                  <Text> UserID: {post.user_id} </Text>
                  <Text> PostID: {post.id} </Text>
                </Flex>
                <Heading fontSize={"2xl"}>Title : {post.title} </Heading>
                <Text>Content: {post.body} </Text>
              </Stack>
            </Link>
          );
        })
      )}
    </Container>
  );
};

export default PostList;
