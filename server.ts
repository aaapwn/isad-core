import app from "./src/app";
import functions from "firebase-functions";

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export const api = functions?.https?.onRequest(app);
