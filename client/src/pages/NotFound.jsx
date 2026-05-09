import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="not-found">
    <p className="eyebrow">404</p>
    <h1>That training lane is closed.</h1>
    <p>Return to the academy and pick the next session.</p>
    <Link className="cta" to="/">
      Back Home
    </Link>
  </main>
);

export default NotFound;
