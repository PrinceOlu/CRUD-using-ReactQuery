import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const URL_API = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const queryClient = useQueryClient();

  // function to fetch posts
  const getPost = () => fetch(URL_API).then((res) => res.json());

  // using useQuery to manage the data fetch
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPost,
    refetchInterval: 6000, // set refetch interval to 6000ms
    retry: 2, // retry fetch 2 times on failure
  });

  // function to create a new post
  const getMutation = (newPost) =>
    fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).then((res) => res.json());

  // using useMutation for creating new posts
  const mutation = useMutation({
    mutationFn: getMutation,
    onSuccess: (newPost) => {
      // Update the cache with the new post
      queryClient.setQueryData(['posts'], (oldPosts) => [...(oldPosts || []), newPost]);
    },
  });

  const { mutate, isLoading: isPending, isError, isSuccess } = mutation;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // handle submit button click
  const handleSubmit = () => {
    mutate({
      userId: 1000,
      id: 1000,
      title: "Prince Olu",
      body: "quia et suscipit\nsuscipi",
    });
  };

  return (
    <>
      <h1>To Do App</h1>
      <button type="submit" onClick={handleSubmit}>
        Add Post
      </button>

      {isPending && <p>Adding post...</p>}
      {isError && <p>Error occurred while adding post.</p>}
      {isSuccess && <p>Post added successfully!</p>}

      {data?.map((todo) => (
        <div key={todo.id}>
          <h2>User ID: {todo.userId}</h2>
          <h3>Todo ID: {todo.id}</h3>
          <p>Title: {todo.title}</p>
          <p>Body: {todo.body}</p>
        </div>
      ))}
    </>
  );
}

export default App;
