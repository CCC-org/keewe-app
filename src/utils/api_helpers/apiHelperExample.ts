export function get_some_example_stuff_through_api() {
  return fetch('https://api.github.com/users/octocat')
    .then((response) => response.json())
    .then((json) => json.avatar_url);
}
