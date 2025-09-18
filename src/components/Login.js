"use client";   // required because we're using state & events
import React, { useState } from "react";
import Link from 'next/link';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState("login"); // login | forgotEmail | otp

    // Login fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginAs, setLoginAs] = useState("admin"); // admin | merchant
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // OTP fields
    const [otp, setOtp] = useState(["", "", "", ""]);

    const handleOtpChange = (value, index) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            // Auto move to next field
            if (value && index < 3) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    return (
        <div id="myloginzapnow">
            <div className="login-container">
                {/* Left Side */}
                <div className="login-left">
                    {step === "login" && (
                        <>
                            <h5>Welcome to Zapnow Payments</h5>
                            <h2>
                                Get started with your email <br /> or phone number
                            </h2>

                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    setError("");
                                    setLoading(true);
                                    try {
                                        const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL).replace(/\/$/, "");
                                        // Read existing auth_token (if any) and pass along as header
                                        const getCookie = (name) => {
                                            if (typeof document === 'undefined') return '';
                                            const match = document.cookie.match(new RegExp('(^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
                                            return match ? decodeURIComponent(match[2]) : '';
                                        };
                                        const token = getCookie('auth_token');
                                        const res = await fetch(`${baseUrl}/auth/login`, {
                                            method: "POST",
                                            headers: { 
                                                "Content-Type": "application/json",
                                                ...(token ? { 'auth_token': token } : {})
                                            },
                                            credentials: "include",
                                            body: JSON.stringify({ email, password, loginAs })
                                        });
                                        const data = await res.json().catch(() => ({}));
                                        if (!res.ok) {
                                            throw new Error(data.message || "Login failed");
                                        }
                                        // Cookie will be stored automatically due to credentials: 'include'
                                        window.location.href = "/dashboard";
                                    } catch (err) {
                                        setError(err.message || "Login failed");
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                            >
                                <label>Email*</label>
                                <input
                                    type="email"
                                    placeholder="mail@simmimple.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <label>Password*</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Min. 8 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <i
                                        className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}
                                        onClick={() => setShowPassword(!showPassword)}
                                    ></i>
                                </div>

                                <label>Login as</label>
                                <select value={loginAs} onChange={(e) => setLoginAs(e.target.value)}>
                                    <option value="admin">Admin</option>
                                    <option value="merchant">Merchant</option>
                                </select>

                                {error && <p style={{ color: "#d00", marginTop: 8 }}>{error}</p>}

                                <a
                                    href="#"
                                    className="forgot"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setStep("forgotEmail");
                                    }}
                                >
                                    Forgot password?
                                </a>

                                <div className="check-keep">
                                    <input type="checkbox" id="keep" />
                                    <label htmlFor="keep">Keep me logged in</label>
                                </div>

                                <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                            </form>
                        </>
                    )}

                    {step === "forgotEmail" && (
                        <>
                            <h5>Forgot Password</h5>
                            <p>Enter your registered email to receive an OTP</p>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setStep("otp");
                                }}
                            >
                                <label>Email*</label>
                                <input type="email" placeholder="your@email.com" required />

                                <button type="submit" className="mt-3">Send OTP</button>
                            </form>
                            <p className="back-link mt-3" onClick={() => setStep("login")}>
                                Ohh clicked by mistake? Go to{" "}
                                <span style={{ color: "#4318FF", cursor: "pointer", fontWeight: "500" }}>
                                    Login
                                </span>
                            </p>
                        </>
                    )}

                    {step === "otp" && (
                        <>
                            <h5>Enter OTP</h5>
                            <p>We’ve sent a 4-digit OTP to your email</p>
                            <div className="otp-container">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) =>
                                            handleOtpChange(e.target.value, index)
                                        }
                                    />
                                ))}
                            </div>
                            <Link href="/dashboard">
                                <button>Verify OTP</button>
                            </Link>
                            <p className="back-link mt-3" onClick={() => setStep("login")}>
                                Ohh clicked by mistake? Go to{" "}
                                <span style={{ color: "blue", cursor: "pointer", fontWeight: "500" }}>
                                    Login
                                </span>
                            </p>
                        </>
                    )}
                </div>

                {/* Right Side */}
                <div className="login-right">
                    <h1>ZAPNOW</h1>
                    <p>Payments</p>
                </div>
            </div>
            <style jsx>{`
        #myloginzapnow .otp-container {
          display: flex;
          gap: 10px;
          margin: 20px 0;
        }
        #myloginzapnow .otp-container input {
          width: 50px;
          height: 50px;
          text-align: center;
          font-size: 20px;
        }
      `}</style>
        </div>
    );
}
