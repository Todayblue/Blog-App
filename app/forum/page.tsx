import { LoginButton, LogoutButton } from "../components/Btn";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <LoginButton />

        <LogoutButton />
      </div>
    </main>
  );
}
