export default function handleErrors(response) {
  if (!response.ok) {
    if (response.status === 404) {
      throw Error('not found');
    }
    throw Error(response.statusText);
  }
  return response;
}
