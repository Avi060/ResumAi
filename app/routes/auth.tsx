import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  return [
    { title: "Resumind | Auth" },
    { name: "description", content: "Log into your account" },
  ];
};

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex flex-col items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white *:rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center animate-in fade-in duration-1000">
            <h1>Welcome</h1>
            <h2>Log in to Continue Your Job Journey </h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p> Signing you in....</p>
              </button>
            ) : (
              <p>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p>Log Out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p>Log in</p>
                  </button>
                )}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default auth;
