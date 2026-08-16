import { render, screen } from "@testing-library/react";
import App from "./App";

test("boots the network terminal", () => {
  render(<App />);
  expect(screen.getByText(/NETLINK/i)).toBeInTheDocument();
  expect(screen.getByText(/ARFY SLOWY/i)).toBeInTheDocument();
  expect(screen.getAllByText(/ONLINE/i).length).toBeGreaterThan(0);
});
