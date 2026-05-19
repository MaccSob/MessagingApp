import { useState, useRef, useEffect } from "react";
import '../App.css';

type Field = "email" | "password";

interface FormState {
  email: string;
  password: string;
  errors: Partial<Record<Field, string>>;
  loading: boolean;
  success: boolean;
}

export default function LoginForm() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    errors: {},
    loading: false,
    success: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<Field | null>(null);
  const [mounted, setMounted] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    emailRef.current?.focus();
  }, []);

  const validate = (): Partial<Record<Field, string>> => {
    const errs: Partial<Record<Field, string>> = {};
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 8)
      errs.password = "Minimum 8 characters";
    return errs;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      setForm((f) => ({ ...f, errors }));
      return;
    }
    setForm((f) => ({ ...f, loading: true, errors: {} }));
    await new Promise((r) => setTimeout(r, 1400));
    setForm((f) => ({ ...f, loading: false, success: true }));
  };

  const handleChange = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({
      ...f,
      [field]: e.target.value,
      errors: { ...f.errors, [field]: undefined },
    }));
  };

  if (form.success) {
    return (
      <div className="page">
        <div className={`card success-card ${mounted ? "in" : ""}`}>
          <div className="success-icon">✓</div>
          <h2 className="success-title">Welcome back.</h2>
          <p className="success-sub">You're signed in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className={`card ${mounted ? "in" : ""}`}>
        {/* Header */}
        <div className="card-header">
          <div className="logo">♣♥</div>
          <h1 className="title">Sign in</h1>
          <p className="subtitle">Welcome back — we missed you.</p>
        </div>

        {/* Fields */}
        <div className="fields">
          <div className={`field ${focused === "email" ? "active" : ""} ${form.errors.email ? "has-error" : ""}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              ref={emailRef}
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange("email")}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              placeholder="you@example.com"
            />
            {form.errors.email && <span className="error">{form.errors.email}</span>}
          </div>

          <div className={`field ${focused === "password" ? "active" : ""} ${form.errors.password ? "has-error" : ""}`}>
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange("password")}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowPassword((s) => !s)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "hide" : "show"}
              </button>
            </div>
            {form.errors.password && <span className="error">{form.errors.password}</span>}
          </div>
        </div>

        {/* Options row */}
        <div className="options-row">
          <label className="remember">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <a href="#" className="forgot">Forgot password?</a>
        </div>

        {/* Submit */}
        <button
          className={`submit ${form.loading ? "loading" : ""}`}
          onClick={handleSubmit}
          disabled={form.loading}
        >
          {form.loading ? <span className="spinner" /> : "Continue →"}
        </button>

        {/* Footer */}
        <p className="footer-text">
          No account?{" "}
          <a href="#" className="link">Create one</a>
        </p>
      </div>
    </div>
  );
}
