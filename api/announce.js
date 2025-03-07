import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const data = await fetch(
      `https://apis.haravan.com/web/blogs/1000784906/articles.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer E56D41F8B89389530FF40F356C3597BFFC3342F5E765D59E914E5626D16F9FFF",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    const data1 = await data.json();
    return res.status(200).json({ data1 });
  } catch {
    return res.status(400).json({ result: "Bad request" });
  }
}
