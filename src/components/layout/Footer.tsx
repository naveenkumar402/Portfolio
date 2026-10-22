import { profile } from '../../data/portfolio';

export function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name} · {profile.title}
      </p>
      <p className="footer__note">Architecture and workflow diagrams are illustrative, based on professional experience.</p>
    </footer>
  );
}
