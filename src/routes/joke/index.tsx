import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";

type Joke = {
  id: string;
  status: number;
  joke: string;
};

// TODO: Verify data integrity
export const useDadJoke = routeLoader$(async () => {
  const dadJoke = await fetchDadJoke();
  return (await dadJoke.json()) as Joke;
});

const fetchDadJoke = async (): Promise<Response> => {
  return await fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  });
};

export const useJokeVoteAction = routeAction$((props) => {
  console.log("VOTE", props);
});

export default component$(() => {
  const dadJokeSignal = useDadJoke();
  const favoriteJokeAction = useJokeVoteAction();
  return (
    <section class="section bright flex h-screen w-full items-center justify-center">
      <div class="rounded-lg border-[1px] border-gray-800 px-8 py-6">
        <h1 class="text-3xl font-bold">Joke</h1>
        <p class="mb-4">{dadJokeSignal.value.joke}</p>
        <Form action={favoriteJokeAction}>
          <input type="hidden" name="jokeID" value={dadJokeSignal.value.id} />
          <button name="vote" value="up" class="mr-4 text-gray-400">
            Like 👍
          </button>
          <button name="vote" value="down" class="text-gray-400">
            Dislike 👎
          </button>
        </Form>
      </div>
    </section>
  );
});
