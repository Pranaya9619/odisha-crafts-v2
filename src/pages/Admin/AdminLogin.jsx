import React, {
    useState,
} from "react";

import {
    motion,
} from "framer-motion";

import {
    Shield,
    Mail,
    Lock,
    ArrowRight,
} from "lucide-react";

import {
    useNavigate,
} from "react-router-dom";

import API from "../../services/adminApi";

const AdminLogin = () => {

    const navigate =
        useNavigate();

    const [
        form,
        setForm,
    ] = useState({
        email: "",
        password: "",
    });

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

    const handleChange =
        (e) => {

            setForm({
                ...form,
                [e.target.name]:
                    e.target.value,
            });

        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                setError("");

                const res =
                    await API.post(
                        "/login",
                        form
                    );

                console.log(
                    "TOKEN:",
                    res.data.token
                );

                localStorage.setItem(
                    "adminToken",
                    res.data.token
                );

                window.location.href =
                    "/admin";

            } catch (err) {

                console.log(
                    "ADMIN LOGIN ERROR:",
                    err.response?.data ||
                    err.message
                );

                setError(
                    err.response?.data
                        ?.message ||
                    "Admin login failed"
                );

            } finally {

                setLoading(false);

            }
        };

    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-stone-50">

            {/* LEFT */}

            <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-black to-stone-800 text-white p-12">

                <Shield
                    size={64}
                    className="mb-6"
                />

                <h1 className="text-5xl font-bold mb-5">
                    OdishaCrafts
                </h1>

                <p className="text-lg opacity-90 text-center max-w-md leading-relaxed">

                    Administrative control center.

                </p>

            </div>

            {/* RIGHT */}

            <div className="flex items-center justify-center p-6">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md"
                >

                    <h2 className="text-3xl font-bold mb-8">

                        Admin Login

                    </h2>

                    {error && (

                        <div className="mb-5 bg-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">

                            {error}

                        </div>

                    )}

                    <form
                        onSubmit={
                            handleSubmit
                        }
                        className="space-y-5"
                    >

                        <div className="relative">

                            <Mail
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Admin Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none"
                            />

                        </div>

                        <div className="relative">

                            <Lock
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none"
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-2"
                        >

                            {
                                loading
                                    ? "Signing In..."
                                    : "Login"
                            }

                            <ArrowRight
                                size={18}
                            />

                        </button>

                    </form>

                </motion.div>

            </div>

        </div>
    );
};

export default AdminLogin;