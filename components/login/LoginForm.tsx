import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        fetch('http://social-backend.local/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
            .then((res) => {
                if (!res.ok) throw new Error('Invalid credentials');
                return res.json();
            })
            .then(data => {
                if (data.status) {
                    setMessage('✅ Đăng nhập thành công!');
                    localStorage.setItem('token', data.token);

                    fetch('http://social-backend.local/api/auth/profile', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        },
                    })
                        .then(res => {
                            return res.json()
                        })
                        .then(data => {
                            localStorage.setItem('user_id', data.id);
                        })

                    setTimeout(() => {
                        navigate('/home');
                    }, 1000);
                } else {
                    setMessage('❌ Sai email hoặc mật khẩu.');
                }
            })
            .catch(err => {
                console.error(err);
                setMessage('❌ Có lỗi xảy ra.');
            })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Login
                </h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name={"email"}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="example@gmail.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name={"password"}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="********"
                        />
                    </div>

                    <div className="space-y-2 mt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Sign In
                        </button>

                        <Link to="/register">
                            <button
                                type="button"
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </form>

                <p style={{marginTop: '20px', color: message.startsWith('✅') ? 'green' : 'red'}}>
                    {message}
                </p>
            </div>
        </div>
    );
}
