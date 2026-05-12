import { SpinnerIcon } from "@phosphor-icons/react";
// import { Button, Flex } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toastMessage from "../../lib/toastMessage";
import { useLoginMutation } from "../../redux/features/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { loginUser } from "../../redux/services/authSlice";
import decodeToken from "../../utils/decodeToken";

const LoginPage = () => {
  const [userLogin, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "test-visitor@gmail.com",
      password: "pass123",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await userLogin(data).unwrap();

      if (res.statusCode === 200) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate("/");
        toastMessage({ icon: "success", text: "Successfully Login!" });
      }
    } catch (error: any) {
      toastMessage({ icon: "error", text: error.data.message });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050a14;
          overflow: hidden;
          position: relative;
          font-family: 'DM Sans', sans-serif;
        }

        /* Animated background orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          animation: drift 12s ease-in-out infinite alternate;
        }
        .orb-1 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, #1a6fff 0%, #0d3baa 100%);
          top: -120px; left: -100px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 320px; height: 320px;
          background: radial-gradient(circle, #7c3aed 0%, #4f1c99 100%);
          bottom: -80px; right: -60px;
          animation-delay: -4s;
        }
        .orb-3 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, #06b6d4 0%, #0e7490 100%);
          top: 55%; left: 60%;
          animation-delay: -8s;
          opacity: 0.2;
        }

        @keyframes drift {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(30px, 20px) scale(1.06); }
          100% { transform: translate(-20px, 40px) scale(0.96); }
        }

        /* Noise grain overlay */
        .login-root::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* Card */
        .login-card {
          position: relative;
          z-index: 1;
          width: 420px;
          padding: 3rem 2.6rem 2.4rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 32px 64px rgba(0,0,0,0.5),
            0 0 80px rgba(26,111,255,0.08);
          animation: cardIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Badge */
        .login-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(26,111,255,0.15);
          border: 1px solid rgba(26,111,255,0.3);
          border-radius: 99px;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 500;
          color: #7eb5ff;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
          animation: fadeSlide 0.5s 0.2s both;
        }
        .login-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4d94ff;
          box-shadow: 0 0 6px #4d94ff;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* Heading */
        .login-title {
          font-family: 'Syne', sans-serif;
          font-size: 2.1rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 0.3rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
          animation: fadeSlide 0.5s 0.3s both;
        }
        .login-title span {
          background: linear-gradient(135deg, #4d94ff 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .login-sub {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.35);
          margin: 0 0 2rem;
          animation: fadeSlide 0.5s 0.35s both;
        }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Floating label inputs */
        .input-wrap {
          position: relative;
          margin-bottom: 1.2rem;
          animation: fadeSlide 0.5s both;
        }
        .input-wrap:nth-child(1) { animation-delay: 0.4s; }
        .input-wrap:nth-child(2) { animation-delay: 0.45s; }

        .floating-input {
          width: 100%;
          padding: 1rem 1rem 0.6rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          box-sizing: border-box;
        }
        .floating-input::placeholder { color: rgba(255,255,255,0.3); font-size: 0.88rem; }
        .floating-input:focus {
          border-color: rgba(77,148,255,0.6);
          background: rgba(77,148,255,0.06);
          box-shadow: 0 0 0 3px rgba(77,148,255,0.12), 0 0 20px rgba(77,148,255,0.08);
        }
        .floating-input.error-field {
          border-color: rgba(239,68,68,0.6);
          box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
        }

        /* Submit button */
        .submit-wrap {
          margin-top: 0.4rem;
          animation: fadeSlide 0.5s 0.5s both;
        }

        .login-btn {
          width: 100%;
          height: 48px !important;
          border-radius: 10px !important;
          font-family: 'Syne', sans-serif !important;
          font-size: 0.9rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          border: none !important;
          background: linear-gradient(135deg, #1a6fff 0%, #7c3aed 100%) !important;
          color: #fff !important;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s !important;
          box-shadow: 0 4px 24px rgba(26,111,255,0.35) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 32px rgba(26,111,255,0.5) !important;
        }
        .login-btn:active:not(:disabled) {
          transform: translateY(0) !important;
        }
        .login-btn:disabled {
          opacity: 0.6 !important;
          cursor: not-allowed !important;
        }
        /* shimmer sweep */
        .login-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
          background-size: 200% 100%;
          animation: shimmer 2.4s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* Spinner */
        .spin {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Footer link */
        .login-footer {
          margin-top: 1.5rem;
          font-size: 0.83rem;
          color: rgba(255,255,255,0.3);
          text-align: center;
          animation: fadeSlide 0.5s 0.55s both;
        }
        .login-footer a {
          color: #7eb5ff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .login-footer a:hover { color: #a5cbff; text-decoration: underline; }

        /* Divider line */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          margin: 1.6rem 0;
        }
      `}</style>

      <div className="login-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="login-card">
          <div className="login-badge">
            <span className="login-badge-dot" />
            Secure Access
          </div>

          <h1 className="login-title">
            Welcome <span>back.</span>
          </h1>
          <p className="login-sub">Sign in to continue your session</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrap">
              <input
                type="text"
                {...register("email", { required: true })}
                placeholder="Email address"
                className={`floating-input ${errors["email"] ? "error-field" : ""}`}
              />
            </div>

            <div className="input-wrap">
              <input
                type="password"
                placeholder="Password"
                className={`floating-input ${errors["password"] ? "error-field" : ""}`}
                {...register("password", { required: true })}
              />
            </div>

            <div className="submit-wrap">
              <button type="submit" disabled={isLoading} className="login-btn">
                {isLoading && (
                  <SpinnerIcon className="spin" weight="bold" size={16} />
                )}
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="divider" />

          <p className="login-footer">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
