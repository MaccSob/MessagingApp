/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import "../App.css"
import logo from "../assets/logo.png"
import { registerUser } from "../api"
import { useNavigate } from "react-router";

type Field = "firstName" | "lastName" | "username" | "email" | "password" | "confirm";

interface FormState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirm: string;
  errors: Partial<Record<Field, string>>;
  loading: boolean;
  success: boolean;
}

const INITIAL: FormState = {
  firstName: "", lastName: "", username: "", email: "", password: "", confirm: "",
  errors: {}, loading: false, success: false,
};

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  
  const score = checks.filter(Boolean).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#e00", "#f5a623", "#5a9e6f", "#E8000D"];
  return (
    <div className="strength">
      <div className="strength-bars">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="strength-bar"
            style={{ background: i <= score ? colors[score] : undefined }}
          />
        ))}
      </div>
      <span className="strength-label" style={{ color: colors[score] }}>
        {labels[score]}
      </span>
    </div>
  );
}

export default function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [focused, setFocused] = useState<Field | null>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { firstRef.current?.focus(); }, []);

  const validate = (): Partial<Record<Field, string>> => {
    const e: Partial<Record<Field, string>> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.username.trim()) e.username = "Nickname is required";
    else if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username))
      e.username = "3–20 chars, letters/numbers/_";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords don't match";
    return e;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      setForm(f => ({ ...f, errors }));
      return;
    }

    setForm(f => ({ ...f, loading: true, errors: {} }));

    try {
      await registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        password: form.password,
      });
      // Token is stored in an httpOnly cookie by the server automatically.
      // Redirect or update app state here, e.g.:
     navigate("/login");
      setForm(f => ({ ...f, loading: false, success: true }));
    } catch (err: any) {
      // Server sends { field, message } on conflicts (duplicate email/username).
      // Falls back to a generic error on the email field if no field is specified.
      const field: Field = (err.field as Field) ?? "email";
      setForm(f => ({
        ...f,
        loading: false,
        errors: { [field]: err.message ?? "Something went wrong" },
      }));
    }
  };

  const handleChange = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value, errors: { ...f.errors, [field]: undefined } }));

  const fp = (field: Field) => ({
    value: form[field],
    onChange: handleChange(field),
    onFocus: () => setFocused(field),
    onBlur: () => setFocused(null),
  });

  const cls = (field: Field) =>
    `field${focused === field ? " active" : ""}${form.errors[field] ? " has-error" : ""}`;

  return (
    <div className="shell">
      <aside className="panel">
        <img src={logo} alt="Joffy" className="panel-logo" />
        <span className="panel-wordmark">JOFFY</span>
        <div className="panel-rule" />
        <p className="panel-tagline">Join the conversation. It's free, always.</p>
      </aside>

      <div className="form-area">
        {form.success ? (
          <div className="success-wrap">
            <div className="success-icon">✓</div>
            <h2 className="success-title">You're in.</h2>
            <p className="success-sub">Welcome to JOFFY, @{form.username}.</p>
          </div>
        ) : (
          <div className="form-inner">
            <h1 className="form-title">Create account</h1>
            <p className="form-sub">It only takes a minute.</p>

            <div className="fields">
              {/* Name row */}
              <div className="row-2">
                <div className={cls("firstName")}>
                  <label htmlFor="firstName">First name</label>
                  <input
                    id="firstName"
                    ref={firstRef}
                    type="text"
                    autoComplete="given-name"
                    placeholder="Jane"
                    {...fp("firstName")}
                  />
                  {form.errors.firstName && <span className="error">{form.errors.firstName}</span>}
                </div>
                <div className={cls("lastName")}>
                  <label htmlFor="lastName">Last name</label>
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Doe"
                    {...fp("lastName")}
                  />
                  {form.errors.lastName && <span className="error">{form.errors.lastName}</span>}
                </div>
              </div>

              {/* Nickname */}
              <div className={cls("username")}>
                <label htmlFor="username">Nickname / Login</label>
                <div className="prefix-wrap">
                  <span className="prefix">@</span>
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="jane_doe"
                    {...fp("username")}
                  />
                </div>
                {form.errors.username && <span className="error">{form.errors.username}</span>}
              </div>

              {/* Email */}
              <div className={cls("email")}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...fp("email")}
                />
                {form.errors.email && <span className="error">{form.errors.email}</span>}
              </div>

              {/* Password */}
              <div className={cls("password")}>
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    {...fp("password")}
                  />
                  <button
                    type="button"
                    className="toggle-pw"
                    onClick={() => setShowPw(s => !s)}
                    aria-label="Toggle password visibility"
                  >
                    {showPw ? "hide" : "show"}
                  </button>
                </div>
                <PasswordStrength password={form.password} />
                {form.errors.password && <span className="error">{form.errors.password}</span>}
              </div>

              {/* Confirm password */}
              <div className={cls("confirm")}>
                <label htmlFor="confirm">Confirm password</label>
                <div className="input-wrap">
                  <input
                    id="confirm"
                    type={showCf ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    {...fp("confirm")}
                  />
                  <button
                    type="button"
                    className="toggle-pw"
                    onClick={() => setShowCf(s => !s)}
                    aria-label="Toggle confirm password visibility"
                  >
                    {showCf ? "hide" : "show"}
                  </button>
                </div>
                {form.confirm && !form.errors.confirm && form.confirm === form.password && (
                  <span className="match-ok">✓ Passwords match</span>
                )}
                {form.errors.confirm && <span className="error">{form.errors.confirm}</span>}
              </div>
            </div>

            <p className="terms" style={{ marginTop: "16px" }}>
              By joining you agree to our{" "}
              <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
            </p>

            <button
              className="submit"
              style={{ marginTop: "16px" }}
              onClick={handleSubmit}
              disabled={form.loading}
            >
              {form.loading ? <span className="spinner" /> : "Create account →"}
            </button>

            <p className="footer-text">
              Already have an account?{" "}
              <a href="/login" className="link">Sign in</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}