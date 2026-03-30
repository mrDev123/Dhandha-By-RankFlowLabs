const inMemoryStore = [];

export async function storeImageMetadata(imageRecord) {
  // Placeholder for DB integration (MongoDB/PostgreSQL/Firebase Firestore).
  inMemoryStore.push({ id: inMemoryStore.length + 1, ...imageRecord });
  return inMemoryStore[inMemoryStore.length - 1];
}

export async function listImageMetadata() {
  return inMemoryStore;
}
