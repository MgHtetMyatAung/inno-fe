import { useDispatch } from "react-redux";
import { useLoginMutation } from "./api/endpoints/auth";
import ProductDetail from "./components/ProductDetail";
import useAuth from "./hooks/useAuth";
import { systemLogout } from "./redux/slices/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [login, { isLoading }] = useLoginMutation();
  async function handleLogin() {
    await login({
      phone: "09981868466",
      password: "12345",
      type: "merchant",
    });
  }
  function logout() {
    dispatch(systemLogout());
  }
  return (
    <div>
      <div>{isAuthenticated ? <ProductDetail /> : "guest"}</div>
      App
      <button onClick={handleLogin}>
        {isLoading ? "loading ..." : "login"}
      </button>
      <button onClick={logout}>logout</button>
    </div>
  );
}
