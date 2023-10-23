import app from "./app";
import functions from "firebase-functions";
// import function from "firebase-functions";
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export const server = functions?.https?.onRequest(app);
