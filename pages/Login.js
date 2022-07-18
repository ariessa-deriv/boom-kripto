import React from "react";

const Login = () => {
  return (
    <>
      <label for="my-modal-3" class="btn modal-button">
        Login
      </label>
      <input type="checkbox" id="my-modal-3" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label
            for="my-modal-3"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 class="text-5xl pt-4 font-bold">Login</h1>

          <h3 class="text-lg pt-20 font-bold">Email Address</h3>

          <input
            type="text"
            placeholder="Enter email"
            class="input input-bordered input-primary w-full max-w-xs"
          />

          <h3 class="text-lg pt-8 font-bold">Password</h3>

          <input
            type="text"
            placeholder="Enter password"
            class="input input-bordered input-primary w-full max-w-xs"
          />
          <button class="btn">Login</button>
        </div>
      </div>
    </>
  );
};

export default Login;
