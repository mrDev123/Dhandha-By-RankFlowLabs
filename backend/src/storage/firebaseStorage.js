export async function uploadToFirebase({ fileName }) {
  // Placeholder for Firebase Storage SDK upload.
  return {
    provider: 'firebase',
    url: `https://firebase.example.com/photos/${encodeURIComponent(fileName)}`
  };
}
