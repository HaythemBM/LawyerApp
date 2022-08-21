import UserNavBar from "../../components/UserNavBar";

import "./Home.css";

function Home() {
  return (
    <main>
      <UserNavBar className="nav" />
      <section>
        <h1>Welcome to Lawyer App</h1>
        <h3>Login Or Register and enjoy our services !!!</h3>
      </section>
    </main>
  );
}

export default Home;
