import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "./components/AuthButton";

export default async function Home() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      {/* <LoginButton />
      <RegisterButton />
      <LogoutButton />
      <ProfileButton /> */}
    </main>
  );
}
