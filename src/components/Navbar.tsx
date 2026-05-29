import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface NavbarProps {
  tema: string;
  totalItens: number;
  onTemaChange: (tema: string) => void;
}

const temas = [
  { value: '', label: 'Tema Padrão' },
  { value: 'tema-dark', label: 'Dark' },
  { value: 'tema-ocean', label: 'Ocean' },
  { value: 'tema-forest', label: 'Forest' },
];

export default function Navbar({ tema, totalItens, onTemaChange }: NavbarProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Compre Aqui!
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuAberto((prev) => !prev)}
          aria-controls="navbarNav"
          aria-expanded={menuAberto}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${menuAberto ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/produtos">
                Produtos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contato">
                Contato
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <select
              id="seletor-tema"
              className="form-select form-select-sm"
              value={tema}
              onChange={(event) => onTemaChange(event.target.value)}
              aria-label="Selecione um tema"
            >
              {temas.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <Link className="btn btn-outline-primary position-relative" to="/carrinho">
              <i className="bi bi-cart3" /> Carrinho
              <span className="contador-carrinho badge bg-primary ms-2">{totalItens}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
