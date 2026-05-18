import React, { useState } from 'react';


export const LoginForm: React.FC = () => {
    
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Wszystkie pola są wymagane.');
      return;
    }

    setIsLoading(true);

    try {
      // API here (np. fetch('/api/login'))
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Zalogowano pomyślnie!', { email, password });
      alert('Zalogowano pomyślnie!');
      
      setEmail('');
      setPassword('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Niepoprawny e-mail lub hasło.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Zaloguj się</h2>
        
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="twój@email.com"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Hasło:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
      </form>
    </div>
  );
};