import { SpinnerIcon } from "@phosphor-icons/react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toastMessage from "../../lib/toastMessage";
import { useRegisterMutation } from "../../redux/features/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { loginUser } from "../../redux/services/authSlice";
import decodeToken from "../../utils/decodeToken";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userRegistration, { isLoading }] = useRegisterMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await userRegistration(data).unwrap();

      if (data.password !== data.confirmPassword) {
        toastMessage({
          icon: "error",
          text: "Password and confirm password must be same!",
        });
        return;
      }
      if (res.statusCode === 201) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate("/");
        console.log(res);
        toastMessage({ icon: "success", text: res.message });
      }
    } catch (error: any) {
      const errMsg =
        error?.data?.errors?.[Object.keys(error?.data?.errors)[0]] ||
        error.data.message;
      toastMessage({ icon: "error", text: errMsg });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .reg-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050a14;
          overflow: hidden;
          position: relative;
          font-family: 'DM Sans', sans-serif;
        }

        .reg-root::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .reg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.32;
          animation: reg-drift 12s ease-in-out infinite alternate;
        }
        .reg-orb-1 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, #7c3aed 0%, #4f1c99 100%);
          top: -100px; right: -80px;
          animation-delay: 0s;
        }
        .reg-orb-2 {
          width: 340px; height: 340px;
          background: radial-gradient(circle, #1a6fff 0%, #0d3baa 100%);
          bottom: -90px; left: -70px;
          animation-delay: -5s;
        }
        .reg-orb-3 {
          width: 180px; height: 180px;
          background: radial-gradient(circle, #06b6d4 0%, #0e7490 100%);
          top: 40%; left: 15%;
          animation-delay: -9s;
          opacity: 0.18;
        }

        @keyframes reg-drift {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-25px, 20px) scale(1.05); }
          100% { transform: translate(20px, -30px) scale(0.97); }
        }

        .reg-card {
          position: relative;
          z-index: 1;
          width: 440px;
          padding: 2.8rem 2.6rem 2.2rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 32px 64px rgba(0,0,0,0.5),
            0 0 80px rgba(124,58,237,0.08);
          animation: reg-cardIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes reg-cardIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .reg-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.3);
          border-radius: 99px;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 500;
          color: #c4a8ff;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 1.1rem;
          animation: reg-fadeSlide 0.5s 0.2s both;
        }
        .reg-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 6px #a78bfa;
          animation: reg-pulse 2s ease-in-out infinite;
        }
        @keyframes reg-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        .reg-title {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 0.25rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
          animation: reg-fadeSlide 0.5s 0.3s both;
        }
        .reg-title span {
          background: linear-gradient(135deg, #a78bfa 0%, #4d94ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .reg-sub {
          font-size: 0.84rem;
          color: rgba(255,255,255,0.35);
          margin: 0 0 1.6rem;
          animation: reg-fadeSlide 0.5s 0.35s both;
        }

        @keyframes reg-fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Two-column name+email row */
        .reg-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem;
        }

        .reg-input-wrap {
          position: relative;
          margin-bottom: 0.9rem;
          animation: reg-fadeSlide 0.5s both;
        }
        .reg-input-wrap:nth-child(1) { animation-delay: 0.38s; }
        .reg-input-wrap:nth-child(2) { animation-delay: 0.42s; }
        .reg-input-wrap:nth-child(3) { animation-delay: 0.46s; }
        .reg-input-wrap:nth-child(4) { animation-delay: 0.50s; }

        .reg-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 5px;
        }

        .reg-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          box-sizing: border-box;
        }
        .reg-input::placeholder { color: rgba(255,255,255,0.25); }
        .reg-input:focus {
          border-color: rgba(167,139,250,0.6);
          background: rgba(167,139,250,0.06);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.12), 0 0 20px rgba(167,139,250,0.06);
        }
        .reg-input.error-field {
          border-color: rgba(239,68,68,0.6);
          box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
        }

        .reg-submit-wrap {
          margin-top: 0.6rem;
          animation: reg-fadeSlide 0.5s 0.54s both;
        }

        .reg-btn {
          width: 100%;
          height: 48px;
          border: none;
          border-radius: 10px;
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #7c3aed 0%, #1a6fff 100%);
          color: #fff;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(124,58,237,0.4);
        }
        .reg-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(124,58,237,0.55);
        }
        .reg-btn:active:not(:disabled) { transform: translateY(0); }
        .reg-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .reg-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.16) 50%, transparent 60%);
          background-size: 200% 100%;
          animation: reg-shimmer 2.4s ease-in-out infinite;
        }
        @keyframes reg-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        .reg-spin { animation: reg-rotate 0.8s linear infinite; }
        @keyframes reg-rotate { to { transform: rotate(360deg); } }

        .reg-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          margin: 1.4rem 0;
        }

        .reg-footer {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.3);
          text-align: center;
          animation: reg-fadeSlide 0.5s 0.58s both;
        }
        .reg-footer a {
          color: #c4a8ff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .reg-footer a:hover { color: #ddd1ff; text-decoration: underline; }

        /* progress steps indicator */
        .reg-steps {
          display: flex;
          gap: 4px;
          margin-bottom: 1.6rem;
          animation: reg-fadeSlide 0.5s 0.32s both;
        }
        .reg-step {
          height: 3px;
          border-radius: 99px;
          flex: 1;
          background: rgba(255,255,255,0.1);
          transition: background 0.4s;
        }
        .reg-step.active { background: linear-gradient(90deg, #7c3aed, #4d94ff); }
      `}</style>

      <div className="reg-root">
        <div className="reg-orb reg-orb-1" />
        <div className="reg-orb reg-orb-2" />
        <div className="reg-orb reg-orb-3" />

        <div className="reg-card">
          <div className="reg-badge">
            <span className="reg-badge-dot" />
            Create Account
          </div>

          <h1 className="reg-title">
            Join us <span>today.</span>
          </h1>
          <p className="reg-sub">Fill in your details to get started</p>

          {/* decorative progress bar */}
          <div className="reg-steps">
            <div className="reg-step active" />
            <div className="reg-step active" />
            <div className="reg-step active" />
            <div className="reg-step active" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="reg-row">
              <div
                className="reg-input-wrap"
                style={{ marginBottom: "0.9rem" }}
              >
                <label className="reg-label">Full name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="John Doe"
                  className={`reg-input ${errors["name"] ? "error-field" : ""}`}
                />
              </div>
              <div
                className="reg-input-wrap"
                style={{ marginBottom: "0.9rem" }}
              >
                <label className="reg-label">Email</label>
                <input
                  type="text"
                  {...register("email", { required: true })}
                  placeholder="you@email.com"
                  className={`reg-input ${errors["email"] ? "error-field" : ""}`}
                />
              </div>
            </div>

            <div className="reg-input-wrap">
              <label className="reg-label">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                {...register("password", { required: true })}
                className={`reg-input ${errors["password"] ? "error-field" : ""}`}
              />
            </div>

            <div className="reg-input-wrap">
              <label className="reg-label">Confirm Password</label>
              <input
                type="password"
                placeholder="Repeat your password"
                {...register("confirmPassword", { required: true })}
                className={`reg-input ${errors["confirmPassword"] ? "error-field" : ""}`}
              />
            </div>

            <div className="reg-submit-wrap">
              <button type="submit" disabled={isLoading} className="reg-btn">
                {isLoading && (
                  <SpinnerIcon className="reg-spin" weight="bold" size={16} />
                )}
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="reg-divider" />

          <p className="reg-footer">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
