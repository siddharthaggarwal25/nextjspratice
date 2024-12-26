"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setLoading] = React.useState(false);
  const [ isButtonDisabled ,setButtonDisabled] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event: any) {
    setFormData((preFormData) => {
      return {
        ...preFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  React.useEffect(() => {
    if (
      formData.email.length > 0 &&
      formData.password.length > 0 &&
      formData.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  async function handleSubmit(e: any) {
    try {
      e.preventDefault(); 
      setLoading(true);
      const response = await axios.post("/api/users/signup", formData);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <section>
        <div className="flex items-center justify-center px-4 py-4 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-gray-300 ">
              { isLoading? " Processing " : " Sign up" }
            </h2>
            <p className="mt-2 text-center text-base text-gray-600">
              Already have an account?{" "}
              <Link href="/login">Visit login page</Link>
            </p>
            <form className="mt-8" method="POST" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="username"
                    className="text-base font-medium text-white "
                  >
                    {" "}
                    Username{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder=" Username"
                      onChange={handleChange}
                      id="username"
                      name="username"
                      value={formData.username}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-white"
                  >
                    {" "}
                    Email{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                      id="email"
                      name="email"
                      value={formData.email}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-white">
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      id="password"
                      name="password"
                      value={formData.password}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-slate-400 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                   { isButtonDisabled ? " invalid credintials" : "Signup"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
