import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]'

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions)
// An api route. It sends back a json response
  if (session) {
    console.log("Session is true");
    res.json({
      message:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    if (!session) {
      console.log("Session is false");
      res.status(401).json({ message: "You must be logged in." });
      return;
    }
  }
}