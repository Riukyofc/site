const PROJECT_ID = "rkystudio-b8c89";
const DATABASE_ID = "default"; // without parentheses!

async function testREST() {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents/products`;
  
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

testREST();
