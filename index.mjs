// Example fix in index.mjs
const object = getObject(); // Replace with your actual function to get the object

if (object && object.oid) {
  console.log(`Object ID: ${object.oid}`);
} else {
  console.error("Error: Object or oid is null");
}