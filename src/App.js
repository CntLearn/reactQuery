import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// react query dev tools
import { ReactQueryDevtools } from "react-query/devtools";
/*
  importing components
*/
import { PostList, Post } from "./components";

// Create a client,
// if we want to stop the query api hit then... pas some arguents to query client.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/:id" element={<PostList />}></Route>
          </Routes>
          <Routes>
            <Route path="/post/:id" element={<Post />}></Route>
          </Routes>
        </BrowserRouter>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
