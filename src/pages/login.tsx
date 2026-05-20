import { useState, useRef, useEffect } from "react";
import "../App.css";
import logo from "../assets/logo.png";

type Field = "email" | "password";
interface FormState {
  email: string; password: string;
  errors: Partial<Record<Field, string>>;
  loading: boolean; success: boolean;
}

export default function Login() {
  const [form, setForm] = useState<FormState>({ email:"", password:"", errors:{}, loading:false, success:false });
  const [showPw, setShowPw] = useState(false);
  const [focused, setFocused] = useState<Field | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => { emailRef.current?.focus(); }, []);

  const validate = () => {
    const e: Partial<Record<Field,string>> = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    return e;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length) { setForm(f => ({ ...f, errors })); return; }
    setForm(f => ({ ...f, loading: true, errors: {} }));
    await new Promise(r => setTimeout(r, 1400));
    setForm(f => ({ ...f, loading: false, success: true }));
  };

  const handleChange = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value, errors: { ...f.errors, [field]: undefined } }));

  const cls = (field: Field) =>
    `field${focused === field ? " active" : ""}${form.errors[field] ? " has-error" : ""}`;

  return (
    <div className="shell">
      <aside className="panel">
        <img src={logo} alt="Joffy" className="panel-logo" />
        <span className="panel-wordmark">JOFFY</span>
        <div className="panel-rule" />
        <p className="panel-tagline">Messages that actually feel like you.</p>
      </aside>

      <div className="form-area">
        {form.success ? (
          <div className="success-wrap">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Welcome back.</h2>
            <p className="success-sub">You're signed in. Let's chat.</p>
          </div>
        ) : (
          <div className="form-inner">
            <h1 className="form-title">Welcome back</h1>
            <p className="form-sub">Sign in to continue chatting.</p>

            <div className="fields">
              <div className={cls("email")}>
                <label htmlFor="email">Email</label>
                <input id="email" ref={emailRef} type="email" autoComplete="email"
                  placeholder="you@example.com" value={form.email} onChange={handleChange("email")}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                {form.errors.email && <span className="error">{form.errors.email}</span>}
              </div>

              <div className={cls("password")}>
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  <input id="password" type={showPw ? "text" : "password"} autoComplete="current-password"
                    placeholder="••••••••" value={form.password} onChange={handleChange("password")}
                    onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} />
                  <button type="button" className="toggle-pw" onClick={() => setShowPw(s => !s)} aria-label="Toggle password">
                    {showPw ? "hide" : "show"}
                  </button>
                </div>
                {form.errors.password && <span className="error">{form.errors.password}</span>}
              </div>
            </div>

            <div className="opts">
              <label className="remember"><input type="checkbox" /> Remember me</label>
              <a href="#" className="forgot">Forgot password?</a>
            </div>

            <button className="submit" onClick={handleSubmit} disabled={form.loading}>
              {form.loading ? <span className="spinner" /> : "Sign in →"}
            </button>
            <div className="or-divider">or</div>
            <p className="footer-text">No account yet? <a href="#" className="link">Join JOFFY</a></p>
          </div>
        )}
      </div>
    </div>
  );
}
